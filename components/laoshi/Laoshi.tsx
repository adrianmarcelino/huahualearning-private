"use client";

// Laoshi cards — Background Lines (13) behind, 4 cards stacked mobile / 2x2 tablet+.

import { BackgroundLines } from "@/components/ui/background-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const LAOSHI = [
  { name: "Laoshi Mei", cred: "HSK 6 Native", spec: "Conversation · HSK 1-3", flag: "🇨🇳", years: 6 },
  { name: "Laoshi Wei", cred: "Native + MBA", spec: "Bisnis · Supplier China", flag: "🇨🇳", years: 8 },
  { name: "Laoshi Ling", cred: "HSK Tutor", spec: "HSK 4-5 · Persiapan ujian", flag: "🇹🇼", years: 5 },
  { name: "Laoshi Han", cred: "BA Sastra Mandarin", spec: "HSK 6 · Kuliah/beasiswa", flag: "🇨🇳", years: 9 }
];

export function Laoshi() {
  return (
    <section id="laoshi" className="relative overflow-hidden bg-cream py-16 md:py-24 lg:py-32">
      <BackgroundLines />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Laoshi</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="Native speaker + **pengalaman** ngajar siswa Indonesia" />
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LAOSHI.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-soft"
            >
              <div className="relative h-48 overflow-hidden" style={{ background: "linear-gradient(155deg, #8FAE6D 0%, #4A6B3A 100%)" }}>
                <svg viewBox="0 0 200 240" className="absolute inset-x-0 bottom-0 h-full w-full" preserveAspectRatio="xMidYEnd meet">
                  <circle cx="100" cy="92" r="42" fill="rgba(255,255,255,0.42)" />
                  <path d="M30 240 Q100 130 170 240 Z" fill="rgba(255,255,255,0.25)" />
                </svg>
                <span className="absolute right-3 top-3 text-2xl">{l.flag}</span>
                <span className="absolute bottom-2 left-3 text-[10px] text-white/80">Foto segera dipasang</span>
              </div>
              <div className="p-4">
                <div className="font-display text-lg font-black text-ink-deep">{l.name}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">{l.cred}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3" /> {l.spec}
                </div>
                <span className="mt-3 inline-block rounded-full bg-sage/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sage">
                  {l.years} tahun
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
