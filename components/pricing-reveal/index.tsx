"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Meteors } from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";

const TIERS = [
  { size: 1, total: 2250000, perPerson: 2250000, perks: "Full bonus stack" },
  { size: 2, total: 2999000, perPerson: 1499500, perks: "Tiap orang: 2 bulan Premium" },
  { size: 3, total: 2999001, perPerson: 999667, perks: "Tiap orang: 1 bulan Premium" },
  { size: 4, total: 2999000, perPerson: 749750, perks: "Slot terbatas" },
  { size: 5, total: 2999000, perPerson: 599800, perks: "Termurah per orang" }
];

const MIDTRANS_BASE = "https://huahualearning.com";

export function PricingReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);
  const [picked, setPicked] = useState(0);

  useEffect(() => {
    if (!inView) return;
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
    return () => clearInterval(id);
  }, [inView]);

  const tier = TIERS[picked];

  return (
    <section id="cta" ref={ref} className="relative overflow-hidden bg-ink py-32 text-cream">
      <Meteors number={20} />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">Tutoring privat</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">Harganya?</h2>

          <div className="mt-10 h-40 md:h-56">
            {!reveal && count !== null && (
              <motion.div
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="font-display text-7xl font-black text-gold md:text-9xl"
              >
                {count}
              </motion.div>
            )}
            {reveal && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0, y: 30 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  x: [0, -8, 8, -6, 6, -3, 3, 0]
                }}
                transition={{ scale: { type: "spring", stiffness: 220, damping: 12 }, x: { delay: 0.4, duration: 0.5 } }}
                className="font-display text-5xl font-black md:text-7xl"
              >
                Mulai {formatRupiah(tier.perPerson)}
                <span className="block text-base font-medium text-cream/70">
                  / orang ({tier.size} orang — total {formatRupiah(tier.total)})
                </span>
              </motion.div>
            )}
          </div>

          {reveal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-5"
            >
              {TIERS.map((t, i) => (
                <button
                  key={t.size}
                  onClick={() => setPicked(i)}
                  className={
                    "rounded-2xl border px-3 py-4 text-left transition " +
                    (i === picked
                      ? "border-gold bg-gold/15"
                      : "border-cream/15 hover:border-gold/60 hover:bg-cream/5")
                  }
                >
                  <div className="text-xs uppercase tracking-widest text-gold">{t.size} orang</div>
                  <div className="mt-1 font-display text-xl font-bold">{formatRupiah(t.perPerson)}</div>
                  <div className="mt-1 text-[11px] text-cream/60">{t.perks}</div>
                </button>
              ))}
            </motion.div>
          )}

          {reveal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <a
                href={`${MIDTRANS_BASE}/pay-private?size=${tier.size}&total=${tier.total}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="gold" size="lg">Bayar sekarang →</Button>
              </a>
              <a href="https://wa.me/6281939304002" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="border-cream/30 bg-transparent text-cream hover:bg-cream/10">
                  Tanya dulu via WA
                </Button>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
