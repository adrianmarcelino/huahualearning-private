"use client";

// 6. Card Stack
// Source URL: https://ui.aceternity.com/components/card-stack
// Source saved: research/aceternity-source/card-stack.tsx
// Adaptation: 3s autoflip, tap-to-advance, Huahua card pinned to top in cycle.
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface StackCard {
  id: number;
  name: string;
  content: React.ReactNode;
  featured?: boolean;
}

export function CardStack({ items, offset = 10, scaleFactor = 0.06, interval = 3000 }: { items: StackCard[]; offset?: number; scaleFactor?: number; interval?: number }) {
  const [cards, setCards] = useState<StackCard[]>(items);

  useEffect(() => {
    const id = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop() as StackCard);
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  const tap = () => {
    setCards((prev) => {
      const next = [...prev];
      next.unshift(next.pop() as StackCard);
      return next;
    });
  };

  return (
    <div className="relative h-72 w-full md:h-80">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          onClick={tap}
          className="absolute inset-0 flex h-72 w-full cursor-pointer flex-col justify-between rounded-3xl bg-white p-6 shadow-soft md:h-80"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index
          }}
        >
          {card.content}
        </motion.div>
      ))}
    </div>
  );
}
