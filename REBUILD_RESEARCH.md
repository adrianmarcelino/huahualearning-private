# REBUILD_RESEARCH — v2 visual rebuild references

Phase 0 research. 30+ concrete findings mapped to where they'll be applied in this rebuild.

---

## linear.app — restraint + rhythm

1. **Gradient-only on hero headline copy** — body and feature copy stay flat ink. The gradient is reserved as a focal device, not decoration. **Apply:** Huahua hero — gradient on "Laoshi profesional" segment only, rest of headline stays solid.
2. **Color-blocked section transitions** — each feature module shifts the background subtly (cream → off-white → cream) to mark narrative beats. **Apply:** between cara-kerja, differentiator, bonus, video, laoshi we shift cream tint from `#FBF4EA` → `#F7F0E2` → `#FBF4EA` to keep rhythm without dark mode.
3. **Restrained shadows** — 2-4 px blur, 0.04-0.10 opacity, never a hard drop shadow. **Apply:** all cards use `0 8px 30px rgba(74,107,58,0.10)` not Material-style hard 2-layer shadows.
4. **Staggered scroll reveals using numbered modules** — content is gated to enter as user scrolls, sequenced not simultaneous. **Apply:** phone mockup sticky-pin with 3 numbered panels matches Linear's "1.0 / 2.0 / 3.0".
5. **Avatar clustering as identity device** — Linear groups agent + human avatars to anchor character. **Apply:** Laoshi cards arranged shoulder-to-shoulder, faces face into the row (mirrored layout).
6. **Grid rhythm for complex info** — Linear's timeline uses consistent column widths so the eye doesn't reset. **Apply:** differentiator's 4 cards on identical-width grid, only the Huahua card gets accent treatment.

## vercel.com — bento + accent placement

7. **Asymmetric bento** — cells of unequal aspect ratios; no card matches its neighbor exactly. **Apply:** video library bento — `2-1-1-2` cell pattern, not a uniform 4-up grid.
8. **Card depth via shadow + border together** — Vercel never uses shadow alone; always paired with a 1px border to define edges. **Apply:** bonus cards + differentiator cards both get `border-1 rgba(143,174,109,0.15)` + soft sage shadow.
9. **Single accent color drives all CTAs** — Vercel uses one cyan; mixed accents would dilute it. **Apply:** Huahua primary CTA = sage. Gold reserved for value/price/bonus highlights only.
10. **Hover sequences not just states** — Vercel buttons reveal a shifting arrow + slight lift. **Apply:** every primary button in Huahua gets lift + arrow shift + ShimmerButton sweep.
11. **Light/dark theme duality bypassed** — task says no dark mode. **Apply:** stay light-only, use forest green `#4A6B3A` for the contrast role that dark normally serves.

## framer.com — narrative + density

12. **Broad benefit → specific capability funnel** — hero says "build better sites, faster" then each section narrows. **Apply:** Huahua hero stays broad ("Laoshi profesional"), cara-kerja narrows to mechanism, differentiator narrows to defensibility.
13. **Named social proof beats generic** — "Henry Modisett, Head of Design at Perplexity" with specific quote. **Apply:** Laoshi cards include credential lines like "HSK 6 Native, 8 tahun ngajar siswa Indonesia" not just "experienced teacher".
14. **Content-density rhythm** — Framer alternates dense feature blocks with breathing-room quote/stat blocks. **Apply:** between bonus (dense) and laoshi (calm portrait grid) we leave generous `py-32`.

## monogram.io — weight contrast

15. **Weight contrast over size contrast** — Monogram uses 300 / 600 / 900 weights at moderate sizes rather than huge type. **Apply:** hero headline mixes Inter 900 + Fraunces 400 italic + Inter 900 gradient; never relies on size alone.
16. **One-word hero anchor** — "Monogram" stands alone with subhead. **Apply:** Huahua hero anchors on the verb "Belajar" — the rest of the headline grows from it.

## ui.aceternity.com — components quoted

17. **Spotlight (new)** — layered radial gradients (`gradientFirst/Second/Third`) with `translateY` offset and `xOffset` animation over 7s. **Apply:** differentiator hero halo at low opacity, sage-tinted.
18. **MovingBorder** — animated border around container, `duration` 2000ms default. SVG path or background animation. **Apply:** primary CTA hover state for both Variant A submit and Variant B "Bayar".
19. **BackgroundLines** — SVG paths animating wave pattern, `svgOptions.duration` 10s default. **Apply:** Variant B pricing section secondary layer behind meteors.
20. **Spotlight overlay positioning** — uses translateY negative to bleed above section, paired with bottom-half content. **Apply:** differentiator section gets spotlight bleeding from top to draw the eye into Huahua card.
21. **Aceternity FollowingPointer / cursor** — already used in v1. Keep, refine: smaller dot + larger ring with delay + mix-blend-difference.

