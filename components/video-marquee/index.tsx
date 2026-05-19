"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { PreviewCard } from "./preview-card";

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

export function VideoMarquee() {
  return (
    <section id="videos" className="relative overflow-hidden bg-cream/50 py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold text-ink md:text-5xl"
        >
          1000+ video vocab HSK 3.0
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-ink/70">
          Tiap kata Mandarin dijelaskan dalam video singkat dengan contoh kalimat. Hover buat preview.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <Marquee pauseOnHover className="[--duration:40s]">
          {VIDEOS.slice(0, 6).map((v, i) => (
            <PreviewCard key={i} {...v} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s]">
          {VIDEOS.slice(6).map((v, i) => (
            <PreviewCard key={i} {...v} />
          ))}
        </Marquee>
      </div>

      {/* Bento */}
      <div className="container mx-auto mt-16 grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
        {[
          { title: "Pemula", body: "HSK 1-2: kata harian, sapaan, angka.", span: "md:col-span-2" },
          { title: "Menengah", body: "HSK 3-4: kerja, wisata, belanja.", span: "" },
          { title: "Lanjutan", body: "HSK 5-6: bisnis, strategi, opini.", span: "" },
          { title: "Konteks bisnis", body: "Vocab spesifik dagang & supplier China.", span: "md:col-span-2" }
        ].map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={
              "relative overflow-hidden rounded-3xl bg-cream p-6 shadow ring-1 ring-ink/5 " + b.span
            }
          >
            <div className="text-xs font-bold uppercase tracking-widest text-sage">{b.title}</div>
            <div className="mt-2 font-display text-xl font-bold text-ink">{b.body}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
