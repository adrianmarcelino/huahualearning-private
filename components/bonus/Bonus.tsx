"use client";

// Bonus stack — Tracing Beam (10) down the left, Aurora Background (2) behind, 3 bonus cards.

import { TracingBeam } from "@/components/ui/tracing-beam";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Highlight } from "@/components/ui/hero-highlight";
import { NumberTicker } from "@/components/ui/number-ticker";
import { CheckCircle2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

const BONUSES = [
  {
    title: "All Levels Pass HSK 1-6",
    body: "Materi self-study lengkap HSK 1 sampai HSK 6.",
    normal: 369000
  },
  {
    title: "3 bulan Huahua AI Laoshi Premium",
    body:
      "Satu-satunya AI Mandarin yang bisa nilai pengucapan kamu seperti Laoshi beneran, bukan cuma jawab teks seperti ChatGPT, DeepSeek, atau Claude.",
    normal: 499000,
    featured: true
  },
  {
    title: "Akses 1000+ video vocab HSK 3.0",
    body: "Tiap kata Mandarin dijelaskan dalam video singkat dengan contoh kalimat.",
    normal: null,
    badge: "1000+ video"
  }
];

export function Bonus() {
  return (
    <section id="bonus" className="relative overflow-hidden bg-cream py-16 md:py-24 lg:py-32">
      <AuroraBackground className="absolute inset-0 opacity-60 -z-10" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block rotate-[-2deg] rounded-full bg-gold-bright/30 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-ink-deep shadow-soft">
            Bonus stack · gratis
          </div>
          <h2 className="mt-4 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="Total nilai bonus" />
          </h2>
          <div className="mt-3 inline-block">
            <Highlight className="font-display font-black text-ink-deep">
              Rp <NumberTicker value={2868000} />
            </Highlight>
          </div>
          <p className="mt-3 text-base text-muted md:text-lg">Termasuk gratis di semua paket privat.</p>
        </div>

        <TracingBeam className="mt-12">
          <div className="mx-auto max-w-2xl space-y-6 pl-6 md:pl-0">
            {BONUSES.map((b, i) => (
              <div
                key={i}
                className={
                  "relative rounded-3xl border bg-white p-6 shadow-soft transition-all " +
                  (b.featured ? "border-2 border-gold-bright/70 lg:scale-[1.02]" : "border-sage/15")
                }
              >
                {b.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-bright px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-ink-deep shadow-md">
                    ★ Hook
                  </span>
                )}
                <div className="text-[10px] font-bold uppercase tracking-widest text-sage">
                  Bonus {i + 1}
                </div>
                <h3 className="mt-1 font-display text-xl font-black text-ink-deep md:text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{b.body}</p>
                <div className="mt-5 flex items-center justify-between">
                  {b.normal !== null ? (
                    <span className="text-xs text-muted line-through">Normal {formatRupiah(b.normal)}</span>
                  ) : (
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">{b.badge}</span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-cream">
                    <CheckCircle2 className="h-3 w-3" /> Gratis
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
