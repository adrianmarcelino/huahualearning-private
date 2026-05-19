"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Fake video preview — real <video> would be heavy. Pulsing play badge on hover sells
// the affordance without shipping clips.
export function PreviewCard({
  hanzi,
  pinyin,
  meaning,
  level
}: {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative mx-2 flex h-[250px] w-[200px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-sage/15 bg-white p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
    >
      {/* sage glow on hover */}
      <span className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-sage/0 blur-2xl transition-colors duration-300 group-hover:bg-sage/30" />

      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-sage">{level}</div>

      <div className="my-2 text-center">
        <div className="font-display font-black leading-none text-ink-deep" style={{ fontSize: 80 }}>
          {hanzi}
        </div>
        <div className="mt-2 font-serif text-sm italic text-muted">{pinyin}</div>
        <div className="text-sm font-medium text-ink">{meaning}</div>
      </div>

      {/* play badge — appears on hover */}
      <div className="flex items-center justify-between text-[10px] text-muted">
        <span>Video {Math.floor(Math.random() * 30) + 10}s</span>
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-sage text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="absolute inset-0 animate-ping rounded-full bg-sage/40" />
          <Play className="relative h-3 w-3 fill-white" />
        </span>
      </div>
    </motion.div>
  );
}
