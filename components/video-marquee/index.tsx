"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { PreviewCard } from "./preview-card";
import { WordRotate } from "@/components/ui/word-rotate";
import { BlurFade } from "@/components/ui/blur-fade";
import { AuroraText } from "@/components/ui/aurora-text";

const VIDEOS = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "halo", level: "HSK 1" },
  { hanzi: "学习", pinyin: "xué xí", meaning: "belajar", level: "HSK 2" },
  { hanzi: "工作", pinyin: "gōng zuò", meaning: "kerja", level: "HSK 2" },
  { hanzi: "旅行", pinyin: "lǚ xíng", meaning: "wisata", level: "HSK 3" },
  { hanzi: "客户", pinyin: "kè hù", meaning: "klien", level: "HSK 3" },
  { hanzi: "供应商", pinyin: "gōng yìng shāng", meaning: "supplier", level: "HSK 4" },
  { hanzi: "合同", pinyin: "hé tong", meaning: "kontrak", level: "HSK 4" },
  { hanzi: "面试", pinyin: "miàn shì", meaning: "wawancara", level: "HSK 4" },
  { hanzi: "投资", pinyin: "tóu zī", meaning: "investasi", level: "HSK 5" },
  { hanzi: "经验", pinyin: "jīng yàn", meaning: "pengalaman", level: "HSK 5" },
  { hanzi: "战略", pinyin: "zhàn lüè", meaning: "strategi", level: "HSK 6" },
  { hanzi: "效率", pinyin: "xiào lǜ", meaning: "efisiensi", level: "HSK 6" }
];

const BENTO = [
  { cat: "Bisnis", hanzi: "商业", span: "md:col-span-2" },
  { cat: "Travel", hanzi: "旅游", span: "" },
  { cat: "Akademik", hanzi: "学术", span: "" },
  { cat: "Sehari-hari", hanzi: "日常", span: "md:col-span-2" },
  { cat: "Makanan", hanzi: "美食", span: "" },
  { cat: "Family", hanzi: "家庭", span: "" }
];

export function VideoMarquee() {
  return (
    <section id="videos" className="relative overflow-hidden bg-cream-2 py-32">
      <div className="container mx-auto px-4 text-center">
        <BlurFade>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sage">Video library</div>
        </BlurFade>
        <BlurFade delay={0.1}>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight text-ink-deep md:text-5xl">
            <AuroraText>1000+</AuroraText> kata.{" "}
            <span className="font-serif italic font-light text-muted">Update tiap minggu di </span>
            <WordRotate
              className="font-display font-black text-forest"
              words={["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"]}
            />
          </h2>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">
            Tiap kata Mandarin dijelaskan dalam video singkat dengan contoh kalimat. Hover buat preview.
          </p>
        </BlurFade>
      </div>

      <div className="relative mt-14 space-y-4">
        <Marquee pauseOnHover className="[--duration:38s]">
          {VIDEOS.slice(0, 6).map((v, i) => (
            <PreviewCard key={`a${i}`} {...v} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:48s]">
          {VIDEOS.slice(6).map((v, i) => (
            <PreviewCard key={`b${i}`} {...v} />
          ))}
        </Marquee>
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream-2 to-transparent" />
      </div>

      {/* Bento */}
      <div className="container mx-auto mt-20 grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
        {BENTO.map((b, i) => (
          <motion.a
            key={i}
            href="#cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={
              "group relative flex h-44 items-end justify-between overflow-hidden rounded-3xl border border-sage/15 bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg " +
              b.span
            }
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-sage">Kategori</div>
              <div className="mt-1 font-display text-2xl font-black text-ink-deep">{b.cat}</div>
            </div>
            <div
              aria-hidden
              className="font-display text-7xl font-black leading-none text-forest/15 transition-transform group-hover:scale-110 group-hover:text-forest/25"
            >
              {b.hanzi}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
