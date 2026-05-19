"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/number-ticker";

export function ToneScore({ score, hanzi }: { score: number; hanzi: string }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="relative w-[200px] rounded-2xl bg-white p-3 shadow"
    >
      <div className="mb-1 text-[10px] uppercase tracking-wider text-zinc-500">Tone score</div>
      <div className="flex items-end justify-between">
        <span className="font-display text-2xl font-bold text-[#0e1a12]">{hanzi}</span>
        <div className="flex items-baseline gap-0.5 font-display font-bold text-sage">
          <NumberTicker value={score} className="text-3xl" />
          <span className="text-sm">/100</span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
        <div className="rounded bg-[#dcf8c6] px-2 py-1">Tone-3 你: 78 ⚠</div>
        <div className="rounded bg-[#dcf8c6] px-2 py-1">Tone-3 好: 96 ✓</div>
      </div>
      {/* ripple */}
      <span className="pointer-events-none absolute -inset-1 -z-10 animate-ping rounded-2xl bg-sage/10" />
    </motion.div>
  );
}
