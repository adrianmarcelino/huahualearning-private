"use client";

// 华 character as massive opacity-8% watermark behind headline, slow ±3deg rock.
export function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center" aria-hidden>
      <span
        className="select-none font-display font-black text-forest/[0.08] leading-none animate-watermark-rock"
        style={{ fontSize: "min(78vw, 78vh)" }}
      >
        华
      </span>
    </div>
  );
}
