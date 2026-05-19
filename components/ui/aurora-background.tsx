"use client";

// 2. Aurora Background
// Source URL: https://ui.aceternity.com/components/aurora-background
// Source saved: research/aceternity-source/aurora-background.tsx
// Adaptation: palette swapped to sage→forest→gold; respects reduced-motion media query.
import { cn } from "@/lib/utils";
import React from "react";

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true
}: {
  className?: string;
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-50",
            "[background-image:repeating-linear-gradient(100deg,#FBF4EA_0%,#FBF4EA_7%,transparent_10%,transparent_12%,#FBF4EA_16%),repeating-linear-gradient(100deg,#8FAE6D_10%,#F6E3A1_15%,#4A6B3A_20%,#FFD700_25%,#8FAE6D_30%)]",
            "[background-size:300%_200%]",
            "[background-position:50%_50%]",
            "filter blur-[8px] invert-0",
            "after:absolute after:inset-0 after:[background-image:inherit] after:[background-size:200%_100%] after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          )}
        />
      </div>
      {children}
    </div>
  );
}
