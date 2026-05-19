"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Three parallax depth layers — pluggable into any section as decorative bg.
export function ParallaxLayers({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  return (
    <div ref={ref} className={className} aria-hidden>
      <motion.div style={{ y: y1 }} className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-sage/15 blur-2xl" />
      <motion.div style={{ y: y2 }} className="absolute right-0 top-32 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <motion.div style={{ y: y3 }} className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-sage/10 blur-2xl" />
    </div>
  );
}
