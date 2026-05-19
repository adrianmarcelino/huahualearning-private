"use client";

// Inspired by Magic UI AnimatedGradientText.
import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
  colors = ["#8FAE6D", "#F6E3A1", "#8FAE6D"]
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;
  return (
    <span
      className={cn("inline-flex items-center gap-1 bg-clip-text text-transparent", className)}
      style={{ backgroundImage: gradient, backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}
    >
      {children}
    </span>
  );
}
