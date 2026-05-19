"use client";

// Inspired by Aceternity Meteors
// https://ui.aceternity.com/components/meteors
import { useIsMobile } from "@/lib/use-media";
import { cn } from "@/lib/utils";

export function Meteors({ number = 20, className }: { number?: number; className?: string }) {
  const isMobile = useIsMobile();
  const n = isMobile ? Math.max(6, Math.floor(number / 2)) : number;
  const items = Array.from({ length: n });
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {items.map((_, i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-gold shadow-[0_0_0_1px_rgba(246,227,161,0.1)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100 + -20}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        >
          <span className="absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-gold to-transparent" />
        </span>
      ))}
    </div>
  );
}
