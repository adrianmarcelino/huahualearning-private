"use client";

// Inspired by Magic UI ShimmerButton — conic gradient sweeping the perimeter.
// https://magicui.design/docs/components/shimmer-button
import * as React from "react";
import { cn } from "@/lib/utils";

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    shimmerColor?: string;
    background?: string;
    borderRadius?: string;
    shimmerDuration?: string;
  }
>(({ children, className, shimmerColor = "#FFFFFF", background = "#8FAE6D", borderRadius = "9999px", shimmerDuration = "3s", style, ...props }, ref) => (
  <button
    ref={ref}
    style={
      {
        "--shimmer-color": shimmerColor,
        "--shimmer-duration": shimmerDuration,
        "--radius": borderRadius,
        "--bg": background,
        ...style
      } as React.CSSProperties
    }
    className={cn(
      "group relative z-0 inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 font-medium text-white transition active:translate-y-px",
      "[border-radius:var(--radius)] [background:var(--bg)]",
      "shadow-[inset_0_-8px_10px_rgba(255,255,255,0.12)]",
      "before:absolute before:inset-0 before:-z-10 before:[border-radius:var(--radius)]",
      "after:absolute after:inset-[-100%] after:-z-10 after:[border-radius:var(--radius)]",
      "after:[background:conic-gradient(from_calc(270deg-(var(--shimmer-spin,20deg)*0.5)),transparent_0,var(--shimmer-color)_var(--shimmer-spin,20deg),transparent_var(--shimmer-spin,40deg))]",
      "after:[animation:spin_var(--shimmer-duration)_linear_infinite]",
      "hover:[--shimmer-spin:60deg]",
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="pointer-events-none absolute inset-px z-[5] [border-radius:calc(var(--radius)-1px)] [background:var(--bg)]" />
  </button>
));
ShimmerButton.displayName = "ShimmerButton";
