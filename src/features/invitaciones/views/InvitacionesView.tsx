"use client";

import { motion } from "framer-motion";
import { Check, X, KeyRound, Mail } from "lucide-react";
import PortalCard from "@/core/components/PortalCard";
import EmptyState from "@/core/components/EmptyState";
import Spinner from "@/core/components/Spinner";
import { useInvitations } from "../viewmodels/useInvitations";

export default function InvitacionesView() {
  const vm = useInvitations();

  if (vm.isLoading) return <div className="flex justify-center py-16"><Spinner size={32} /></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-xl font-bold text-white">Invitaciones</h1>

      {/* Join with code */}
      <PortalCard>
        <div className="flex items-center gap-2 mb-3">
          <KeyRound className="w-5 h-5 text-neo-accent" />
          <h2 className="text-white font-semibold text-sm">Unirse con código</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={vm.joinCode}
            onChange={(e) => vm.setJoinCode(e.target.value.toUpperCase())}
            placeholder="ABC1234"
            maxLength={10}
            onKeyDown={(e) => e.key === "Enter" && vm.joinWithCode()}
            className="flex-1 bg-neo-surface border border-neo-border rounded-xl px-4 py-2.5 text-white placeholder:text-neo-secondary/50 focus:border-neo-accent focus:outline-none text-sm tracking-wider"
          />
          <button
            onClick={vm.joinWithCode}
            disabled={vm.joinLoading || !vm.joinCode}
            className="bg-neo-accent text-neo-bg font-bold px-5 py-2.5 rounded-xl text-sm disabled:opacity-50 flex items-center gap-1"
          >
            {vm.joinLoading ? <Spinner size={16} /> : "Unirme"}
          </button>
        </div>
        {vm.joinError && <p className="text-neo-error text-xs mt-2">{vm.joinError}</p>}
        {vm.joinSuccess && <p className="text-neo-accent text-xs mt-2">Te uniste al equipo exitosamente</p>}
      </PortalCard>

      {/* Pending invitations */}
      <div>
        <h2 className="text-neo-secondary text-xs font-bold tracking-widest uppercase mb-3">
          Invitaciones pendientes ({vm.invitations.length})
        </h2>

        {vm.invitations.length === 0 ? (
          <EmptyState
            icon={<Mail className="w-12 h-12" />}
            title="Sin invitaciones"
            description="Cuando te inviten a un equipo, aparecerá aquí"
          />
        ) : (
          <div className="space-y-3">
            {vm.invitations.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <PortalCard>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{inv.equipo_nombre || "Equipo"}</p>
                      <p className="text-neo-secondary text-xs mt-0.5">
                        Invitado por {inv.invitador_nombre || "Capitán"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => vm.accept(inv.id)}
                        disabled={vm.actionLoading === inv.id}
                        className="p-2 bg-neo-accent/10 rounded-lg hover:bg-neo-accent/20 transition-colors"
                      >
                        {vm.actionLoading === inv.id ? <Spinner size={16} /> : <Check className="w-4 h-4 text-neo-accent" />}
                      </button>
                      <button
                        onClick={() => vm.reject(inv.id)}
                        disabled={vm.actionLoading === inv.id}
                        className="p-2 bg-neo-error/10 rounded-lg hover:bg-neo-error/20 transition-colors"
                      >
                        <X className="w-4 h-4 text-neo-error" />
                      </button>
                    </div>
                  </div>
                </PortalCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
