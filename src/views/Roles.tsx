"use client";

import { motion } from "framer-motion";
import { useLanding } from "@/viewmodels/useLanding";

export default function Roles() {
  const { roles } = useLanding();

  return (
    <section id="roles" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-neo-accent text-xs font-bold tracking-[0.2em] uppercase">
            Para todos
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Un rol para cada persona
          </h2>
          <p className="mt-4 text-neo-secondary max-w-2xl mx-auto">
            Desde el administrador hasta el jugador, cada uno tiene su espacio
            personalizado.
          </p>
        </motion.div>

        <div className="space-y-8">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glow-card bg-neo-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${role.color}15` }}
              >
                {role.emoji}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2" style={{ color: role.color }}>
                  {role.title}
                </h3>
                <p className="text-neo-secondary text-sm mb-4 leading-relaxed">
                  {role.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {role.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: role.color }}
                      />
                      <span className="text-neo-secondary">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
