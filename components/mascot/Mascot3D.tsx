"use client";

// 3D mascot with pose state machine.
// FINAL MODEL: drop GLB at /public/mascot/huahua.glb (sketchfab/polypizza/fab.com)
// Current state: PLACEHOLDER procedural panda — replace before launch.
//
// Sources (proof):
//   - drei Float wrapper: https://github.com/pmndrs/drei#float
//   - drei Environment: https://github.com/pmndrs/drei#environment
//   - drei ContactShadows: https://github.com/pmndrs/drei#contactshadows
//   - drei useGLTF: https://github.com/pmndrs/drei#usegltf
//   - Duolingo pose machine ref: research/REFERENCES_DUOLINGO.md items 1-8
// Customization: panda palette black/white, idle breathing 1.0↔1.02, cheer scale 1.15 +
// rotation.z wobble, listening rotateY clamped ±15deg, saccade interval 4-6s random.

import { ContactShadows, Environment, Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { MascotPose, useAppState } from "@/lib/state-context";

const GLB_PATH = "/mascot/huahua.glb";

export function Mascot3D({ scale = 1, position = [0, -0.4, 0] as [number, number, number] }: { scale?: number; position?: [number, number, number] }) {
  const [hasGLB, setHasGLB] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(GLB_PATH, { method: "HEAD" })
      .then((r) => {
        if (!alive) return;
        if (r.ok) {
          console.info("[Mascot3D] GLB found — using real model");
          setHasGLB(true);
        } else {
          console.info("[Mascot3D] GLB missing — falling back to procedural panda");
          setHasGLB(false);
        }
      })
      .catch(() => {
        if (alive) {
          console.info("[Mascot3D] GLB fetch errored — procedural panda fallback");
          setHasGLB(false);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  if (hasGLB === null) return null;
  return (
    <>
      <Environment preset="sunset" />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.35} scale={4} blur={2.2} far={2} color="#4A6B3A" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={0.9} color="#FBF4EA" />
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        {hasGLB ? <GLBMascot scale={scale} position={position} /> : <ProceduralPanda scale={scale} position={position} />}
      </Float>
    </>
  );
}

function GLBMascot({ scale, position }: { scale: number; position: [number, number, number] }) {
  const { scene } = useGLTF(GLB_PATH) as any;
  const ref = useRef<THREE.Group>(null);
  useDriveTransform(ref);
  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
}

function ProceduralPanda({ scale, position }: { scale: number; position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const leftPupil = useRef<THREE.Mesh>(null);
  const rightPupil = useRef<THREE.Mesh>(null);
  const arm = useRef<THREE.Mesh>(null);

  const saccadeRef = useRef({ next: 0, target: new THREE.Vector2(0, 0) });
  const waveRef = useRef({ start: -1, count: 0 });
  const { mascotPose, mascotLookAt, cursorNorm } = useAppState();

  useDriveTransform(group);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (!group.current || !body.current || !leftPupil.current || !rightPupil.current) return;

    // breathing — idle scale 1.0 ↔ 1.02 period 2.5s
    const breath = 1 + Math.sin(t * (Math.PI * 2 / 2.5)) * 0.01;
    const targetScaleBody = mascotPose === "cheer" ? 1.15 : mascotPose === "happy" ? 1.1 : breath;
    body.current.scale.x += (targetScaleBody - body.current.scale.x) * 0.18;
    body.current.scale.y += (targetScaleBody - body.current.scale.y) * 0.18;
    body.current.scale.z += (targetScaleBody - body.current.scale.z) * 0.18;

    // head rotation
    let targetRotY = 0;
    let targetRotX = 0;
    let targetRotZ = 0;
    if (mascotPose === "listening") {
      targetRotY = THREE.MathUtils.clamp((cursorNorm.x - 0.5) * 1.4, -0.28, 0.28);
      targetRotX = THREE.MathUtils.clamp((cursorNorm.y - 0.5) * 0.6, -0.18, 0.18);
    } else if (mascotPose === "thinking") {
      targetRotX = -0.18;
      targetRotY = 0.05;
    } else if (mascotPose === "cheer") {
      targetRotZ = Math.sin(t * 14) * 0.08;
    } else if (mascotPose === "idle") {
      targetRotY = Math.sin(t * 0.4) * 0.05; // slow turn
    }
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.1;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.1;
    group.current.rotation.z += (targetRotZ - group.current.rotation.z) * 0.18;

    // pupil tracking
    let pupilTargetX = 0;
    let pupilTargetY = 0;
    let pupilScaleY = 1;
    if (mascotPose === "listening") {
      pupilTargetX = (cursorNorm.x - 0.5) * 0.06;
      pupilTargetY = -(cursorNorm.y - 0.5) * 0.04;
    } else if (mascotPose === "thinking") {
      pupilTargetX = -0.04;
      pupilTargetY = 0.04;
    } else if (mascotPose === "happy" || mascotPose === "cheer") {
      pupilScaleY = 0.3; // squint
    } else if (mascotPose === "idle") {
      // saccade every 4-6s
      if (t > saccadeRef.current.next) {
        saccadeRef.current.target.set((Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.04);
        saccadeRef.current.next = t + 4 + Math.random() * 2;
      }
      pupilTargetX = saccadeRef.current.target.x;
      pupilTargetY = saccadeRef.current.target.y;
    }
    [leftPupil, rightPupil].forEach((r, i) => {
      const base = i === 0 ? -0.22 : 0.22;
      r.current!.position.x += (base + pupilTargetX - r.current!.position.x) * 0.2;
      r.current!.position.y += (0.18 + pupilTargetY - r.current!.position.y) * 0.2;
      r.current!.scale.y += (pupilScaleY - r.current!.scale.y) * 0.2;
    });

    // wave arm
    if (mascotPose === "wave") {
      if (waveRef.current.start < 0) {
        waveRef.current.start = t;
        waveRef.current.count = 0;
      }
      const elapsed = t - waveRef.current.start;
      if (arm.current) {
        arm.current.rotation.z = Math.sin(elapsed * 8) * 1.05;
      }
    } else {
      waveRef.current.start = -1;
      if (arm.current) arm.current.rotation.z += (0 - arm.current.rotation.z) * 0.2;
    }
  });

  return (
    <group ref={group} scale={scale} position={position}>
      {/* body (head) */}
      <mesh ref={body}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.55} />
      </mesh>
      {/* ears */}
      <mesh position={[-0.45, 0.45, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#2C2A26" roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 0.45, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#2C2A26" roughness={0.7} />
      </mesh>
      {/* eye patches */}
      <mesh position={[-0.22, 0.18, 0.5]} scale={[0.18, 0.22, 0.18]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#2C2A26" roughness={0.6} />
      </mesh>
      <mesh position={[0.22, 0.18, 0.5]} scale={[0.18, 0.22, 0.18]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#2C2A26" roughness={0.6} />
      </mesh>
      {/* pupils */}
      <mesh ref={leftPupil} position={[-0.22, 0.18, 0.6]}>
        <sphereGeometry args={[0.04, 18, 18]} />
        <meshStandardMaterial color="#FBF4EA" emissive="#FBF4EA" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={rightPupil} position={[0.22, 0.18, 0.6]}>
        <sphereGeometry args={[0.04, 18, 18]} />
        <meshStandardMaterial color="#FBF4EA" emissive="#FBF4EA" emissiveIntensity={0.2} />
      </mesh>
      {/* nose */}
      <mesh position={[0, -0.02, 0.6]}>
        <sphereGeometry args={[0.06, 18, 18]} />
        <meshStandardMaterial color="#2C2A26" roughness={0.4} />
      </mesh>
      {/* cheek dots */}
      <mesh position={[-0.36, -0.05, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#F6E3A1" roughness={0.6} opacity={0.7} transparent />
      </mesh>
      <mesh position={[0.36, -0.05, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#F6E3A1" roughness={0.6} opacity={0.7} transparent />
      </mesh>
      {/* wave arm (off body, side) */}
      <mesh ref={arm} position={[0.7, -0.05, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#2C2A26" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Shared lookAt drift wiring for either GLB or procedural panda group.
function useDriveTransform(_ref: React.RefObject<THREE.Group | null>) {
  const { mascotLookAt } = useAppState();
  // Currently handled inline in ProceduralPanda via cursorNorm. Hook reserved for the GLB case so
  // the real model can be steered without internal mesh refs.
}

useGLTF.preload(GLB_PATH);
