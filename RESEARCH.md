# RESEARCH — huahualearning-private

Phase 1 component-library inventory. Effects later mapped in COMPONENT_PLAN.md.

---

## 1. Aceternity UI — https://ui.aceternity.com/components

Copy-paste source (Tailwind + Framer Motion). Components selected for this build:

| # | Name | URL | Effect | Used in |
|---|------|-----|--------|---------|
| A1 | Background Beams | https://ui.aceternity.com/components/background-beams | SVG path beams animating across hero bg | Hero |
| A2 | Sparkles | https://ui.aceternity.com/components/sparkles | Configurable sparkles overlay | Hero |
| A3 | Text Generate Effect | https://ui.aceternity.com/components/text-generate-effect | Headline words fade in one-by-one | Hero |
| A4 | 3D Card Effect | https://ui.aceternity.com/components/3d-card-effect | Perspective tilt card | Differentiator |
| A5 | Meteors | https://ui.aceternity.com/components/meteors | Meteor streaks in background | Variant B Pricing |
| A6 | Floating Navbar | https://ui.aceternity.com/components/floating-navbar | Sticky navbar hiding on scroll | Global nav |
| A7 | Animated Pin (3D Pin) | https://ui.aceternity.com/components/3d-pin | Gradient pin animating on hover, lifts card | Laoshi cards |
| A8 | Bento Grid | https://ui.aceternity.com/components/bento-grid | Skewed grid layout | Video library |
| A9 | Tracing Beam | https://ui.aceternity.com/components/tracing-beam | Beam follows SVG path on scroll | Scroll progress side rail |
| A10 | Spotlight | https://ui.aceternity.com/components/spotlight-new | Spotlight gradient revealing content | Hero secondary |
| A11 | Animated Tooltip | https://ui.aceternity.com/components/animated-tooltip | Tooltip follows pointer | Laoshi card credits |
| A12 | Card Hover Effect | https://ui.aceternity.com/components/card-hover-effect | Sliding hover background | Bonus cards |
| A13 | Lamp Effect | https://ui.aceternity.com/components/lamp-effect | Lamp glow for section header | Bonus header |
| A14 | Wavy Background | https://ui.aceternity.com/components/wavy-background | Moving wave bg | Form section |
| A15 | Hero Parallax | https://ui.aceternity.com/components/hero-parallax | Scroll parallax rotation + opacity | Video marquee depth |
| A16 | Macbook Scroll | https://ui.aceternity.com/components/macbook-scroll | Image emerges from screen on scroll | (inspiration for phone-scroll) |
| A17 | Container Scroll Animation | https://ui.aceternity.com/components/container-scroll-animation | 3D rotation on scroll | Phone mockup tilt |
| A18 | Sticky Scroll Reveal | https://ui.aceternity.com/components/sticky-scroll-reveal | Phone pins while text scrolls | Phone-pin section |
| A19 | SVG Mask Effect | https://ui.aceternity.com/components/svg-mask-effect | Cursor-driven mask reveal | Section transition |
| A20 | Following Pointer | https://ui.aceternity.com/components/following-pointer | Custom cursor follower | Global cursor |

---

## 2. Magic UI — https://magicui.design/docs/components

| # | Name | URL | Effect | Used in |
|---|------|-----|--------|---------|
| M1 | Marquee | https://magicui.design/docs/components/marquee | Infinite horizontal scroll | Video library |
| M2 | Number Ticker | https://magicui.design/docs/components/number-ticker | Roll 0→N | Bonus total Rp 2.868.000 |
| M3 | Shimmer Button | https://magicui.design/docs/components/shimmer-button | Button with shimmer ring | Form submit, primary CTA |
| M4 | Animated List | https://magicui.design/docs/components/animated-list | List entrance animations | Bonus items |
| M5 | Border Beam | https://magicui.design/docs/components/border-beam | Animated border light | Bonus cards |
| M6 | Confetti | https://magicui.design/docs/components/confetti | Particle burst | Form success, bonus reveal |
| M7 | Animated Gradient Text | https://magicui.design/docs/components/animated-gradient-text | Text with moving gradient | Hero accent words |
| M8 | Retro Grid | https://magicui.design/docs/components/retro-grid | Vintage grid bg | Section divider |
| M9 | Particles | https://magicui.design/docs/components/particles | Floating particles | Hero secondary, Differentiator burst |
| M10 | Ripple | https://magicui.design/docs/components/ripple | Expanding ripple | Phone-mockup AI score pulse |
| M11 | Dock | https://magicui.design/docs/components/dock | Magnified dock | (optional, mobile) |
| M12 | Orbiting Circles | https://magicui.design/docs/components/orbiting-circles | Orbit animation | Hero mascot orbit |
| M13 | Hero Video Dialog | https://magicui.design/docs/components/hero-video-dialog | Modal video | Video library expand |
| M14 | Bento Grid | https://magicui.design/docs/components/bento-grid | Masonry grid | Video library (fallback) |
| M15 | Globe | https://magicui.design/docs/components/globe | 3D globe | (optional accent) |

---

## 3. 21st.dev — https://21st.dev

