"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Gift, Sparkles, Star, Crown } from "lucide-react";
import { BonusCard } from "./bonus-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";

const BONUSES = [
  {
    title: "All Levels Pass HSK 1-6",
    sub: "Materi self-study lengkap dari HSK 1 sampai HSK 6.",
    normal: 369000,
    featured: false
  },
  {
    title: "3 bulan Huahua AI Laoshi Premium",
    sub: "Satu-satunya AI Mandarin yang bisa nilai pengucapan kamu seperti Laoshi beneran, bukan cuma jawab teks seperti ChatGPT, DeepSeek, atau Claude.",
    normal: 499000,
    featured: true
  },
  {
    title: "Akses 1000+ video vocab HSK 3.0",
    sub: "Tiap kata Mandarin dijelaskan dalam video singkat dengan contoh kalimat.",
    normal: null,
    featured: false,
    badge: "1000+ video"
  }
];

const MICRO_ICONS = [CheckCircle2, Gift, Sparkles, Star, Crown, CheckCircle2, Gift, Sparkles, Star, Crown];

export function BonusStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        startVelocity: 32,
        origin: { y: 0.4 },
        colors: ["#8FAE6D", "#4A6B3A", "#F6E3A1", "#FFD700"]
      });
    }, 600);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section
      id="bonus"
      ref={ref}
      className="relative overflow-hidden bg-cream py-32"
      style={{ backgroundImage: "radial-gradient(120% 60% at 50% 0%, rgba(246,227,161,0.18), transparent 60%)" }}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <BlurFade>
            <div
              className="inline-block rounded-full bg-gold-bright/30 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-ink-deep shadow-soft"
              style={{ transform: "rotate(-2deg)" }}
            >
              Bonus stack · gratis
            </div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="mt-6 font-display text-3xl font-black text-ink-deep md:text-4xl">Total nilai bonus</h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div className="relative mt-4">
              <div
                className="font-display font-black tracking-tight leading-none"
                style={{ fontSize: "clamp(80px, 12vw, 180px)" }}
              >
                <AuroraText speed={1.4}>
                  Rp <NumberTicker value={2868000} />
                </AuroraText>
              </div>
              <div className="pointer-events-none absolute -inset-x-10 -bottom-4 h-10 rounded-full bg-gold/40 blur-3xl" />
            </div>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="mt-4 text-lg text-muted">Termasuk gratis di semua paket tutoring privat.</p>
          </BlurFade>
        </div>

        <div className="mt-20 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {BONUSES.map((b, i) => (
            <BonusCard key={i} index={i} {...b} />
          ))}
        </div>

        {/* micro-icons marquee */}
        <div className="relative mt-16 overflow-hidden">
          <div className="flex animate-marquee gap-10 whitespace-nowrap [--duration:32s]" style={{ width: "max-content" }}>
            {[...MICRO_ICONS, ...MICRO_ICONS].map((Icon, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                <Icon className="h-4 w-4 text-sage" />
                <span>Termasuk gratis</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent" />
        </div>

        <BlurFade delay={0.4}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">
            Total bonus: <span className="font-semibold text-forest">Rp 868.000+</span> — gratis di semua paket privat.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
