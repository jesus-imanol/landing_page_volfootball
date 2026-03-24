"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import PortalCard from "@/core/components/PortalCard";
import Spinner from "@/core/components/Spinner";
import { usePickupGameDetail } from "../viewmodels/usePickupGames";

export default function RetaDetailView({ id }: { id: number }) {
  const { game, isLoading, error } = usePickupGameDetail(id);

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={32} /></div>;
  if (error) return <p className="text-neo-error text-center py-16">{error}</p>;
  if (!game) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/retas" className="p-2 rounded-lg hover:bg-neo-surface transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="text-xl font-bold text-white">{game.title}</h1>
      </div>

      <PortalCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-neo-accent/10 text-neo-accent text-xs font-bold px-3 py-1 rounded-lg">
              {game.estado}
            </span>
            <span className="flex items-center gap-1 text-neo-secondary text-xs">
              <Users className="w-3.5 h-3.5" />
              Max {game.max_players}
            </span>
          </div>

          <p className="text-neo-secondary text-sm">{game.description}</p>

          <div className="space-y-2 pt-2 border-t border-neo-border">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-neo-accent" />
              <span className="text-white">
                {new Date(game.fecha_hora).toLocaleDateString("es-MX", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-neo-warning" />
              <span className="text-white">{game.lugar}</span>
            </div>
          </div>
        </div>
      </PortalCard>
    </motion.div>
  );
}
