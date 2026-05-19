"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { BonusCard } from "./bonus-card";
import { NumberTicker } from "@/components/ui/number-ticker";

const BONUSES = [
  {
    title: "All Levels Pass HSK 1-6",
    sub: "Materi self-study lengkap dari HSK 1 sampai HSK 6.",
    normal: 369000,
    side: "left" as const
  },
  {
    title: "3 bulan Huahua AI Laoshi Premium",
    sub: "Satu-satunya AI Mandarin yang bisa nilai pengucapan kamu seperti Laoshi beneran, bukan cuma jawab teks seperti ChatGPT, DeepSeek, atau Claude.",
    normal: 499000,
    side: "right" as const,
    highlight: true
  },
  {
    title: "Akses 1000+ video vocab HSK 3.0",
    sub: "Tiap kata Mandarin dijelaskan dalam video singkat lengkap dengan contoh kalimat.",
    normal: null,
    side: "left" as const,
    badge: "1000+ video"
  }
];

export function BonusStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#8FAE6D", "#F6E3A1", "#FBF4EA"]
      });
    }, 600);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section id="bonus" ref={ref} className="relative bg-gradient-to-b from-cream via-cream to-cream/40 py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink">
            Bonus stack — gratis
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold text-ink md:text-5xl">
            Total nilai bonus
          </h2>
          <div className="mt-4 font-display text-6xl font-black text-sage md:text-8xl">
            Rp <NumberTicker value={2868000} />
          </div>
          <p className="mt-4 text-lg text-ink/70">Termasuk gratis di semua paket tutoring privat.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BONUSES.map((b, i) => (
            <BonusCard key={i} index={i} {...b} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink/60">
          Total bonus: Rp 868.000+ — termasuk gratis di semua paket privat.
        </p>
      </div>
    </section>
  );
}
