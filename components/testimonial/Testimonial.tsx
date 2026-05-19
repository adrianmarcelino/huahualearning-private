"use client";

// Testimonial placeholder section — WhatsApp screenshots to land later.

import { BackgroundLines } from "@/components/ui/background-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function Testimonial() {
  return (
    <section id="testimonial" className="relative overflow-hidden bg-cream py-16 md:py-24 lg:py-32">
      <BackgroundLines />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Testimoni</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="Kata Murid Kami" />
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-dashed border-sage/30 bg-white/60 p-10 text-center backdrop-blur">
          <p className="italic text-muted">
            Placeholder — 6 to 9 WhatsApp screenshot testimonials to be added soon
          </p>
        </div>
      </div>
    </section>
  );
}
