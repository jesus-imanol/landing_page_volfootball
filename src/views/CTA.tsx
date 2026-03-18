"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="cta" className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-neo-accent/5 rounded-3xl blur-[80px] pointer-events-none" />

        <div className="relative bg-neo-card border border-neo-border rounded-3xl p-10 sm:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-5xl mb-6 block">⚽</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Empieza <span className="text-gradient">gratis</span> hoy
            </h2>
            <p className="text-neo-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Crea tu liga en menos de 5 minutos. Sin tarjeta de credito, sin
              compromisos. Tu primera temporada es por nuestra cuenta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-neo-accent text-black font-bold rounded-xl text-lg animate-glow-pulse"
              >
                Crear mi liga
              </motion.a>
              <a
                href="#"
                className="px-10 py-4 border border-neo-border text-white font-semibold rounded-xl text-lg hover:border-neo-accent/40 transition-colors"
              >
                Ver demo
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-neo-secondary">
              <span>✓ Gratis para siempre (plan basico)</span>
              <span>✓ Soporte por WhatsApp</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
