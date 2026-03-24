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
