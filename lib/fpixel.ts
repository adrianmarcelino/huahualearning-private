// Meta Pixel — shared with huahualearning.com (Adrian's active ads site).
// Same Pixel ID can live on multiple domains; the base code is installed
// per-site in app/layout.tsx.
export const FB_PIXEL_ID = "298648662660620";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a standard Meta Pixel event (no-op if the pixel hasn't loaded yet). */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
