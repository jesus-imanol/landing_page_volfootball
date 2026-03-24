"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Spinner from "@/core/components/Spinner";
import { useCreatePickupGame } from "../viewmodels/usePickupGames";

export default function RetaCreateView() {
  const router = useRouter();
  const { create, isLoading, error } = useCreatePickupGame();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [lugar, setLugar] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("10");

  const handleSubmit = async () => {
    const ok = await create({
      title,
      description,
      fecha_hora: new Date(fechaHora).toISOString(),
      lugar,
      max_players: parseInt(maxPlayers) || 10,
    });
    if (ok) router.push("/retas");
  };

  const inputClass = "w-full bg-neo-surface border border-neo-border rounded-xl px-4 py-3 text-white placeholder:text-neo-secondary/50 focus:border-neo-accent focus:outline-none transition-colors";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/retas" className="p-2 rounded-lg hover:bg-neo-surface transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="text-xl font-bold text-white">Nueva Reta</h1>
      </div>

      <div className="bg-neo-card border border-neo-border rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-neo-secondary text-xs font-medium block mb-1.5">Nombre</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reta del sábado" className={inputClass} />
        </div>
        <div>
          <label className="text-neo-secondary text-xs font-medium block mb-1.5">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detalles de la reta..." rows={3} className={inputClass + " resize-none"} />
        </div>
        <div>
          <label className="text-neo-secondary text-xs font-medium block mb-1.5">Fecha y hora</label>
          <input type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-neo-secondary text-xs font-medium block mb-1.5">Lugar</label>
          <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder="Cancha Norte" className={inputClass} />
        </div>
        <div>
          <label className="text-neo-secondary text-xs font-medium block mb-1.5">Max jugadores</label>
          <input type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} className={inputClass} />
        </div>

        {error && (
          <div className="bg-neo-error/10 border border-neo-error/30 rounded-xl px-4 py-3">
            <p className="text-neo-error text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || !title || !fechaHora || !lugar}
          className="w-full bg-neo-accent text-neo-bg font-bold py-3.5 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Spinner size={20} /> : "Crear reta"}
        </button>
      </div>
    </motion.div>
  );
}
