"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProviderCard, HuahuaCard } from "./card-3d";

const FEATURES = [
  "Jawab pertanyaan teks",
  "Koreksi grammar tertulis",
  "Latihan kosakata",
  "Nilai pelafalan tone Mandarin (audio)",
  "Feedback per-karakter initial + final",
  "Drill audio native speaker"
];

const PROVIDERS = [
  { name: "ChatGPT", dot: "#10A37F", caps: [true, true, true, false, false, false] },
  { name: "DeepSeek", dot: "#4D6BFE", caps: [true, true, false, false, false, false] },
  { name: "Claude", dot: "#CC785C", caps: [true, true, true, false, false, false] }
];

// STATE 3 — STATES_VERIFICATION.md item 3.
// One hovered key drives sibling dim, mascot listening, particle burst on the card itself.
export function Differentiator() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section id="diff" className="relative overflow-hidden bg-cream-2 py-32">
      <Spotlight />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <BlurFade>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sage">Bedanya</div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-ink-deep md:text-5xl lg:text-6xl">
              Satu-satunya AI Mandarin yang{" "}
              <AuroraText speed={1.2}>bisa dengerin kamu</AuroraText>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-5 text-lg text-muted">
              ChatGPT, DeepSeek, Claude — semua cuma teks. Huahua AI Laoshi nilai pengucapanmu seperti Laoshi beneran.
            </p>
          </BlurFade>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {PROVIDERS.map((p, i) => (
            <BlurFade key={p.name} delay={0.25 + i * 0.1} className="h-full">
              <ProviderCard
                name={p.name}
                dot={p.dot}
                cardId={p.name}
                hovered={hovered}
                setHovered={setHovered}
              >
                <FeatureList caps={p.caps} muted />
              </ProviderCard>
            </BlurFade>
          ))}
          <BlurFade delay={0.6} className="h-full">
            <HuahuaCard cardId="huahua" hovered={hovered} setHovered={setHovered}>
              <FeatureList caps={[true, true, true, true, true, true]} />
            </HuahuaCard>
          </BlurFade>
        </div>

        <BlurFade delay={0.9}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-muted">
            Bukan klaim marketing — coba sendiri di WhatsApp setelah daftar.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

function FeatureList({ caps, muted = false }: { caps: boolean[]; muted?: boolean }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {FEATURES.map((f, j) => (
        <motion.li
          key={j}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: j * 0.06 }}
          className="flex items-start gap-2"
        >
          <span
            className={
              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full " +
              (caps[j]
                ? muted
                  ? "bg-sage/15 text-sage"
                  : "bg-gradient-to-br from-sage to-gold-bright text-white shadow-sm"
                : "bg-ink/8 text-muted/60")
            }
          >
            {caps[j] ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          </span>
          <span
            className={
              "leading-snug " +
              (caps[j]
                ? muted
                  ? "text-ink/80"
                  : "text-white"
                : muted
                  ? "text-muted/60 line-through"
                  : "text-white/40 line-through")
            }
          >
            {f}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
