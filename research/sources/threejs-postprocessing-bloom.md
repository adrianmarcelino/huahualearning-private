# Three.js UnrealBloomPass — reference notes

Source: https://github.com/mrdoob/three.js/blob/dev/examples/webgl_postprocessing_unreal_bloom.html

## Passes
1. RenderPass — renders the initial scene with the 3D model
2. UnrealBloomPass — applies bloom effect for glowing highlights
3. OutputPass — finalizes rendered output

## Uniforms
- threshold (0.0-1.0) — pixel brightness cutoff for bloom
- strength (0.0-3.0) — bloom intensity
- radius (0.0-1.0) — glow spread
- exposure (0.1-2.0) — tone-mapping brightness

## Applied to our scene
Not used directly in v3 — adds GPU cost we cannot afford at 0.55 opacity ambient.
Captured here so the noise+blob composition stays the only thing on the GPU.
Future: enable for the 3D mascot only if perf budget allows.
