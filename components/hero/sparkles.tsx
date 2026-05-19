"use client";

// Inspired by Aceternity Sparkles
// https://ui.aceternity.com/components/sparkles
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/use-media";
import { cn } from "@/lib/utils";

export function Sparkles({ density = 60, className }: { density?: number; className?: string }) {
  const isMobile = useIsMobile();
  const count = isMobile ? Math.max(20, Math.floor(density / 2)) : density;
  const points = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.6,
        d: Math.random() * 3 + 2,
        del: Math.random() * 3
      })),
    [count]
  );
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden>
      {points.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: p.d, delay: p.del, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
