"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { formatRupiah } from "@/lib/utils";
import { useProximityLift } from "@/lib/proximity-lift";

export function BonusCard({
  title,
  sub,
  normal,
  index,
  featured,
  badge
}: {
  title: string;
  sub: string;
  normal: number | null;
  index: number;
  featured?: boolean;
  badge?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { style } = useProximityLift(ref, 220, 3);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={style}
      className={
        "relative h-full pt-4 " + (featured ? "lg:scale-[1.04]" : "")
      }
    >
      {/* HOOK badge — sits ABOVE the card, never clips */}
      {featured && (
        <span
          className="absolute -top-1 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gold-bright px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-ink-deep"
          style={{ boxShadow: "0 10px 24px rgba(255,215,0,0.4)" }}
        >
          ★ Hook
        </span>
      )}

      <div
        className={
          "relative h-full overflow-hidden rounded-3xl bg-white p-6 shadow-soft " +
          (featured ? "border-2 border-gold-bright/70" : "border border-sage/15")
        }
      >
        <BorderBeam
          size={featured ? 160 : 120}
          duration={featured ? 6 : 9}
          delay={index * 1.5}
          colorFrom={featured ? "#FFD700" : "#8FAE6D"}
          colorTo={featured ? "#F6E3A1" : "#F6E3A1"}
        />

        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sage">
          Bonus {index + 1}
        </div>
        <h3 className="font-display text-xl font-black leading-tight text-ink-deep md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{sub}</p>

        <div className="mt-6 flex items-center justify-between">
          {normal !== null ? (
            <span className="text-xs text-muted line-through">Normal {formatRupiah(normal)}</span>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">{badge}</span>
          )}
          <ShimmerButton
            background={featured ? "#FFD700" : "#8FAE6D"}
            shimmerColor={featured ? "#FFFFFF" : "#F6E3A1"}
            className="h-9 px-4 text-xs font-black uppercase tracking-[0.2em]"
            style={featured ? { color: "#2C2A26" } : undefined}
          >
            Gratis
          </ShimmerButton>
        </div>
      </div>
    </motion.div>
  );
}
