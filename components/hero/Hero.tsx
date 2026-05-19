"use client";

// Hero v6 — clean restrained look. Background Boxes + Aurora restricted to
// hero only (~15-20% opacity). Headline sized down. Plus Jakarta Sans body.
// Fraunces italic on "Dalam hitungan bulan." line only.

import { Boxes } from "@/components/ui/background-boxes";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import { ArrowRight, Check } from "lucide-react";

export function Hero({ variant }: { variant: "A" | "B" }) {
  const ctaLabel = variant === "B" ? "Reveal Harga" : "Daftar Sekarang";
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cream px-4 pt-28">
      <AuroraBackground className="absolute inset-0 -z-10 opacity-50" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]">
        <Boxes />
      </div>
      <SpotlightNew />

      <div className="container relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sage backdrop-blur">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-sage" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-sage" />
          </span>
          LES MANDARIN PRIVAT 1-ON-1
        </div>

        <h1 className="font-display font-bold tracking-tight text-ink-deep text-4xl leading-[1.15] md:text-5xl lg:text-6xl">
          Dari Cuman Bisa{" "}
          <span className="bg-gradient-to-r from-sage via-forest to-sage bg-clip-text text-transparent">
            "你好"
          </span>{" "}
          Sampai Lancar Conversation.
        </h1>

        <p className="mt-4 font-serif italic font-normal text-forest text-lg md:text-xl">
          Dalam hitungan bulan.
        </p>

        <p className="mt-5 mx-auto max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
          Private class bareng laoshi, jadwal kamu yang atur
        </p>

        <ul className="mx-auto mt-7 max-w-md space-y-2.5 text-left">
          {[
            "Bebas request materi — HSK, bisnis, traveling, conversation",
            "Laoshi bersertifikat & berpengalaman",
            "Bonus modul & AI Laoshi GRATIS"
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[15px] font-medium text-ink-deep">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href="#cta"
            className="inline-flex h-14 min-h-[48px] items-center justify-center gap-2 rounded-full bg-sage px-8 text-base font-semibold text-cream transition-colors hover:bg-sage-dark"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="text-gold-bright text-base">★★★★★</span>
            <span>500+ murid · Level 0 sampai HSK 5</span>
          </div>
        </div>
      </div>
    </section>
  );
}
