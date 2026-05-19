"use client";

// Inspired by Magic UI AuroraText — moving gradient via animated background-position.
// https://magicui.design/docs/components/aurora-text
import { cn } from "@/lib/utils";

export function AuroraText({
  children,
  className,
  colors = ["#8FAE6D", "#4A6B3A", "#F6E3A1", "#8FAE6D"],
  speed = 1
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}) {
  const gradient = `linear-gradient(120deg, ${colors.join(", ")})`;
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300% 300%",
        animation: `aurora ${8 / speed}s ease infinite`
      }}
    >
      {children}
    </span>
  );
}
