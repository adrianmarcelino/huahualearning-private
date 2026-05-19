# COMPONENT_PLAN — 45 Mandatory Effects → Source Mapping

Each effect mapped to a researched component (RESEARCH.md IDs) or a custom build.

## Hero (1–6)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 1 | Animated background | A1 Background Beams | `components/hero/background-beams.tsx` |
| 2 | Sparkles overlay | A2 Sparkles | `components/hero/sparkles.tsx` |
| 3 | Text Generate Effect on headline | A3 Text Generate Effect | `components/hero/text-generate.tsx` |
| 4 | Framer staggered word entrance on subhead | Framer `staggerChildren` + RB1 Split Text pattern | `components/hero/subheadline.tsx` |
| 5 | 3D/SVG floating Huahua mascot | Inline SVG + Framer `animate` floating loop + R3F optional | `components/hero/mascot.tsx` |
| 6 | GSAP scroll-trigger fade past hero | GSAP ScrollTrigger | `components/hero/index.tsx` opacity tween |

## Phone Mockup (7–13)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 7 | Realistic iPhone frame | Pure Tailwind/CSS (notch, bezels, rounded) | `components/phone-mockup/frame.tsx` |
| 8 | Auto-typed WhatsApp conversation | Custom typewriter state machine + typing indicator | `components/phone-mockup/conversation.tsx` |
| 9 | Voice note bubble + waveform | CSS keyframes (animated bars) | `components/phone-mockup/voice-bubble.tsx` |
| 10 | AI Laoshi tone-score counting up | M2 Number Ticker | `components/phone-mockup/tone-score.tsx` |
| 11 | Phone tilts on scroll | GSAP ScrollTrigger + `useScroll`/`useTransform` rotateX/Y | `components/phone-mockup/index.tsx` |
| 12 | Tap past message to replay | Click handler rewinds conversation | `components/phone-mockup/conversation.tsx` |
| 13 | Sticky-pin phone, scroll-paired text | A18 Sticky Scroll Reveal pattern | `components/phone-mockup/sticky-section.tsx` |

## Differentiator (14–17)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 14 | 3D Card Effect | A4 3D Card Effect | `components/differentiator/card-3d.tsx` |
| 15 | Cards rotate on scroll (R3F) | R3F + `@react-three/drei` w/ scroll-linked rotation | `components/differentiator/rotating-cards.tsx` |
| 16 | ❌ → ✅ state transitions | `AnimatePresence` + lucide icons | `components/differentiator/feature-row.tsx` |
| 17 | Particle burst when Huahua card reveals | M9 Particles + M6 Confetti burst | `components/differentiator/huahua-reveal.tsx` |

## Bonus Stack (18–21)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 18 | NumberTicker 0 → 2.868.000 | M2 Number Ticker | `components/bonus-stack/total-ticker.tsx` |
| 19 | Items fly in alternating sides | Framer Motion `staggerChildren` w/ alternating x | `components/bonus-stack/items.tsx` |
| 20 | BorderBeam on each card | M5 Border Beam | `components/bonus-stack/bonus-card.tsx` |
| 21 | Confetti burst on reveal | M6 Confetti + `useInView` trigger | `components/bonus-stack/confetti-trigger.tsx` |

## Video Library (22–24)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 22 | Infinite marquee thumbnails | M1 Marquee | `components/video-marquee/marquee.tsx` |
| 23 | Hover-to-play muted autoplay | `<video>` w/ `onMouseEnter` play | `components/video-marquee/preview-card.tsx` |
| 24 | Bento Grid below | A8 Bento Grid | `components/video-marquee/bento.tsx` |

## Laoshi Cards (25–27)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 25 | Animated Pin lift | A7 Animated Pin (3D Pin) | `components/laoshi-cards/pin-card.tsx` |
| 26 | Mask reveal on scroll | A19 SVG Mask Effect / Framer clip-path | `components/laoshi-cards/mask-reveal.tsx` |
| 27 | Placeholder portraits | Build-time gradient PNG via canvas script | `public/laoshi-{1..4}.png`, generator `scripts/gen-laoshi.mjs` |

## Lead Form Variant A (28–32)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 28 | Multi-step form + layout progress bar | Framer `layout` + `motion.div` | `components/lead-form/progress-bar.tsx` |
| 29 | Each Q fades in after prev answered | `AnimatePresence` step gating | `components/lead-form/step.tsx` |
| 30 | Custom radio w/ hover glow | Tailwind + Framer `whileHover` | `components/lead-form/radio.tsx` |
| 31 | Shimmer submit | M3 Shimmer Button | `components/lead-form/submit.tsx` |
| 32 | Confetti + checkmark on success | M6 Confetti + SVG path draw | `components/lead-form/success.tsx` |

## Direct Checkout Variant B (33–35)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 33 | 3-2-1 drumroll pricing reveal | Framer keyframes + spring + shake | `components/pricing-reveal/drumroll.tsx` |
| 34 | Meteors background | A5 Meteors | `components/pricing-reveal/meteors-bg.tsx` |
| 35 | Sticky bottom CTA bar (mobile) | Tailwind `fixed bottom-0` + media query | `components/shared/sticky-cta.tsx` |

## Global (36–42)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 36 | Custom brand-color cursor trail (desktop) | A20 Following Pointer pattern + trail history | `components/shared/cursor.tsx` |
| 37 | Floating navbar shrinks on scroll | A6 Floating Navbar | `components/shared/navbar.tsx` |
| 38 | Parallax 3 depth layers | Framer `useScroll` + `useTransform` y | `components/shared/parallax-layers.tsx` |
| 39 | Lenis smooth scroll | `lenis` npm | `app/layout.tsx` |
| 40 | Section transition clip-path morph | Framer `clipPath` keyframes | `components/shared/section-transition.tsx` |
| 41 | Loading screen w/ mascot ~1s | Framer mascot loop + fade | `components/shared/loading-screen.tsx` |
| 42 | Scroll progress bar top | `useScroll` → `scaleX` motion.div | `components/shared/progress-bar.tsx` |

## Mobile (43–45)

| # | Effect | Source | Implementation |
|---|--------|--------|----------------|
| 43 | Reduced particle counts (never zero) | `useMediaQuery` → particle qty prop | `lib/use-media.ts` |
| 44 | Touch-friendly phone interactions | `onTouchStart` + larger hitboxes | `components/phone-mockup/conversation.tsx` |
| 45 | Bottom-sheet form on mobile | Conditional render w/ Framer drag-to-dismiss | `components/lead-form/bottom-sheet.tsx` |

End mapping.
