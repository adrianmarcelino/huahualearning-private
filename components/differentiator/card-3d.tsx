"use client";

// Inspired by Aceternity 3D Card Effect
// https://ui.aceternity.com/components/3d-card-effect
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export function Card3D({
  children,
  featured = false,
  index = 0
}: {
  children: React.ReactNode;
  featured?: boolean;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 16 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 16 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (!featured || !ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const r = (e.target as HTMLElement).getBoundingClientRect();
            confetti({
              particleCount: 40,
              spread: 60,
              startVelocity: 28,
              origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
              colors: ["#8FAE6D", "#F6E3A1", "#FBF4EA"]
            });
            obs.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [featured]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={cn(
        "relative rounded-3xl p-6 transition-shadow",
        featured
          ? "bg-gradient-to-br from-sage to-sage-dark text-cream shadow-2xl shadow-sage/30 ring-1 ring-sage/50"
          : "bg-cream/80 ring-1 ring-ink/10 shadow-md"
      )}
    >
      {featured && (
        <span className="absolute -top-3 right-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
          Huahua
        </span>
      )}
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
}
