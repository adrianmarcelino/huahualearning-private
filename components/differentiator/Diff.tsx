"use client";

// Differentiator — Lamp Effect (5) header + Card Stack (6), Huahua card uses Comet Card (7).

import { LampContainer } from "@/components/ui/lamp";
import { CardStack } from "@/components/ui/card-stack";
import { CometCard } from "@/components/ui/comet-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Check, X } from "lucide-react";

const FEATURES = [
  "Jawab pertanyaan teks",
  "Koreksi grammar tertulis",
  "Latihan kosakata",
  "Nilai pelafalan tone Mandarin (audio)",
  "Feedback per-karakter initial + final",
  "Drill audio native speaker"
];

const PROVIDERS = [
  { id: 1, name: "ChatGPT", dot: "#10A37F", caps: [true, true, true, false, false, false] },
  { id: 2, name: "DeepSeek", dot: "#4D6BFE", caps: [true, true, false, false, false, false] },
  { id: 3, name: "Claude", dot: "#CC785C", caps: [true, true, true, false, false, false] }
];

export function Differentiator() {
  const items = [
    ...PROVIDERS.map((p) => ({
      id: p.id,
      name: p.name,
      content: <ProviderCardContent name={p.name} dot={p.dot} caps={p.caps} />
    })),
    {
      id: 99,
      name: "Huahua AI Laoshi",
      featured: true,
      content: (
        <CometCard>
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 backdrop-blur text-sm font-bold">
              华
            </span>
            <div className="font-display text-lg font-black">Huahua AI Laoshi</div>
          </div>
          <ul className="space-y-1.5 text-[13px]">
            {FEATURES.map((f, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-bright text-ink-deep">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </CometCard>
      )
    }
  ];
  return (
    <section id="diff" className="relative overflow-hidden bg-cream">
      <LampContainer>
        <h2
          className="text-center font-display font-black text-ink-deep"
          style={{ fontSize: "clamp(28px, 7vw, 48px)" }}
        >
          <TextGenerateEffect words="Satu-satunya AI Mandarin yang **bisa** dengerin kamu" />
        </h2>
      </LampContainer>

      <div className="container mx-auto -mt-32 px-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-md">
          <CardStack items={items} />
          <p className="mt-12 text-center text-xs italic text-muted">
            Tap stack untuk geser. Auto-flip tiap 3 detik. Huahua selalu balik ke atas.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProviderCardContent({ name, dot, caps }: { name: string; dot: string; caps: boolean[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full" style={{ background: dot }} />
        <div className="font-display text-lg font-bold text-ink-deep">{name}</div>
      </div>
      <ul className="space-y-1.5 text-[13px]">
        {FEATURES.map((f, j) => (
          <li key={j} className="flex items-start gap-2 text-ink/80">
            <span
              className={
                "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full " +
                (caps[j] ? "bg-sage/15 text-sage" : "bg-ink/8 text-muted")
              }
            >
              {caps[j] ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
            </span>
            <span className={caps[j] ? "" : "text-muted/70 line-through"}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
