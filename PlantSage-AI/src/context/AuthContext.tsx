/**
 * AuthContext.tsx — VanaVaidhya Auth State
 * =========================================
 * Full auth context with:
 *  • email/password signup & login (backed by MongoDB via FastAPI)
 *  • Google OAuth (via expo-auth-session → /auth/google)
 *  • JWT access + refresh token persistence in AsyncStorage
 *  • Auto session restore on app start
 *  • Auto token refresh before expiry
 *  • Logout (revokes refresh token on server + clears local storage)
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  apiLogin,
  apiSignup,
  apiGoogleLogin,
  apiRefresh,
  apiLogout,
  type AuthUser,
} from "../services/authService";

// ── Storage keys ──────────────────────────────────────────────────────────────
const KEY_ACCESS  = "vv_access_token";
const KEY_REFRESH = "vv_refresh_token";
const KEY_USER    = "vv_user";

// ── Types ─────────────────────────────────────────────────────────────────────

export type LoginMethod = "email" | "google" | null;

export interface AuthContextValue {
  /** The currently authenticated user (null = not logged in) */
  user: AuthUser | null;
  /** True while any auth operation is in progress */
  loading: boolean;
  /** True until the initial session restore from AsyncStorage is done */
  initializing: boolean;
  /** The current JWT access token (for attaching to API calls) */
  accessToken: string | null;

  // Auth actions
  login(email: string, password: string): Promise<void>;
  signup(name: string, email: string, password: string): Promise<void>;
  googleLogin(idToken: string): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user:         null,
  loading:      false,
  initializing: true,
  accessToken:  null,
  login:        async () => {},
  signup:       async () => {},
  googleLogin:  async () => {},
  logout:       async () => {},
});

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Keep a ref to the refresh token so the refresh timer can read it
  const refreshTokenRef = useRef<string | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Persist session ─────────────────────────────────────────────────────────

  async function persistSession(
    accessTok: string,
    refreshTok: string,
    userData: AuthUser
  ) {
    await AsyncStorage.multiSet([
      [KEY_ACCESS,  accessTok],
      [KEY_REFRESH, refreshTok],
      [KEY_USER,    JSON.stringify(userData)],
    ]);
    refreshTokenRef.current = refreshTok;
    setAccessToken(accessTok);
    setUser(userData);
    scheduleRefresh(accessTok);
  }

  async function clearSession() {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    await AsyncStorage.multiRemove([KEY_ACCESS, KEY_REFRESH, KEY_USER]);
    refreshTokenRef.current = null;
    setAccessToken(null);
    setUser(null);
  }

  // ── Base64 Decoder (Hermes-friendly fallback) ────────────────────────────────

  function decodeBase64(input: string): string {
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let result = "";
    for (let i = 0; i < base64.length; i += 4) {
      const chunk = base64.slice(i, i + 4);
      const char1 = chars.indexOf(chunk[0]);
      const char2 = chars.indexOf(chunk[1]);
      const char3 = chars.indexOf(chunk[2]);
      const char4 = chars.indexOf(chunk[3]);
      const byte1 = (char1 << 2) | (char2 >> 4);
      const byte2 = ((char2 & 15) << 4) | (char3 >> 2);
      const byte3 = ((char3 & 3) << 6) | char4;
      result += String.fromCharCode(byte1);
      if (chunk[2] !== "=" && char3 !== 64) {
        result += String.fromCharCode(byte2);
      }
      if (chunk[3] !== "=" && char4 !== 64) {
        result += String.fromCharCode(byte3);
      }
    }
    return result;
  }

  // ── Auto-refresh ────────────────────────────────────────────────────────────

  function getTokenExpiry(token: string): number | null {
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const payload = JSON.parse(decodeBase64(parts[1]));
      return payload.exp ? payload.exp * 1000 : null; // ms
    } catch {
      return null;
    }
  }

  function scheduleRefresh(token: string) {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    const expiry = getTokenExpiry(token);
    if (!expiry) return;

    // Refresh 2 minutes before expiry
    const delay = Math.max(expiry - Date.now() - 2 * 60 * 1000, 0);
    refreshTimerRef.current = setTimeout(async () => {
      const refreshTok = refreshTokenRef.current;
      if (!refreshTok) return;
      try {
        const result = await apiRefresh(refreshTok);
        await AsyncStorage.setItem(KEY_ACCESS, result.access_token);
        setAccessToken(result.access_token);
        if (result.user) setUser(result.user);
        scheduleRefresh(result.access_token);
      } catch (err: any) {
        const isNetworkError = err?.message?.includes("Cannot reach server");
        if (!isNetworkError) {
          // Refresh failed (expired/revoked) — log user out silently
          await clearSession();
        } else {
          // Network error — retry after 30 seconds
          if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
          refreshTimerRef.current = setTimeout(() => {
            scheduleRefresh(token);
          }, 30000);
        }
      }
    }, delay);
  }

  // ── Session restore on mount ────────────────────────────────────────────────

  useEffect(() => {
    (async () => {
      try {
        const [[, accessTok], [, refreshTok], [, userJson]] =
          await AsyncStorage.multiGet([KEY_ACCESS, KEY_REFRESH, KEY_USER]);

        if (accessTok && refreshTok && userJson) {
          const userData: AuthUser = JSON.parse(userJson);
          const expiry = getTokenExpiry(accessTok);
          const now    = Date.now();

          if (expiry && expiry > now) {
            // Access token still valid — restore session directly
            refreshTokenRef.current = refreshTok;
            setAccessToken(accessTok);
            setUser(userData);
            scheduleRefresh(accessTok);
          } else if (refreshTok) {
            // Access token expired — try to refresh silently
            try {
              const result = await apiRefresh(refreshTok);
              await AsyncStorage.setItem(KEY_ACCESS, result.access_token);
              refreshTokenRef.current = refreshTok;
              setAccessToken(result.access_token);
              setUser(result.user ?? userData);
              scheduleRefresh(result.access_token);
            } catch (err: any) {
              const isNetworkError = err?.message?.includes("Cannot reach server");
              if (!isNetworkError) {
                await clearSession();
              } else {
                // Keep the session so they stay logged in offline
                refreshTokenRef.current = refreshTok;
                setAccessToken(accessTok);
                setUser(userData);
              }
            }
          }
        }
      } catch {
        // Corrupt storage — wipe and start fresh
        await clearSession();
      } finally {
        setInitializing(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auth actions ────────────────────────────────────────────────────────────

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const result = await apiLogin(email, password);
      await persistSession(result.access_token, result.refresh_token, result.user);
    } finally {
      setLoading(false);
    }
  }

  async function signup(name: string, email: string, password: string) {
    setLoading(true);
    try {
      const result = await apiSignup(name, email, password);
      await persistSession(result.access_token, result.refresh_token, result.user);
    } finally {
      setLoading(false);
    }
  }

  async function googleLogin(idToken: string) {
    setLoading(true);
    try {
      const result = await apiGoogleLogin(idToken);
      await persistSession(result.access_token, result.refresh_token, result.user);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    const refreshTok = refreshTokenRef.current;
    await clearSession();
    if (refreshTok) {
      // Fire-and-forget server revocation
      apiLogout(refreshTok).catch(() => {});
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, initializing, accessToken, login, signup, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
