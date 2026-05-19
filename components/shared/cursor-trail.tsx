"use client";

// 12-max DOM-only cursor trail. One sage dot per mousemove, fade opacity 1→0 over 400ms.
// Reference: STATE 2 trigger spec. No library — keeps bundle lean.

import { useEffect, useRef } from "react";
import { useAppState } from "@/lib/state-context";

export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDesktop } = useAppState();

  useEffect(() => {
    if (!isDesktop) return;
    const container = ref.current;
    if (!container) return;
    let active: HTMLSpanElement[] = [];
    let last = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 35) return; // throttle
      last = now;
      const dot = document.createElement("span");
      dot.className = "pointer-events-none fixed left-0 top-0 z-[68] h-1.5 w-1.5 rounded-full bg-sage";
      dot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      dot.style.transition = "opacity 400ms linear, transform 400ms ease-out";
      dot.style.opacity = "1";
      container.appendChild(dot);
      active.push(dot);
      requestAnimationFrame(() => {
        dot.style.opacity = "0";
        dot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3 + 14}px, 0) scale(0.6)`;
      });
      setTimeout(() => {
        dot.remove();
        active = active.filter((d) => d !== dot);
      }, 420);
      while (active.length > 12) {
        const first = active.shift();
        first?.remove();
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  if (!isDesktop) return null;
  return <div ref={ref} aria-hidden />;
}
