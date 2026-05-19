"use client";

// Bonus — Tracing Beam left rail + 3 bonus cards + total NumberTicker.

import { TracingBeam } from "@/components/ui/tracing-beam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Highlight } from "@/components/ui/hero-highlight";
import { NumberTicker } from "@/components/ui/number-ticker";
import { formatRupiah } from "@/lib/utils";

const BONUSES = [
  { emoji: "🎁", title: "Modul HSK 1–6", duration: "akses selamanya", normal: 369000 },
  { emoji: "🎁", title: "AI Laoshi Basic", duration: "1 tahun", normal: 99000 },
  { emoji: "🎁", title: "AI Laoshi Premium", duration: "1 bulan", normal: 199000 }
];

export function Bonus() {
  return (
    <section id="bonus" className="relative overflow-hidden bg-cream-2 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Bonus stack</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="Setiap Paket **Auto Dapet:**" />
          </h2>
        </div>

        <TracingBeam className="mt-12">
          <div className="mx-auto max-w-2xl space-y-6 pl-6 md:pl-0">
            {BONUSES.map((b, i) => (
              <div
                key={i}
                className="relative rounded-3xl border border-sage/15 bg-white p-6 shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{b.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-black text-ink-deep md:text-2xl">{b.title}</h3>
                    <p className="mt-1 text-sm text-ink/70">{b.duration}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted line-through">Normal {formatRupiah(b.normal)}</span>
                  <span className="rounded-full bg-sage px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-cream">
                    GRATIS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <div className="font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 48px)" }}>
            Total bonus:{" "}
            <Highlight>
              Rp <NumberTicker value={667000} duration={1.6} />
            </Highlight>{" "}
            — GRATIS
          </div>
          <p className="mt-4 text-sm text-ink/70 md:text-base">
            ➕ Bonus tambahan: Materi ajar & rekaman kelas
          </p>
          <a
            href="#cta"
            className="mt-7 inline-flex h-14 min-h-[48px] items-center gap-2 rounded-full bg-sage px-8 text-base font-semibold text-cream shadow-soft hover:bg-sage-dark"
          >
            Daftar & Klaim Bonus →
          </a>
        </div>
      </div>
    </section>
  );
}
