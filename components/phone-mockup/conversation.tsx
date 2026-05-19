"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ToneScore } from "./tone-score";
import { VoiceBubble } from "./voice-bubble";

type TextBubble = { id: string; kind: "text"; side: "in" | "out"; text: string };
type VoiceBubbleT = { id: string; kind: "voice"; side: "in" | "out"; secs: number; transcript?: string };
type ScoreBubbleT = { id: string; kind: "score"; side: "in"; score: number; hanzi: string };
type Bubble = TextBubble | VoiceBubbleT | ScoreBubbleT;

const SCRIPT: { delay: number; bubble: Bubble; typingBefore?: number }[] = [
  { delay: 0, bubble: { id: "b1", kind: "text", side: "out", text: "Laoshi, gimana cara ngomong 你好?" } },
  { delay: 800, typingBefore: 1200, bubble: { id: "b2", kind: "text", side: "in", text: "Coba kirim voice note 'nǐ hǎo' ya 🎙️" } },
  { delay: 1800, bubble: { id: "b3", kind: "voice", side: "out", secs: 2, transcript: "nǐ hǎo" } },
  { delay: 800, typingBefore: 900, bubble: { id: "b4", kind: "text", side: "in", text: "Nice. Auto-grading…" } },
  { delay: 900, bubble: { id: "b5", kind: "score", side: "in", score: 84, hanzi: "你好" } },
  { delay: 1200, typingBefore: 1000, bubble: { id: "b6", kind: "text", side: "in", text: "Tone 3 di 好 keinggian — coba turunin di tengah." } }
];

// activeStep drives how far the conversation has advanced. step 0 = first 2 bubbles,
// step 1 = up through voice + grading, step 2 = full script.
const STEP_END = [2, 5, 6];

export function Conversation({ activeStep = 0 }: { activeStep?: number }) {
  const [shown, setShown] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);
  const cancelRef = useRef(false);
  const targetStepRef = useRef(activeStep);
  const playStartFromRef = useRef(0);

  // play from index i to step end
  const play = async (fromIndex: number) => {
    if (runningRef.current) return;
    runningRef.current = true;
    cancelRef.current = false;
    setShown(SCRIPT.slice(0, fromIndex).map((s) => s.bubble));

    for (let i = fromIndex; i < SCRIPT.length; i++) {
      if (cancelRef.current) break;
      const end = STEP_END[targetStepRef.current] ?? SCRIPT.length;
      if (i >= end) break;
      const step = SCRIPT[i];
      if (step.typingBefore && step.bubble.side === "in") {
        setTyping(true);
        await wait(step.typingBefore);
        if (cancelRef.current) break;
        setTyping(false);
      } else {
        await wait(step.delay);
      }
      if (cancelRef.current) break;
      setShown((prev) => (prev.find((p) => p.id === step.bubble.id) ? prev : [...prev, step.bubble]));
    }
    runningRef.current = false;
  };

  // sync activeStep target — if user scrolls past, ensure we're at least that far
  useEffect(() => {
    targetStepRef.current = activeStep;
    const end = STEP_END[activeStep] ?? SCRIPT.length;
    setShown((prev) => {
      if (prev.length >= end) return prev;
      // not yet caught up — start playing from where we are
      if (!runningRef.current) play(prev.length);
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  // initial run
  useEffect(() => {
    play(0);
    return () => {
      cancelRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoscroll inside phone
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  const replayFrom = (id: string) => {
    const idx = SCRIPT.findIndex((s) => s.bubble.id === id);
    if (idx < 0) return;
    cancelRef.current = true;
    setActive(id);
    setTimeout(() => {
      runningRef.current = false;
      play(idx);
      setTimeout(() => setActive(null), 900);
    }, 200);
  };

  return (
    <div ref={containerRef} className="flex h-full flex-col gap-2">
      {shown.map((b) => (
        <motion.div
          key={b.id}
          layout
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className={b.side === "out" ? "self-end" : "self-start"}
          onClick={() => replayFrom(b.id)}
          role="button"
        >
          <div className={active === b.id ? "ring-2 ring-sage rounded-2xl" : ""}>
            {b.kind === "text" && (
              <div
                className={
                  "max-w-[80%] rounded-2xl px-3 py-2 text-[13px] shadow-sm " +
                  (b.side === "out" ? "bg-[#dcf8c6] text-[#0e1a12]" : "bg-white text-[#0e1a12]")
                }
              >
                {b.text}
              </div>
            )}
            {b.kind === "voice" && <VoiceBubble side={b.side} secs={b.secs} transcript={b.transcript} />}
            {b.kind === "score" && <ToneScore score={b.score} hanzi={b.hanzi} />}
          </div>
        </motion.div>
      ))}
      <AnimatePresence>
        {typing && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="self-start rounded-2xl bg-white px-3 py-2 shadow-sm"
          >
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:240ms]" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
