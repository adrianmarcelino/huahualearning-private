"use client";

// Hero-sized mascot Canvas. Visible until user scrolls past 8% of page. On first scroll-past it
// triggers a 1s wave pose, then fades to opacity 0. Coming back triggers wave again.
// Wires STATES 4 (scroll out) + 10 (scroll back).

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MascotCanvas } from "@/components/mascot/MascotCanvas";
import { useAppState } from "@/lib/state-context";

export function HeroMascot() {
  const { scrollProgress, setMascotPose } = useAppState();
  const wasPast = useRef(false);
  const wasBack = useRef(true);

  useEffect(() => {
    const past = scrollProgress > 0.08;
    if (past && !wasPast.current) {
      setMascotPose("wave", 1000);
      wasPast.current = true;
      wasBack.current = false;
    } else if (!past && wasPast.current && !wasBack.current) {
      setMascotPose("wave", 1000);
      wasBack.current = true;
      wasPast.current = false;
    }
  }, [scrollProgress, setMascotPose]);

  const visible = scrollProgress < 0.08;
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-10 mx-auto h-64 w-64 -translate-y-1/4 md:h-80 md:w-80"
    >
      <MascotCanvas scale={1.4} className="h-full w-full" />
    </motion.div>
  );
}
