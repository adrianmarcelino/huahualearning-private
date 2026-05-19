# Three.js examples — shader + scene refs

Source: https://threejs.org/examples + https://github.com/mrdoob/three.js

## Examples relevant to v3 ambient

1. **webgl_shader (Monjori)** — https://github.com/mrdoob/three.js/blob/dev/examples/webgl_shader.html
   - Fragment shader, animated UV procedural pattern via trig functions.
   - Saved raw at `research/sources/threejs-monjori-shader.glsl`
   - Applied: our `<AmbientShaderPlane />` adapts the time-driven trig pattern but swaps the noisy
     output palette for sage/forest/gold gradients clamped to readable opacity.

2. **webgl_postprocessing_unreal_bloom** — https://github.com/mrdoob/three.js/blob/dev/examples/webgl_postprocessing_unreal_bloom.html
   - Bloom postprocess chain (RenderPass → UnrealBloomPass → OutputPass).
   - Saved notes: `research/sources/threejs-postprocessing-bloom.md`
   - NOT applied — would push GPU cost over budget. Reserved for future mascot-only glow.

3. **webgl_fog** — https://threejs.org/examples/?q=fog#webgl_fog
   - `scene.fog = new Fog(color, near, far)`.
   - Applied to mascot scene: cream-tinted fog softens edges so it integrates with cream page bg.

4. **webgl_particles** — https://threejs.org/examples/?q=particles
   - Point clouds or instanced meshes for drifting particles.
   - Applied: drei `<Float>` wrapping small `<mesh>` primitives in `<AmbientParticles />`.

5. **webgl_lights_pointlights** — https://threejs.org/examples/?q=lights
   - Multiple point lights for cheek-highlight on character meshes.
   - Applied: 1 directional + 1 ambient + drei `<Environment preset="sunset" />` for the mascot canvas.
