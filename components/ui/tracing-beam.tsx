"use client";

// 10. Tracing Beam
// Source URL: https://ui.aceternity.com/components/tracing-beam
// Source saved: research/aceternity-source/tracing-beam.tsx
// Adaptation: sage→gold gradient beam, mobile placement adjusted (always left edge).
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function TracingBeam({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), { stiffness: 500, damping: 90 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), { stiffness: 500, damping: 90 });

  return (
    <motion.div ref={ref} className={cn("relative mx-auto h-full w-full max-w-4xl", className)}>
      <div className="absolute -left-4 top-3 md:-left-20">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(143,174,109,0.4) 0px 0px 0px 1px inset, rgba(0,0,0,0.06) 0px 1px 2px 0px" }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-sage/40 bg-cream shadow-soft"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{ backgroundColor: scrollYProgress.get() > 0 ? "#FBF4EA" : "#8FAE6D", borderColor: scrollYProgress.get() > 0 ? "#9C948B" : "#4A6B3A" }}
            className="h-2 w-2 rounded-full border border-forest bg-sage"
          />
        </motion.div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9C948B"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#8FAE6D" stopOpacity="0" />
              <stop stopColor="#8FAE6D" />
              <stop offset="0.325" stopColor="#FFD700" />
              <stop offset="1" stopColor="#F6E3A1" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
