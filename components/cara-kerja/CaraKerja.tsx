"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
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
    <section id="cara-kerja" className="relative bg-cream-2 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">📝 3 LANGKAH</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Cara Kerja
          </h2>
        </div>

        <div className="mt-12">
          <StickyScroll
            content={STEPS.map((s, i) => {
              const Icon = ICONS[i];
              return {
                title: s.title,
                description: s.description,
                content: (
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-sage to-forest text-white">
                    <Icon className="h-24 w-24" strokeWidth={1.2} />
                    <span className="absolute bottom-3 left-3 text-xs font-bold tracking-widest opacity-80">
                      STEP 0{i + 1}
                    </span>
                  </div>
                )
              };
            })}
          />
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-base font-semibold text-forest md:text-lg">
          Kelas pertama bisa minggu ini juga.
        </p>
      </div>
    </section>
  );
}
