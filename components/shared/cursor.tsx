"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/lib/use-media";

// Two-layer cursor — small solid sage dot + larger trailing ring (mix-blend-difference).
export function Cursor() {
  const isDesktop = useIsDesktop();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDesktop) return;
    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", move);
    let raf = 0;
    const loop = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.16;
      trail.current.y += (pos.current.y - trail.current.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${trail.current.x - 18}px, ${trail.current.y - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;
  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 rounded-full border-2 border-sage/60"
        style={{ mixBlendMode: "difference" }}
      />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-sage" />
    </>
  );
}
