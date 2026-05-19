"use client";

import { Play } from "lucide-react";

// 32-bar sine-wave waveform with staggered keyframes.
export function VoiceBubble({ side, secs, transcript }: { side: "in" | "out"; secs: number; transcript?: string }) {
  const bars = Array.from({ length: 32 });
  return (
    <div
      className={
        "max-w-[80%] rounded-2xl px-3 py-2 shadow-sm " + (side === "out" ? "bg-[#dcf8c6]" : "bg-white")
      }
    >
      <div className="flex items-center gap-2">
        <button className="grid h-7 w-7 place-items-center rounded-full bg-[#075E54] text-white">
          <Play className="h-3 w-3 fill-white" />
        </button>
        <div className="flex h-6 items-center gap-[2px]">
          {bars.map((_, i) => {
            const sine = Math.abs(Math.sin((i / bars.length) * Math.PI * 2.5));
            const h = 4 + sine * 14;
            return (
              <span
                key={i}
                className="block w-[2px] rounded-full bg-[#075E54] animate-wave"
                style={{ height: `${h}px`, animationDelay: `${i * 45}ms` }}
              />
            );
          })}
        </div>
        <span className="text-[10px] text-zinc-500">0:0{secs}</span>
      </div>
      {transcript && <div className="mt-1 text-[10px] italic text-zinc-500">"{transcript}"</div>}
    </div>
  );
}
