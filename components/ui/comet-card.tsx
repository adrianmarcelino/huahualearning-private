"use client";

// 7. Comet Card
// Source URL: https://ui.aceternity.com/components/comet-card
// Source saved: research/aceternity-source/comet-card.tsx
// Adaptation: brand sage→forest gradient, DeviceOrientation API integration for mobile tilt, gold particles inside.
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function CometCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-1, 1], [12, -12]), { stiffness: 220, damping: 20 });
  const ry = useSpring(useTransform(x, [-1, 1], [-12, 12]), { stiffness: 220, damping: 20 });

  useEffect(() => {
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      x.set(Math.max(-1, Math.min(1, e.gamma / 30)));
      y.set(Math.max(-1, Math.min(1, (e.beta - 30) / 30)));
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1200,
        background: "linear-gradient(135deg, #8FAE6D 0%, #4A6B3A 100%)"
      }}
      className="relative h-full overflow-hidden rounded-3xl p-6 text-white shadow-soft-lg"
    >
      {/* gold drift particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-bright shadow-[0_0_6px_rgba(255,215,0,0.7)]"
            initial={{ x: 30 + i * 30, y: 200, opacity: 0 }}
            animate={{ y: -40, opacity: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 2, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
      </div>
      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