## magicui.design — components quoted

22. **AuroraText** — moving gradient via `colors[]` + `speed` multiplier. Default colors fuchsia→purple→blue; we override to sage→forest→gold. CSS keyframes shift `background-position`. **Apply:** hero "Laoshi profesional", differentiator headline, bonus total number.
23. **FlickeringGrid** — SVG-based grid, props `squareSize=4`, `gridGap=6`, `flickerChance=0.3`, `maxOpacity=0.2`. **Apply:** hero top layer at 0.3 opacity, sage color.
24. **BlurFade** — entrance with `blur` (default 6px), `delay`, `direction` (up/down/left/right), `inViewMargin -50px`. **Apply:** word-by-word headline entrance, stagger 80ms.
25. **WordRotate** — vertical word cycle, `words[]` + `duration` 2500ms. **Apply:** video library "1000+ kata. Update tiap minggu. {HSK 1→HSK 2→…→HSK 6}".
26. **AnimatedList** — staggered render with `delay` 1000ms, each item keyed to render once. **Apply:** phone conversation rebuilt on AnimatedList — fixes v1's duplicate bubble bug by enforcing one-render-per-key.
27. **OrbitingCircles** — children distributed around circular path, `radius` 160, `duration` 20s, `reverse` boolean, `iconSize` 30. **Apply:** hero top-right quadrant — 3 orbits (radius 80/140/200) of sage + gold dots, two clockwise + one reverse.
28. **ShimmerButton** — conic gradient + animated background-position around perimeter. Props `shimmerColor`, `shimmerSize 0.05em`, `shimmerDuration 3s`, `borderRadius 100px`, `background`. **Apply:** primary submit button + every "GRATIS" pill in bonus cards.
29. **Ripple** — concentric SVG rings, `mainCircleSize 210`, `mainCircleOpacity 0.24`, `numCircles 8`. **Apply:** tone-score card on phone mockup — ripple under the score number.
30. **BorderBeam** — already in v1. Keep, tighten — slow it down to 8s, gold color on bonus center card to mark it as the hook.

## 21st.dev categories noted

31. **Hero with floating UI mockup** — common 21st pattern where the phone/screen sits diagonal beside copy. **Apply:** phone mockup section uses split layout (sticky phone left, scrolling copy right) on desktop, stacked on mobile.
32. **Pricing reveal-gate** — popular 21st pattern: blurred price + "Reveal" button. **Apply:** Variant B `/direct` opens with "Yakin mau lihat harga?" + reveal click before countdown.
33. **Feature comparison table → card layout shift** — 21st patterns move comparisons out of tables into vertical cards on mobile. **Apply:** differentiator does this — 4 cards row → stacked column on `< md`.

## awwwards.com — light-palette references

34. **fromanother.love** (Site of the Day 2026-05-14, Dev Award) — cream/off-white palette with kinetic-typography hero, scroll-staged reveals. **Apply:** scroll-staged numbered cara-kerja modules borrow this pacing.
35. **Happly (gethapply.com)** (SOTD 2026-05-12, Dev Award) — warm-neutral palette with playful spring motion + custom illustration accents. **Apply:** Huahua mascot decision — adopt the kinetic-typography hero approach instead of cartoon mascot (see hero decision below).
36. **Mads Matters (better-environment-654310.framer.app)** — minimal light palette with single accent color. **Apply:** confirms our cream + sage + gold restraint is on-trend.
37. **XOX (xox.makemepulse.com)** (SOTD 2026-05-10, Dev Award) — light bg with bold WebGL accents. **Apply:** OrbitingCircles in hero is the cheap WebGL-feel substitute.
38. **ASTRODITHER (astrodither.robertborghesi.is)** (SOTD 2026-05-05, Dev Award) — light palette with grain texture + retro grid. **Apply:** consider grain noise overlay at 4% opacity on hero (already in `globals.css` `.bg-noise`).

## Synthesis — mascot decision

39. **Drop cartoon panda mascot.** Adopt option (a) from prompt: massive 华 character behind hero headline at 8% sage opacity, slow ±3deg rotation. Reasons: (i) v1 cartoon panda read kindergarten per user feedback, (ii) Happly + fromanother.love confirm kinetic typography beats illustration in this palette, (iii) wordmark-as-watermark is a Linear/Framer-tier move.

## Synthesis — depth strategy without dark mode

40. **Use forest #4A6B3A as the "dark" role.** Apply on: Huahua differentiator card bg, mascot watermark (8% opacity), the deep accent in AuroraText gradient, gold price contrast on Variant B section, dot/check details. This gives perceived depth without dropping out of light palette.

---

End Phase 0. 40 concrete findings, all mapped to a section. Proceed to Phase 1.
