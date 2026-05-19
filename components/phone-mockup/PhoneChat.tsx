"use client";

// Auto-playing WhatsApp chat preview. Accepts script + scriptKey prop.
// When scriptKey changes, conversation restarts with the new script.
// All bubbles keyed by id — dedup-safe.

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export type Bubble =
  | { id: string; side: "in" | "out"; type: "text"; text: string }
  | { id: string; side: "in" | "out"; type: "voice"; secs: number; transcript?: string }
  | { id: string; side: "in"; type: "score"; score: number; hanzi: string };

export type ScriptStep = { wait: number; typing?: number; b: Bubble };

const TONE_SCRIPT: ScriptStep[] = [
  { wait: 200, b: { id: "1", side: "out", type: "text", text: "Laoshi, gimana cara ngomong 你好?" } },
  { wait: 600, typing: 900, b: { id: "2", side: "in", type: "text", text: "Coba kirim voice note 'nǐ hǎo' ya 🎙️" } },
  { wait: 800, b: { id: "3", side: "out", type: "voice", secs: 2, transcript: "nǐ hǎo" } },
  { wait: 600, typing: 700, b: { id: "4", side: "in", type: "text", text: "Nice. Auto-grading…" } },
  { wait: 700, b: { id: "5", side: "in", type: "score", score: 84, hanzi: "你好" } },
  { wait: 900, typing: 700, b: { id: "6", side: "in", type: "text", text: "Tone 3 di 好 keinggian — coba turunin di tengah." } }
];

// Daily Conversation: each Laoshi reply = double bubble (VN + translation text).
// Translation text bubble shows hanzi / (pinyin) / Indo all in one bubble.

const CHAT_NORMAL: ScriptStep[] = [
  // User asks
  { wait: 200, b: { id: "n1", side: "out", type: "voice", secs: 2, transcript: "Jīntiān tiānqì zěnme yàng?" } },
  // Laoshi VN reply
  { wait: 700, typing: 800, b: { id: "n2", side: "in", type: "voice", secs: 3, transcript: "Jīntiān Yǎjiādá tiānqì hěn hǎo!" } },
  // Laoshi translation bubble
  { wait: 500, b: { id: "n3", side: "in", type: "text", text: "今天雅加达天气很好!\n(Jīntiān Yǎjiādá tiānqì hěn hǎo)\nHari ini cuaca Jakarta bagus banget! Mau jalan-jalan?" } },
  // User second voice
  { wait: 1000, b: { id: "n4", side: "out", type: "voice", secs: 3, transcript: "Wǒ xiǎng chī Zhōngguó cài" } },
  // Laoshi VN reply
  { wait: 700, typing: 800, b: { id: "n5", side: "in", type: "voice", secs: 4, transcript: "Nà nǐ yīdìng yào shì shì huǒguō!" } },
  // Laoshi translation bubble
  { wait: 500, b: { id: "n6", side: "in", type: "text", text: "那你一定要试试火锅!\n(Nà nǐ yīdìng yào shì shì huǒguō)\nKalau gitu kamu wajib coba hot pot! 🍲" } }
];

const CHAT_GALAK: ScriptStep[] = [
  // User asks
  { wait: 200, b: { id: "g1", side: "out", type: "voice", secs: 2, transcript: "Jīntiān tiānqì zěnme yàng?" } },
  // Laoshi galak VN
  { wait: 700, typing: 800, b: { id: "g2", side: "in", type: "voice", secs: 3, transcript: "Nǐ bù huì zìjǐ kàn ma?" } },
  // Galak translation bubble
  { wait: 500, b: { id: "g3", side: "in", type: "text", text: "你不会自己看吗?\n(Nǐ bù huì zìjǐ kàn ma)\nBuka jendela kek, gak bisa liat sendiri? 😏" } },
  // User second voice
  { wait: 1000, b: { id: "g4", side: "out", type: "voice", secs: 3, transcript: "Wǒ xiǎng chī Zhōngguó cài" } },
  // Laoshi galak VN
  { wait: 700, typing: 800, b: { id: "g5", side: "in", type: "voice", secs: 4, transcript: "Zhōngyú yǒu diǎn pǐn wèi le!" } },
  // Galak translation bubble
  { wait: 500, b: { id: "g6", side: "in", type: "text", text: "终于有点品味了!\n(Zhōngyú yǒu diǎn pǐn wèi le)\nAkhirnya ada selera juga. Coba 火锅, jangan minder kalo kepedesan ya 🌶️" } }
];

export const SCRIPTS = {
  tone: TONE_SCRIPT,
  chat_normal: CHAT_NORMAL,
  chat_galak: CHAT_GALAK
};

export type ScriptKey = keyof typeof SCRIPTS;

