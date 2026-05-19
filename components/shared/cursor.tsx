"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/lib/use-media";

export function Cursor() {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
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
      trail.current.x += (pos.current.x - trail.current.x) * 0.18;
      trail.current.y += (pos.current.y - trail.current.y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
      if (trailRef.current) trailRef.current.style.transform = `translate3d(${trail.current.x - 18}px, ${trail.current.y - 18}px, 0)`;
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
      <div ref={trailRef} className="pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 rounded-full border border-sage/40 mix-blend-multiply" />
      <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 rounded-full bg-sage" />
    </>
  );
}
