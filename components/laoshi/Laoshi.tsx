"use client";

// Laoshi cards — 5 real laoshi with photos in public/laoshi/, BackgroundLines behind.

import { BackgroundLines } from "@/components/ui/background-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import Image from "next/image";

const LAOSHI = [
  {
    img: "/laoshi/laoshi-1-marchelline.jpg",
    chinese: "罗老师",
    name: "Laoshi Marchelline",
    cert: "Sertifikat HSK 4",
    experience: null as string | null,
    fokus: "Kelas anak, Ujian HSK, Conversation"
  },
  {
    img: "/laoshi/laoshi-2-mely.jpg",
    chinese: "戴老师",
    name: "Laoshi Mely",
    cert: "Sertifikat HSK 5",
    experience: "Pengalaman 6 tahun mengajar",
    fokus: "Kelas Anak, Persiapan Ujian HSK"
  },
  {
    img: "/laoshi/laoshi-3-justina.jpg",
    chinese: "董老师",
    name: "Laoshi Justina",
    cert: "Sertifikat HSK 6",
    experience: null,
    fokus: "Conversation sehari-hari, Persiapan kuliah, Ujian HSK"
  },
  {
    img: "/laoshi/laoshi-4-chacha.jpg",
    chinese: "余老师",
    name: "Laoshi Chacha",
    cert: "Sertifikat HSK 6",
    experience: null,
    fokus: "Kelas dewasa, Conversation, Ujian HSK"
  },
  {
    img: "/laoshi/laoshi-5-feli.jpg",
    chinese: "郑老师",
    name: "Laoshi Feli",
    cert:
      "Sertifikasi HSKK ADVANCED, HSK 5, Certificate of Excellence — Chinese Language Teacher Training Program (Chinese Language and Culture Education Foundation of China)",
    experience: "Pengalaman mengajar 4 tahun",
    fokus: "Mengajar anak usia 4 tahun hingga dewasa, conversation, persiapan ujian HSK"
  }
];

export function Laoshi() {
  return (
    <section id="laoshi" className="relative overflow-hidden bg-cream py-16 md:py-24 lg:py-32">
      <BackgroundLines />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Laoshi</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="Laoshi **Kamu**" />
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LAOSHI.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-soft hover:shadow-soft-lg"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-sage to-forest">
                <Image
                  src={l.img}
                  alt={l.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="space-y-1.5 p-4">
                <div className="font-serif text-2xl font-bold text-ink-deep">{l.chinese}</div>
                <div className="text-sm font-bold text-sage">{l.name}</div>
                <div className="text-xs leading-snug text-ink/80">{l.cert}</div>
                {l.experience && <div className="text-xs italic text-muted">{l.experience}</div>}
                <div className="mt-2 pt-2 border-t border-sage/10 text-[11px] text-ink/70">
                  <span className="font-bold uppercase tracking-wider text-forest">Fokus:</span>{" "}
                  {l.fokus}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
