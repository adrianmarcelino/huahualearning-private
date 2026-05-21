"use client";

import { motion } from "framer-motion";
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
    <section id="pricing" className="relative bg-cream py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header — clean centered, NO lamp gradient block */}
        <div className="relative mx-auto max-w-2xl text-center">
          {/* subtle sage glow halo behind heading (not a solid block) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-10 -z-10 mx-auto h-32 max-w-md rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(143,174,109,0.30), transparent 70%)" }}
          />
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">💰 PAKET & HARGA</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Paket & Harga
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/70 md:text-lg">
            Pilih paket yang paling cocok buat targetmu. Semua paket sudah termasuk <span className="font-semibold text-forest">BONUS Modul &amp; AI Laoshi senilai Rp 667.000</span>.
          </p>
        </div>

        <div className="mt-12">
          <PackBlock heading="📘 Materi Buku HSK" groups={SUB1} />
          <div className="my-12 h-px w-full bg-sage/20" />
          <PackBlock heading="🎯 Materi Request (Bisnis, Traveling, Conversation)" groups={SUB2} />

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-sage/15 bg-white p-6 text-center md:p-8">
            <p className="text-base font-medium text-ink-deep">
              ✨ 60 menit/sesi · Min. 1x seminggu · Tanpa batas waktu
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              💡 Pro tip: Ajak temen/keluarga belajar bareng. Harga grup makin worth it dibagi rata.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Harga grup dibagi 2 orang (kasus paling mahal per orang) → "≈ Rp 1,5jt".
function perPerson(total: number) {
  const jt = (total / 2 / 1_000_000).toFixed(1).replace(".", ",");
  return `Rp ${jt}jt`;
}

// Harga normal (coret) = harga akhir × 1.4 — rumus sama persis dengan /pay-private.
function getCrossed(price: number) {
  return Math.round(price * 1.4);
}

function PackBlock({ heading, groups }: { heading: string; groups: Group[] }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h3 className="font-display text-2xl font-bold tracking-tight text-ink-deep md:text-3xl">{heading}</h3>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-sage/15 bg-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-sage">{g.title}</div>
            {g.subtitle && <p className="mt-1 text-xs text-muted">{g.subtitle}</p>}
            <div className="mt-5 space-y-3">
              {g.packs.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.06 }}
                  className={
                    "flex items-center justify-between rounded-xl border px-4 py-4 " +
                    (p.featured
                      ? "border-2 border-gold-bright bg-gold/10"
                      : "border-sage/15 bg-cream/40")
                  }
                >
                  <span className="text-sm font-semibold text-ink-deep md:text-base">{p.label}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-muted line-through">
                      {formatRupiah(getCrossed(p.price))}
                    </span>
                    <span className="font-display text-lg font-bold text-forest md:text-xl">
                      {formatRupiah(p.price)}
                    </span>
                    {g.title === "Grup" && (
                      <span className="mt-0.5 text-xs text-muted">
                        ≈ {perPerson(p.price)}/orang kalau berdua
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
