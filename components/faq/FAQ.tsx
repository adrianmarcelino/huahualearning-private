"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const ITEMS = [
  { q: "Gak bisa hadir di jadwal?", a: "Reschedule max H-24 jam. Kurang dari itu = hangus 1 sesi." },
  { q: "Bisa ganti laoshi?", a: "Bisa. Habis kelas pertama, kalau gak cocok, request ganti." },
  { q: "Kelasnya dimana?", a: "Google Meet, akan dikasih linknya." },
  { q: "Pemula total cocok gak?", a: "Cocok banget. Dibimbing dari nada, pelafalan, sampai bisa conversation." },
  { q: "Berapa lama per sesi?", a: "60 menit (bisa request lebih panjang/pendek)." }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-cream-2 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">FAQ</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="FAQ" />
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-sage/15 bg-white shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full min-h-[56px] items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-deep"
                >
                  {it.q}
                  <ChevronDown
                    className={"h-5 w-5 shrink-0 text-sage transition-transform " + (isOpen ? "rotate-180" : "")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-4 text-sm text-ink/80">{it.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
