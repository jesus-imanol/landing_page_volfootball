"use client";

import { motion } from "framer-motion";
import { useLanding } from "@/viewmodels/useLanding";

export default function Features() {
  const { features } = useLanding();

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-neo-accent text-xs font-bold tracking-[0.2em] uppercase">
            Funcionalidades
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Todo lo que necesitas para tu liga
          </h2>
          <p className="mt-4 text-neo-secondary max-w-2xl mx-auto">
            Desde la creacion del torneo hasta el pitazo final. Cada aspecto de
            tu liga, digitalizado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glow-card bg-neo-card rounded-2xl p-6 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-neo-surface flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-neo-secondary text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
