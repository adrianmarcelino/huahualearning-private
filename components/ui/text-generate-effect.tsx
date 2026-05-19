"use client";

// 3. Text Generate Effect
// Source URL: https://ui.aceternity.com/components/text-generate-effect
// Adaptation: stagger 60ms (spec), sage gradient accent for **word**.
// v6 FIX: explicit space text node between word spans so inline-block siblings
// don't collapse the whitespace. Also use word+idx key so duplicate words
// don't share key.

import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
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
  const inView = useInView(ref, { once: true, margin: "0px" });
  const parts = words.split(" ").map((w) => ({
    word: w.replace(/\*\*/g, ""),
    accent: /^\*\*.+\*\*$/.test(w)
  }));
  return (
    <span ref={ref} className={cn("inline", className)}>
      {parts.map((p, i) => (
        <Fragment key={`${p.word}-${i}`}>
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "inline-block",
              p.accent && "bg-gradient-to-r from-sage via-forest to-sage bg-clip-text text-transparent"
            )}
          >
            {p.word}
          </motion.span>
          {i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
