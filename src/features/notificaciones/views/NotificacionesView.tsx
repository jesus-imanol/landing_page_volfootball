"use client";

import { motion } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import PortalCard from "@/core/components/PortalCard";
import EmptyState from "@/core/components/EmptyState";
import Spinner from "@/core/components/Spinner";
import { useNotifications } from "../viewmodels/useNotifications";

const iconMap: Record<string, string> = {
  soccer: "⚽", payment: "💳", star: "⭐", trophy: "🏆", team: "👥", history: "📊",
};

export default function NotificacionesView() {
  const { notifications, isLoading, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={32} /></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Notificaciones</h1>
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

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-12 h-12" />}
          title="Sin notificaciones"
          description="Las notificaciones aparecerán aquí"
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <PortalCard
                className={!n.leida ? "border-l-2 border-l-neo-accent" : "opacity-70"}
                onClick={() => !n.leida && markAsRead(n.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neo-surface rounded-xl text-lg flex-shrink-0">
                    {iconMap[n.icono] || "🔔"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{n.titulo}</p>
                    <p className="text-neo-secondary text-xs mt-0.5 line-clamp-2">{n.mensaje}</p>
                    <p className="text-neo-secondary/60 text-[10px] mt-1">
                      {new Date(n.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {!n.leida && <span className="w-2 h-2 bg-neo-accent rounded-full mt-2 flex-shrink-0" />}
                </div>
              </PortalCard>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
