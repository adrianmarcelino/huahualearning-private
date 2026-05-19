"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 200], ["100%", "78%"]);
  const padY = useTransform(scrollY, [0, 200], [16, 8]);
  const blur = useTransform(scrollY, [0, 200], [0, 14]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(251,244,234,0)", "rgba(251,244,234,0.78)"]);
  const shadow = useTransform(
    scrollY,
    [0, 200],
    ["0 0 0 rgba(0,0,0,0)", "0 10px 30px rgba(79,74,69,0.10)"]
  );

  return (
    <motion.nav
      style={{ width, paddingTop: padY, paddingBottom: padY, backdropFilter: `blur(${blur}px) saturate(140%)` as any, background: bg, boxShadow: shadow }}
      className="fixed left-1/2 top-3 z-50 -translate-x-1/2 rounded-full px-6 transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sage text-cream">华</span>
          <span className="hidden sm:inline">Huahua Private</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-ink/80 md:flex">
          <a href="#phone" className="hover:text-sage">Cara Kerja</a>
          <a href="#diff" className="hover:text-sage">Beda Huahua</a>
          <a href="#bonus" className="hover:text-sage">Bonus</a>
          <a href="#laoshi" className="hover:text-sage">Laoshi</a>
        </div>
        <a
          href="#cta"
          className={cn(
            "rounded-full bg-sage px-4 py-2 text-sm font-medium text-cream",
            "hover:bg-sage-dark transition-colors"
          )}
        >
          Daftar
        </a>
      </div>
    </motion.nav>
  );
}
