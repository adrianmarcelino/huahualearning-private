"use client";

// Video library teaser — Infinite Moving Cards (9) × 2 rows + Hero Highlight (14).

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Highlight } from "@/components/ui/hero-highlight";

const ROW_A = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "halo", level: "HSK 1" },
  { hanzi: "学习", pinyin: "xué xí", meaning: "belajar", level: "HSK 2" },
  { hanzi: "工作", pinyin: "gōng zuò", meaning: "kerja", level: "HSK 2" },
  { hanzi: "旅行", pinyin: "lǚ xíng", meaning: "wisata", level: "HSK 3" },
  { hanzi: "客户", pinyin: "kè hù", meaning: "klien", level: "HSK 3" },
  { hanzi: "合同", pinyin: "hé tong", meaning: "kontrak", level: "HSK 4" }
];

const ROW_B = [
  { hanzi: "供应商", pinyin: "gōng yìng shāng", meaning: "supplier", level: "HSK 4" },
  { hanzi: "面试", pinyin: "miàn shì", meaning: "wawancara", level: "HSK 4" },
  { hanzi: "投资", pinyin: "tóu zī", meaning: "investasi", level: "HSK 5" },
  { hanzi: "经验", pinyin: "jīng yàn", meaning: "pengalaman", level: "HSK 5" },
  { hanzi: "战略", pinyin: "zhàn lüè", meaning: "strategi", level: "HSK 6" },
  { hanzi: "效率", pinyin: "xiào lǜ", meaning: "efisiensi", level: "HSK 6" }
];

export function Video() {
  return (
    <section id="videos" className="relative overflow-hidden bg-cream-2 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Video library</div>
        <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
          <Highlight>1000+ video</Highlight> vocab HSK 3.0
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted md:text-lg">
          <TextGenerateEffect words="Tiap kata Mandarin dijelaskan dalam video singkat. Update tiap minggu." />
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <InfiniteMovingCards items={ROW_A} direction="left" speed="slow" />
        <InfiniteMovingCards items={ROW_B} direction="right" speed="slow" />
      </div>
    </section>
  );
}
