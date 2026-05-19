"use client";

// Pricing — Lamp Effect header + 4 card groups (HSK 1-on-1, HSK Grup, Request 1-on-1, Request Grup).

import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { formatRupiah } from "@/lib/utils";

type Pack = { label: string; price: number; featured?: boolean };
type Group = { title: string; subtitle?: string; packs: Pack[] };

const SUB1: Group[] = [
  {
    title: "1-on-1",
    packs: [
      { label: "8 sesi", price: 2250000 },
      { label: "16 sesi ⭐", price: 4350000, featured: true }
    ]
  },
  {
    title: "Grup",
    subtitle: "2+ orang — harga sama mau berdua, bertiga, atau lebih",
    packs: [
      { label: "8 sesi", price: 2999000 },
      { label: "16 sesi", price: 4999000 }
    ]
  }
];

const SUB2: Group[] = [
  {
    title: "1-on-1",
    packs: [
      { label: "8 sesi", price: 2450000 },
      { label: "16 sesi ⭐", price: 4550000, featured: true }
    ]
  },
  {
    title: "Grup",
    subtitle: "2+ orang — bebas berapa pun",
    packs: [
      { label: "8 sesi", price: 3299000 },
      { label: "16 sesi", price: 5299000 }
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-cream">
      <LampContainer className="!min-h-[360px]">
        <h2
          className="text-center font-display font-black text-ink-deep"
          style={{ fontSize: "clamp(28px, 7vw, 48px)" }}
        >
          Paket & Harga
        </h2>
      </LampContainer>

      <div className="container mx-auto -mt-28 px-4 pb-16 md:pb-24 lg:pb-32">
        <PackBlock heading="📘 Materi Buku HSK" groups={SUB1} />
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
        <PackBlock heading="🎯 Materi Request (Bisnis, Traveling, Conversation)" groups={SUB2} />

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-sage/15 bg-white p-6 text-center shadow-soft md:p-8">
          <p className="text-base font-medium text-ink-deep">
            ✨ 60 menit/sesi · Min. 1x seminggu · Tanpa batas waktu
          </p>
          <p className="mt-3 text-sm text-ink/70">
            💡 Pro tip: Ajak temen/keluarga belajar bareng. Harga grup makin worth it dibagi rata.
          </p>
        </div>
      </div>
    </section>
  );
}

function PackBlock({ heading, groups }: { heading: string; groups: Group[] }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h3 className="font-display text-2xl font-black text-ink-deep md:text-3xl">{heading}</h3>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} className="rounded-3xl border border-sage/15 bg-white p-6 shadow-soft">
            <div className="text-xs font-bold uppercase tracking-widest text-sage">{g.title}</div>
            {g.subtitle && <p className="mt-1 text-xs text-muted">{g.subtitle}</p>}
            <div className="mt-5 space-y-3">
              {g.packs.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                  className={
                    "flex items-center justify-between rounded-2xl border px-4 py-4 " +
                    (p.featured
                      ? "border-2 border-gold-bright bg-gradient-to-br from-gold/15 to-transparent shadow-[0_0_24px_rgba(255,215,0,0.15)]"
                      : "border-sage/20 bg-cream/40")
                  }
                >
                  <span className="text-sm font-semibold text-ink-deep md:text-base">{p.label}</span>
                  <span className="font-display text-lg font-black text-forest md:text-xl">
                    {formatRupiah(p.price)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
