"use client";

// 13. Background Lines
// Source URL: https://ui.aceternity.com/components/background-lines
// Source saved: research/aceternity-source/background-lines.tsx
// Adaptation: sage strokes with gold accents, opacity 30%, light bg.
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Trimmed from 4 paths to 2 + slowed animation 10s → 18s for less fps churn.
const PATHS = [
  "M720 450C720 450 742.459 440.315 755.249 425.626C768.039 410.937 778.88 376.21 794.5 367.5C810.12 358.79 835.65 386.314 851.5 386.314C867.35 386.314 887.27 374.156 901.5 367.5C915.73 360.844 933.908 357.169 945.5 343.125C957.092 329.081 953.673 296.601 970.5 295.937C987.327 295.273 1011.83 333.612 1025.5 343.124C1039.17 352.636 1053.81 350.115 1070.5 355.625C1087.19 361.135 1083.6 393.583 1101.5 395.124C1119.4 396.665 1141.91 363.165 1163.5 357.501",
  "M720 450C720 450 705.598 462.998 689.5 467.501C673.402 472.004 645.972 480.348 626.5 472.501C607.028 464.654 600.501 433.829 580.5 425.001C560.499 416.173 525.531 442.842 506.5 432.001C487.469 421.16 487.225 391.467 470.5 379.001C453.775 366.535 423.998 358.314 411.5 358.314C399.002 358.314 376.55 372.234 358.5 367.501C340.45 362.768 322.5 343.5 322.5 343.5"
];

function CoreLines({ className, svgOptions }: { className?: string; svgOptions?: { duration?: number } }) {
  const dur = svgOptions?.duration ?? 18;
  return (
    <div className={cn("absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]", className)}>
      <svg viewBox="0 0 1440 900" className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none" aria-hidden>
        {PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={i % 2 === 0 ? "#8FAE6D" : "#F6E3A1"}
            strokeWidth="1.4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: dur, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

export const BackgroundLines = React.memo(CoreLines);
