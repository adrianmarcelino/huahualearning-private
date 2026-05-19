"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundBeams } from "./background-beams";
import { Sparkles } from "./sparkles";
import { TextGenerate } from "./text-generate";
import { Subheadline } from "./subheadline";
import { Mascot } from "./mascot";
import { Button } from "@/components/ui/button";

export function Hero({ variant }: { variant: "A" | "B" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-32"
    >
      <BackgroundBeams />
      <Sparkles density={80} className="absolute inset-0 -z-10" />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-cream/70 px-4 py-1.5 text-xs font-medium text-sage backdrop-blur"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
          Les Mandarin Privat 1-on-1
        </motion.div>

        <TextGenerate
          words="Belajar Mandarin privat bareng Laoshi profesional"
          className="font-display text-4xl font-bold leading-[1.1] text-ink md:text-6xl lg:text-7xl"
        />

        <Subheadline
          text="Kurikulum disesuaikan tujuanmu. Bonus stack senilai Rp 868.000+ termasuk gratis."
          className="mx-auto mt-6 max-w-2xl text-base text-ink/70 md:text-xl"
        />

        <Mascot />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a href="#cta">
            <Button size="lg" variant="primary">
              {variant === "B" ? "Lihat Pricing →" : "Isi form 30 detik →"}
            </Button>
          </a>
          <a href="#phone">
            <Button size="lg" variant="outline">Lihat cara kerja</Button>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
