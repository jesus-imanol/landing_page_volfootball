"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/core/lib/api-client";
import {
  getToken, setToken, removeToken,
  getStoredUser, setStoredUser, removeStoredUser,
  StoredUser,
} from "@/core/lib/auth";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/features/auth/models/auth";

interface AuthContextType {
  user: StoredUser | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateAvatarUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const stored = getStoredUser();
    if (token && stored) {
      setUser(stored);
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    const res = await api.post<AuthResponse>("/v1/auth/login", data);
    setToken(res.token);
    const u: StoredUser = {
      usuario_id: res.data.usuario_id,
      nombre_completo: res.data.nombre_completo,
      correo: res.data.correo,
      rol_id: res.data.rol_id,
    };
    setStoredUser(u);
    setUser(u);
    router.push("/dashboard");
  };

  const register = async (data: RegisterRequest) => {
    await api.post("/v1/auth/register", data);
    router.push("/login");
  };

  const logout = () => {
    removeToken();
    removeStoredUser();
    setUser(null);
    router.push("/login");
  };

  const updateAvatarUrl = (url: string) => {
    if (!user) return;
    const updated = { ...user, foto_perfil_url: url };
    setStoredUser(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateAvatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
