"use client";

// Background Boxes — perf rewrite.
// Original: 2880 motion.div elements + 2880 hover handlers. Killed mobile fps.
// New: pure CSS layered linear-gradients (2 thin sage grid lines) under same
// skew transform. Zero motion components, zero DOM nodes. Visually identical
// at the 20% opacity we render hero at.

import React from "react";
import { cn } from "@/lib/utils";

function Core({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      style={{
        transform: "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.65) translateZ(0)",
        backgroundImage:
          "linear-gradient(to right, rgba(143,174,109,0.40) 1px, transparent 1px), linear-gradient(to bottom, rgba(143,174,109,0.40) 1px, transparent 1px)",
        backgroundSize: "64px 32px"
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-30",
        className
      )}
    />
  );
}

export const Boxes = React.memo(Core);
