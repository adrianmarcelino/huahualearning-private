"use client";

// v6 FIX: drop AnimatePresence + height auto (collapse was flaking for items
// 2-5 on mobile builds). Each item now uses native CSS max-height + opacity
// transition. All Q&A always in DOM, just visually collapsed.

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { q: "Gak bisa hadir di jadwal?", a: "Reschedule max H-24 jam. Kurang dari itu = hangus 1 sesi." },
  { q: "Bisa ganti laoshi?", a: "Bisa. Habis kelas pertama, kalau gak cocok, request ganti." },
  { q: "Kelasnya dimana?", a: "Google Meet, akan dikasih linknya." },
  { q: "Pemula total cocok gak?", a: "Cocok banget. Dibimbing dari nada, pelafalan, sampai bisa conversation." },
  { q: "Berapa lama per sesi?", a: "60 menit (bisa request lebih panjang/pendek)." }
];

export function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="faq" className="relative bg-cream py-20 md:py-28">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">❓ FAQ</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            FAQ
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {ITEMS.map((it, i) => {
            const isOpen = open.has(i);
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-sage/15 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full min-h-[56px] items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-deep"
                >
                  <span>{it.q}</span>
                  <ChevronDown
                    className={cn("h-5 w-5 shrink-0 text-sage transition-transform duration-300", isOpen && "rotate-180")}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-5 pb-5 text-sm leading-relaxed text-ink/80">{it.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
