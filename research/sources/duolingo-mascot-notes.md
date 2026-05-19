# Duolingo mascot Duo — behavioral patterns

Source: https://en.wikipedia.org/wiki/Duolingo + design.duolingo.com (limited content via WebFetch)

## Character
- Duo: green owl. Communicates via text only, never voice.
- Stylized so simple shapes (sphere body + two ear/eye accents) read instantly.

## Behavioral patterns
1. **Streak enforcement** — pops up to remind, persistently
2. **Guilt-based motivation** — uses psychological pressure for engagement
3. **Humorous threatening** — meme-driven personality, follows user
4. **Character storylines** — participates in seasonal arcs (Cybertruck stunt 2025)
5. **Anthropomorphic humor** — April Fools etc

## What translates to Huahua (panda)
- Always-on visible companion is the point — not optional decoration
- Specific poses for specific moments (idle, listening, happy, cheer, thinking, wave)
- Eye contact: pupils track user via cursor → builds engagement
- Reaction beats teach what's important — happy on radio select cements progress
- Subtle saccade + breathing in idle prevents "frozen-mannequin" effect

## Applied in our build
- `components/mascot/Mascot3D.tsx` — procedural placeholder + pose state machine
- Sticky mini-mascot bottom-right after hero scroll-out
- Pose changes wired to STATES 3, 5, 6, 7, 8, 9
