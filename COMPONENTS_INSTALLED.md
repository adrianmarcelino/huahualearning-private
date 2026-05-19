# COMPONENTS_INSTALLED — v4

Each entry: Source URL fetched · Source saved · Installed at · Used in · Adaptation.

## 1. Background Boxes
**Source URL fetched:** https://ui.aceternity.com/components/background-boxes
**Source saved to:** research/aceternity-source/background-boxes.tsx
**Installed at:** components/ui/background-boxes.tsx
**Used in:** components/hero/Hero.tsx:22
**Adaptation:** swapped pastel palette for sage/forest/gold-soft/gold-bright, opacity capped at 30%, grid trimmed from 150×100 to 80×36 for mobile perf.

## 2. Aurora Background
**Source URL fetched:** https://ui.aceternity.com/components/aurora-background
**Source saved to:** research/aceternity-source/aurora-background.tsx
**Installed at:** components/ui/aurora-background.tsx
**Used in:** components/hero/Hero.tsx:21, components/bonus/Bonus.tsx:36
**Adaptation:** gradient swapped to sage→forest→gold, `mix-blend-difference` retained; outer cream stripes match brand bg.

## 3. Text Generate Effect
**Source URL fetched:** https://ui.aceternity.com/components/text-generate-effect
**Source saved to:** research/aceternity-source/text-generate-effect.tsx
**Installed at:** components/ui/text-generate-effect.tsx
**Used in:** components/hero/Hero.tsx:35, components/cara-kerja/CaraKerja.tsx:27, components/differentiator/Diff.tsx:67, components/bonus/Bonus.tsx:42, components/video/Video.tsx:30, components/bento/Bento.tsx:21, components/laoshi/Laoshi.tsx:25, components/form/Form.tsx:111, components/checkout/Checkout.tsx:75
**Adaptation:** stagger 60ms (spec), words wrapped in `**word**` get sage→forest→gold gradient via `bg-clip-text`.

## 4. Container Scroll Animation
**Source URL fetched:** https://ui.aceternity.com/components/container-scroll-animation
**Source saved to:** research/aceternity-source/container-scroll-animation.tsx
**Installed at:** components/ui/container-scroll-animation.tsx
**Used in:** components/cara-kerja/CaraKerja.tsx:31
**Adaptation:** card inner bg swapped from default to cream; mobile scaleDimensions tuned to `[0.7, 0.9]`; child renders PhoneChat which auto-plays the WA chat preview.

## 5. Lamp Effect
**Source URL fetched:** https://ui.aceternity.com/components/lamp-effect (registry path: lamp.json)
**Source saved to:** research/aceternity-source/lamp-effect.tsx
**Installed at:** components/ui/lamp.tsx
**Used in:** components/differentiator/Diff.tsx:65
**Adaptation:** dark slate replaced with cream bg; conic glow swapped from cyan to sage; under-lamp blob recolored sage with opacity 0.5.

## 6. Card Stack
**Source URL fetched:** https://ui.aceternity.com/components/card-stack
**Source saved to:** research/aceternity-source/card-stack.tsx
**Installed at:** components/ui/card-stack.tsx
**Used in:** components/differentiator/Diff.tsx:79
**Adaptation:** auto-flip every 3000ms (spec), explicit `tap` advancing handler, Huahua entry is the last in items[] so over a full cycle it returns to top.

## 7. Comet Card
**Source URL fetched:** https://ui.aceternity.com/components/comet-card
**Source saved to:** research/aceternity-source/comet-card.tsx
**Installed at:** components/ui/comet-card.tsx
**Used in:** components/differentiator/Diff.tsx:36 (Huahua content only)
**Adaptation:** background gradient sage→forest, `DeviceOrientationEvent` listener drives tilt from gamma/beta on mobile, 8 gold-bright drift particles emit inside.

## 8. Sticky Scroll Reveal
**Source URL fetched:** https://ui.aceternity.com/components/sticky-scroll-reveal
**Source saved to:** research/aceternity-source/sticky-scroll-reveal.tsx
**Installed at:** components/ui/sticky-scroll-reveal.tsx
**Used in:** components/cara-kerja/CaraKerja.tsx:51
**Adaptation:** outer panel bg `bg-cream` instead of dark slate; right-side sticky preview shows PhoneChat compact; inactive titles drop to opacity 0.3; max-w-2xl on left column.

## 9. Infinite Moving Cards
**Source URL fetched:** https://ui.aceternity.com/components/infinite-moving-cards
**Source saved to:** research/aceternity-source/infinite-moving-cards.tsx
**Installed at:** components/ui/infinite-moving-cards.tsx
**Used in:** components/video/Video.tsx:36, 37
**Adaptation:** tap-to-pause via `tapPaused` state holds for 1500ms; speed default `slow` (60s); cards re-shaped to vocab tile (hanzi/pinyin/meaning/level).

