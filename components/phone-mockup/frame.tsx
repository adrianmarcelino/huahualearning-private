"use client";

import { cn } from "@/lib/utils";

// Realistic iPhone 15 frame — pure CSS. Titanium chassis, sage inner bezel,
// notch/Dynamic Island, side buttons, diagonal screen reflection.
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[330px]", className)}>
      {/* glow under */}
      <div className="absolute inset-x-6 bottom-[-30px] h-12 rounded-full bg-sage/30 blur-2xl" aria-hidden />
      {/* chassis */}
      <div
        className="relative aspect-[9/19.5] w-full rounded-[3rem] p-[10px] shadow-phone ring-1 ring-black/30"
        style={{ background: "linear-gradient(140deg, #3a3733 0%, #1f1d1a 50%, #2a2724 100%)" }}
      >
        {/* sage glow ring */}
        <div className="absolute inset-[6px] rounded-[2.7rem] ring-1 ring-sage/30" aria-hidden />
        {/* side buttons */}
        <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l-md bg-black/80" />
        <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l-md bg-black/80" />
        <span className="absolute -left-[3px] top-60 h-14 w-[3px] rounded-l-md bg-black/80" />
        <span className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-black/80" />

        {/* screen */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-[#e5ddd5]"
          style={{ boxShadow: "inset 0 0 24px rgba(0,0,0,0.18)" }}
        >
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2 z-30 flex h-7 w-28 -translate-x-1/2 items-center justify-center rounded-full bg-black">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <div className="h-2 w-10 rounded-full bg-zinc-800" />
          </div>

          {/* WA header */}
          <div className="relative z-20 flex items-center gap-2 bg-[#075E54] px-3 pb-2 pt-9 text-white">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-sm font-bold">华</div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold leading-tight">Huahua Laoshi</div>
              <div className="text-[10px] text-white/70">online · typing…</div>
            </div>
          </div>

          {/* chat wallpaper */}
          <div className="relative h-[calc(100%-72px)] overflow-hidden bg-[#e5ddd5]">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.08) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px, 24px 24px"
              }}
            />
            <div className="relative h-full overflow-y-auto px-3 py-3 no-scrollbar">{children}</div>
          </div>

          {/* diagonal screen reflection */}
          <div
            className="pointer-events-none absolute inset-0 z-40 rounded-[2.4rem] opacity-40 mix-blend-screen"
            style={{
              background:
                "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)"
            }}
          />
        </div>
      </div>
    </div>
  );
}
