"use client";

// Bento grid — Layout Grid (11) of 6 vocab categories.

import { LayoutGrid } from "@/components/ui/layout-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const TILES = [
  { id: 1, title: "Bisnis", hanzi: "商业", body: "Kata bisnis, supplier, kontrak.", className: "md:col-span-2" },
  { id: 2, title: "Travel", hanzi: "旅游", body: "Sapaan, transportasi, hotel.", className: "md:col-span-1" },
  { id: 3, title: "Akademik", hanzi: "学术", body: "Kosakata HSK + kuliah.", className: "md:col-span-1" },
  { id: 4, title: "Sehari-hari", hanzi: "日常", body: "Conversation rutinitas.", className: "md:col-span-2" },
  { id: 5, title: "Makanan", hanzi: "美食", body: "Menu restoran + bumbu.", className: "md:col-span-1" },
  { id: 6, title: "Family", hanzi: "家庭", body: "Panggilan keluarga.", className: "md:col-span-2" }
];

export function Bento() {
  return (
    <section id="bento" className="relative bg-cream py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Kategori</div>
        <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
          <TextGenerateEffect words="Vocab dipisah per **konteks**" />
        </h2>
        <p className="mt-3 text-sm text-muted">Tap tile buat lihat preview.</p>
      </div>
      <div className="h-[500px] md:h-[600px]">
        <LayoutGrid tiles={TILES} />
      </div>
    </section>
  );
}
