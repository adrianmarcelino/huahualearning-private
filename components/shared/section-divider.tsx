"use client";

import { cn } from "@/lib/utils";

type Variant = "wave" | "angle" | "blob";

// Clip-path morph divider between sections. SVG-based so it scales clean.
export function SectionDivider({
  variant = "wave",
  flip = false,
  from = "#FBF4EA",
  to = "#F7F0E2",
  className
}: {
  variant?: Variant;
  flip?: boolean;
  from?: string;
  to?: string;
  className?: string;
}) {
  const paths: Record<Variant, string> = {
    wave: "M0,40 C240,90 480,0 720,40 C960,90 1200,10 1440,50 L1440,0 L0,0 Z",
    angle: "M0,0 L1440,80 L1440,0 Z",
    blob: "M0,30 C320,80 720,-10 1120,40 C1360,70 1440,20 1440,60 L1440,0 L0,0 Z"
  };
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none relative w-full overflow-hidden", className)}
      style={{ background: to, height: 80 }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", flip && "scale-y-[-1]")}
      >
        <path d={paths[variant]} fill={from} />
      </svg>
    </div>
  );
}
