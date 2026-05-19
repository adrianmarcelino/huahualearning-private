"use client";

// Three large blurred gradient blobs drifting slowly behind hero copy.
export function AuroraBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-32 left-1/4 h-[60vh] w-[60vh] rounded-full opacity-50 mix-blend-multiply blur-[100px] animate-blob-drift"
        style={{ background: "radial-gradient(circle, #8FAE6D 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[55vh] w-[55vh] rounded-full opacity-40 mix-blend-multiply blur-[120px] animate-blob-drift"
        style={{ background: "radial-gradient(circle, #4A6B3A 0%, transparent 60%)", animationDelay: "-7s" }}
      />
      <div
        className="absolute top-1/3 right-10 h-[40vh] w-[40vh] rounded-full opacity-55 mix-blend-multiply blur-[90px] animate-blob-drift"
        style={{ background: "radial-gradient(circle, #F6E3A1 0%, transparent 60%)", animationDelay: "-13s" }}
      />
    </div>
  );
}
