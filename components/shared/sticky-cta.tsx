"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/lib/use-media";

export function StickyCta() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [80, 0, 0]);
  if (!isMobile) return null;
  return (
    <motion.div
      style={{ y }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur"
    >
      <a
        href="#cta"
        className="grid h-12 w-full place-items-center rounded-full bg-sage font-medium text-cream"
      >
        Lihat harga & checkout
      </a>
    </motion.div>
  );
}
