"use client";

// 8. Sticky Scroll Reveal
// Source URL: https://ui.aceternity.com/components/sticky-scroll-reveal
// Source saved: research/aceternity-source/sticky-scroll-reveal.tsx
// Adaptation: cream bg (was dark), mobile-first stacked layout, brand colors.
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StickyScroll({ content, contentClassName }: { content: Step[]; contentClassName?: string }) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = content.length;
    const idx = Math.min(total - 1, Math.floor(latest * total));
    setActiveCard(idx);
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex h-[40rem] justify-center space-x-10 overflow-y-auto rounded-md bg-cream p-6 md:p-10"
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="font-display text-2xl font-black text-ink-deep md:text-3xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-4 max-w-sm text-base text-ink/70 md:text-lg"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div className={cn("sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white shadow-soft lg:block", contentClassName)}>
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
}
