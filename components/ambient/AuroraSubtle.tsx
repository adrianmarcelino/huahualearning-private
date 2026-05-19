"use client";

// Single-hue sage haze, very slow drift, heavily blurred. Designed to replace
// the multi-color iridescent Aurora on the hero only. No mix-blend-difference
// (the source of the jade iridescence).

import { cn } from "@/lib/utils";

export function AuroraSubtle({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* sage haze blob — large, soft, slow */}
      <div
        className="absolute -inset-[20%] animate-aurora-bg blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(143,174,109,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 70% 70%, rgba(143,174,109,0.30) 0%, transparent 60%)",
          backgroundSize: "200% 200%",
          opacity: 0.06,
          animationDuration: "60s",
          maskImage: "radial-gradient(ellipse at center, black 50%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 90%)"
        }}
      />
    </div>
  );
}
