"use client";

import { useRef } from "react";

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
  const vid = useRef<HTMLVideoElement>(null);
  return (
    <div
      onMouseEnter={() => vid.current?.play().catch(() => {})}
      onMouseLeave={() => vid.current?.pause()}
      className="mx-2 flex h-44 w-64 shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-cream p-4 shadow ring-1 ring-ink/5 hover:ring-sage/40"
    >
      <div className="text-[10px] font-bold uppercase tracking-widest text-sage">{level}</div>
      <div>
        <div className="font-display text-4xl font-bold text-ink">{hanzi}</div>
        <div className="mt-1 text-sm italic text-ink/60">{pinyin}</div>
        <div className="text-sm text-ink/80">{meaning}</div>
      </div>
      <video
        ref={vid}
        muted
        playsInline
        loop
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-0"
      >
        {/* placeholder — real videos plugged in later */}
      </video>
    </div>
  );
}