export function PhoneChat({
  scriptKey = "tone",
  headerName = "Huahua Laoshi",
  headerStatus = "online"
}: {
  scriptKey?: ScriptKey;
  headerName?: string;
  headerStatus?: string;
}) {
  const [vis, setVis] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const runningRef = useRef(false);
  const cancelRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const play = useCallback(async (script: ScriptStep[]) => {
    runningRef.current = true;
    cancelRef.current = false;
    setVis([]);
    setTyping(false);
    for (const step of script) {
      if (cancelRef.current) break;
      if (step.typing) {
        await wait(step.wait);
        if (cancelRef.current) break;
        setTyping(true);
        await wait(step.typing);
        if (cancelRef.current) break;
        setTyping(false);
      } else {
        await wait(step.wait);
      }
      if (cancelRef.current) break;
      setVis((p) => (p.find((x) => x.id === step.b.id) ? p : [...p, step.b]));
    }
    runningRef.current = false;
  }, []);

  // Restart playback whenever scriptKey changes
  useEffect(() => {
    cancelRef.current = true;
    runningRef.current = false;
    const script = SCRIPTS[scriptKey] ?? TONE_SCRIPT;
    const id = setTimeout(() => play(script), 60);
    return () => {
      clearTimeout(id);
      cancelRef.current = true;
    };
  }, [scriptKey, play]);

  // autoscroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [vis, typing]);

  return (
    <div className="relative flex h-full w-full flex-col bg-[#e5ddd5]">
      {/* WA header */}
      <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2 text-white">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-xs font-bold">华</div>
        <div>
          <div className="text-[13px] font-semibold leading-tight">{headerName}</div>
          <div className="text-[10px] text-white/70">{headerStatus}</div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex-1 space-y-2 overflow-y-auto px-3 py-3 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {vis.map((b) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={b.side === "out" ? "flex justify-end" : "flex justify-start"}
            >
              {b.type === "text" && (
                <div
                  className={
                    "max-w-[78%] rounded-2xl px-3 py-2 text-[13px] shadow-sm " +
                    (b.side === "out" ? "bg-[#dcf8c6] text-[#0e1a12]" : "bg-white text-[#0e1a12]")
                  }
                >
                  {b.text}
                </div>
              )}
              {b.type === "voice" && <Voice side={b.side} secs={b.secs} transcript={b.transcript} />}
              {b.type === "score" && <Score score={b.score} hanzi={b.hanzi} />}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <span className="inline-flex gap-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage [animation-delay:240ms]" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function Voice({ side, secs, transcript }: { side: "in" | "out"; secs: number; transcript?: string }) {
  const bars = Array.from({ length: 24 });
  return (
    <div className={"max-w-[78%] rounded-2xl px-3 py-2 shadow-sm " + (side === "out" ? "bg-[#dcf8c6]" : "bg-white")}>
      <div className="flex items-center gap-2">
        <button className="grid h-7 w-7 place-items-center rounded-full bg-[#075E54] text-white">
          <Play className="h-3 w-3 fill-white" />
        </button>
        <div className="flex h-5 items-center gap-[2px]">
          {bars.map((_, i) => {
            const h = 3 + Math.abs(Math.sin((i / bars.length) * Math.PI * 2.5)) * 12;
            return (
              <span
                key={i}
                className="block w-[2px] rounded-full bg-[#075E54]"
                style={{ height: h, animation: `bar 1.2s ease-in-out ${i * 30}ms infinite` }}
              />
            );
          })}
        </div>
        <span className="text-[10px] text-zinc-500">0:0{secs}</span>
      </div>
      {transcript && <div className="mt-1 text-[10px] italic text-zinc-500">"{transcript}"</div>}
      <style jsx>{`@keyframes bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.5)}}`}</style>
    </div>
  );
}

function Score({ score, hanzi }: { score: number; hanzi: string }) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="rounded-2xl bg-white p-3 shadow-md"
    >
      <div className="text-[10px] uppercase tracking-widest text-zinc-500">Tone score</div>
      <div className="flex items-end justify-between gap-3">
        <span className="font-display text-2xl font-black text-ink-deep">{hanzi}</span>
        <span className="font-display text-3xl font-black text-forest">
          {score}
          <span className="text-xs">/100</span>
        </span>
      </div>
      <div className="mt-2 space-y-1 text-[11px]">
        <div className="flex items-center justify-between rounded bg-cream px-2 py-1">
          <span>你 · Tone 3</span>
          <span className="font-bold text-sage">92 ✓</span>
        </div>
        <div className="flex items-center justify-between rounded bg-cream px-2 py-1">
          <span>好 · Tone 3</span>
          <span className="font-bold text-amber-600">71 ⚠</span>
        </div>
      </div>
    </motion.div>
  );
}
