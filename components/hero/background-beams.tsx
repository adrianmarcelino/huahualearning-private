"use client";

// Inspired by Aceternity Background Beams
// https://ui.aceternity.com/components/background-beams
import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const PATHS = [
  "M-100 200 C 200 100, 400 300, 800 200",
  "M-100 320 C 250 180, 450 420, 900 280",
  "M-50 480 C 200 380, 500 580, 900 460",
  "M-150 640 C 250 540, 550 740, 900 620",
  "M-200 100 C 100 50, 350 250, 750 100"
];

export function BackgroundBeams({ className }: { className?: string }) {
  const beams = useMemo(() => PATHS, []);
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-20 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 gradient-radial" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 700" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8FAE6D" stopOpacity="0" />
            <stop offset="50%" stopColor="#8FAE6D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F6E3A1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {beams.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#8FAE6D" strokeOpacity="0.08" strokeWidth="1" fill="none" />
            <motion.path
              d={d}
              stroke="url(#beam)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
