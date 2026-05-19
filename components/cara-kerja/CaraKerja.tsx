"use client";

// Cara Kerja — uses Sticky Scroll Reveal (component 8) and Container Scroll Animation (component 4).

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PhoneChat } from "@/components/phone-mockup/PhoneChat";

const STEPS = [
  {
    title: "Kirim Suara",
    description: "Ucapkan kata atau kalimat Mandarin di WhatsApp. Laoshi AI dengerin langsung — bukan baca teks."
  },
  {
    title: "Dinilai per Nada",
    description: "Skor pelafalan tiap karakter dan tiap nada (Tone 1-4). Tahu persis nada mana yang masih meleset."
  },
  {
    title: "Koreksi Spesifik",
    description: "Feedback yang bisa langsung diulang. Plus contoh audio buat dibandingin. Tiap minggu Laoshi manusia recap progress kamu."
  }
];

export function CaraKerja() {
  return (
    <section id="cara-kerja" className="relative bg-cream py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 mb-10 text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Cara kerja</div>
        <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(32px, 7vw, 52px)" }}>
          <TextGenerateEffect words="Belajar di WhatsApp yang **sama** yang sudah kamu pakai" />
        </h2>
      </div>

      {/* Container Scroll Animation centerpiece */}
      <ContainerScroll
        titleComponent={
          <h2 className="font-display font-black text-ink-deep" style={{ fontSize: "clamp(20px, 5vw, 32px)" }}>
            Scroll buat lihat <span className="text-forest">Laoshi AI</span> jawab pengucapanmu →
          </h2>
        }
      >
        <PhoneChat />
      </ContainerScroll>

      {/* Sticky scroll reveal — text on left, phone visual sticks on right (desktop only). Mobile gets sequential stack. */}
      <div className="container mx-auto px-4 mt-8">
        <StickyScroll
          content={STEPS.map((s) => ({
            title: s.title,
            description: s.description,
            content: <PhoneChat compact />
          }))}
        />
      </div>
    </section>
  );
}
