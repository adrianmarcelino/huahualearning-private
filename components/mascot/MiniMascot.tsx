"use client";

// Sticky mini-mascot bottom-right. Fades in after user scrolls past the hero.
// Wired to STATE 4 (hero scroll-out) and STATE 10 (scroll back).

import { motion } from "framer-motion";
import { useAppState } from "@/lib/state-context";
import { MascotCanvas } from "./MascotCanvas";

export function MiniMascot() {
  const { scrollProgress } = useAppState();
  const visible = scrollProgress > 0.08 && scrollProgress < 0.95;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-24 right-5 z-40 h-20 w-20 md:h-24 md:w-24"
      aria-hidden
    >
      <MascotCanvas scale={0.9} className="h-full w-full" />
    </motion.div>
  );
}
