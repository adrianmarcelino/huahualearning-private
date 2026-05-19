"use client";

// Desktop ambient WebGL — fullscreen fixed Canvas at z-0, pointer-events none, opacity 0.55.
// Sources:
//   - Lusion WebGL canvas pattern (research/REFERENCES_LUSION.md item 1)
//   - Three.js shader plane (research/sources/threejs-monjori-shader.glsl)
// Customization: desktop-only, opacity capped to 0.55 to keep cream readable, mobile fallback
// rendered separately as CssBlobAmbient.

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useAppState } from "@/lib/state-context";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const ShaderPlane = dynamic(() => import("./ShaderPlane").then((m) => m.ShaderPlane), { ssr: false });
const AmbientParticles = dynamic(() => import("./AmbientParticles").then((m) => m.AmbientParticles), { ssr: false });
const CssBlobAmbient = dynamic(() => import("./CssBlobAmbient").then((m) => m.CssBlobAmbient), { ssr: false });

export function AmbientCanvas() {
  const { isDesktop } = useAppState();
  if (!isDesktop) return <CssBlobAmbient />;
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 h-screen w-screen opacity-55" aria-hidden style={{ opacity: 0.55 }}>
      <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 5] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <ShaderPlane />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={0.6} />
          <AmbientParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
