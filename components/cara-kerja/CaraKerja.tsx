"use client";

// Cara Kerja — 3-step Sticky Scroll Reveal copy update.

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ClipboardList, CreditCard, MessageCircle } from "lucide-react";

const STEPS = [
  {
    title: "Isi form & pilih paket",
    description: "Tentukan tujuan belajarmu, level sekarang, dan paket yang paling cocok. Form cuma 30 detik."
  },
  {
    title: "Bayar",
    description: "Transfer / Midtrans. Setelah masuk, langsung di-WA tim kami."
  },
  {
    title: "Kita WA buat atur jadwal & laoshi",
    description: "Sebut hari + jam yang cocok, kami matchin laoshi yang paling pas. Kelas pertama bisa minggu ini juga."
  }
];

const ICONS = [ClipboardList, CreditCard, MessageCircle];

export function CaraKerja() {
  return (
    <section id="cara-kerja" className="relative bg-cream py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 mb-10 text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Cara kerja</div>
        <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
          <TextGenerateEffect words="Cara Kerja" />
        </h2>
      </div>

      <div className="container mx-auto px-4">
        <StickyScroll
          content={STEPS.map((s, i) => {
            const Icon = ICONS[i];
            return {
              title: s.title,
              description: s.description,
              content: (
                <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-sage to-forest text-white">
                  <Icon className="h-24 w-24" strokeWidth={1.2} />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold tracking-widest opacity-80">
                    STEP 0{i + 1}
                  </span>
                </div>
              )
            };
          })}
        />
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-base font-semibold text-forest md:text-lg">
        Kelas pertama bisa minggu ini juga.
      </p>
    </section>
  );
}
