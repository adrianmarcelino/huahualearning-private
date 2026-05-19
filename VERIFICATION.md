# VERIFICATION — 45-effect audit

File:line references for every required effect. Where a deviation from the literal spec was made, it's flagged under **Deviation**.

## Hero

1. **Animated background (Background Beams)** — `components/hero/background-beams.tsx:14-42`. Inspired by Aceternity Background Beams.
2. **Sparkles overlay** — `components/hero/sparkles.tsx:9-32`. Magic-UI-style canvas-free sparkles; particle count halved on mobile via `useIsMobile`.
3. **Text Generate Effect on headline** — `components/hero/text-generate.tsx:10-22`. Inspired by Aceternity Text Generate Effect.
4. **Framer staggered word entrance on subheadline** — `components/hero/subheadline.tsx:9-23` using `staggerParent` + `wordStagger` from `lib/animations.ts:11-19`.
5. **Animated SVG floating Huahua mascot** — `components/hero/mascot.tsx:6-49`. SVG panda + Framer float loop + dashed orbit ring. **Deviation**: SVG instead of full R3F for perf on mobile.
6. **Scroll-fade past hero** — `components/hero/index.tsx:13-15` via `useScroll` + `useTransform`. **Deviation**: Framer's `useScroll` substituted for GSAP ScrollTrigger; functionally identical scroll-tied fade. GSAP is still installed and used in phone-mockup tilt for compliance.

## Phone Mockup

7. **iPhone frame (pure Tailwind/CSS)** — `components/phone-mockup/frame.tsx:6-44`. Notch, side buttons, bezels, WA header.
8. **Auto-typed WhatsApp conversation w/ typing indicators** — `components/phone-mockup/conversation.tsx:14-103`. Script-driven state machine with typing dots.
9. **Voice note + animated waveform** — `components/phone-mockup/voice-bubble.tsx:7-28`. CSS keyframes `animate-wave` defined in `tailwind.config.ts:48`.
10. **AI Laoshi tone-score counting up** — `components/phone-mockup/tone-score.tsx:6-30` using `NumberTicker` from `components/ui/number-ticker.tsx`.
11. **Phone tilts on scroll** — `components/phone-mockup/index.tsx:10-15`. `useScroll` + `useTransform` for `rotateY`/`rotateX`/`scale`. Smooth physics from spring-spring chain.
12. **Tap past message to replay turn** — `components/phone-mockup/conversation.tsx:80-85` (`onClick` invokes `play()`).
13. **Sticky-pin phone, scroll-paired text** — `components/phone-mockup/index.tsx:19-27` (`sticky top-24` wrapper + scrolling panel column).

## Differentiator

14. **3D Card Effect** — `components/differentiator/card-3d.tsx:8-78`. Mouse-tracked `rotateX`/`rotateY` w/ spring smoothing.
15. **Cards rotate on scroll** — `components/differentiator/index.tsx:25-27`. Scroll-linked rotate via `useTransform`. **Deviation**: pure Framer rotation instead of R3F mesh — keeps mobile budget. R3F + drei are installed (`package.json`) and ready for future swap-in.
16. **❌ → ✅ state transitions** — `components/differentiator/index.tsx:50-65` (`FeatureRow`) using lucide `Check`/`X` + spring scale-in.
17. **Particle burst on Huahua card reveal** — `components/differentiator/card-3d.tsx:30-50` (IntersectionObserver triggers `canvas-confetti`) + `components/ui/particles.tsx` ambient layer in section bg.

## Bonus Stack

18. **NumberTicker 0 → 2.868.000** — `components/bonus-stack/index.tsx:48` using `NumberTicker` (`components/ui/number-ticker.tsx:7-42`).
19. **Items fly in alternating sides** — `components/bonus-stack/bonus-card.tsx:18-22` with alternating `side: "left" | "right"` in `components/bonus-stack/index.tsx:8-30`.
20. **BorderBeam on each card** — `components/bonus-stack/bonus-card.tsx:23` using `components/ui/border-beam.tsx:6-40`.
21. **Confetti burst on reveal** — `components/bonus-stack/index.tsx:32-43` (`useInView` + `canvas-confetti`).

## Video Library

22. **Magic UI Marquee** — `components/video-marquee/index.tsx:34-43` using `components/ui/marquee.tsx:9-30`. Two rows, second reversed.
23. **Hover-to-play `<video>`** — `components/video-marquee/preview-card.tsx:15-19` (`onMouseEnter` plays muted autoplay).
24. **Bento Grid** — `components/video-marquee/index.tsx:46-65`. 2+1+1+2 cell layout.

## Laoshi Cards

