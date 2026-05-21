"use client";

// Comparison table — desktop = real table, mobile <640px = stacked cards
// per row. v6 FIX: mobile layout uses grid grid-cols-2 with label/value rows
// (label left, value right) so columns don't visually concatenate.

import { Highlight } from "@/components/ui/hero-highlight";

type Row = { label: string; app: string; group: string; huahua: string; huahuaBold?: boolean };

const ROWS: Row[] = [
  { label: "Perhatian guru", app: "0%", group: "~20%", huahua: "100%", huahuaBold: true },
  { label: "Materi sesuai kebutuhan", app: "❌", group: "❌", huahua: "✅" },
  { label: "Koreksi real-time", app: "Otomatis", group: "Kadang", huahua: "Tiap detik", huahuaBold: true },
  { label: "Jadwal fleksibel", app: "✅", group: "❌", huahua: "✅" },
  { label: "Progress jelas", app: "Skor aja", group: "Kadang", huahua: "✅" }
];

export function Comparison() {
  return (
    <section id="comparison" className="relative bg-cream py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">💪 BEDA NYATA</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Belajar 1-on-1 = Progress Jauh Lebih Cepat
          </h2>
        </div>

        {/* Desktop ≥640px: real table */}
        <div className="mx-auto mt-12 hidden max-w-3xl overflow-hidden rounded-2xl border border-sage/15 bg-white sm:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-sage/15 bg-cream-2">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage">&nbsp;</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage">Aplikasi</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage">Kelas Rame</th>
                <th
                  className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage"
                  style={{ background: "rgba(143,174,109,0.10)" }}
                >
                  Private Huahua
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-sage/10 last:border-b-0">
                  <td className="px-5 py-4 text-sm font-semibold text-ink-deep">{r.label}</td>
                  <td className="px-5 py-4 text-sm text-ink/70">{r.app}</td>
                  <td className="px-5 py-4 text-sm text-ink/70">{r.group}</td>
                  <td
                    className={"px-5 py-4 text-sm text-ink-deep " + (r.huahuaBold ? "font-bold" : "font-medium")}
                    style={{ background: "rgba(143,174,109,0.10)" }}
                  >
                    {r.huahuaBold ? <Highlight>{r.huahua}</Highlight> : r.huahua}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile <640px: stacked cards w/ clear label : value rows */}
        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-3 sm:hidden">
          {ROWS.map((r) => (
            <div key={r.label} className="rounded-2xl border border-sage/15 bg-white p-5">
              <div className="text-sm font-bold text-sage">{r.label}</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="grid grid-cols-2 items-center gap-3 border-b border-sage/10 pb-2">
                  <span className="text-muted">Aplikasi</span>
                  <span className="text-right font-medium text-ink-deep">{r.app}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-3 border-b border-sage/10 pb-2">
                  <span className="text-muted">Kelas Rame</span>
                  <span className="text-right font-medium text-ink-deep">{r.group}</span>
                </div>
                <div
                  className="grid grid-cols-2 items-center gap-3 rounded-lg px-2 py-1"
                  style={{ background: "rgba(143,174,109,0.10)" }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-forest">Private Huahua</span>
                  <span className={"text-right text-ink-deep " + (r.huahuaBold ? "font-bold" : "font-medium")}>
                    {r.huahuaBold ? <Highlight>{r.huahua}</Highlight> : r.huahua}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
