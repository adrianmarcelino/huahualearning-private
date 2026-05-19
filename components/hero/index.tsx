"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AuroraBlob } from "./aurora-blob";
import { Watermark } from "./watermark";
import { OrbitField } from "./orbit-field";
import { HeroMascot } from "./HeroMascot";
import { useAppState } from "@/lib/state-context";
import { useEffect } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Hero({ variant }: { variant: "A" | "B" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const { setMascotPose, scrollProgress } = useAppState();

  // STATE 1 — keep mascot in idle pose while user is in hero
  useEffect(() => {
    if (scrollProgress < 0.05) setMascotPose("idle");
  }, [scrollProgress, setMascotPose]);

  const words1 = ["Belajar", "Mandarin", "privat"];
  const words2 = ["Laoshi", "profesional"];

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-32"
    >
      {/* layer 1 — cream base already on body */}
      {/* layer 2 — aurora blob */}
      <AuroraBlob />
      {/* layer 3 — flickering grid */}
      <FlickeringGrid
        className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
        squareSize={3}
        gridGap={8}
        flickerChance={0.25}
        color="rgb(143,174,109)"
        maxOpacity={0.45}
      />
      {/* layer 4 — 华 watermark */}
      <Watermark />
      {/* layer 5 — orbiting circles top right */}
      <OrbitField />
      {/* layer 6 — 3D mascot (hero size, fades on scroll past) */}
      <HeroMascot />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <BlurFade delay={0.1} direction="down">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white/70 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-sage" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-sage" />
            </span>
            <AnimatedGradientText className="bg-clip-text text-transparent" colors={["#4A6B3A", "#FFD700", "#4A6B3A"]}>
              Les Mandarin Privat 1-on-1
            </AnimatedGradientText>
          </div>
        </BlurFade>

        <h1 className="font-display text-[clamp(2.4rem,7vw,5.4rem)] font-black leading-[1.02] tracking-tight text-ink-deep">
          {words1.map((w, i) => (
            <BlurFade key={`a-${i}`} delay={0.25 + i * 0.08} className="mr-3 inline-block">
              {w}
            </BlurFade>
          ))}
          <BlurFade delay={0.55} className="mr-3 inline-block">
            <span className="font-serif text-[0.85em] italic font-light text-muted">bareng</span>
          </BlurFade>
          <br className="hidden md:block" />
          {words2.map((w, i) => (
            <BlurFade key={`b-${i}`} delay={0.7 + i * 0.1} className="mr-3 inline-block">
              <AuroraText speed={1.2}>{w}</AuroraText>
            </BlurFade>
          ))}
        </h1>

        <BlurFade delay={1.0} direction="up">
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted md:text-xl">
            Kurikulum disesuaikan tujuanmu. Bonus stack senilai{" "}
            <span className="font-semibold text-forest">Rp 868.000+</span> termasuk gratis.
          </p>
        </BlurFade>

        <BlurFade delay={1.2} direction="up">
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#cta">
              <ShimmerButton background="#8FAE6D" shimmerColor="#F6E3A1" className="h-14 px-7 text-base">
                {variant === "B" ? "Reveal harga" : "Isi form 30 detik"}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ShimmerButton>
            </a>
            <a
              href="#phone"
              className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full border border-sage/40 bg-white px-7 text-base font-medium text-ink-deep shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              Lihat cara kerja
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </BlurFade>

        {/* trust strip */}
        <BlurFade delay={1.4} direction="up">
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              500+ siswa aktif
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Native Laoshi
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Garansi 7 hari
            </span>
          </div>
        </BlurFade>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#phone" className="flex flex-col items-center gap-1 text-xs uppercase tracking-[0.3em] text-muted hover:text-ink">
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </motion.div>
    </motion.section>
  );
}
