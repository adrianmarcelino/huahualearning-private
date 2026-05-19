# huahualearning-private

Private tutoring funnel for HuaHua Learning — high-ticket Mandarin 1-on-1 with bonus stack worth Rp 868.000+ included free.

Stack: Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · GSAP · React Three Fiber · Lenis · shadcn primitives.

Hosted on Cloudflare Pages at **private.huahualearning.com**.

---

## Local dev

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`.

Variant routing:
- `/` = Variant A (lead form, no price shown)
- `/direct` = Variant B (full pricing + Midtrans checkout)
- First visit to `/` flips a 50/50 coin; if "B", router replaces to `/direct`. Choice persisted in `localStorage.private_variant`.

## Project layout

```
app/
  layout.tsx        Lenis, Inter+Plus Jakarta fonts, cursor, navbar, progress bar, loading screen
  page.tsx          Variant A
  direct/page.tsx   Variant B
  icon.tsx          Dynamic favicon (next/og)
components/
  hero/             Background beams, Sparkles, Text generate, Subhead, Mascot SVG
  phone-mockup/     iPhone frame, auto-typed WA conversation, voice bubble, tone score
  differentiator/   3D card comparison vs ChatGPT/DeepSeek/Claude
  bonus-stack/      Number ticker total, fly-in cards w/ Border Beam
  video-marquee/    Magic UI marquee + Bento grid
  laoshi-cards/     Animated pin lift + mask reveal
  lead-form/        Multi-step Framer form (Variant A)
  pricing-reveal/   3-2-1 drumroll + Meteors bg (Variant B)
  shared/           Navbar, cursor, progress bar, smooth scroll (Lenis), loading, sticky CTA, floating WA
  ui/               Button, Input, Textarea, Number Ticker, Marquee, Border Beam, Meteors, Particles
lib/
  utils.ts          cn(), formatRupiah()
  variant.ts        A/B logic
  apps-script.ts    Lead POST to GAS
  animations.ts     Framer variants
  use-media.ts      Mobile/desktop hooks
public/
  laoshi-1..4.svg   Placeholder portraits
```

## Brand tokens (tailwind.config.ts)

| Token | Hex |
|-------|-----|
| `cream` (background) | `#FBF4EA` |
| `sage` (primary) | `#8FAE6D` |
| `gold` (accent) | `#F6E3A1` |
| `ink` (text) | `#4F4A45` |
| `muted` | `#9C948B` |

## Lead submission

POST to existing GAS endpoint (see `lib/apps-script.ts`):
- `action: "private_lead"`
- `Content-Type: text/plain;charset=utf-8` (CORS workaround)
- Fields: `lead_id, name, whatsapp, goal, level, group_size, timing, notes, variant, source: "private_subdomain", ad_id?`

GAS-side handler will be patched separately — do not modify the existing Apps Script file from this repo.

## Deploy — Cloudflare Pages

Single live env: `private.huahualearning.com`.

1. **dash.cloudflare.com** → Workers & Pages → Create → **Pages** → Connect to Git.
2. Pick repo `huahualearning-private`. Authorize GitHub if not already.
3. Build settings:
   - Framework preset: **Next.js**
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Build output dir: `.next` (Cloudflare's Next.js preset handles edge adapter)
   - Node version: 20 (env var `NODE_VERSION=20`)
4. Click **Save and Deploy**. First build ~2-3 min.
5. After green deploy, open the project → **Custom domains** → Add `private.huahualearning.com`.
6. If `huahualearning.com` is on the same Cloudflare account, the CNAME is auto-created. Otherwise add manually in DNS:
   - Type: `CNAME`
   - Name: `private`
   - Target: `<your-project>.pages.dev`
   - Proxy: ON (orange cloud)
7. SSL cert provisions automatically (~1 min).
8. Visit `https://private.huahualearning.com` → confirm:
   - `/` shows lead form variant A
   - `/direct` shows pricing variant B
   - Form submission lands in spreadsheet (verify via GAS Apps Script execution log)
   - Mobile responsive on real device

### Cloudflare Pages Next.js notes

If Cloudflare's Next.js preset complains about node-runtime APIs, fall back to `@cloudflare/next-on-pages`:
```bash
npm install -D @cloudflare/next-on-pages
```
And change build command to `npx @cloudflare/next-on-pages` with output dir `.vercel/output/static`.

## Variant testing

```js
// Force a variant locally
localStorage.setItem("private_variant", "A"); // or "B"
location.reload();
```

## TODO post-launch

- Replace `/public/laoshi-1..4.svg` placeholders with real Laoshi portraits.
- Plug real video clips into `<PreviewCard>` `<video>` sources.
- Add Meta + TikTok Pixel scripts when Adrian provides IDs.
- Patch GAS Apps Script handler for `action: "private_lead"` (handled separately).

---

WhatsApp backup contact: https://wa.me/6281939304002
