/**
 * authService.ts — VanaVaidhya Auth API Layer
 * ============================================
 * Thin network layer that talks to the FastAPI /auth/* endpoints.
 * All functions return typed results or throw a user-friendly Error.
 */

import { ML_SERVER_URL } from "../config";

const BASE = ML_SERVER_URL;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photo_url?: string | null;
  login_method: "email" | "google";
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthUser;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function authFetch<T>(
  path: string,
  options: RequestInit
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach server. Make sure the backend is running.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // FastAPI returns { detail: "..." } on errors
    const msg =
      typeof data?.detail === "string"
        ? data.detail
        : Array.isArray(data?.detail)
        ? data.detail.map((d: { msg?: string }) => d.msg).join(", ")
        : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

// ── Auth calls ────────────────────────────────────────────────────────────────

/**
 * Register a new account with email & password.
 */
export async function apiSignup(
  name: string,
  email: string,
  password: string
): Promise<AuthTokens> {
  return authFetch<AuthTokens>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

/**
 * Login with email & password.
 */
export async function apiLogin(
  email: string,
  password: string
): Promise<AuthTokens> {
  return authFetch<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Authenticate via Google — send the Google ID token to the backend for
 * server-side verification. Returns JWT pair on success.
 */
export async function apiGoogleLogin(idToken: string): Promise<AuthTokens> {
  return authFetch<AuthTokens>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  });
}

/**
 * Exchange a refresh token for a new access token.
 */
export async function apiRefresh(
  refreshToken: string
): Promise<{ access_token: string; token_type: string; user: AuthUser }> {
  return authFetch("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

/**
 * Revoke a refresh token (logout this session on the server).
 */
export async function apiLogout(refreshToken: string): Promise<void> {
  await authFetch("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  }).catch(() => {
    // Best-effort — don't block local logout if server is unreachable
  });
}

/**
 * Fetch the currently authenticated user using an access token.
 */
export async function apiGetMe(accessToken: string): Promise<AuthUser> {
  return authFetch<AuthUser>("/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
