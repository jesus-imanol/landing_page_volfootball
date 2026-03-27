"use client";

import { motion } from "framer-motion";
import { Gamepad2, Mail, Bell, Plus } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/core/context/auth-context";
import PortalCard from "@/core/components/PortalCard";
import Spinner from "@/core/components/Spinner";
import { useDashboard } from "../viewmodels/useDashboard";

export default function DashboardView() {
  const { user } = useAuthContext();
  const { data, isLoading } = useDashboard();

  console.log("[DashboardView] isLoading:", isLoading, "data:", JSON.stringify(data));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Hola, {user?.nombre_completo?.split(" ")[0] || "Jugador"} 👋
        </h1>
        <p className="text-neo-secondary text-sm mt-1">Bienvenido a tu portal</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/retas">
          <PortalCard className="hover:border-neo-accent/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-neo-accent/10 rounded-xl">
                <Gamepad2 className="w-5 h-5 text-neo-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data?.retas.length || 0}</p>
                <p className="text-neo-secondary text-xs">Retas recientes</p>
              </div>
            </div>
          </PortalCard>
        </Link>

        <Link href="/invitaciones">
          <PortalCard className="hover:border-neo-blue/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-neo-blue/10 rounded-xl">
                <Mail className="w-5 h-5 text-neo-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data?.invitacionesPendientes || 0}</p>
                <p className="text-neo-secondary text-xs">Invitaciones</p>
              </div>
            </div>
          </PortalCard>
        </Link>

        <Link href="/notificaciones">
          <PortalCard className="hover:border-neo-warning/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-neo-warning/10 rounded-xl">
                <Bell className="w-5 h-5 text-neo-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data?.notificacionesNoLeidas || 0}</p>
                <p className="text-neo-secondary text-xs">Sin leer</p>
              </div>
            </div>
          </PortalCard>
        </Link>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-neo-secondary text-xs font-bold tracking-widest uppercase mb-3">Acciones rápidas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/retas/crear">
            <PortalCard className="text-center hover:border-neo-accent/40">
              <Plus className="w-6 h-6 text-neo-accent mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Nueva reta</p>
            </PortalCard>
          </Link>
          <Link href="/invitaciones">
            <PortalCard className="text-center hover:border-neo-blue/40">
              <Mail className="w-6 h-6 text-neo-blue mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Unirme</p>
            </PortalCard>
          </Link>
        </div>
      </div>

      {/* Recent retas */}
      {data?.retas && data.retas.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-neo-secondary text-xs font-bold tracking-widest uppercase">Retas recientes</h2>
            <Link href="/retas" className="text-neo-accent text-xs font-medium">Ver todas</Link>
          </div>
          <div className="space-y-3">
            {data.retas.map((r) => (
              <PortalCard key={r.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">{r.title}</p>
                    <p className="text-neo-secondary text-xs mt-0.5">{r.lugar}</p>
                  </div>
                  <span className="text-neo-accent text-xs bg-neo-accent/10 px-2.5 py-1 rounded-lg font-medium">
                    {r.estado}
                  </span>
                </div>
              </PortalCard>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
