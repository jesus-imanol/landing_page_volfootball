"use client";

import { motion } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import PortalCard from "@/core/components/PortalCard";
import EmptyState from "@/core/components/EmptyState";
import Spinner from "@/core/components/Spinner";
import { useNotifications } from "../viewmodels/useNotifications";
import type { Notificacion } from "../models/notification";

const iconMap: Record<string, string> = {
  soccer: "⚽",
  payment: "💳",
  star: "⭐",
  trophy: "🏆",
  team: "👥",
  history: "📊",
  invitacion_equipo: "📨",
  partido_programado: "📅",
  pago_confirmado: "💳",
  reta_disponible: "⚽",
  calificacion: "⭐",
  resumen_semanal: "📊",
};

function NotifCard({
  n,
  onMarkRead,
}: {
  n: Notificacion;
  onMarkRead: (id: number) => void;
}) {
  return (
    <PortalCard
      className={!n.leida ? "border-l-2 border-l-neo-accent" : "opacity-60"}
      onClick={() => !n.leida && onMarkRead(n.id)}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-neo-surface rounded-xl text-lg flex-shrink-0">
          {iconMap[n.icono] || iconMap[n.tipo] || "🔔"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm">{n.titulo}</p>
          <p className="text-neo-secondary text-xs mt-0.5">{n.mensaje}</p>
          <p className="text-neo-secondary/60 text-[10px] mt-1">
            {new Date(n.created_at).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {!n.leida && (
          <span className="w-2 h-2 bg-neo-accent rounded-full mt-2 flex-shrink-0" />
        )}
      </div>
    </PortalCard>
  );
}

function SeccionNotifs({
  titulo,
  items,
  onMarkRead,
  delay = 0,
}: {
  titulo: string;
  items: Notificacion[];
  onMarkRead: (id: number) => void;
  delay?: number;
}) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <p className="text-neo-secondary text-xs font-semibold uppercase tracking-wider px-1">
        {titulo}
      </p>
      {items.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.03 }}
        >
          <NotifCard n={n} onMarkRead={onMarkRead} />
        </motion.div>
      ))}
    </div>
  );
}

export default function NotificacionesView() {
  const { grupos, total, isLoading, markAsRead, markAllAsRead, unreadCount } =
    useNotifications();

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Spinner size={32} />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Notificaciones</h1>
          {unreadCount > 0 && (
            <p className="text-neo-secondary text-xs mt-0.5">
              {unreadCount} sin leer
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-neo-accent text-xs font-medium hover:underline"
          >
            <CheckCheck className="w-4 h-4" />
            Marcar todas leídas
          </button>
        )}
      </div>

      {total === 0 ? (
        <EmptyState
          icon={<Bell className="w-12 h-12" />}
          title="Sin notificaciones"
          description="Las notificaciones aparecerán aquí"
        />
      ) : (
        <div className="space-y-5">
          <SeccionNotifs
            titulo="Hoy"
            items={grupos.hoy}
            onMarkRead={markAsRead}
            delay={0}
          />
          <SeccionNotifs
            titulo="Esta semana"
            items={grupos.estaSemana}
            onMarkRead={markAsRead}
            delay={grupos.hoy.length * 0.03}
          />
          <SeccionNotifs
            titulo="Anteriores"
            items={grupos.anteriores}
            onMarkRead={markAsRead}
            delay={(grupos.hoy.length + grupos.estaSemana.length) * 0.03}
          />
        </div>
      )}
    </motion.div>
  );
}
