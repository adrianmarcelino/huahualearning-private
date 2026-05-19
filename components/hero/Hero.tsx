"use client";

// Hero section — combines:
//   - Background Boxes (component 1)
//   - Aurora Background (component 2)
//   - Spotlight (component 15)
//   - Text Generate Effect (component 3)
//   - Lottie Panda (component 16)

import { Boxes } from "@/components/ui/background-boxes";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { LottiePanda } from "@/components/ui/lottie-panda";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero({ variant }: { variant: "A" | "B" }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28">
      <AuroraBackground className="absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]">
        <Boxes />
      </div>
      <SpotlightNew />

      <div className="container relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-forest backdrop-blur">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-sage" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-sage" />
          </span>
          LES MANDARIN PRIVAT 1-on-1
        </div>

        <h1 className="font-display font-black leading-[1.05] tracking-tight text-ink-deep" style={{ fontSize: "clamp(32px, 8vw, 64px)" }}>
          <TextGenerateEffect words="Belajar Mandarin privat bareng **Laoshi** profesional" />
        </h1>

        <p className="mt-5 mx-auto max-w-xl text-ink/70" style={{ fontSize: "clamp(15px, 4vw, 18px)" }}>
          Kurikulum disesuaikan tujuanmu. Bonus stack senilai{" "}
          <span className="font-semibold text-forest">Rp 868.000+</span> termasuk gratis.
        </p>

        {/* Lottie panda — top-right of headline on desktop, centered above CTAs on mobile */}
        <div className="mx-auto mt-6 h-32 w-32 md:absolute md:right-2 md:top-24 md:h-40 md:w-40">
          <LottiePanda />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#cta"
            className="inline-flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-full bg-sage px-7 text-base font-semibold text-cream shadow-soft hover:bg-sage-dark"
          >
            {variant === "B" ? "Reveal harga" : "Isi form 30 detik"}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#cara-kerja"
            className="inline-flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-full border border-sage/40 bg-white px-7 text-base font-medium text-ink-deep shadow-soft hover:shadow-soft-lg"
          >
            Lihat cara kerja
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            500+ siswa aktif
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Native Laoshi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Garansi 7 hari
          </span>
        </div>
      </div>
    </section>
  );
}
