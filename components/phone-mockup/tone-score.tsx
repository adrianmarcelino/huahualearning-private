"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

export function ToneScore({ score, hanzi }: { score: number; hanzi: string }) {
  return (
    <motion.div
      initial={{ y: 14, opacity: 0, scale: 0.92 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative w-[220px] overflow-hidden rounded-2xl bg-white p-3 shadow-md"
    >
      {/* ripple under score */}
      <Ripple />
      <div className="relative flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Tone score</div>
          <div className="font-display text-3xl font-black text-ink-deep">{hanzi}</div>
        </div>
        <div className="flex items-baseline gap-0.5 font-display font-black text-forest">
          <NumberTicker value={score} className="text-4xl" />
          <span className="text-sm">/100</span>
        </div>
      </div>
      <div className="relative mt-3 space-y-1.5 text-[11px]">
        <Row hanzi="你" label="Tone 3" ok score={92} />
        <Row hanzi="好" label="Tone 3" ok={false} score={71} />
      </div>
    </motion.div>
  );
}

function Row({ hanzi, label, ok, score }: { hanzi: string; label: string; ok: boolean; score: number }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-cream-2 px-2 py-1">
      <div className="flex items-center gap-2">
        <span className="font-display text-sm font-bold text-ink-deep">{hanzi}</span>
        <span className="text-zinc-500">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[11px] font-bold tabular-nums">
          <NumberTicker value={score} />
        </span>
        <span className={ok ? "grid h-4 w-4 place-items-center rounded-full bg-sage text-white" : "grid h-4 w-4 place-items-center rounded-full bg-amber-500 text-white"}>
          {ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
        </span>
      </div>
    </div>
  );
}

// Inline Ripple — concentric pulses under score area.
function Ripple() {
  return (
    <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border border-sage/30 animate-pulse-soft"
          style={{ transform: `scale(${0.4 + i * 0.18})`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </div>
  );
}
