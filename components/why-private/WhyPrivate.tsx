"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "📝",
    title: "Materi sesuai targetmu",
    body: "HSK / bisnis / traveling / conversation — kamu yang request, laoshi siapin sesuai kebutuhan kamu."
  },
  {
    icon: "🎓",
    title: "Laoshi berpengalaman",
    body: "Tutor bersertifikat HSK dan sudah memiliki pengalaman mengajar."
  },
  {
    icon: "📅",
    title: "Jadwal ngikutin kamu",
    body: "Pilih hari & jam, kita matchin sama laoshi yang cocok."
  },
  {
    icon: "📲",
    title: "Tetap belajar di luar kelas",
    body: "Rekaman + materi + PR (by request) dishare tiap habis kelas."
  },
  {
    icon: "🧚",
    title: "Bisa ganti laoshi",
    body: "Jika merasa tidak cocok setelah pertemuan pertama, bisa request untuk ganti laoshi."
  }
];

export function WhyPrivate() {
  return (
    <section id="why-private" className="relative bg-cream py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">🎓 Kenapa Privat</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Private Class di Huahua Learning
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="rounded-2xl border border-sage/15 bg-white p-6 md:p-8 transition-shadow hover:shadow-md"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink-deep">{f.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink/70">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
