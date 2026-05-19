"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { formatRupiah } from "@/lib/utils";

export function BonusCard({
  title,
  sub,
  normal,
  side,
  index,
  highlight,
  badge
}: {
  title: string;
  sub: string;
  normal: number | null;
  side: "left" | "right";
  index: number;
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -80 : 80, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-cream/90 p-6 shadow-md ring-1 ring-ink/5"
    >
      <BorderBeam size={120} duration={8} delay={index * 1.5} />
      {highlight && (
        <span className="absolute -top-3 right-4 rounded-full bg-sage px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cream">
          Hook
        </span>
      )}
      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-sage">
        Bonus {index + 1}
      </div>
      <h3 className="font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-sm text-ink/70">{sub}</p>
      <div className="mt-5 flex items-center justify-between">
        {normal !== null ? (
          <span className="text-sm text-ink/40 line-through">Normal {formatRupiah(normal)}</span>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/60">{badge}</span>
        )}
        <span className="rounded-full bg-sage px-3 py-1 text-xs font-bold uppercase tracking-widest text-cream">
          Gratis
        </span>
      </div>
    </motion.div>
  );
}
