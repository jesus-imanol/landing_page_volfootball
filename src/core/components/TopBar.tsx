"use client";

import Link from "next/link";
import { Bell, LogOut, Shield } from "lucide-react";
import { useAuthContext } from "@/core/context/auth-context";

export default function TopBar() {
  const { user, logout } = useAuthContext();

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-3 bg-neo-card/80 backdrop-blur-md border-b border-neo-border">
      <div className="flex items-center gap-2 lg:hidden">
        <Shield className="w-6 h-6 text-neo-accent" />
        <span className="text-lg font-bold text-white">VolFootball</span>
      </div>

      <div className="hidden lg:block">
        <p className="text-neo-secondary text-sm">
          Hola, <span className="text-white font-medium">{user?.nombre_completo || "Jugador"}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/perfil" title="Mi perfil">
          {user?.foto_perfil_url ? (
            <img
              src={user.foto_perfil_url}
              alt={user.nombre_completo || "Perfil"}
              className="w-8 h-8 rounded-full object-cover border border-neo-border hover:border-neo-accent transition-colors"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-neo-surface border border-neo-border flex items-center justify-center text-neo-accent font-bold text-xs hover:border-neo-accent transition-colors">
              {user?.nombre_completo?.split(" ").slice(0, 2).map(n => n[0]?.toUpperCase()).join("") || "?"}
            </div>
          )}
        </Link>
        <Link
          href="/notificaciones"
          className="relative p-2 rounded-lg hover:bg-neo-surface transition-colors"
        >
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neo-warning rounded-full" />
        </Link>
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-neo-surface transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5 text-neo-secondary hover:text-neo-error" />
        </button>
      </div>
    </header>
  );
}
