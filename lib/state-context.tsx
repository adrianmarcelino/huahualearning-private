"use client";

// Global reactive state context. Drives ambient WebGL uniforms, mascot pose/lookAt,
// proximity-lift on cards, and cursor trail.
// References (proof):
//   - Lusion shader-driven mousemove: research/REFERENCES_LUSION.md item 2
//   - Duolingo mascot pose machine: research/REFERENCES_DUOLINGO.md item 4

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type MascotPose = "idle" | "listening" | "happy" | "cheer" | "thinking" | "wave";

type StateCtx = {
  cursor: { x: number; y: number };
  cursorNorm: { x: number; y: number }; // 0..1 across viewport
  scrollProgress: number; // 0..1
  mascotPose: MascotPose;
  setMascotPose: (p: MascotPose, holdMs?: number) => void;
  mascotLookAt: { x: number; y: number }; // world coords
  setMascotLookAt: (p: { x: number; y: number }) => void;
  isDesktop: boolean;
  pulse: () => void; // increments to trigger one-shot scenes
  pulseTick: number;
};

const Ctx = createContext<StateCtx | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorNorm, setCursorNorm] = useState({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pose, setPose] = useState<MascotPose>("idle");
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [pulseTick, setPulseTick] = useState(0);

  const poseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setMascotPose = useCallback((p: MascotPose, holdMs?: number) => {
    setPose(p);
    if (poseTimer.current) clearTimeout(poseTimer.current);
    if (holdMs) poseTimer.current = setTimeout(() => setPose("idle"), holdMs);
  }, []);

  const pulse = useCallback(() => setPulseTick((x) => x + 1), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);

    const onMouse = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      setCursorNorm({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      if (poseTimer.current) clearTimeout(poseTimer.current);
    };
  }, []);

  const value = useMemo(
    () => ({ cursor, cursorNorm, scrollProgress, mascotPose: pose, setMascotPose, mascotLookAt: lookAt, setMascotLookAt: setLookAt, isDesktop, pulse, pulseTick }),
    [cursor, cursorNorm, scrollProgress, pose, setMascotPose, lookAt, isDesktop, pulse, pulseTick]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be inside <StateProvider>");
  return v;
}
