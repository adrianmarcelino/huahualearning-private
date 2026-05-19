"use client";

// Inspired by Aceternity Spotlight (new) — layered radial gradients translated/animated.
// https://ui.aceternity.com/components/spotlight-new
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Spotlight({
  className,
  gradientFirst = "radial-gradient(68% 68% at 50% 30%, rgba(143,174,109,0.16) 0%, rgba(143,174,109,0.04) 50%, rgba(143,174,109,0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, rgba(246,227,161,0.10) 0%, rgba(246,227,161,0.02) 60%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, rgba(74,107,58,0.08) 0%, transparent 80%)",
  translateY = -200,
  width = 900,
  height = 1200,
  duration = 7
}: {
  className?: string;
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
      className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden", className)}
    >
      <motion.div
        animate={{ x: [0, 60, -40, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: translateY, width, height, background: gradientFirst }}
      />
      <motion.div
        animate={{ x: [0, -50, 40, 0] }}
        transition={{ duration: duration + 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: translateY + 100, width: width * 0.7, height: height * 0.7, background: gradientSecond }}
      />
      <motion.div
        animate={{ x: [0, 30, -50, 0] }}
        transition={{ duration: duration + 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: translateY + 200, width: width * 0.5, height: height * 0.5, background: gradientThird }}
      />
    </motion.div>
  );
}
