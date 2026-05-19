"use client";

import { motion } from "framer-motion";

export function Mascot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 220, damping: 18 }}
      className="relative mx-auto mt-10 h-40 w-40 md:h-48 md:w-48"
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl">
          <defs>
            <radialGradient id="bodyG" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F4EEDF" />
            </radialGradient>
          </defs>
          {/* ears */}
          <circle cx="55" cy="55" r="22" fill="#2D2A26" />
          <circle cx="145" cy="55" r="22" fill="#2D2A26" />
          {/* head */}
          <circle cx="100" cy="105" r="60" fill="url(#bodyG)" stroke="#4F4A45" strokeWidth="1.5" />
          {/* eye patches */}
          <ellipse cx="78" cy="100" rx="14" ry="18" fill="#2D2A26" transform="rotate(-15 78 100)" />
          <ellipse cx="122" cy="100" rx="14" ry="18" fill="#2D2A26" transform="rotate(15 122 100)" />
          {/* eyes */}
          <circle cx="80" cy="102" r="5" fill="#FBF4EA" />
          <circle cx="120" cy="102" r="5" fill="#FBF4EA" />
          <circle cx="81" cy="103" r="2.2" fill="#2D2A26" />
          <circle cx="121" cy="103" r="2.2" fill="#2D2A26" />
          {/* nose */}
          <ellipse cx="100" cy="122" rx="6" ry="4" fill="#2D2A26" />
          {/* mouth */}
          <path d="M92 132 Q100 142 108 132" stroke="#2D2A26" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* cheeks */}
          <circle cx="65" cy="125" r="6" fill="#F6E3A1" opacity="0.6" />
          <circle cx="135" cy="125" r="6" fill="#F6E3A1" opacity="0.6" />
        </svg>
      </motion.div>
      {/* halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-6 rounded-full border border-dashed border-sage/30"
      />
    </motion.div>
  );
}
