"use client";

// 1. Background Boxes
// Source URL: https://ui.aceternity.com/components/background-boxes
// Source saved: research/aceternity-source/background-boxes.tsx
// Adaptation: swap pastel palette for sage/forest/gold at 30% opacity, scaled-down grid for mobile perf.
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const COLORS = ["#8FAE6D", "#4A6B3A", "#F6E3A1", "#FFD700"];
const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)];

function Core({ className, ...rest }: { className?: string }) {
  const rows = new Array(80).fill(1);
  const cols = new Array(36).fill(1);
  return (
    <div
      style={{ transform: "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.65) translateZ(0)" }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4 opacity-30",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`r${i}`} className="relative h-8 w-16 border-l border-sage/40">
          {cols.map((_, j) => (
            <motion.div
              key={`c${j}`}
              whileHover={{ backgroundColor: pick(), transition: { duration: 0 } }}
              animate={{ transition: { duration: 2 } }}
              className="relative h-8 w-16 border-t border-r border-sage/40"
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
export const Boxes = React.memo(Core);
