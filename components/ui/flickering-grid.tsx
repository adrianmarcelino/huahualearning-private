"use client";

// Inspired by Magic UI FlickeringGrid — canvas grid where cells flicker per tick.
// https://magicui.design/docs/components/flickering-grid
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(143,174,109)",
  maxOpacity = 0.3,
  className
}: {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let w = c.width = c.offsetWidth * dpr;
    let h = c.height = c.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(c.offsetWidth / (squareSize + gridGap));
    const rows = Math.ceil(c.offsetHeight / (squareSize + gridGap));
    const cells = Array.from({ length: cols * rows }, () => Math.random() * maxOpacity);

    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 90) {
        for (let i = 0; i < cells.length; i++) {
          if (Math.random() < flickerChance) cells[i] = Math.random() * maxOpacity;
        }
        last = t;
      }
      ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const i = r * cols + col;
          ctx.fillStyle = color;
          ctx.globalAlpha = cells[i];
          ctx.fillRect(col * (squareSize + gridGap), r * (squareSize + gridGap), squareSize, squareSize);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      w = c.width = c.offsetWidth * dpr;
      h = c.height = c.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity]);
  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
