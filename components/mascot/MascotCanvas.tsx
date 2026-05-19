"use client";

// Mascot canvas wrapper — separate from AmbientCanvas. Positioned absolutely by parent.
// Sources:
//   - react-three-fiber Canvas: https://r3f.docs.pmnd.rs
//   - drei Environment + ContactShadows (see Mascot3D)

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const Mascot3D = dynamic(() => import("./Mascot3D").then((m) => m.Mascot3D), { ssr: false });

export function MascotCanvas({
  className,
  scale = 1,
  position = [0, -0.4, 0]
}: {
  className?: string;
  scale?: number;
  position?: [number, number, number];
}) {
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden>
      <Canvas camera={{ position: [0, 0.3, 2.6], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Mascot3D scale={scale} position={position} />
        </Suspense>
      </Canvas>
    </div>
  );
}
