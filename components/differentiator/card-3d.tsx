"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { BorderBeam } from "@/components/ui/border-beam";
import { useAppState } from "@/lib/state-context";

// 3D-tilt cards.
// Sources (proof):
//   - Aceternity ThreeDCard: research/sources/aceternity-3d-card.tsx (mouse-tracked rotateXY)
//   - Magic UI BorderBeam: research/sources/magicui-border-beam.tsx
// Customization: tilt amplified to ±10deg (spec STATE 3), 5-particle CSS burst on hover,
// mascot listening + lookAt + sibling dim via parent state.

function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { rx, ry, onMove, onLeave };
}

function useHoverWire({
  cardId,
  hovered,
  setHovered,
  ref
}: {
  cardId: string;
  hovered: string | null;
  setHovered: (s: string | null) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const { setMascotPose, setMascotLookAt } = useAppState();
  const isHovered = hovered === cardId;
  const isAnotherHovered = hovered !== null && hovered !== cardId;

  useEffect(() => {
    if (isHovered) {
      setMascotPose("listening");
      const r = ref.current?.getBoundingClientRect();
      if (r) setMascotLookAt({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  }, [isHovered, setMascotPose, setMascotLookAt, ref]);

  return {
    isHovered,
    isAnotherHovered,
    onEnter: () => setHovered(cardId),
    onLeave: () => {
      if (hovered === cardId) setHovered(null);
      setMascotPose("idle");
    }
  };
}

function ParticleBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute bottom-6 h-1.5 w-1.5 rounded-full bg-sage shadow-[0_0_6px_rgba(143,174,109,0.6)]"
          style={{
            left: `${20 + i * 15}%`,
            animation: `particle-up 1.5s ease-out ${i * 0.12}s forwards`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function ProviderCard({
  name,
  dot,
  children,
  cardId,
  hovered,
  setHovered
}: {
  name: string;
  dot: string;
  children: React.ReactNode;
  cardId: string;
  hovered: string | null;
  setHovered: (s: string | null) => void;
}) {
  const t = useTilt();
  const ref = useRef<HTMLDivElement>(null);
  const h = useHoverWire({ cardId, hovered, setHovered, ref });

  return (
    <motion.div
      ref={ref}
      onMouseMove={t.onMove}
      onMouseLeave={() => {
        t.onLeave();
        h.onLeave();
      }}
      onMouseEnter={h.onEnter}
      style={{ rotateX: t.rx, rotateY: t.ry, transformPerspective: 1200 }}
      animate={{ opacity: h.isAnotherHovered ? 0.6 : 1, y: h.isHovered ? -8 : 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative h-full rounded-3xl border border-sage/15 bg-white p-8 shadow-soft"
    >
      <ParticleBurst active={h.isHovered} />
      <div className="mb-6 flex items-center gap-2">
        <span className="h-4 w-4 rounded-full" style={{ background: dot }} />
        <div className="font-display text-lg font-bold text-ink-deep">{name}</div>
      </div>
      {children}
    </motion.div>
  );
}

export function HuahuaCard({
  children,
  cardId,
  hovered,
  setHovered
}: {
  children: React.ReactNode;
  cardId: string;
  hovered: string | null;
  setHovered: (s: string | null) => void;
}) {
  const t = useTilt();
  const ref = useRef<HTMLDivElement>(null);
  const h = useHoverWire({ cardId, hovered, setHovered, ref });

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const r = (e.target as HTMLElement).getBoundingClientRect();
            confetti({
              particleCount: 60,
              spread: 70,
              startVelocity: 28,
              origin: {
                x: (r.left + r.width / 2) / window.innerWidth,
                y: (r.top + r.height / 2) / window.innerHeight
              },
              colors: ["#8FAE6D", "#F6E3A1", "#FFD700", "#FBF4EA"]
            });
            obs.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full pt-4">
      <span
        className="absolute -top-1 right-6 z-20 rounded-full bg-gold-bright px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-ink-deep shadow-md"
        style={{ boxShadow: "0 8px 24px rgba(255,215,0,0.4)" }}
      >
        Huahua
      </span>

      <motion.div
        onMouseMove={t.onMove}
        onMouseLeave={() => {
          t.onLeave();
          h.onLeave();
        }}
        onMouseEnter={h.onEnter}
        style={{
          rotateX: t.rx,
          rotateY: t.ry,
          transformPerspective: 1200,
          background: "linear-gradient(135deg, #8FAE6D 0%, #4A6B3A 100%)"
        }}
        animate={{ opacity: h.isAnotherHovered ? 0.65 : 1, y: h.isHovered ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="relative h-full overflow-hidden rounded-3xl p-8 text-white shadow-soft-lg"
      >
        <BorderBeam
          size={140}
          duration={h.isHovered ? 3 : 8}
          colorFrom="#FFD700"
          colorTo="#F6E3A1"
        />
        <ParticleBurst active={h.isHovered} />
        <FloatingParticles />
        <div className="relative">
          <div className="mb-6 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 backdrop-blur text-sm font-bold">
              华
            </span>
            <div className="font-display text-lg font-black">Huahua AI Laoshi</div>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function FloatingParticles() {
  const dots = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold/80 shadow-[0_0_6px_rgba(255,215,0,0.7)]"
          initial={{ x: Math.random() * 280, y: 300, opacity: 0 }}
          animate={{ y: -40, opacity: [0, 1, 0] }}
          transition={{ duration: 4 + Math.random() * 3, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
