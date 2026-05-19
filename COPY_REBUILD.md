# COPY_REBUILD — v5

## Sections kept

| Section | File:line | Aceternity infra used |
|---|---|---|
| Hero | components/hero/Hero.tsx:11-72 | Background Boxes, Aurora Background, Spotlight, Text Generate Effect |
| Cara Kerja | components/cara-kerja/CaraKerja.tsx:25-58 | Sticky Scroll Reveal, Text Generate Effect |
| Bonus | components/bonus/Bonus.tsx:14-64 | Tracing Beam, Hero Highlight, NumberTicker |
| Laoshi | components/laoshi/Laoshi.tsx:48-105 | Background Lines, Text Generate Effect, next/image |
| Form | components/form/Form.tsx:67-159 | Multi Step Loader, Text Generate Effect |
| Checkout (Variant B only) | components/checkout/Checkout.tsx:31-160 | Spotlight, Background Lines, Hero Highlight, NumberTicker |

## Sections deleted

| Deleted section | File before | What it was |
|---|---|---|
| Differentiator (Card Stack + Comet Card + Lamp) | components/differentiator/ | "Satu-satunya AI Mandarin yang bisa dengerin kamu" comparison vs ChatGPT/DeepSeek/Claude. Wrong audience for private tutoring. |
| Video vocab marquee | components/video/ | Infinite Moving Cards × 2 rows of hanzi vocab tiles. Wrong audience. |
| Bento Layout Grid | components/bento/ | 6-tile category grid (Bisnis/Travel/Akademik/Sehari-hari/Makanan/Family). Wrong audience. |
| Lottie panda mascot (all instances) | components/mascot/, components/ui/lottie-panda.tsx, components/shared/StickyPanda.tsx, public/lottie/ | Hero panda, sticky bottom-right companion, form-corner watcher, success cheer. |

## Sections added

| New section | File:line |
|---|---|
| Why Private (5 feature blocks) | components/why-private/WhyPrivate.tsx:38-67 |
| Comparison table | components/comparison/Comparison.tsx:21-94 |
| Pricing (4 card groups across 2 sub-sections + Lamp header) | components/pricing/Pricing.tsx:48-103 |
| Testimonial placeholder | components/testimonial/Testimonial.tsx:10-26 |
| FAQ accordion (5 items) | components/faq/FAQ.tsx:18-60 |
| Final CTA "6 Bulan Lagi" | components/final-cta/FinalCTA.tsx:9-60 |

## Lamp Effect moved
- From: components/differentiator/Diff.tsx (deleted)
- To: components/pricing/Pricing.tsx:43 (Paket & Harga header)

## Form question copy

| Q | Key | Options |
|---|---|---|
| Q1 Tujuan utama | goal | HSK, Bisnis, Kuliah/beasiswa, Conversation, Travel |
| Q2 Level | level | (unchanged) |
| Q3 Group size | group_size | Sendiri / Berdua / Bertiga atau lebih |
| Q4 Materi | material_choice | HSK / Request / Belum yakin |
| Q5 Timing | timing | (unchanged) |

`material_choice` added to LeadPayload type at `lib/apps-script.ts:9` and sent in submit body at `components/form/Form.tsx:91`.

## 5 Laoshi images on disk

```
$ ls -la public/laoshi/
total 568
-rw-r--r--@ 1 adrianmarcelino  staff  33185 laoshi-1-marchelline.jpg
-rw-r--r--@ 1 adrianmarcelino  staff  44131 laoshi-2-mely.jpg
-rw-r--r--@ 1 adrianmarcelino  staff  39123 laoshi-3-justina.jpg
-rw-r--r--@ 1 adrianmarcelino  staff  71949 laoshi-4-chacha.jpg
-rw-r--r--@ 1 adrianmarcelino  staff  91682 laoshi-5-feli.jpg
```

5/5 confirmed.

## No @lottiefiles imports remain

```
$ grep -rn "lottiefiles" components/ app/ package.json
```
(empty result — verified)

## No mascot/Mascot/StickyPanda references remain

```
$ grep -rinl "lottie\|Mascot\|StickyPanda\|mascot" components/ app/
```
(empty result — verified)

## Build status

`./node_modules/.bin/next build` green. Route sizes:
- `/` — 156 kB First Load JS (down from 158 kB v4)
- `/direct` — 159 kB First Load JS (down from 160 kB v4)

Both under bundle budget. Lottie player + dead sections removed → smaller bundle.

## Interaction layer integrity

All Aceternity components remain wired identically. Auto-flip card stack does not appear because Differentiator was deleted by spec, but every other interaction stays:
- Background Boxes hover/tap recolor (hero)
- Aurora gradient drift (hero, behind sections)
- Spotlight radial drift (hero, checkout)
- Sticky Scroll Reveal step transitions (cara-kerja)
- Tracing Beam scroll-fill (bonus)
- Background Lines wave reveal (laoshi, testimonial, checkout)
- Multi Step Loader sequence (form submit)
- Hero Highlight gold-sweep on inView (bonus total, comparison "100%" + "Tiap detik", checkout price)
- Text Generate Effect blur-fade word entrance (every section heading)
- Lamp Effect conic glow (pricing header)
- NumberTicker rolling counter (bonus total, checkout price)
