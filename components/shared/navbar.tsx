"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShrunk(v > 80));
  return (
    <motion.nav
      className={
        "fixed left-1/2 top-3 z-50 -translate-x-1/2 transition-all " +
        (shrunk
          ? "w-[92%] rounded-full border border-sage/30 bg-white/85 px-4 py-2 shadow-soft backdrop-blur-md max-w-md"
          : "w-[94%] rounded-full border border-transparent bg-white/40 px-5 py-3 backdrop-blur-sm max-w-md")
      }
    >
      <div className="flex items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-2 font-display font-black text-ink-deep">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sage text-cream">华</span>
          <span className="text-sm sm:text-base">Huahua Private</span>
        </a>
        <a
          href="#cta"
          className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-cream shadow-sm hover:bg-sage-dark min-h-[44px] inline-flex items-center"
        >
          Daftar
        </a>
      </div>
    </motion.nav>
  );
}
