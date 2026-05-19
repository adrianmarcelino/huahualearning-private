"use client";

// v6 FIX: drop inView gate. Number was stuck at 0 because IntersectionObserver
// never fired on mobile in some layouts. Animate on mount instead — total
// animation is short (~1.5s) and harmless if section is offscreen.

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  duration = 1.5,
  className
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span className={cn("tabular-nums", className)}>{n.toLocaleString("id-ID")}</span>;
}
