"use client";

// Subtle sage dotted-grid texture base for hero.
// 24px grid, 12% opacity, masked with radial fade so edges stay clean.

export function DottedGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, #8FAE6D 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.12,
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
      }}
    />
  );
}
