"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { useProximityLift } from "@/lib/proximity-lift";

const LAOSHI = [
  { name: "Laoshi Mei", cred: "HSK 6 Native", spec: "Conversation · HSK 1-3", flag: "🇨🇳", years: 6 },
  { name: "Laoshi Wei", cred: "Native + MBA", spec: "Bisnis · Supplier China", flag: "🇨🇳", years: 8 },
  { name: "Laoshi Ling", cred: "HSK Tutor", spec: "HSK 4-5 · Persiapan ujian", flag: "🇹🇼", years: 5 },
  { name: "Laoshi Han", cred: "BA Sastra Mandarin", spec: "HSK 6 · Kuliah/beasiswa", flag: "🇨🇳", years: 9 }
];

export function LaoshiCards() {
  return (
    <section id="laoshi" className="relative bg-cream py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sage">Laoshi</div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-black text-ink-deep md:text-5xl">
              Yang akan ngajar kamu
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-3 text-lg text-muted">Native speaker + pengalaman ngajar siswa Indonesia.</p>
          </BlurFade>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {LAOSHI.map((l, i) => (
            <LaoshiCard key={l.name} laoshi={l} index={i} />
          ))}
        </div>

        <BlurFade delay={0.4}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs italic text-muted">
            Foto Laoshi segera dipasang — placeholder sementara.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

function LaoshiCard({
  laoshi,
  index
}: {
  laoshi: { name: string; cred: string; spec: string; flag: string; years: number };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { style } = useProximityLift(ref, 220, 3);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      style={style}
      className="group relative"
    >
      {/* AnimatedPin top tag — appears on hover */}
      <span className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-2 items-center gap-1 rounded-full bg-sage px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white opacity-0 shadow-md transition-all duration-300 group-hover:-translate-y-4 group-hover:opacity-100">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright" />
        Available slot
      </span>

      <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-soft transition-shadow group-hover:shadow-soft-lg">
        {/* portrait area */}
        <div
          className="relative h-[60%] overflow-hidden"
          style={{ background: "linear-gradient(155deg, #8FAE6D 0%, #4A6B3A 100%)" }}
        >
          {/* silhouette */}
          <motion.svg
            viewBox="0 0 200 240"
            className="absolute inset-x-0 bottom-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
            preserveAspectRatio="xMidYEnd meet"
          >
            <defs>
              <linearGradient id={`sil${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="92" r="42" fill={`url(#sil${index})`} />
            <path d="M30 240 Q100 130 170 240 Z" fill={`url(#sil${index})`} />
          </motion.svg>
          <span className="absolute bottom-2 left-3 text-[10px] font-medium text-white/70">
            Foto segera dipasang
          </span>
          <span className="absolute right-3 top-3 text-2xl">{laoshi.flag}</span>
        </div>

        {/* info area */}
        <div className="relative flex h-[40%] flex-col justify-between p-4">
          <div>
            <div className="font-display text-lg font-black text-ink-deep">{laoshi.name}</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
              {laoshi.cred}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" />
              {laoshi.spec}
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="rounded-full bg-sage/10 px-2 py-0.5 font-bold uppercase tracking-[0.18em] text-sage">
              {laoshi.years} tahun
            </span>
          </div>
        </div>

        {/* shadow under pin */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-forest/20 blur-md opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </motion.div>
  );
}