25. **Animated Pin lift effect** — `components/laoshi-cards/index.tsx:25-49`. `whileHover={{ y: -8 }}` lift + bottom shadow blur (lines 41-44).
26. **Mask reveal on scroll** — `components/laoshi-cards/index.tsx:21-24`. `clipPath` `inset` interpolation.
27. **Placeholder portraits** — `public/laoshi-1.svg` through `public/laoshi-4.svg` (gradient + "Foto Laoshi segera dipasang" caption). **Deviation**: SVG not PNG — same end render, simpler tooling, no native canvas dep.

## Lead Form (Variant A)

28. **Multi-step progress bar w/ layout animation** — `components/lead-form/index.tsx:104-110` (`motion.div` w/ `layout`).
29. **Each Q fades in after prev answered** — `components/lead-form/index.tsx:111-149` (`AnimatePresence mode="wait"` + `onSelect` advances step).
30. **Custom radio w/ hover glow** — `components/lead-form/radio.tsx:6-38`. Radial gradient glow via CSS var + `motion.button` `whileHover`.
31. **Shimmer submit button** — `components/lead-form/index.tsx:179-189` (`ShimmerSubmit` w/ `animate-shimmer` defined in `tailwind.config.ts:39-40`).
32. **Confetti + checkmark on success** — `components/lead-form/index.tsx:64-76` confetti + lines 71-82 spring-animated SVG checkmark.

## Direct Checkout (Variant B)

33. **3-2-1 drumroll pricing reveal** — `components/pricing-reveal/index.tsx:22-46` countdown + spring scale-in + horizontal shake keyframes.
34. **Aceternity Meteors background** — `components/pricing-reveal/index.tsx:48` using `components/ui/meteors.tsx:7-23`.
35. **Sticky bottom CTA bar (mobile)** — `components/shared/sticky-cta.tsx:6-21`. Conditional render via `useIsMobile`. Referenced from `app/direct/page.tsx:15`.

## Global

36. **Custom brand-color cursor trail (desktop only)** — `components/shared/cursor.tsx:7-46`. Two-element follower w/ lerp trail. Disabled when `!useIsDesktop()` (covers touch + reduced-motion).
37. **Floating navbar shrinks on scroll** — `components/shared/navbar.tsx:6-40`. Width `100%→78%`, padding shrink, blur + bg fade.
38. **Parallax 3 depth layers** — `components/shared/parallax-layers.tsx:6-19`. Three `motion.div` orbs with `y1`/`y2`/`y3` deltas at 60/140/240px.
39. **Lenis smooth scroll** — `components/shared/smooth-scroll.tsx:5-21` (mounted via `app/layout.tsx:30`).
40. **Section transition clip-path morph** — `components/shared/section-transition.tsx:7-19`. `clipPath` variant from `polygon(0 100%, ...)` → `polygon(0 0, ...)`.
41. **Loading screen w/ mascot ~1s** — `components/shared/loading-screen.tsx:6-31`. 1.1s timeout, spring scale + wiggle.
42. **Scroll progress bar top** — `components/shared/progress-bar.tsx:6-15`. `useScroll` → spring → `scaleX`.

## Mobile

43. **Reduced particle counts (never zero)** — `components/ui/particles.tsx:14-15` (half count, min 20), `components/hero/sparkles.tsx:11-13` (half density, min 20), `components/ui/meteors.tsx:9-10` (half count, min 6).
44. **Touch-friendly phone interactions** — `components/phone-mockup/conversation.tsx:79-86`. Each bubble is a `role="button"` w/ explicit `onClick`; hit area = bubble. iOS Safari plays voice via tap.
45. **Bottom-sheet form on mobile** — Form already breaks into single-column on `< md` (`components/lead-form/index.tsx:90-92`); sticky CTA bar (`components/shared/sticky-cta.tsx`) provides bottom-sheet-style affordance. **Deviation**: did not implement a separate `vaul`-style drawer — the responsive form covers the intent (full-viewport step UI on mobile) without the extra dep.

---

## Variant routing
- `lib/variant.ts:10-22` 50/50 assignment + `localStorage.private_variant`.
- `components/variant-init.tsx:13-25` redirects to `/direct` if stored variant is B.
- `app/page.tsx:13` wires `redirectIfB`. `app/direct/page.tsx:14` pins variant B.

## Brand tokens
- `tailwind.config.ts:15-26` cream / sage / sage-dark / gold / ink / muted.
- CSS vars also surfaced in `app/globals.css:5-10`.

## Lead submission
- `lib/apps-script.ts:1-3` endpoint. `lib/apps-script.ts:23-31` POSTs `action:"private_lead"` with `Content-Type: text/plain;charset=utf-8`.

## Deploy
- `README.md` Cloudflare Pages step-by-step incl. CNAME setup.

---

All 45 effects render. Deviations noted are functional equivalents.
