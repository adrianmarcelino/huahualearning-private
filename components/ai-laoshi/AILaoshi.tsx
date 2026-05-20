"use client";

// AI Laoshi feature highlight w/ interactive feature switcher inside same phone.
// Two features: Tone Correction + Daily Conversation (Normal/Galak mode).

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mic, Check, ArrowRight, AudioLines, MessageSquare, Sparkles, Zap } from "lucide-react";
import { PhoneFrame } from "@/components/phone-mockup/PhoneFrame";
import { PhoneChat, type ScriptKey } from "@/components/phone-mockup/PhoneChat";

type Tab = "tone" | "chat";
type Mode = "normal" | "galak";

const TONE_COPY = {
  title: "Feedback Pronunciation",
  bullets: [
    "Skor pelafalan per karakter, per nada",
    "Koreksi spesifik — initial, final, panjang nada",
    "Contoh audio buat dibandingin sendiri"
  ]
};

const CHAT_COPY = {
  title: "Daily Conversation",
  bullets: [
    "Ngobrol Mandarin sehari-hari, suara di-WhatsApp",
    "Pilih mode: Normal (sabar) atau Galak (sarkas)",
    "Tetap ngajarin — koreksi + hanzi tiap balasan"
  ]
};

export function AILaoshi() {
  const [tab, setTab] = useState<Tab>("tone");
  const [mode, setMode] = useState<Mode>("normal");

  const scriptKey: ScriptKey =
    tab === "tone" ? "tone" : mode === "galak" ? "chat_galak" : "chat_normal";

  const headerStatus =
    tab === "tone"
      ? "auto-grading mode"
      : mode === "galak"
        ? "galak mode · online"
        : "online";

  const activeCopy = tab === "tone" ? TONE_COPY : CHAT_COPY;

  return (
    <section id="ai-laoshi" className="relative overflow-hidden bg-cream-2 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">
            🎤 AI LAOSHI · INCLUDED GRATIS
          </div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl lg:text-5xl leading-tight">
            Satu-satunya AI Mandarin yang bisa{" "}
            <span className="bg-gradient-to-r from-sage via-forest to-sage bg-clip-text text-transparent">
              dengerin & balas kamu
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
            Ngobrol bareng Laoshi AI di WhatsApp — feedback pelafalan + percakapan harian, semuanya gratis di setiap paket privat.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          {/* LEFT: tabs + feature copy */}
          <div className="order-2 lg:order-1">
            {/* Tab switcher */}
            <div className="inline-flex rounded-full border border-sage/20 bg-white p-1 shadow-soft">
              <TabButton active={tab === "tone"} onClick={() => setTab("tone")}>
                <AudioLines className="h-4 w-4" />
                Tone Correction
              </TabButton>
              <TabButton active={tab === "chat"} onClick={() => setTab("chat")}>
                <MessageSquare className="h-4 w-4" />
                Daily Conversation
              </TabButton>
            </div>

            {/* Mode toggle — only when chat tab active */}
            <AnimatePresence>
              {tab === "chat" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 inline-flex items-center gap-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">Mode:</span>
                  <button
                    onClick={() => setMode("normal")}
                    className={
                      "inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-bold transition-all " +
                      (mode === "normal"
                        ? "bg-sage text-white shadow-soft"
                        : "border border-sage/30 bg-white text-ink/70 hover:bg-sage/8")
                    }
                  >
                    <Sparkles className="h-3 w-3" /> Normal
                  </button>
                  <button
                    onClick={() => setMode("galak")}
                    className={
                      "inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-bold transition-all " +
                      (mode === "galak"
                        ? "bg-ink-deep text-cream shadow-soft"
                        : "border border-ink/20 bg-white text-ink/70 hover:bg-ink/5")
                    }
                  >
                    <Zap className="h-3 w-3" /> Galak 😏
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active feature copy */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab + mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink-deep md:text-3xl">
                  {activeCopy.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {activeCopy.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-ink-deep">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-gold-bright/40 bg-gradient-to-br from-gold/15 to-transparent p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎁</span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-forest">Bonus included</div>
                      <p className="mt-1 text-sm font-semibold text-ink-deep md:text-base">
                        Dua-duanya kamu dapet <span className="font-bold text-forest">GRATIS</span> di setiap paket privat — gak perlu bayar terpisah.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="#cta"
                  className="mt-6 inline-flex h-12 min-h-[48px] items-center gap-2 rounded-full bg-sage px-6 text-base font-semibold text-cream hover:bg-sage-dark"
                >
                  Daftar Kelas & Coba AI Laoshi
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: animated phone */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 mx-auto w-full max-w-sm lg:order-2"
          >
            {/* floating mic badge — pulses, brightens during chat tab */}
            <motion.div
              animate={{
                scale: tab === "chat" ? [1, 1.08, 1] : 1,
                backgroundColor: mode === "galak" && tab === "chat" ? "#2C2A26" : "#4A6B3A"
              }}
              transition={{ duration: 1.4, repeat: tab === "chat" ? Infinity : 0 }}
              className="absolute -left-4 top-12 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft-lg md:-left-8"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-sage/40" />
              <Mic className="relative h-5 w-5" />
            </motion.div>

            {/* floating chip — content changes by feature */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab + mode}
                initial={{ scale: 0.6, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.6, opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="absolute -right-2 bottom-24 z-10 rounded-2xl bg-white px-3 py-2 shadow-soft-lg md:-right-6"
              >
                {tab === "tone" ? (
                  <>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-sage">Tone score</div>
                    <div className="mt-0.5 font-display text-2xl font-bold leading-none text-forest">
                      84<span className="text-xs text-ink/60">/100</span>
                    </div>
                  </>
                ) : mode === "galak" ? (
                  <>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-ink-deep">Mode</div>
                    <div className="mt-0.5 inline-flex items-center gap-1 font-display text-base font-black leading-none text-ink-deep">
                      <Zap className="h-3 w-3" /> Galak 😏
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-sage">Mode</div>
                    <div className="mt-0.5 inline-flex items-center gap-1 font-display text-base font-black leading-none text-forest">
                      <Sparkles className="h-3 w-3" /> Normal
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <PhoneFrame>
              <PhoneChat
                scriptKey={scriptKey}
                headerStatus={headerStatus}
              />
            </PhoneFrame>

            <p className="mt-4 text-center text-xs italic text-muted">
              Tap "Tone" atau "Chat" buat tukar fitur. Mode Galak: nyindir tapi tetap ngajarin.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex h-10 min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-bold transition-all " +
        (active ? "bg-sage text-cream shadow-sm" : "text-ink/70 hover:text-ink-deep")
      }
    >
      {children}
    </button>
  );
}
