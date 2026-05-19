"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LottiePanda } from "@/components/ui/lottie-panda";

export function StickyPanda() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.31], [0, 0, 1]);
  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-3 right-3 z-40 h-20 w-20 md:h-24 md:w-24"
      aria-hidden
    >
      <LottiePanda />
    </motion.div>
  );
}
