"use client";

// 11. Layout Grid
// Source URL: https://ui.aceternity.com/components/layout-grid
// Source saved: research/aceternity-source/layout-grid.tsx
// Adaptation: cream/sage tiles, hanzi preview inside each, tap-to-expand overlay closes on outside tap.
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Tile {
  id: number;
  title: string;
  hanzi: string;
  className: string;
  body: string;
}

export function LayoutGrid({ tiles }: { tiles: Tile[] }) {
  const [selected, setSelected] = useState<Tile | null>(null);
  const [lastSelected, setLastSelected] = useState<Tile | null>(null);

  const handleClick = (tile: Tile) => {
    setLastSelected(selected);
    setSelected(tile);
  };
  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {tiles.map((tile) => (
        <div key={tile.id} className={cn(tile.className, "")}>
          <motion.div
            onClick={() => handleClick(tile)}
            className={cn(
              "relative overflow-hidden",
              selected?.id === tile.id
                ? "absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-3xl md:w-1/2"
                : lastSelected?.id === tile.id
                  ? "z-40 h-full w-full rounded-2xl bg-white"
                  : "h-full w-full rounded-2xl bg-white"
            )}
            layoutId={`tile-${tile.id}`}
          >
            <div className="relative flex h-full w-full flex-col items-start justify-between rounded-2xl border border-sage/20 bg-white p-5 shadow-soft">
              <div className="text-[10px] font-bold uppercase tracking-widest text-sage">Kategori</div>
              <div className="font-display text-7xl font-black leading-none text-forest/15">
                {tile.hanzi}
              </div>
              <div>
                <div className="font-display text-xl font-black text-ink-deep">{tile.title}</div>
                {selected?.id === tile.id && (
                  <p className="mt-2 text-sm text-ink/70">{tile.body}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute inset-0 h-full w-full bg-ink-deep opacity-0 transition-opacity duration-300",
          selected?.id ? "pointer-events-auto z-30 opacity-30" : "pointer-events-none z-10 opacity-0"
        )}
      />
    </div>
  );
}
