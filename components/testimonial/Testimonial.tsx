"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Screenshot asli chat WhatsApp murid — semua menyebut pengalaman dengan laoshi.
const TESTIMONI = [
  {
    src: "/testimoni/testi-3-helen.jpg",
    alt: "Testimoni WhatsApp dari Helen — cocok banget sama laoshi, interaktif banget",
    w: 828,
    h: 1115
  },
  {
    src: "/testimoni/testi-1-seru.jpg",
    alt: "Testimoni WhatsApp — seru banget, suka cara laoshinya mengajar",
    w: 828,
    h: 450
  },
  {
    src: "/testimoni/testi-4-mirra.jpg",
    alt: "Testimoni WhatsApp dari Mirra — arahan laoshinya ok banget, materi bertahap",
    w: 828,
    h: 1552
  },
  {
    src: "/testimoni/testi-2-bryan.jpg",
    alt: "Testimoni WhatsApp dari Bryan Henry — laoshinya sangat helpful",
    w: 828,
    h: 506
  }
];

export function Testimonial() {
  return (
    <section id="testimonial" className="relative bg-cream-2 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">⭐ KATA MURID</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Kata Murid Kami
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/70 md:text-lg">
            Screenshot asli dari chat WhatsApp murid HuaHua Learning soal pengalaman belajar bareng laoshi.
          </p>
        </div>

        {/* masonry — screenshot tampil apa adanya, tinggi mengikuti rasio asli */}
        <div className="mx-auto mt-12 max-w-3xl columns-1 gap-5 [column-fill:balance] sm:columns-2">
          {TESTIMONI.map((t, i) => (
            <motion.div
              key={t.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: Math.min(i, 3) * 0.06, duration: 0.5 }}
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-sage/15 bg-white shadow-sm"
            >
              <Image
                src={t.src}
                alt={t.alt}
                width={t.w}
                height={t.h}
                sizes="(min-width: 640px) 360px, 100vw"
                className="h-auto w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
