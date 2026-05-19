"use client";

import { motion } from "framer-motion";
import { staggerParent, wordStagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Subheadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      variants={staggerParent}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: 0.5 }}
      className={cn(className)}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wordStagger} className="mr-[0.25em] inline-block">
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}
