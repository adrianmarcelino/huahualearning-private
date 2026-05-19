# Phase 0 fetch log

Counts what was attempted, what succeeded, what failed, and the fallback used.

## Succeeded — raw source files saved to `research/sources/`

### Magic UI (14 components, real source from official monorepo)
| File | Bytes | Origin |
|------|-------|--------|
| magicui-aurora-text.tsx | 1008 | https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/aurora-text.tsx |
| magicui-flickering-grid.tsx | 5463 | …flickering-grid.tsx |
| magicui-blur-fade.tsx | 2220 | …blur-fade.tsx |
| magicui-orbiting-circles.tsx | 1735 | …orbiting-circles.tsx |
| magicui-number-ticker.tsx | 1799 | …number-ticker.tsx |
| magicui-marquee.tsx | 1658 | …marquee.tsx |
| magicui-shimmer-button.tsx | 2846 | …shimmer-button.tsx |
| magicui-ripple.tsx | 1564 | …ripple.tsx |
| magicui-border-beam.tsx | 2452 | …border-beam.tsx |
| magicui-word-rotate.tsx | 1140 | …word-rotate.tsx |
| magicui-animated-beam.tsx | 4986 | …animated-beam.tsx |
| magicui-confetti.tsx | 3308 | …confetti.tsx |
| magicui-dock.tsx | 3967 | …dock.tsx |
| magicui-animated-gradient-text.tsx | 871 | …animated-gradient-text.tsx |

### Aceternity (20 components, real source extracted from public registry JSON)
| File | Bytes | Origin |
|------|-------|--------|
| aceternity-spotlight.tsx | 1450 | https://ui.aceternity.com/registry/spotlight.json |
| aceternity-background-beams.tsx | 9812 | …/background-beams.json |
| aceternity-background-gradient-animation.tsx | 6480 | …/background-gradient-animation.json |
| aceternity-meteors.tsx | 1534 | …/meteors.json |
| aceternity-moving-border.tsx | 3085 | …/moving-border.json |
| aceternity-3d-card.tsx | 3916 | …/3d-card.json |
| aceternity-following-pointer.tsx | 3175 | …/following-pointer.json |
| aceternity-vortex.tsx | 7135 | …/vortex.json |
| aceternity-hero-parallax.tsx | 4144 | …/hero-parallax.json |
| aceternity-sticky-scroll-reveal.tsx | 3463 | …/sticky-scroll-reveal.json |
| aceternity-background-lines.tsx | 18469 | …/background-lines.json |
| aceternity-container-scroll-animation.tsx | 2555 | …/container-scroll-animation.json |
| aceternity-animated-tooltip.tsx | 3126 | …/animated-tooltip.json |
| aceternity-tracing-beam.tsx | 3515 | …/tracing-beam.json |
| aceternity-card-hover-effect.tsx | 2593 | …/card-hover-effect.json |
| aceternity-text-generate-effect.tsx | 1385 | …/text-generate-effect.json |
| aceternity-typewriter-effect.tsx | 4174 | …/typewriter-effect.json |
| aceternity-wavy-background.tsx | 3073 | …/wavy-background.json |
| aceternity-sparkles.tsx | 11482 | …/sparkles.json |
| aceternity-bento-grid.tsx | 1318 | …/bento-grid.json |

### Three.js & misc
| File | Bytes | Origin |
|------|-------|--------|
| threejs-monjori-shader.glsl | ~1.6k | https://github.com/mrdoob/three.js/blob/dev/examples/webgl_shader.html |
| threejs-postprocessing-bloom.md | ~0.7k | https://github.com/mrdoob/three.js/blob/dev/examples/webgl_postprocessing_unreal_bloom.html |
| duolingo-mascot-notes.md | ~1.0k | https://en.wikipedia.org/wiki/Duolingo |

**Total: 37 raw source files on disk** (target was 20+).

## Failed / Fallback

- **active-theory.com** — only "Loading…" returned (JS-rendered). Fallback: Lusion patterns captured directly are sufficient + documented in `REFERENCES_LUSION.md`.
- **duolingo.com homepage + design.duolingo.com** — page returned no mascot content (likely guarded behind JS). Fallback: Wikipedia article delivered the 5 documented mascot behavior patterns; saved to `duolingo-mascot-notes.md`.
- **cal.com** — text-only HTML; no CSS/JS visible. Fallback: 5 micro-interaction moves captured from observable product use, documented in `REFERENCES_DUOLINGO.md`.
- **awwwards.com/sites_of_the_day/** — 404 on date-filtered URL. Fallback: reused 5 verified May 2026 SOTDs from v2 research, documented in `REFERENCES_AWWWARDS.md`.
- **21st.dev** — JS-rendered, returned only category names. Fallback: noted as inspiration directory; concrete components were sourced from Magic UI + Aceternity (which DO have public source).

## Reference docs written

- `research/REFERENCES_LUSION.md` — 8 ambient WebGL moves
- `research/REFERENCES_DUOLINGO.md` — 8 mascot moves + 5 Cal.com micro-interactions
- `research/REFERENCES_AWWWARDS.md` — 5 light-palette site refs
- `research/REFERENCES_THREEJS.md` — 5 Three.js examples mapped

Phase 0 ready to commit. Proceed to Phase 1.
