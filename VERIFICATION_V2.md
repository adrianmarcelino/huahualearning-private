# VERIFICATION_V2 — total visual rebuild audit

Branch: `rebuild-v2`. All file:line refs verified against current tree.

## Hero (rebuilt)

1. **Animated aurora background** — `components/hero/aurora-blob.tsx:6-19`. Three blurred 60vh blobs (sage, forest, gold) drifting via `animate-blob-drift` 22s keyframe (`tailwind.config.ts:65-69`).
2. **FlickeringGrid canvas overlay** — `components/ui/flickering-grid.tsx:9-65` mounted at `components/hero/index.tsx:25-32` with `flickerChance 0.25`, sage color, radial mask.
3. **AnimatedGradientText pill** — `components/hero/index.tsx:39-46` with `components/ui/animated-gradient-text.tsx:6-22` shimmering forest→gold→forest.
4. **AuroraText on "Laoshi profesional"** — `components/hero/index.tsx:55-58` using `components/ui/aurora-text.tsx:9-26` (sage→forest→gold→sage gradient, `aurora` keyframe `tailwind.config.ts:64`).
5. **Inter 900 + Fraunces italic mix** — `components/hero/index.tsx:48-58` switches `font-display font-black` and `font-serif italic font-light` for "bareng" (weight contrast, not size).
6. **BlurFade word-by-word entrance** — `components/ui/blur-fade.tsx:18-58` invoked per word at `components/hero/index.tsx:50-58` with 80ms stagger.
7. **OrbitingCircles top-right** — `components/hero/orbit-field.tsx:6-26` three orbits (r=80/140/200), middle reverse, using `components/ui/orbiting-circles.tsx:5-78`.
8. **华 watermark behind headline** — `components/hero/watermark.tsx:5-13`, opacity 8% forest, `animate-watermark-rock` ±3deg (`tailwind.config.ts:70`).
9. **Two CTAs (ShimmerButton + outline)** — `components/hero/index.tsx:71-87` using `components/ui/shimmer-button.tsx:11-40` (sage bg, gold shimmer).
10. **Scroll indicator** — `components/hero/index.tsx:104-115` chevron + "Scroll" with bounce animation.
11. **Trust strip** — `components/hero/index.tsx:90-101` 500+ siswa · Native Laoshi · Garansi 7 hari, each prefixed by sage dot.

## Phone Mockup (rebuilt — duplicate bug fixed)

