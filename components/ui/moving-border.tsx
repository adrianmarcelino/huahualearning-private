"use client";

// Inspired by Aceternity MovingBorder — element traveling around an SVG rect perimeter.
// https://ui.aceternity.com/components/moving-border
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 3000,
  rx = "1.75rem",
  ry = "1.75rem",
  className,
  containerClassName,
  borderClassName
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (v) => (pathRef.current?.getPointAtLength(v as number).x ?? 0) as number);
  const y = useTransform(progress, (v) => (pathRef.current?.getPointAtLength(v as number).y ?? 0) as number);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div className={cn("relative", containerClassName)}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" rx={rx} ry={ry} ref={pathRef} width="100%" height="100%" />
      </svg>
      <motion.div className={cn("absolute top-0 left-0 h-16 w-16", borderClassName)} style={{ transform } as any}>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,#F6E3A1_0%,transparent_70%)] opacity-80" />
      </motion.div>
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
}
