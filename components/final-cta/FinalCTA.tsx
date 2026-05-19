"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function FinalCTA() {
  return (
    <section className="relative bg-cream py-20 md:py-28 lg:py-36">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display font-black text-ink-deep" style={{ fontSize: "clamp(28px, 7.5vw, 56px)" }}>
          <TextGenerateEffect words="6 Bulan Lagi, Kamu Mau **Dimana?**" />
        </h2>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-muted/20 bg-white/50 p-6 text-left opacity-70"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-muted">Opsi A</div>
            <p className="mt-3 text-base text-muted md:text-lg">
              Masih bilang "besok mulai belajar"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border-2 border-sage bg-gradient-to-br from-sage/10 to-transparent p-6 text-left shadow-soft-lg"
          >
            <div className="text-xs font-black uppercase tracking-widest text-forest">Opsi B</div>
            <p className="mt-3 text-base font-bold text-ink-deep md:text-lg">
              Udah lancar conversation 30 menit tanpa keringetan
            </p>
          </motion.div>
        </div>

        <p className="mt-10 font-serif italic text-ink-deep" style={{ fontSize: "clamp(18px, 4.5vw, 24px)" }}>
          Bedanya cuma satu keputusan.
        </p>

        <a
          href="#cta"
          className="mt-8 inline-flex h-16 min-h-[48px] items-center gap-2 rounded-full bg-sage px-10 text-lg font-black text-cream shadow-soft-lg hover:bg-sage-dark"
        >
          Daftar Sekarang
          <ArrowRight className="h-5 w-5" />
        </a>

        <p className="mt-5 font-serif italic text-sage" style={{ fontSize: "clamp(14px, 3.5vw, 17px)" }}>
          加油. Mandarinmu nungguin.
        </p>
      </div>
    </section>
  );
}
