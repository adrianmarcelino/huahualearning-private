"use client";

// Inspired by Magic UI Border Beam
// https://magicui.design/docs/components/border-beam
import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "#8FAE6D",
  colorTo = "#F6E3A1"
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:inset-0 after:rounded-[inherit] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-path:rect(0_auto_auto_0_round_var(--size)px)] after:animate-border-beam after:[animation-delay:var(--delay)]",
        "after:[offset-anchor:calc(var(--anchor,90)*1%)_50%] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]",
        className
      )}
    />
  );
}
