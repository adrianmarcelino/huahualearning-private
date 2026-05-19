"use client";

// Inspired by Magic UI Particles
// https://magicui.design/docs/components/particles
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/use-media";
import { cn } from "@/lib/utils";

export function Particles({
  className,
  quantity = 80,
  color = "#8FAE6D"
}: {
  className?: string;
  quantity?: number;
  color?: string;
}) {
  const isMobile = useIsMobile();
  const count = isMobile ? Math.max(20, Math.floor(quantity / 2)) : quantity;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let w = (canvas.width = canvas.offsetWidth * dpr);
    let h = (canvas.height = canvas.offsetHeight * dpr);
    ctx.scale(dpr, dpr);

    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.2
    }));

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.fillStyle = color;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count, color]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
