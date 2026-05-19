"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ToneScore } from "./tone-score";
import { VoiceBubble } from "./voice-bubble";

type Bubble =
  | { side: "in" | "out"; type: "text"; text: string }
  | { side: "in" | "out"; type: "voice"; secs: number; transcript?: string }
  | { side: "in"; type: "score"; score: number; hanzi: string };

const SCRIPT: Bubble[] = [
  { side: "out", type: "text", text: "Laoshi, gimana cara ngomong 你好?" },
  { side: "in", type: "text", text: "Coba kirim voice note 'nǐ hǎo' ya 🎙️" },
  { side: "out", type: "voice", secs: 2, transcript: "nǐ hǎo" },
  { side: "in", type: "text", text: "Nice. Auto-grading…" },
  { side: "in", type: "score", score: 87, hanzi: "你好" },
  { side: "in", type: "text", text: "Tone-3 di 你 perlu lebih turun. Dengerin contoh 👇" },
  { side: "in", type: "voice", secs: 2 }
];

export function Conversation() {
  const [visible, setVisible] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  const play = useCallback(async () => {
    cancelRef.current = false;
    setVisible([]);
    for (const b of SCRIPT) {
      if (cancelRef.current) return;
      if (b.side === "in") {
        setTyping(true);
        await wait(700 + (b.type === "text" ? b.text.length * 18 : 400));
        setTyping(false);
      } else {
        await wait(500);
      }
      if (cancelRef.current) return;
      setVisible((v) => [...v, b]);
      await wait(b.type === "voice" ? 900 : 400);
    }
  }, []);

  useEffect(() => {
    play();
    return () => {
      cancelRef.current = true;
    };
  }, [play]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  return (
    <div ref={containerRef} className="flex h-full flex-col gap-2">
      <AnimatePresence initial={false}>
        {visible.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className={b.side === "out" ? "self-end" : "self-start"}
            onClick={() => {
              // tap-to-replay (effect 12): replay from start when last bubble tapped
              if (i === visible.length - 1) play();
            }}
            role="button"
          >
            {b.type === "text" && (
              <div
                className={
                  "max-w-[80%] rounded-2xl px-3 py-2 text-[13px] " +
                  (b.side === "out" ? "bg-[#dcf8c6] text-[#0e1a12]" : "bg-white text-[#0e1a12]")
                }
              >
                {b.text}
              </div>
            )}
            {b.type === "voice" && <VoiceBubble side={b.side} secs={b.secs} transcript={b.transcript} />}
            {b.type === "score" && <ToneScore score={b.score} hanzi={b.hanzi} />}
          </motion.div>
        ))}
        {typing && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="self-start rounded-2xl bg-white px-3 py-2"
          >
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:240ms]" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
