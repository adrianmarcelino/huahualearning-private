"use client";

// Mobile fallback for AmbientCanvas. Three radial-gradient blobs drifting via @keyframes.
// No WebGL — keeps iPhone 12 over 50fps budget.

export function CssBlobAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/4 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, #8FAE6D 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[55vh] w-[55vh] translate-x-1/2 rounded-full opacity-25 blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, #4A6B3A 0%, transparent 60%)", animationDelay: "-9s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-[45vh] w-[45vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl animate-blob-drift"
        style={{ background: "radial-gradient(circle, #F6E3A1 0%, transparent 60%)", animationDelay: "-15s" }}
      />
    </div>
  );
}