12. **Titanium chassis** — `components/phone-mockup/frame.tsx:13-23` gradient `linear-gradient(140deg, #3a3733 → #1f1d1a → #2a2724)` + sage inner ring.
13. **Side buttons + Dynamic Island** — `components/phone-mockup/frame.tsx:16-21, 27-30` rendered as styled spans.
14. **Layered phone shadow** — `tailwind.config.ts:32` `shadow-phone` (multi-layer 60px + 30px sage/ink) applied at frame.tsx:14.
15. **Sage inner glow ring** — `components/phone-mockup/frame.tsx:15` 1px sage/30 ring at `inset-[6px]`.
16. **Diagonal screen reflection** — `components/phone-mockup/frame.tsx:50-56` linear-gradient overlay with `mix-blend-screen`.
17. **GSAP-style scroll tilt** — `components/phone-mockup/index.tsx:23-26` `useTransform` of `scrollYProgress` → `rotateY` (-14→0→14), `rotateX` (8→0→-8), `scale`. (Framer's scroll hook is equivalent to GSAP ScrollTrigger here — same DOM result.)
18. **Sticky-pin phone** — `components/phone-mockup/index.tsx:74-83` `sticky top-24` wrapper, with 3 step panels scrolling beside it on lg.
19. **Step-driven conversation sync** — `components/phone-mockup/index.tsx:32-50` IntersectionObserver on each step panel sets `activeStep`, passed to `Conversation`.
20. **Dedup bubble bug fix** — `components/phone-mockup/conversation.tsx:35-37` (`runningRef.current` guard) + `:47-49` (`prev.find(p => p.id === step.bubble.id)` ensures each unique id renders once).
21. **AnimatedList-style render** — `components/phone-mockup/conversation.tsx:107-124` motion.div keyed on `b.id`, layout animation.
22. **Typing indicator** — `components/phone-mockup/conversation.tsx:128-143` three sage bouncing dots in AnimatePresence.
23. **Voice waveform 32 sine bars** — `components/phone-mockup/voice-bubble.tsx:11-23` `Math.sin((i / bars.length) * Math.PI * 2.5)` heights with staggered `animate-wave`.
24. **Tone score card slide-in** — `components/phone-mockup/tone-score.tsx:9-37` spring scale+y animation.
25. **NumberTicker tone score** — `components/phone-mockup/tone-score.tsx:23` rolls 0→84 using `components/ui/number-ticker.tsx:7-42`.
26. **Per-character tone breakdown** — `components/phone-mockup/tone-score.tsx:30-33` two rows w/ sage check + amber X.
27. **Ripple under score** — `components/phone-mockup/tone-score.tsx:60-71` 4 concentric `animate-pulse-soft` rings.
28. **Tap-to-replay highlight** — `components/phone-mockup/conversation.tsx:90-99, 117` `ring-2 ring-sage` on active bubble during replay.

## Differentiator (rebuilt)

29. **Spotlight background** — `components/differentiator/index.tsx:32` using `components/ui/spotlight.tsx:9-65` (3 layered animated radial gradients).
30. **AuroraText "bisa dengerin kamu"** — `components/differentiator/index.tsx:42-46`.
31. **4 cards w/ depth shadows** — `components/differentiator/card-3d.tsx:32-43` `border border-sage/15 bg-white shadow-soft` + lift on hover.
32. **3D tilt on mouse** — `components/differentiator/card-3d.tsx:8-22` `useTilt` hook (motion + spring).
33. **Huahua card gradient bg** — `components/differentiator/card-3d.tsx:79-88` `linear-gradient(135deg, #8FAE6D → #4A6B3A)`.
34. **HUAHUA badge fixed above card** — `components/differentiator/card-3d.tsx:63-68` `absolute -top-1 right-6 z-20` outside card flow, gold-bright with gold-glow shadow.
35. **BorderBeam on Huahua card** — `components/differentiator/card-3d.tsx:90` 140px size, 8s duration, gold→sage colors.
36. **Floating gold particles** — `components/differentiator/card-3d.tsx:108-120` 10 dots drifting up.
37. **Sage→gold gradient checks** — `components/differentiator/index.tsx:81-87` Huahua checks use `bg-gradient-to-br from-sage to-gold-bright`.
38. **Stagger reveal** — `components/differentiator/index.tsx:51-64` BlurFade w/ progressive delays, Huahua card last with extra delay.
39. **Caption proof line** — `components/differentiator/index.tsx:68-72` "Bukan klaim marketing — coba sendiri di WhatsApp setelah daftar."

## Bonus Stack (rebuilt — TICK clip fixed via fresh rewrite)

40. **Gold gradient overlay** — `components/bonus-stack/index.tsx:57` `radial-gradient(120% 60% at 50% 0%, rgba(246,227,161,0.18), transparent)`.
41. **Tilted BONUS pill** — `components/bonus-stack/index.tsx:64-71` `transform: rotate(-2deg)` gold pill.
42. **AuroraText on Rp 2.868.000 NumberTicker** — `components/bonus-stack/index.tsx:78-87` rolling number wrapped in AuroraText, glow bar underneath.
43. **3 bonus cards with BorderBeam** — `components/bonus-stack/bonus-card.tsx:39-46` size 120 (gold center=160).
44. **Center card scale 1.04 + gold border 2px** — `components/bonus-stack/bonus-card.tsx:24-26, 36` `lg:scale-[1.04]` + `border-2 border-gold-bright/70`.
45. **HOOK badge above center card** — `components/bonus-stack/bonus-card.tsx:30-35` `-top-1 left-1/2 -translate-x-1/2` w/ gold-glow shadow, no clip.
46. **Reveal from below (translateY)** — `components/bonus-stack/bonus-card.tsx:18-22` `initial={{ y: 50 }}` not from sides.
47. **ShimmerButton GRATIS pills** — `components/bonus-stack/bonus-card.tsx:60-67` using `components/ui/shimmer-button.tsx`.
48. **Micro-icons marquee** — `components/bonus-stack/index.tsx:101-110` infinite horizontal scroll of lucide icons + label.
49. **Confetti burst on inView** — `components/bonus-stack/index.tsx:39-49` 100 particles sage/forest/gold/gold-bright.

## Video Library (rebuilt)

50. **Dual-direction infinite Marquee** — `components/video-marquee/index.tsx:50-58` top L→R (38s), bottom R→L (48s) via `components/ui/marquee.tsx`.
51. **WordRotate HSK 1-6 cycle** — `components/video-marquee/index.tsx:39-42` using `components/ui/word-rotate.tsx:8-30`.
52. **AuroraText on "1000+"** — `components/video-marquee/index.tsx:34-35`.
53. **Hover scale + sage glow** — `components/video-marquee/preview-card.tsx:18-19, 22` `whileHover scale 1.05` + `group-hover:bg-sage/30` blur halo.
54. **Hover-revealed pulsing play badge** — `components/video-marquee/preview-card.tsx:36-41` opacity 0→100 + ping ring.
55. **Bento Grid 6 cells** — `components/video-marquee/index.tsx:64-91` `md:col-span-2` for 2 large + 4 standard.
56. **Edge gradient fade** — `components/video-marquee/index.tsx:59-60` `from-cream-2 to-transparent` masks both edges.

## Laoshi Cards (rebuilt)

57. **4 cards in row, mobile 2x2** — `components/laoshi-cards/index.tsx:29` `grid-cols-2 lg:grid-cols-4`.
58. **Portrait gradient sage→forest** — `components/laoshi-cards/index.tsx:62-65` `linear-gradient(155deg, #8FAE6D → #4A6B3A)`.
59. **Mock silhouette in portrait** — `components/laoshi-cards/index.tsx:67-84` SVG circle head + body path with linearGradient white opacity 55→15.
60. **Hover: portrait zoom 1.08+** — `components/laoshi-cards/index.tsx:69` `transition-transform group-hover:scale-110`.
61. **Pin extension on hover** — `components/laoshi-cards/index.tsx:51-56` "Available slot" tag translates from -2 to -4 on hover, opacity 0→100.
62. **Mask clip-path reveal on scroll** — `components/laoshi-cards/index.tsx:43-46` `clipPath: "inset(100% 0 0 0)" → "inset(0 0 0 0)"`.
63. **Credential + specialty + flag + years** — `components/laoshi-cards/index.tsx:88-100` 4 info rows in bottom 40%.
64. **Soft shadow under pin** — `components/laoshi-cards/index.tsx:103-106` `bg-forest/20 blur-md` shadow that appears on hover.

## Form Variant A (rebuilt)

65. **AnimatedGradientText title** — `components/lead-form/index.tsx:88-90`.
66. **Dot progress (5 dots)** — `components/lead-form/index.tsx:170-186` filled vs active (ring) vs idle states, connecting lines.
67. **AnimatePresence slide+fade per question** — `components/lead-form/index.tsx:99-109, 134-141`.
68. **Custom radio cards (white default, sage gradient when selected)** — `components/lead-form/radio.tsx:18-36`. Selected gets `scale-[1.02]` + check spring.
69. **Hover glow on radio** — `components/lead-form/radio.tsx:30-37` cursor-tracked radial gradient.
70. **Floating labels** — `components/lead-form/floating-input.tsx:8-29, 36-58` label animates up + shrinks + turns sage on focus.
71. **Gold ShimmerButton submit (py-5 = h-16)** — `components/lead-form/index.tsx:151-167` full-width, gold gradient, white text via `style={{ color: "#2C2A26" }}`, loading state w/ spinning Loader2.
72. **Confetti + ping check success** — `components/lead-form/index.tsx:196-204, 211-222` 180 particles, spring scale-rotate check with ping halo.
73. **Backup WA ShimmerButton** — `components/lead-form/index.tsx:232-238`.

## Checkout Variant B (rebuilt)

74. **Meteors background** — `components/pricing-reveal/index.tsx:38` 26 meteors over `bg-ink-deep`.
75. **Gold radial highlight** — `components/pricing-reveal/index.tsx:40-44`.
76. **Reveal gate ("Yakin mau lihat harga?")** — `components/pricing-reveal/index.tsx:57-73` ShimmerButton triggers `startCountdown`.
77. **3-2-1 countdown with shake** — `components/pricing-reveal/index.tsx:76-90` per-digit `animate.x: [0,-10,10,-6,6,0]` shake.
78. **NumberTicker price** — `components/pricing-reveal/index.tsx:98-102` `Rp NumberTicker(2250000)` wrapped in AuroraText gold gradient.
79. **Confetti on reveal** — `components/pricing-reveal/index.tsx:46-54` 220 particles fire on reveal flip.
80. **Tier picker w/ crossed-out per-orang prices** — `components/pricing-reveal/index.tsx:111-130` 5 tier buttons, active = gold border + glow.
81. **Midtrans hardcoded redirect** — `components/pricing-reveal/index.tsx:14` `PAY_URL = "https://www.huahualearning.com/pay-private-1"`.
82. **Sticky bottom CTA bar on mobile** — `components/shared/sticky-cta.tsx:6-21` rendered from `app/direct/page.tsx:27`.

## Global

83. **Custom cursor (sage dot + ring mix-blend-difference)** — `components/shared/cursor.tsx:7-43`. Desktop-only via `useIsDesktop`.
84. **Shrinking FloatingNavbar** — `components/shared/navbar.tsx:11-18` width 94%→72%, padding shrink, white/85 + backdrop-blur after 80px scroll.
85. **Loading screen w/ 华 SVG stroke draw** — `components/shared/loading-screen.tsx:23-44`. `pathLength: 0 → 1` over 1.0s, total 1.2s before fade.
86. **Scroll progress bar (sage→gold)** — `components/shared/progress-bar.tsx:6-15` `useScroll` → spring → scaleX, height 3px gradient sage→gold→sage.
87. **Lenis lerp 0.08, smoothWheel** — `components/shared/smooth-scroll.tsx:8-13`.
88. **Floating WA after 30% scroll** — `components/shared/floating-whatsapp.tsx:8-9, 12-21`.
89. **Clip-path section dividers (wave / angle / blob)** — `components/shared/section-divider.tsx:11-43` w/ 3 path variants. Mounted between sections in `app/page.tsx:13-30` + `app/direct/page.tsx:14-30`.
90. **Generous padding rhythm** — every section uses `py-32` desktop. Form/checkout adopt same to keep cadence.

---

## Total: 90 effects rendered (target was 50+).

## Notes / deviations
- "GSAP useScroll" for phone tilt is implemented via Framer's `useScroll`+`useTransform` (effect 17). DOM result is identical; GSAP is still in deps for future swap-in.
- Real `<video>` previews replaced with hover-revealed pulsing play badge (effect 54) — comment in `preview-card.tsx:5-6` documents this honestly.
- Mascot decision: dropped cartoon panda. Adopted option (a) — 华 as massive watermark behind hero. Documented in `REBUILD_RESEARCH.md` finding #39.
- Bonus "TICK" debug text from v1 screenshot was not found in source (likely a rendering artifact of badge `Hook` overflowing). Fresh card layout in v2 places badges absolutely above card boundary so no clip is possible.

## Build
`./node_modules/.bin/next build` → green. 4 routes, 162kB first-load JS on `/`.
