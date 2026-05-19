"use client";

// 9. Infinite Moving Cards
// Source URL: https://ui.aceternity.com/components/infinite-moving-cards
// Source saved: research/aceternity-source/infinite-moving-cards.tsx
// Adaptation: tap-to-pause briefly via state, brand palette borders.
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className
}: {
  items: { hanzi: string; pinyin: string; meaning: string; level: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [tapPaused, setTapPaused] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const items = scrollerRef.current.querySelectorAll(".scroll-item");
    items.forEach((it) => {
      const clone = it.cloneNode(true);
      scrollerRef.current?.appendChild(clone);
    });
    containerRef.current.style.setProperty("--direction", direction === "left" ? "forwards" : "reverse");
    containerRef.current.style.setProperty("--duration", speed === "fast" ? "20s" : speed === "normal" ? "40s" : "60s");
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        onClick={() => {
          setTapPaused(true);
          setTimeout(() => setTapPaused(false), 1500);
        }}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll-x",
          pauseOnHover && "hover:[animation-play-state:paused]",
          tapPaused && "[animation-play-state:paused]"
        )}
        style={{ animationDirection: direction === "left" ? "normal" : "reverse" }}
      >
        {items.map((it, i) => (
          <li
            key={i}
            className="scroll-item relative w-[200px] shrink-0 rounded-2xl border border-sage/20 bg-white p-5 shadow-soft md:w-[220px]"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-sage">{it.level}</div>
            <div className="mt-2 text-center font-display text-5xl font-black text-ink-deep md:text-6xl">
              {it.hanzi}
            </div>
            <div className="mt-2 text-center font-serif text-sm italic text-muted">{it.pinyin}</div>
            <div className="text-center text-sm font-medium text-ink">{it.meaning}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
