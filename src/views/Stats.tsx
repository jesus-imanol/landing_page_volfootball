"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLanding } from "@/viewmodels/useLanding";
import { useInView } from "framer-motion";

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value >= 1000) return Math.floor(v / 1000) + "k";
    return Math.floor(v).toString();
  });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" as const });
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <motion.span className="text-4xl sm:text-5xl font-bold text-neo-accent">
          {rounded}
        </motion.span>
        <span className="text-2xl text-neo-accent font-bold">{suffix}</span>
      </div>
      <p className="mt-2 text-neo-secondary text-sm">{label}</p>
    </div>
  );
}

export default function Stats() {
  const { stats } = useLanding();

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-neo-card border border-neo-border rounded-2xl p-10 sm:p-14"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s) => (
            <Counter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
