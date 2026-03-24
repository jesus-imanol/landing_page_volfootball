"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Mail, Bell, User, Shield, QrCode } from "lucide-react";

const links = [
  { href: "/dashboard", icon: Home, label: "Inicio" },
  { href: "/retas", icon: Gamepad2, label: "Retas" },
  { href: "/invitaciones", icon: Mail, label: "Invitaciones" },
  { href: "/credencial", icon: QrCode, label: "Mi QR" },
  { href: "/notificaciones", icon: Bell, label: "Notificaciones" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-neo-card border-r border-neo-border min-h-screen p-4">
      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-4 mb-6">
        <Shield className="w-7 h-7 text-neo-accent" />
        <span className="text-xl font-bold text-white">VolFootball</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-neo-accent/10 text-neo-accent border border-neo-accent/20"
                  : "text-neo-secondary hover:text-white hover:bg-neo-surface"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 text-neo-secondary/50 text-xs">
        VolFootball v1.0
      </div>
    </aside>
  );
}
