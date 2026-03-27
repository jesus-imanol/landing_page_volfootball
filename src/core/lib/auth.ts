import Cookies from "js-cookie";

const TOKEN_KEY = "vf_token";
const USER_KEY = "vf_user";

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: "lax" });
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export interface StoredUser {
  usuario_id: number;
  nombre_completo: string;
  correo: string;
  rol_id: number;
  foto_perfil_url?: string;
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeStoredUser() {
  localStorage.removeItem(USER_KEY);
}
