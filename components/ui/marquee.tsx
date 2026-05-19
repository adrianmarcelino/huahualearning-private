"use client";

// Inspired by Magic UI Marquee
// https://magicui.design/docs/components/marquee
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  reverse = false
}: {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group flex w-full overflow-hidden [--gap:1rem]", className)}>
      {[0, 1].map((k) => (
        <div
          key={k}
          className={cn(
            "flex shrink-0 items-stretch gap-[var(--gap)] animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
