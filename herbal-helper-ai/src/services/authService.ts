import { ML_SERVER_URL } from "@/config";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo_url?: string;
  google_id?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: UserProfile;
}

const ACCESS_TOKEN_KEY = "plantsage_access_token";
const REFRESH_TOKEN_KEY = "plantsage_refresh_token";
const USER_KEY = "plantsage_user_profile";

type AuthChangeListener = (user: UserProfile | null) => void;
const listeners = new Set<AuthChangeListener>();

export const authService = {
  // Subscribe to changes in authentication state
  subscribe(listener: AuthChangeListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  notify(user: UserProfile | null) {
    listeners.forEach((listener) => listener(user));
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser(): UserProfile | null {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setSession(accessToken: string, refreshToken: string, user: UserProfile) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.notify(user);
  },

  clearSession() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.notify(null);
  },

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${ML_SERVER_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: "Signup failed" }));
      throw new Error(err.detail || "Signup failed");
    }

    const data: AuthResponse = await response.json();
    this.setSession(data.access_token, data.refresh_token, data.user);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${ML_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: "Login failed" }));
      throw new Error(err.detail || "Login failed");
    }

    const data: AuthResponse = await response.json();
    this.setSession(data.access_token, data.refresh_token, data.user);
    return data;
  },

  async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    this.clearSession();

    if (refreshToken) {
      try {
        await fetch(`${ML_SERVER_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (e) {
        console.error("Error calling backend logout:", e);
      }
    }
  },

  async refreshSession(): Promise<UserProfile | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearSession();
      return null;
    }

    try {
      const response = await fetch(`${ML_SERVER_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        this.clearSession();
        return null;
      }

      const data = await response.json();
      this.setSession(data.access_token, refreshToken, data.user);
      return data.user;
    } catch (e) {
      console.error("Session refresh failed:", e);
      return null;
    }
  },

  async getMe(): Promise<UserProfile | null> {
    const accessToken = this.getAccessToken();
    if (!accessToken) return null;

    try {
      const response = await fetch(`${ML_SERVER_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        // Access token might have expired, try refresh
        return await this.refreshSession();
      }

      const user: UserProfile = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.notify(user);
      return user;
    } catch (e) {
      console.error("Error fetching user profile:", e);
      return null;
    }
  },
};
