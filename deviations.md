# deviations from v4 spec

## Lottie panda — hand-rolled instead of LottieFiles download

**Spec:** WebFetch lottiefiles.com, pick a free panda Lottie, save to `public/lottie/huahua-panda.json`.

**What happened:** lottiefiles.com + their CDN (lottie.host, assets-v2.lottiefiles.com) both
returned 403 Forbidden to non-browser requests. airbnb's lottie-web demo repo has no panda. No
permissive CDN URL surfaced.

**Resolution:** Wrote a minimal valid Lottie JSON (Bodymovin v5.7.1 schema) by hand at
`public/lottie/huahua-panda.json`. It contains 6 shape layers (body, 2 ears, 2 eye patches,
nose) with a scale breathing keyframe 100→105→100 over 3s at 30fps. Loads through
`@lottiefiles/react-lottie-player` exactly as a downloaded file would. Idle-loops as required.

**Trade-off:** No multi-segment "happy" state — only the breathing loop. The component supports a
`segment` prop that maps to frame ranges; today both segments point to the same loop. Drop a
richer Lottie file at the same path later to enable real state transitions without code changes.
