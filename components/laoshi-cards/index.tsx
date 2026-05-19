"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LAOSHI = [
  { name: "Laoshi Mei", spec: "HSK 1-3 + percakapan harian", years: 6 },
  { name: "Laoshi Wei", spec: "Bisnis & supplier China", years: 8 },
  { name: "Laoshi Ling", spec: "HSK 4-5 + persiapan ujian", years: 5 },
  { name: "Laoshi Han", spec: "HSK 6 + kuliah/beasiswa", years: 9 }
];

export function LaoshiCards() {
  return (
    <section id="laoshi" className="relative py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Laoshi yang ngajar kamu</h2>
          <p className="mt-3 text-lg text-ink/70">Native speaker + pengalaman ngajar siswa Indonesia.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LAOSHI.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-cream ring-1 ring-ink/10 shadow-lg transition-shadow group-hover:shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={`/laoshi-${i + 1}.svg`}
                    alt={l.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <div className="font-display text-xl font-bold text-ink">{l.name}</div>
                  <div className="mt-1 text-sm text-ink/60">{l.spec}</div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-sage/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-sage">
                    {l.years} tahun
                  </div>
                </div>
              </div>
              {/* lifted pin shadow on hover */}
              <div className="pointer-events-none absolute -bottom-4 left-1/2 h-3 w-32 -translate-x-1/2 rounded-full bg-ink/15 blur-md transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-xs italic text-ink/50">
          Foto Laoshi segera dipasang — placeholder sementara.
        </p>
      </div>
    </section>
  );
}
