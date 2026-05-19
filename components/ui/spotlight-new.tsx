"use client";

// 15. Spotlight (New)
// Source URL: https://ui.aceternity.com/components/spotlight-new
// Source saved: research/aceternity-source/spotlight-new.tsx
// Adaptation: sage spotlight tint, anchors top-left + bottom-right, slowed to 9s.
import { motion } from "framer-motion";

export function SpotlightNew({
  gradientFirst = "radial-gradient(68% 68% at 50% 30%, rgba(143,174,109,0.20) 0%, rgba(143,174,109,0.05) 50%, rgba(143,174,109,0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, rgba(246,227,161,0.14) 0%, rgba(246,227,161,0.04) 60%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, rgba(74,107,58,0.10) 0%, transparent 80%)",
  duration = 9
}: {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden"
    >
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 h-[120%] w-[120%]"
        style={{ background: gradientFirst }}
      />
      <motion.div
        animate={{ x: [0, -60, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: duration + 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 bottom-0 h-[90%] w-[90%]"
        style={{ background: gradientSecond }}
      />
      <motion.div
        animate={{ x: [0, 20, -40, 0] }}
        transition={{ duration: duration + 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/3 top-1/4 h-[70%] w-[70%]"
        style={{ background: gradientThird }}
      />
    </motion.div>
  );
}
