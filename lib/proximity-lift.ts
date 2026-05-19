"use client";

// Hook: lift element when cursor within `radius` px. Returns inline transform style.
// Wires STATE 2 — "cards within 200px of cursor lift translateY -3px".

import { useEffect, useState } from "react";
import { useAppState } from "@/lib/state-context";

export function useProximityLift(ref: React.RefObject<HTMLElement | null>, radius = 200, lift = 3) {
  const { cursor, isDesktop } = useAppState();
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!isDesktop || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = cursor.x - cx;
    const dy = cursor.y - cy;
    setNear(dx * dx + dy * dy < radius * radius);
  }, [cursor.x, cursor.y, ref, radius, isDesktop]);

  return { near, style: near ? { transform: `translateY(-${lift}px)`, transition: "transform 220ms ease-out" } : { transform: "translateY(0)", transition: "transform 320ms ease-out" } };
}
