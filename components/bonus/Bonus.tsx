"use client";

import { TracingBeam } from "@/components/ui/tracing-beam";

// Owner order 2026-10-13: the bonus is free access to the Huahua app, a Premium account for 3 months, granted
// automatically to the app account the buyer names at checkout (app.huahualearning.com/private). It replaces the
// HSK 1–6 module. No "normal" price is shown: none was given for it.
const BONUSES = [
  { emoji: "🎁", title: "Free akses aplikasi Huahua", duration: "Akun Premium 3 bulan, aktif otomatis di akunmu" }
];

export function Bonus() {
  return (
    <section id="bonus" className="relative bg-cream py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">🎁 BONUS</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Setiap Paket Auto Dapet:
          </h2>
        </div>

        <TracingBeam className="mt-12">
          <div className="mx-auto max-w-2xl space-y-6 pl-6 md:pl-0">
            {BONUSES.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-sage/15 bg-white p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{b.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink-deep md:text-2xl">{b.title}</h3>
                    <p className="mt-1 text-sm text-ink/70">{b.duration}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end">
                  <span className="rounded-full bg-sage px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cream">
                    GRATIS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-ink/70 md:text-base">
            ➕ Bonus tambahan: Materi ajar & rekaman kelas
          </p>
          <a
            href="#cta"
            className="mt-8 inline-flex h-14 min-h-[48px] items-center gap-2 rounded-full bg-sage px-8 text-base font-semibold text-cream hover:bg-sage-dark"
          >
            Daftar & Klaim Bonus →
          </a>
        </div>
      </div>
    </section>
  );
}
