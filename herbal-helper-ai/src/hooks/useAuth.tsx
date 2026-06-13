import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, UserProfile } from "@/services/authService";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(authService.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync React state with local storage user first
    setUser(authService.getUser());

    // Subscribe to auth service events
    const unsubscribe = authService.subscribe((updatedUser) => {
      setUser(updatedUser);
    });

    // Initialize user profile check
    const initializeAuth = async () => {
      try {
        if (authService.getAccessToken()) {
          await authService.getMe();
        }
      } catch (err) {
        console.error("Initialization check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await authService.signup(name, email, password);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
