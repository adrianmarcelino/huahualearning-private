"use client";

// Comparison table — desktop = table, mobile <640px = stacked cards per row.

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Highlight } from "@/components/ui/hero-highlight";

type Row = { label: string; alone: string; group: string; huahua: string; huahuaBold?: boolean };

const ROWS: Row[] = [
  { label: "Perhatian guru", alone: "0%", group: "~20%", huahua: "100%", huahuaBold: true },
  { label: "Materi sesuai kebutuhan", alone: "❌", group: "❌", huahua: "✅" },
  { label: "Koreksi real-time", alone: "❌", group: "Kadang", huahua: "Tiap detik", huahuaBold: true },
  { label: "Jadwal fleksibel", alone: "✅", group: "❌", huahua: "✅" },
  { label: "Progress jelas", alone: "❌", group: "Kadang", huahua: "✅" }
];

export function Comparison() {
  return (
    <section id="comparison" className="relative bg-cream-2 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Kenapa privat?</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(26px, 6.5vw, 44px)" }}>
            <TextGenerateEffect words="Belajar 1-on-1 = Progress **3× Lebih Cepat**" />
          </h2>
        </div>

        {/* Desktop ≥640px: real table */}
        <div className="mx-auto mt-10 hidden max-w-3xl overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-soft sm:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-sage/15 bg-cream">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage">&nbsp;</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage">Sendirian</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage">Kelas Rame</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-sage" style={{ background: "rgba(143,174,109,0.10)" }}>
                  Private Huahua
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-sage/10 last:border-b-0">
                  <td className="px-5 py-4 text-sm font-semibold text-ink-deep">{r.label}</td>
                  <td className="px-5 py-4 text-sm text-ink/70">{r.alone}</td>
                  <td className="px-5 py-4 text-sm text-ink/70">{r.group}</td>
                  <td
                    className={"px-5 py-4 text-sm text-ink-deep " + (r.huahuaBold ? "font-black" : "font-medium")}
                    style={{ background: "rgba(143,174,109,0.10)" }}
                  >
                    {r.huahuaBold ? <Highlight>{r.huahua}</Highlight> : r.huahua}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile <640px: stacked cards */}
        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 sm:hidden">
          {ROWS.map((r) => (
            <div key={r.label} className="rounded-2xl border border-sage/15 bg-white p-5 shadow-soft">
              <div className="text-sm font-bold uppercase tracking-wider text-sage">{r.label}</div>
              <div className="mt-3 space-y-2 text-sm">
                <Cell label="Sendirian" val={r.alone} />
                <Cell label="Kelas Rame" val={r.group} />
                <Cell label="Private Huahua" val={r.huahua} highlight bold={r.huahuaBold} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ label, val, highlight, bold }: { label: string; val: string; highlight?: boolean; bold?: boolean }) {
  return (
    <div
      className={"flex items-center justify-between rounded-lg px-3 py-2 " + (highlight ? "border border-sage/40" : "bg-cream")}
      style={highlight ? { background: "rgba(143,174,109,0.12)" } : undefined}
    >
      <span className={"text-xs " + (highlight ? "font-bold text-forest" : "text-muted")}>{label}</span>
      <span className={"text-sm text-ink-deep " + (bold ? "font-black" : "font-medium")}>{val}</span>
    </div>
  );
}
