"use client";

import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, Users } from "lucide-react";
import Link from "next/link";
import PortalCard from "@/core/components/PortalCard";
import EmptyState from "@/core/components/EmptyState";
import Spinner from "@/core/components/Spinner";
import { usePickupGames } from "../viewmodels/usePickupGames";

export default function RetasListView() {
  const { games, isLoading, error } = usePickupGames();

  if (isLoading) {
    return <div className="flex justify-center py-16"><Spinner size={32} /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Mis Retas</h1>
          <p className="text-neo-secondary text-sm">{games.length} disponibles</p>
        </div>
        <Link
          href="/retas/crear"
          className="flex items-center gap-2 bg-neo-accent text-neo-bg font-bold px-4 py-2.5 rounded-xl text-sm hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          Nueva reta
        </Link>
      </div>

      {error && (
        <div className="bg-neo-error/10 border border-neo-error/30 rounded-xl p-4">
          <p className="text-neo-error text-sm">{error}</p>
        </div>
      )}

      {games.length === 0 ? (
        <EmptyState
          icon={<Users className="w-12 h-12" />}
          title="Sin retas disponibles"
          description="Crea la primera reta para empezar"
          action={
            <Link href="/retas/crear" className="text-neo-accent text-sm font-medium hover:underline">
              Crear reta
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/retas/${game.id}`}>
                <PortalCard className="hover:border-neo-accent/30">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-white font-semibold">{game.title}</h3>
                      <div className="flex items-center gap-4 text-neo-secondary text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(game.fecha_hora).toLocaleDateString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {game.lugar}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                      game.estado === "recruiting" ? "bg-neo-accent/10 text-neo-accent" : "bg-neo-secondary/10 text-neo-secondary"
                    }`}>
                      {game.estado}
                    </span>
                  </div>
                </PortalCard>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
