# Lusion + Active Theory + Unseen Studio — ambient WebGL refs

Source: https://lusion.co, https://active-theory.com, https://www.unseen-studio.com

Active Theory returned only "Loading…" via WebFetch (JS-rendered). Notes synthesized from Lusion's
observable techniques as documented.

## 8 specific moves to fuse into v3

1. **WebGL background canvas behind everything**
   - Lusion paints continuous depth via fullscreen Canvas.
   - Apply: `<AmbientCanvas />` at `components/ambient/AmbientCanvas.tsx`, position fixed inset-0, z-0, pointer-events none, opacity 0.55.

2. **Mouse-reactive shader uniforms**
   - Cursor position drives shader warp center.
   - Apply: shader uniform `uMouse vec2` updated per mousemove via React context (`StateContext.cursor`).

3. **Scroll-triggered depth shifts**
   - Page content gains parallax as user scrolls; gradient direction bends.
   - Apply: shader uniform `uScroll float = window.scrollY / scrollHeight` updated on scroll.

4. **Particle system w/ depth parallax**
   - Floating elements disperse + congregate, deeper particles move slower.
   - Apply: 30 `<Float>` primitives in `<AmbientParticles />`, z-position 0 to -3, speed lerps slower with -z.

5. **Blob distortion morphing**
   - Organic shapes warp on proximity.
   - Apply: aurora blob bg shape on cursor proximity — clip-path morph or extra `uniform float uMouseBlob`.

6. **Idle motion loop — never frozen**
   - Continuous breathing/float/drift when user inactive.
   - Apply: every component owns an idle animation (mascot breath, marquee scroll, orbits, watermark rock).

7. **Interactive reel controls** — N/A for our project but informs:
   - Visible state badges (e.g., "Scroll", "Tap to replay") reinforce affordance.
   - Apply: hero "Scroll" chevron + tap-to-replay ring in phone mockup.

8. **Scroll-gated content reveals**
   - "Keep Scrolling to Learn More" text triggers disclosure.
   - Apply: STATE 4 makes phone sticky-pin & mascot pose wave + hero fade.
