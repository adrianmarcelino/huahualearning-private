"use client";

// 3. Text Generate Effect
// Source URL: https://ui.aceternity.com/components/text-generate-effect
// Source saved: research/aceternity-source/text-generate-effect.tsx
// Adaptation: stagger 60ms (spec), sage shimmer accent for any words wrapped in **double-asterisks**.
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  stagger = 0.06
}: {
  words: string;
  className?: string;
  duration?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const parts = words.split(" ").map((w) => ({
    word: w.replace(/\*\*/g, ""),
    accent: /^\*\*.+\*\*$/.test(w)
  }));
  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {parts.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mr-[0.3em] inline-block",
            p.accent && "bg-gradient-to-r from-sage via-forest to-gold-bright bg-clip-text text-transparent"
          )}
        >
          {p.word}
        </motion.span>
      ))}
    </span>
  );
}
