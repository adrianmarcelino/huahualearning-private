"use client";

import { Play } from "lucide-react";

export function VoiceBubble({ side, secs, transcript }: { side: "in" | "out"; secs: number; transcript?: string }) {
  const bars = Array.from({ length: 22 });
  return (
    <div
      className={
        "max-w-[80%] rounded-2xl px-3 py-2 " + (side === "out" ? "bg-[#dcf8c6]" : "bg-white")
      }
    >
      <div className="flex items-center gap-2">
        <button className="grid h-7 w-7 place-items-center rounded-full bg-[#075E54] text-white">
          <Play className="h-3 w-3 fill-white" />
        </button>
        <div className="flex h-6 items-center gap-[2px]">
          {bars.map((_, i) => (
            <span
              key={i}
              className="block w-[2px] animate-wave bg-zinc-600"
              style={{ height: `${Math.max(4, Math.sin(i) * 8 + 10)}px`, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
        <span className="text-[10px] text-zinc-500">0:0{secs}</span>
      </div>
      {transcript && <div className="mt-1 text-[10px] italic text-zinc-500">"{transcript}"</div>}
    </div>
  );
}
