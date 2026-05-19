"use client";

// Inspired by Aceternity Text Generate Effect
// https://ui.aceternity.com/components/text-generate-effect
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerate({ words, className }: { words: string; className?: string }) {
  const list = words.split(" ");
  return (
    <h1 className={cn(className)}>
      {list.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mr-[0.3em] inline-block"
        >
          {w}
        </motion.span>
      ))}
    </h1>
  );
}
