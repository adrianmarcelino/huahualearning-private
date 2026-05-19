"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card3D } from "./card-3d";
import { Particles } from "@/components/ui/particles";
import { Check, X } from "lucide-react";

const FEATURES = [
  "Jawab pertanyaan teks",
  "Koreksi grammar tertulis",
  "Latihan kosakata",
  "Nilai pelafalan tone Mandarin (audio)",
  "Feedback per-karakter initial + final",
  "Drill native-speaker audio"
];

const PROVIDERS = [
  { name: "ChatGPT", caps: [true, true, true, false, false, false] },
  { name: "DeepSeek", caps: [true, true, false, false, false, false] },
  { name: "Claude", caps: [true, true, true, false, false, false] },
  { name: "Huahua AI Laoshi", caps: [true, true, true, true, true, true], featured: true }
];

export function Differentiator() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section id="diff" ref={ref} className="relative overflow-hidden bg-cream py-32">
      <Particles className="absolute inset-0" quantity={60} />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            Satu-satunya AI Mandarin yang <span className="text-sage">bisa dengerin kamu</span>
          </motion.h2>
          <p className="mt-4 text-lg text-ink/70">
            ChatGPT, DeepSeek, Claude—semua cuma teks. Huahua AI Laoshi nilai pengucapanmu seperti Laoshi beneran.
          </p>
        </div>

        <motion.div
          style={{ rotate }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {PROVIDERS.map((p, i) => (
            <Card3D key={p.name} featured={p.featured} index={i}>
              <div className="mb-4 font-display text-xl font-bold text-ink">{p.name}</div>
              <ul className="space-y-2.5 text-sm">
                {FEATURES.map((f, j) => (
                  <FeatureRow key={j} ok={p.caps[j]} label={f} delay={j * 0.08} />
                ))}
              </ul>
            </Card3D>
          ))}
        </motion.div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink/60">
          Bukan cuma jawab teks seperti ChatGPT, DeepSeek, atau Claude—Huahua AI Laoshi adalah satu-satunya AI Mandarin yang bisa nilai pengucapan kamu seperti Laoshi beneran.
        </p>
      </div>
    </section>
  );
}

function FeatureRow({ ok, label, delay }: { ok: boolean; label: string; delay: number }) {
  return (
    <li className="flex items-center gap-2 text-ink/80">
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}
        className={
          "grid h-5 w-5 place-items-center rounded-full " +
          (ok ? "bg-sage text-cream" : "bg-ink/10 text-ink/40")
        }
      >
        {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </motion.span>
      <span className={ok ? "" : "text-ink/40 line-through"}>{label}</span>
    </li>
  );
}
