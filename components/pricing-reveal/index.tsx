"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ArrowRight } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { formatRupiah } from "@/lib/utils";
import { useAppState } from "@/lib/state-context";

const TIERS = [
  { size: 1, total: 2250000, perPerson: 2250000, perks: "Full bonus stack" },
  { size: 2, total: 2999000, perPerson: 1499500, perks: "Tiap orang: 2 bln Premium" },
  { size: 3, total: 2999001, perPerson: 999667, perks: "Tiap orang: 1 bln Premium" },
  { size: 4, total: 2999000, perPerson: 749750, perks: "Slot terbatas" },
  { size: 5, total: 2999000, perPerson: 599800, perks: "Termurah / orang" }
];

const PAY_URL = "https://www.huahualearning.com/pay-private-1";

export function PricingReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { setMascotPose } = useAppState();

  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);
  const [picked, setPicked] = useState(0);
  const [goldFlash, setGoldFlash] = useState(false);

  const tier = TIERS[picked];

  const startCountdown = () => {
    setOpened(true);
    let i = 3;
    setCount(i);
    const id = setInterval(() => {
      i -= 1;
      if (i <= 0) {
        setCount(null);
        setReveal(true);
        clearInterval(id);
      } else {
        setCount(i);
      }
    }, 700);
  };

  useEffect(() => {
    if (!reveal) return;
    // STATE 9 — cheer mascot + gold screen flash + confetti
    setMascotPose("cheer", 3000);
    setGoldFlash(true);
    const off = setTimeout(() => setGoldFlash(false), 400);
    confetti({
      particleCount: 220,
      spread: 110,
      startVelocity: 40,
      origin: { y: 0.55 },
      colors: ["#8FAE6D", "#4A6B3A", "#F6E3A1", "#FFD700"]
    });
    return () => clearTimeout(off);
  }, [reveal, setMascotPose]);

  return (
    <section id="cta" ref={ref} className="relative overflow-hidden bg-ink-deep py-32 text-cream">
      {/* STATE 9 gold flash overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: goldFlash ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 z-30 bg-gold-bright"
        aria-hidden
      />
      <Meteors number={26} />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(255,215,0,0.12) 0%, transparent 60%)"
        }}
      />
      <div className="container relative mx-auto max-w-4xl px-4">
        <div className="text-center">
          <BlurFade>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">Tutoring privat</div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Harganya?</h2>
          </BlurFade>
        </div>

        {/* Pre-reveal gate */}
        <AnimatePresence mode="wait">
          {!opened && (
            <motion.div
              key="gate"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="mx-auto mt-16 max-w-xl text-center"
            >
              <p className="text-2xl font-medium text-cream/80 md:text-3xl">Yakin mau lihat harga?</p>
              <p className="mt-3 text-cream/60">Bonus stack senilai Rp 868.000+ tetap included.</p>
              <div className="mt-8 flex justify-center">
                <ShimmerButton
                  onClick={startCountdown}
                  background="linear-gradient(120deg,#FFD700,#F6E3A1)"
                  shimmerColor="#FFFFFF"
                  className="h-14 px-8 text-base font-black"
                  style={{ color: "#2C2A26" }}
                >
                  Reveal harga
                  <ArrowRight className="h-4 w-4" />
                </ShimmerButton>
              </div>
            </motion.div>
          )}

          {opened && !reveal && count !== null && (
            <motion.div
              key={`c-${count}`}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{
                scale: 1.2,
                opacity: 1,
                x: [0, -10, 10, -6, 6, 0]
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16 text-center font-display text-7xl font-black text-gold-bright md:text-9xl"
            >
              {count}
            </motion.div>
          )}

          {reveal && (
            <motion.div
              key="price"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-16 text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1, x: [0, -10, 10, -6, 6, -3, 3, 0] }}
                transition={{ scale: { type: "spring", stiffness: 220, damping: 12 }, x: { delay: 0.3, duration: 0.6 } }}
                className="relative font-display font-black leading-none"
                style={{ fontSize: "clamp(72px, 11vw, 160px)" }}
              >
                {/* sage glow pulse 3s */}
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0.6, 0] }}
                  transition={{ duration: 3, times: [0, 0.1, 0.85, 1] }}
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-full"
                  style={{ background: "radial-gradient(closest-side, rgba(143,174,109,0.55), transparent 70%)" }}
                />
                <AuroraText colors={["#FFD700", "#F6E3A1", "#FFD700"]} speed={1.6}>
                  Rp <NumberTicker value={tier.perPerson} duration={1.4} />
                </AuroraText>
              </motion.div>
              <p className="mt-4 text-lg text-cream/80">
                untuk <span className="font-black text-gold-bright">{tier.size} orang</span>.{" "}
                <span className="text-cream/60">Bonus stack Rp 868.000+ included.</span>
              </p>

              {/* Tier picker — crossed-out alt prices */}
              <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-5">
                {TIERS.map((t, i) => (
                  <button
                    key={t.size}
                    onClick={() => setPicked(i)}
                    className={
                      "rounded-2xl border px-3 py-4 text-left transition " +
                      (i === picked
                        ? "border-gold-bright bg-gold/10 shadow-[0_0_24px_rgba(255,215,0,0.25)]"
                        : "border-cream/15 hover:border-gold-bright/60 hover:bg-cream/5")
                    }
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
                      {t.size} orang
                    </div>
                    <div className="mt-1 font-display text-lg font-black">{formatRupiah(t.perPerson)}</div>
                    <div className="mt-1 text-[11px] text-cream/60">{t.perks}</div>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={PAY_URL} target="_blank" rel="noreferrer">
                  <ShimmerButton
                    background="linear-gradient(120deg,#FFD700,#F6E3A1)"
                    shimmerColor="#FFFFFF"
                    className="h-14 px-8 text-base font-black"
                    style={{ color: "#2C2A26" }}
                  >
                    Bayar dengan Midtrans →
                  </ShimmerButton>
                </a>
                <a
                  href="https://wa.me/6281939304002"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center rounded-full border border-cream/30 bg-transparent px-7 font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Tanya dulu via WA
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
