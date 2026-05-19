"use client";

// AI Laoshi feature highlight — included free w/ any package.
// Realistic iPhone frame with auto-playing WhatsApp tone-grading chat.
// Dynamic: messages animate in, typing dots, voice waveform, score card slides up.

import { motion } from "framer-motion";
import { Mic, Check, ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/phone-mockup/PhoneFrame";
import { PhoneChat } from "@/components/phone-mockup/PhoneChat";

export function AILaoshi() {
  return (
    <section id="ai-laoshi" className="relative overflow-hidden bg-cream-2 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: copy */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">
              🎤 AI LAOSHI · INCLUDED
            </div>
            <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl lg:text-5xl leading-tight">
              Satu-satunya AI Mandarin yang bisa kasih{" "}
              <span className="bg-gradient-to-r from-sage via-forest to-sage bg-clip-text text-transparent">
                feedback pronunciation
              </span>
              .
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
              Kirim voice note ke WhatsApp. Laoshi AI dengerin langsung — bukan baca teks — terus nilai tiap nada (1-4) per karakter. Tahu persis di mana pelafalanmu masih meleset.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Skor pelafalan per karakter, per nada",
                "Koreksi spesifik — initial, final, panjang nada",
                "Contoh audio buat dibandingin sendiri",
                "Dipake di WhatsApp yang udah kamu pegang tiap hari"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-deep">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-gold-bright/40 bg-gradient-to-br from-gold/15 to-transparent p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-forest">Bonus included</div>
                  <p className="mt-1 text-sm font-semibold text-ink-deep md:text-base">
                    Kamu dapet AI Laoshi <span className="font-bold text-forest">GRATIS</span> di setiap paket privat — gak perlu bayar terpisah.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#cta"
              className="mt-7 inline-flex h-12 min-h-[48px] items-center gap-2 rounded-full bg-sage px-6 text-base font-semibold text-cream hover:bg-sage-dark"
            >
              Daftar & Coba AI Laoshi
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* RIGHT: animated phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* floating mic badge — animated */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 16 }}
              className="absolute -left-4 top-12 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage to-forest text-white shadow-soft-lg md:-left-8"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-sage/40" />
              <Mic className="relative h-5 w-5" />
            </motion.div>

            {/* floating score chip — animated */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 20 }}
              whileInView={{ scale: 1, opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring", stiffness: 220, damping: 16 }}
              className="absolute -right-2 bottom-24 z-10 rounded-2xl bg-white px-3 py-2 shadow-soft-lg md:-right-6"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-sage">Tone score</div>
              <div className="mt-0.5 font-display text-2xl font-bold text-forest leading-none">
                84<span className="text-xs text-ink/60">/100</span>
              </div>
            </motion.div>

            <PhoneFrame>
              <PhoneChat />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
