"use client";

// 14. Hero Highlight
// Source URL: https://ui.aceternity.com/components/hero-highlight
// Source saved: research/aceternity-source/hero-highlight.tsx
// Adaptation: gold sweep highlight, animates on inView (mobile-friendly — no hover needed).
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  return (
    <motion.span
      ref={ref}
      initial={{ backgroundSize: "0% 100%" }}
      animate={inView ? { backgroundSize: "100% 100%" } : {}}
      transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
      style={{ backgroundRepeat: "no-repeat", backgroundPosition: "left center" }}
      className={cn(
        "relative inline-block rounded-md bg-gradient-to-r from-gold to-gold-bright px-2 py-1 text-ink-deep",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

export function HeroHighlight({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      {children}
    </div>
  );
}
