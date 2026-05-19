"use client";

// Inspired by Magic UI WordRotate — vertical cycle through words.
// https://magicui.design/docs/components/word-rotate
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WordRotate({
  words,
  duration = 2500,
  className
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % words.length), duration);
    return () => clearInterval(id);
  }, [duration, words.length]);
  return (
    <span className={cn("relative inline-block overflow-hidden align-baseline", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
