"use client";

// 8. Sticky Scroll Reveal — v6 FIX
// Bug: inner container's `overflow-y-auto` swallowed page scroll, so activeCard
// stuck at 0 on mobile. Fix: bind scrollYProgress to the section wrapper
// (page scroll), drop inner overflow. Steps now highlight one-at-a-time as
// user scrolls through the section.

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StickyScroll({ content, contentClassName }: { content: Step[]; contentClassName?: string }) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const total = content.length;
    const idx = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
    setActive(idx);
  });

  return (
    <div ref={sectionRef} className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
      {/* steps column */}
      <div className="space-y-12 lg:space-y-24">
        {content.map((item, index) => {
          const isActive = active === index;
          return (
            <motion.div
              key={item.title + index}
              animate={{ opacity: isActive ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold transition-colors",
                    isActive ? "bg-sage text-white" : "bg-sage/10 text-sage"
                  )}
                >
                  {index + 1}
                </span>
                {index < content.length - 1 && <span className="mt-2 h-12 w-px bg-sage/20 lg:h-20" />}
              </div>
              <div className="pt-1">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink-deep md:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink/70">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* sticky preview (desktop only) */}
      <div className="hidden lg:block">
        <div className={cn("sticky top-24 h-72 w-full overflow-hidden rounded-2xl border border-sage/15 bg-white", contentClassName)}>
          {content[active]?.content ?? null}
        </div>
      </div>
    </div>
  );
}
