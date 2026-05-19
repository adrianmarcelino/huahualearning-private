"use client";

// 30 sage/gold spheres + 15 tetrahedrons floating with depth parallax.
// Source: drei <Float> https://github.com/pmndrs/drei#float
// Customization: deeper-z items have slower floatIntensity to fake parallax, palette swap.

import { Float } from "@react-three/drei";
import { useMemo } from "react";

export function AmbientParticles() {
  const spheres = useMemo(
    () => Array.from({ length: 30 }).map(() => ({
      pos: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6, -1 + Math.random() * -2] as [number, number, number],
      size: 0.04 + Math.random() * 0.06,
      color: Math.random() > 0.4 ? "#8FAE6D" : "#F6E3A1",
      speed: 0.4 + Math.random() * 0.6
    })),
    []
  );
  const tetra = useMemo(
    () => Array.from({ length: 15 }).map(() => ({
      pos: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6, -1 + Math.random() * -2] as [number, number, number],
      size: 0.05 + Math.random() * 0.07,
      color: "#4A6B3A",
      speed: 0.3 + Math.random() * 0.5
    })),
    []
  );

  return (
    <>
      {spheres.map((p, i) => (
        <Float key={`s${i}`} speed={p.speed} rotationIntensity={0.4} floatIntensity={0.8 + p.pos[2] * 0.2}>
          <mesh position={p.pos}>
            <sphereGeometry args={[p.size, 14, 14]} />
            <meshStandardMaterial color={p.color} roughness={0.6} transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
      {tetra.map((p, i) => (
        <Float key={`t${i}`} speed={p.speed} rotationIntensity={1.2} floatIntensity={0.5}>
          <mesh position={p.pos} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
            <tetrahedronGeometry args={[p.size]} />
            <meshStandardMaterial color={p.color} roughness={0.4} transparent opacity={0.5} />
          </mesh>
        </Float>
      ))}
    </>
  );
}