Categories noted: Shaders, Heros, Features, AI Chat Components, Calls to Action, Buttons, Testimonials, Pricing Sections, Text Components. Treated as inspiration directory rather than copy-source. Live component pages render as JS-heavy SPAs that don't parse in WebFetch — fall back to Aceternity/Magic UI for source code.

Notable 21st patterns referenced:
- 21.1 Hero with floating UI mockup (https://21st.dev/?tab=components&category=heros)
- 21.2 Shader-backed CTA (https://21st.dev/?tab=components&category=shaders)
- 21.3 Animated pricing card (https://21st.dev/?tab=components&category=pricing-sections)
- 21.4 Conversational AI bubble (https://21st.dev/?tab=components&category=ai-chat-components) — phone-mockup chat reference
- 21.5 Feature block w/ scroll-reveal (https://21st.dev/?tab=components&category=features)
- 21.6 Testimonial marquee (https://21st.dev/?tab=components&category=testimonials)
- 21.7 Button micro-interactions (https://21st.dev/?tab=components&category=buttons)
- 21.8 Animated text headers (https://21st.dev/?tab=components&category=text-components)
- 21.9 CTA section with gradient (https://21st.dev/?tab=components&category=calls-to-action)
- 21.10 Hero with kinetic typography (https://21st.dev/?tab=components&category=heros)

---

## 4. Motion (motion.dev / framer-motion) primitives

Source: https://motion.dev/

| Primitive | Usage |
|-----------|-------|
| `motion.div` etc. | Animated DOM elements w/ transforms |
| `animate` prop | Declarative target |
| `variants` | Reusable named states |
| `stagger()` / `staggerChildren` | Sequenced child animations |
| `whileHover` / `whileTap` / `whileInView` | Gesture/viewport triggers |
| `useInView()` | Hook returning boolean when ref in viewport |
| `useScroll()` | Returns scrollYProgress motion value |
| `useTransform(mv, [a,b], [c,d])` | Derived motion value |
| `useMotionValue(0)` | Raw motion value |
| `AnimatePresence` | Exit animations |
| `layout` / `layoutId` | Layout animations (FLIP) |
| `transition: { type: "spring", stiffness, damping }` | Physics |
| `ScrollTimeline` | Hardware-accelerated scroll-linked |

---

## 5. React Bits — https://reactbits.dev

Site mostly JS-rendered (didn't parse via WebFetch). Standard catalog includes (use direct URLs when copying source):

| # | Name | URL | Effect | Used in |
|---|------|-----|--------|---------|
| RB1 | Split Text | https://reactbits.dev/text-animations/split-text | Per-char/per-word entrance | Hero subhead fallback |
| RB2 | Blur Text | https://reactbits.dev/text-animations/blur-text | Blur→focus stagger | Section headers |
| RB3 | Shiny Text | https://reactbits.dev/text-animations/shiny-text | Light sweep over text | Bonus value label |
| RB4 | Gradient Text | https://reactbits.dev/text-animations/gradient-text | Animated gradient fill | Hero accent |
| RB5 | Rotating Text | https://reactbits.dev/text-animations/rotating-text | Vertical word swap | Hero goals rotator |
| RB6 | Scroll Float | https://reactbits.dev/text-animations/scroll-float | Float-in on scroll | Differentiator copy |
| RB7 | Scroll Reveal | https://reactbits.dev/text-animations/scroll-reveal | Char-by-char reveal | Long-form section |
| RB8 | Aurora | https://reactbits.dev/backgrounds/aurora | WebGL aurora | (Hero alt bg) |
| RB9 | Threads | https://reactbits.dev/backgrounds/threads | Curling threads | Differentiator bg |
| RB10 | Squares | https://reactbits.dev/backgrounds/squares | Grid square ripple | Video library bg |
| RB11 | Click Spark | https://reactbits.dev/animations/click-spark | Click particle burst | Submit success |
| RB12 | Magnet Lines | https://reactbits.dev/animations/magnet-lines | Magnetic line field | Phone-mockup ambient |

---

## 6. Awwwards references — https://www.awwwards.com/websites/education/

| Site | URL | Design move |
|------|-----|-------------|
| Capitolium | https://collabcapitolium.fr | Sophisticated scroll-pinned typography + technical excellence (SOTD May 18 2026, Dev Award). Reference for pin transitions. |
| Papumba | https://papumba.com | Playful character-driven illustration + bouncy spring motion. Reference for Huahua mascot personality. |
| Renée Crown Wellness | https://crowninstitute.colorado.edu | Quiet institutional restraint + generous whitespace. Reference for trust-building Laoshi section. |
| McMaster Engineering | https://eng.mcmaster.ca | Structured grid + program cards. Reference for Bento. |
| Thammasat DBTM | https://dbtm.tds.tu.ac.th | Bold sectional color blocks + ASCII art accents. Reference for color-block transitions. |

Premium-tier benchmarks (quality bar from prompt): linear.app, vercel.com, framer.com, monogram.io. Note their shared moves:
- Heavy use of scroll-pinned hero with progressive reveal
- Subtle but constant micro-motion (never static)
- Geometric precision in spacing (4/8 px grid)
- Restrained palette w/ one accent
- Animated SVG icons over raster

---

End Phase 1 research.
