"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Mail, Bell, User } from "lucide-react";

const tabs = [
  { href: "/dashboard", icon: Home, label: "Inicio" },
  { href: "/retas", icon: Gamepad2, label: "Retas" },
  { href: "/invitaciones", icon: Mail, label: "Invitar" },
  { href: "/notificaciones", icon: Bell, label: "Notifs" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-neo-card/95 backdrop-blur-md border-t border-neo-border z-50">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${
                active ? "text-neo-accent" : "text-neo-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
