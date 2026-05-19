"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "wave" | "angle" | "blob";

// SVG clip-path morph divider — path `d` interpolates between two states when in viewport.
// Source: stock SVG morph pattern, framer-motion `animate` on `d` attribute.
const variants: Record<Variant, { from: string; to: string }> = {
  wave: {
    from: "M0,40 C240,40 480,40 720,40 C960,40 1200,40 1440,40 L1440,0 L0,0 Z",
    to: "M0,40 C240,90 480,0 720,40 C960,90 1200,10 1440,50 L1440,0 L0,0 Z"
  },
  angle: {
    from: "M0,0 L1440,0 L1440,0 Z",
    to: "M0,0 L1440,80 L1440,0 Z"
  },
  blob: {
    from: "M0,40 C320,40 720,40 1120,40 C1360,40 1440,40 1440,40 L1440,0 L0,0 Z",
    to: "M0,30 C320,80 720,-10 1120,40 C1360,70 1440,20 1440,60 L1440,0 L0,0 Z"
  }
};

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
  const v = variants[variant];
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
        <motion.path
          initial={{ d: v.from }}
          whileInView={{ d: v.to }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          fill={from}
        />
      </svg>
    </div>
  );
}
