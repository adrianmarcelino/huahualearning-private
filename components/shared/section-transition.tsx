"use client";

import { motion } from "framer-motion";

// Clip-path morph divider between sections (effect 40).
export function SectionTransition({ flip = false }: { flip?: boolean }) {
  const variants = {
    hidden: { clipPath: flip ? "polygon(0 0, 100% 0, 100% 0, 0 0)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={variants}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-16 w-full overflow-hidden"
      aria-hidden
    >
      <div className="h-full w-full bg-gradient-to-b from-transparent via-cream/40 to-cream" />
    </motion.div>
  );
}
