"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.51], [0, 0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 0.51], [40, 40, 0]);
  return (
    <motion.a
      href="https://wa.me/6281939304002"
      target="_blank"
      rel="noreferrer"
      style={{ opacity, y }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-sage text-cream shadow-lg shadow-sage/30 hover:bg-sage-dark"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-sage/40" />
    </motion.a>
  );
}
