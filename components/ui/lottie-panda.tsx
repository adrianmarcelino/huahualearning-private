"use client";

// 16. Lottie Panda
// Source: public/lottie/huahua-panda.json (hand-rolled; see deviations.md)
// Lib: @lottiefiles/react-lottie-player
// Behaviors: idle loop (default), happy segment one-shot on tap, success on form submit.

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player as any),
  { ssr: false }
) as any;

export type PandaPose = "idle" | "happy";

export function LottiePanda({
  className,
  pose = "idle",
  onTapHappy = true
}: {
  className?: string;
  pose?: PandaPose;
  onTapHappy?: boolean;
}) {
  const playerRef = useRef<any>(null);
  const happyRef = useRef(false);

  useEffect(() => {
    if (pose === "happy" && playerRef.current && !happyRef.current) {
      happyRef.current = true;
      try {
        playerRef.current.setPlayerSpeed?.(1.8);
      } catch {}
      setTimeout(() => {
        try {
          playerRef.current?.setPlayerSpeed?.(1);
        } catch {}
        happyRef.current = false;
      }, 1200);
    }
  }, [pose]);

  const onTap = () => {
    if (!onTapHappy) return;
    try {
      playerRef.current?.setPlayerSpeed?.(1.8);
    } catch {}
    setTimeout(() => {
      try {
        playerRef.current?.setPlayerSpeed?.(1);
      } catch {}
    }, 1100);
  };

  return (
    <button
      type="button"
      onClick={onTap}
      onTouchStart={onTap}
      aria-label="Huahua panda"
      className={cn("pointer-events-auto inline-block bg-transparent", className)}
    >
      <Player
        ref={playerRef}
        autoplay
        loop
        src="/lottie/huahua-panda.json"
        style={{ width: "100%", height: "100%" }}
      />
    </button>
  );
}