## 10. Tracing Beam
**Source URL fetched:** https://ui.aceternity.com/components/tracing-beam
**Source saved to:** research/aceternity-source/tracing-beam.tsx
**Installed at:** components/ui/tracing-beam.tsx
**Used in:** components/bonus/Bonus.tsx:52
**Adaptation:** beam gradient sage→gold-bright→gold-soft, dot bg `bg-cream` border `border-sage/40` instead of dark theme.

## 11. Layout Grid
**Source URL fetched:** https://ui.aceternity.com/components/layout-grid
**Source saved to:** research/aceternity-source/layout-grid.tsx
**Installed at:** components/ui/layout-grid.tsx
**Used in:** components/bento/Bento.tsx:31
**Adaptation:** tiles use cream/sage palette + hanzi preview inside each; tap-outside backdrop is `bg-ink-deep` at opacity 0.3.

## 12. Multi Step Loader
**Source URL fetched:** https://ui.aceternity.com/components/multi-step-loader
**Source saved to:** research/aceternity-source/multi-step-loader.tsx
**Installed at:** components/ui/multi-step-loader.tsx
**Used in:** components/form/Form.tsx:99
**Adaptation:** sage check marks; 3 fixed BM steps ("Menyimpan datamu…", "Notif ke Laoshi Adrian…", "Selesai! Cek WA kamu 🐼"); cream/95 backdrop for light-palette compliance.

## 13. Background Lines
**Source URL fetched:** https://ui.aceternity.com/components/background-lines
**Source saved to:** research/aceternity-source/background-lines.tsx
**Installed at:** components/ui/background-lines.tsx
**Used in:** components/laoshi/Laoshi.tsx:21, components/checkout/Checkout.tsx:69
**Adaptation:** alternating stroke colors `sage` and `gold-soft`; opacity layer at 30%; trimmed path count to 4 (from full set) for mobile perf.

## 14. Hero Highlight
**Source URL fetched:** https://ui.aceternity.com/components/hero-highlight
**Source saved to:** research/aceternity-source/hero-highlight.tsx
**Installed at:** components/ui/hero-highlight.tsx
**Used in:** components/bonus/Bonus.tsx:48 (Rp 2.868.000), components/video/Video.tsx:28 (1000+ video), components/checkout/Checkout.tsx:111 (Rp 2.250.000 price)
**Adaptation:** `bg-gradient-to-r from-gold to-gold-bright` instead of default, `useInView` triggers `backgroundSize` from 0% to 100% over 1.4s — no hover required (mobile-friendly).

## 15. Spotlight (New)
**Source URL fetched:** https://ui.aceternity.com/components/spotlight-new
**Source saved to:** research/aceternity-source/spotlight-new.tsx
**Installed at:** components/ui/spotlight-new.tsx
**Used in:** components/hero/Hero.tsx:25, components/checkout/Checkout.tsx:68
**Adaptation:** three radial gradients tinted sage/forest/gold-soft at low opacity (0.08-0.20); anchored top-left + bottom-right via separate animated divs; slowed to 9s.

## 16. Lottie Panda
**Source URL fetched:** lottiefiles.com (CDN returned 403 to non-browser requests) — see deviations.md
**Source saved to:** public/lottie/huahua-panda.json (hand-rolled minimal valid Bodymovin v5.7.1 JSON with 6 shape layers — body, 2 ears, 2 eye patches, nose — and a breathing scale keyframe)
**Installed at:** components/ui/lottie-panda.tsx
**Used in:** components/hero/Hero.tsx:51 (large in hero), components/shared/StickyPanda.tsx:14 (sticky bottom-right after 30% scroll), components/form/Form.tsx:104 (corner watcher during form), components/form/Form.tsx:251 (success state happy pose)
**Adaptation:** wraps `@lottiefiles/react-lottie-player` as dynamic import (ssr:false) to keep client-only; `pose` prop swaps speed to 1.8x for ~1.1s on "happy" before reverting to 1x; tap/touchstart triggers same speedup so taps feel reactive.

---

## Build verified
`./node_modules/.bin/next build` green. Routes:
- `/` — 158 kB First Load JS
- `/direct` — 160 kB First Load JS
- `/_not-found` — 88.1 kB
- `/icon` — dynamic

Both under the implied bundle budget. Mobile-friendly: all 16 components use tap/touch-compatible triggers, no hover-only effects, no WebGL, no 3D, no cursor trail. Min tap target 48px on all CTAs and radio cards.
