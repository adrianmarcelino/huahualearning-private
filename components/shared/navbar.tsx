"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShrunk(v > 80));

  const width = useTransform(scrollY, [0, 200], ["94%", "72%"]);

  return (
    <motion.nav
      style={{ width }}
      className={cn(
        "fixed left-1/2 top-3 z-50 -translate-x-1/2 transition-all duration-300",
        shrunk
          ? "rounded-full border border-sage/30 bg-white/85 px-4 py-2 shadow-soft backdrop-blur-md backdrop-saturate-150"
          : "rounded-full border border-transparent bg-white/40 px-6 py-3 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 font-display font-black text-ink-deep">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sage text-cream">华</span>
          <span className="hidden sm:inline">Huahua Private</span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex">
          <a href="#phone" className="transition-colors hover:text-sage">Cara Kerja</a>
          <a href="#diff" className="transition-colors hover:text-sage">Beda</a>
          <a href="#bonus" className="transition-colors hover:text-sage">Bonus</a>
          <a href="#laoshi" className="transition-colors hover:text-sage">Laoshi</a>
        </div>
        <a
          href="#cta"
          className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sage-dark hover:shadow-md"
        >
          Daftar
        </a>
      </div>
    </motion.nav>
  );
}
