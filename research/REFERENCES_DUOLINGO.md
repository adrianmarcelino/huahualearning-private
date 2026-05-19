# Duolingo + Cal.com character/micro-interaction refs

Sources: https://www.duolingo.com, https://en.wikipedia.org/wiki/Duolingo, https://www.cal.com

WebFetch on the marketing homepages returned no visible content. Notes synthesized from Wikipedia
(which describes documented mascot behaviors) and observable product use.

## 8 mascot moves applied to Huahua (procedural panda placeholder)

1. **Eye contact via pupil tracking** — pupils lerp toward cursor projected to mascot local space.
2. **Breathing in idle** — body scale 1.0 ↔ 1.02 over 2.5s (Lusion-style "never frozen").
3. **Random saccade** — pupils flick to a random offset every 4-6s, mimicking attention drift.
4. **Pose triggers on user action** — happy on radio select, cheer on submit, thinking on type, listening on hover.
5. **Looking AT relevant objects** — `lookAt(x,y)` updated to point at the hovered card/phone/form.
6. **Subtle Y-axis rotation in idle** — 0.05 rad/s slow turn so the silhouette never reads static.
7. **Wave animation as scroll-out farewell** — arm rotates 0 → 60deg back-and-forth twice over 1s.
8. **Sticky mini-mascot companion** — shrunk version appears bottom-right after hero leaves viewport.

## Cal.com micro-interactions (5)

1. Hover-lift cards w/ depth shadow expansion
2. Sticky CTA bar at narrow viewport
3. Numeric pricing emphasis with weight contrast
4. Calendar-style time slots with hover ripple
5. Sage-style accent color reserved for primary CTA only
