"use client";

// Ambient flowing sage gradient noise plane.
// Adapted from Three.js Monjori example:
//   https://github.com/mrdoob/three.js/blob/dev/examples/webgl_shader.html
//   research/sources/threejs-monjori-shader.glsl
// Customization: stripped Monjori's noisy palette, replaced with smooth sage→forest→gold
// gradient driven by simplex-like noise. uMouse pulls warp center toward cursor.
// uScroll bends the gradient direction so the page feels like it's tilting.

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useAppState } from "@/lib/state-context";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec3 cCream;
  uniform vec3 cSage;
  uniform vec3 cForest;
  uniform vec3 cGold;

  // 2D simplex-ish noise (cheap version)
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash3(i + vec2(0,0)).xy - 0.5, f - vec2(0,0)),
                   dot(hash3(i + vec2(1,0)).xy - 0.5, f - vec2(1,0)), u.x),
               mix(dot(hash3(i + vec2(0,1)).xy - 0.5, f - vec2(0,1)),
                   dot(hash3(i + vec2(1,1)).xy - 0.5, f - vec2(1,1)), u.x), u.y) * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    // bend gradient direction with scroll
    float bend = uScroll * 0.6;
    vec2 p = uv - 0.5;
    p = mat2(cos(bend), -sin(bend), sin(bend), cos(bend)) * p;
    p += 0.5;

    // warp center toward mouse
    vec2 m = uMouse;
    float d = distance(uv, m);
    float pull = exp(-d * 3.0) * 0.18;
    p += (m - uv) * pull;

    // multi-octave noise
    float n = 0.0;
    n += noise(p * 1.6 + uTime * 0.05) * 0.55;
    n += noise(p * 3.4 - uTime * 0.07) * 0.30;
    n += noise(p * 8.0 + uTime * 0.12) * 0.15;

    // palette mix — cream baseline, sage mid, forest deep, gold flecks at peaks
    vec3 col = cCream;
    col = mix(col, cSage, smoothstep(0.35, 0.65, n));
    col = mix(col, cForest, smoothstep(0.65, 0.85, n));
    col = mix(col, cGold, smoothstep(0.86, 0.98, n) * 0.55);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { cursorNorm, scrollProgress } = useAppState();
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      cCream: { value: new THREE.Color("#FBF4EA") },
      cSage: { value: new THREE.Color("#8FAE6D") },
      cForest: { value: new THREE.Color("#4A6B3A") },
      cGold: { value: new THREE.Color("#F6E3A1") }
    }),
    []
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    // lerp toward cursor for smoothness
    const target = uniforms.uMouse.value;
    target.x += (cursorNorm.x - target.x) * 0.06;
    target.y += (1 - cursorNorm.y - target.y) * 0.06;
    uniforms.uScroll.value += (scrollProgress - uniforms.uScroll.value) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial ref={matRef} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}
