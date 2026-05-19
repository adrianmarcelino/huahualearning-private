"use client";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

// Three nested orbits in the top-right quadrant: sage + gold dots.
export function OrbitField() {
  return (
    <div className="pointer-events-none absolute right-[-100px] top-[-50px] hidden h-[420px] w-[420px] md:block" aria-hidden>
      <OrbitingCircles radius={80} duration={18} iconSize={14}>
        <Dot color="#8FAE6D" />
        <Dot color="#F6E3A1" />
        <Dot color="#8FAE6D" />
      </OrbitingCircles>
      <OrbitingCircles radius={140} duration={26} reverse iconSize={10}>
        <Dot color="#4A6B3A" />
        <Dot color="#FFD700" />
        <Dot color="#8FAE6D" />
        <Dot color="#F6E3A1" />
      </OrbitingCircles>
      <OrbitingCircles radius={200} duration={40} iconSize={8}>
        <Dot color="#8FAE6D" />
        <Dot color="#F6E3A1" />
        <Dot color="#4A6B3A" />
        <Dot color="#8FAE6D" />
        <Dot color="#FFD700" />
      </OrbitingCircles>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="block h-full w-full rounded-full"
      style={{ background: color, boxShadow: `0 0 10px ${color}80` }}
    />
  );
}
