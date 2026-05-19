"use client";

// Realistic iPhone 15 frame — pure CSS layers:
// chassis gradient + sage inner glow ring + Dynamic Island + side buttons +
// diagonal screen reflection sweep + soft drop shadow under.

import { cn } from "@/lib/utils";

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      {/* glow shadow under phone */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[-30px] h-12 rounded-full bg-sage/30 blur-2xl" aria-hidden />

      {/* chassis */}
      <div
        className="relative aspect-[9/19.5] w-full rounded-[3rem] p-[10px] ring-1 ring-black/30"
        style={{
          background: "linear-gradient(140deg, #3a3733 0%, #1f1d1a 50%, #2a2724 100%)",
          boxShadow: "0 60px 100px -20px rgba(74,107,58,0.30), 0 30px 60px -30px rgba(44,42,38,0.4)"
        }}
      >
        {/* sage glow inner ring */}
        <div className="pointer-events-none absolute inset-[6px] rounded-[2.7rem] ring-1 ring-sage/30" aria-hidden />

        {/* side buttons */}
        <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l-md bg-black/80" />
        <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l-md bg-black/80" />
        <span className="absolute -left-[3px] top-60 h-14 w-[3px] rounded-l-md bg-black/80" />
        <span className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-black/80" />

        {/* screen */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.4rem]"
          style={{ boxShadow: "inset 0 0 24px rgba(0,0,0,0.18)" }}
        >
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2 z-30 flex h-7 w-28 -translate-x-1/2 items-center justify-center rounded-full bg-black">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <div className="h-2 w-10 rounded-full bg-zinc-800" />
          </div>

          {/* screen content */}
          <div className="relative h-full w-full pt-9">{children}</div>

          {/* diagonal reflection sweep — animated slowly */}
          <div
            className="pointer-events-none absolute inset-0 z-40 rounded-[2.4rem] opacity-30 mix-blend-screen animate-[reflect_8s_ease-in-out_infinite]"
            style={{
              background:
                "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
              backgroundSize: "200% 200%"
            }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes reflect {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
}
