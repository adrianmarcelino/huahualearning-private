"use client";

// "Private Class di Huahua Learning" — 5 feature blocks. Uses Aceternity 3D card hover pattern.
// Mobile: stack vertically.

import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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
    <section id="why-private" className="relative bg-cream-2 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">Kenapa private?</div>
          <h2 className="mt-3 font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>
            <TextGenerateEffect words="Private Class di **Huahua Learning**" />
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl border border-sage/15 bg-white p-6 shadow-soft hover:shadow-soft-lg"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-display text-lg font-black text-ink-deep">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
