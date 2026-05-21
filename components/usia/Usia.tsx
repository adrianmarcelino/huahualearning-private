"use client";

// Foto asli dari kelas privat — bukti kelas jalan untuk segala umur.
// Dua screenshot kelas (anak + dewasa/couple) dipasang setelah Testimonial.

import { motion } from "framer-motion";
import Image from "next/image";

type Kelas = { src: string; alt: string; w: number; h: number; eyebrow: string; title: string; body: string };

const KELAS: Kelas[] = [
  {
    src: "/kelas/kelas-anak.jpg",
    alt: "Kelas privat anak — Laoshi Huahua mengajar materi Nada & Pelafalan",
    w: 480,
    h: 1040,
    eyebrow: "🧒 Anak-anak",
    title: "Seru buat anak",
    body: "Laoshi sabar, materi dibikin interaktif dan penuh visual biar anak betah belajar. Cocok mulai dari usia 4 tahun."
  },
  {
    src: "/kelas/kelas-dewasa.jpg",
    alt: "Kelas privat dewasa — belajar Mandarin bareng pasangan dan teman",
    w: 818,
    h: 1600,
    eyebrow: "🧑 Dewasa & Profesional",
    title: "Pas buat dewasa",
    body: "Materi disesuaikan targetmu — HSK, bisnis, atau conversation. Bisa juga belajar bareng pasangan, temen, atau keluarga dalam satu kelas."
  }
];

export function Usia() {
  return (
    <section id="usia" className="relative bg-cream py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">👨‍👩‍👧 SEMUA USIA</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            Cocok untuk Semua Usia
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/70 md:text-lg">
            Dari anak-anak sampai dewasa — bahkan bisa belajar bareng pasangan, temen, atau keluarga.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {KELAS.map((k, i) => (
            <motion.div
              key={k.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-sage/15 bg-white shadow-sm"
            >
              {/* screenshot ditampilkan utuh — rasio asli, tanpa crop */}
              <Image
                src={k.src}
                alt={k.alt}
                width={k.w}
                height={k.h}
                sizes="(min-width: 640px) 420px, 100vw"
                className="h-auto w-full"
              />
              <div className="p-6 md:p-7">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">{k.eyebrow}</div>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink-deep">{k.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/70">{k.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* couple / keluarga — sambung ke paket Grup di section harga */}
        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-sage/15 bg-white p-5 text-center md:p-6">
          <p className="text-sm leading-relaxed text-ink-deep md:text-base">
            👫 <span className="font-semibold">Mau belajar bareng pasangan, temen, atau keluarga?</span>{" "}
            Bisa! Ambil paket Grup — harganya dibagi rata, makin worth it.
          </p>
        </div>
      </div>
    </section>
  );
}
