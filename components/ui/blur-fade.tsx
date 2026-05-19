"use client";

// Inspired by Magic UI BlurFade — blur-to-clear entrance with optional inView trigger.
// https://magicui.design/docs/components/blur-fade
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

const dirVec: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 16 },
  down: { x: 0, y: -16 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 }
};

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.55,
  direction = "up",
  blur = "6px",
  inView = true,
  once = true
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  blur?: string;
  inView?: boolean;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once, margin: "-50px" });
  const animate = inView ? (visible ? "shown" : "hidden") : "shown";
  const { x, y } = dirVec[direction];
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animate}
      variants={{
        hidden: { opacity: 0, filter: `blur(${blur})`, x, y },
        shown: { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
      }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
