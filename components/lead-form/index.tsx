"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Radio } from "./radio";
import { submitLead, genLeadId, isValidIndoPhone } from "@/lib/apps-script";
import { Check } from "lucide-react";

const STEPS = [
  {
    key: "goal",
    q: "Tujuan utama belajar Mandarin?",
    options: [
      "Persiapan kerja/karir di perusahaan China-related",
      "Persiapan ujian HSK",
      "Persiapan kuliah/beasiswa di China/Taiwan",
      "Bisnis pribadi/dagang dengan supplier China",
      "Travel & hobi"
    ]
  },
  {
    key: "level",
    q: "Level Mandarin sekarang?",
    options: [
      "Belum pernah belajar sama sekali",
      "Tahu pinyin & beberapa kata dasar",
      "HSK 1-2 / pemula",
      "HSK 3-4 / menengah",
      "HSK 5+ / lanjutan"
    ]
  },
  {
    key: "group_size",
    q: "Mau belajar sendiri atau bareng teman/keluarga?",
    options: ["Sendiri (1-on-1)", "Berdua", "Bertiga", "Berempat", "Berlima"]
  },
  {
    key: "timing",
    q: "Target mulai kapan?",
    options: ["Minggu ini", "2 minggu ke depan", "Bulan depan", "Masih riset dulu"]
  }
] as const;

type Answers = Record<string, string>;

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const total = STEPS.length + 1; // + contact
  const progress = Math.min(step, total) / total;

  const next = (val: string) => {
    setA((x) => ({ ...x, [STEPS[step].key]: val }));
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("Nama wajib diisi.");
    if (!isValidIndoPhone(wa)) return setErr("Nomor WA harus mulai 08, +62, atau 62.");
    setSubmitting(true);
    const variant = (typeof window !== "undefined" && (localStorage.getItem("private_variant") as "A" | "B")) || "A";
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    try {
      await submitLead({
        lead_id: genLeadId(),
        name,
        whatsapp: wa,
        goal: a.goal ?? "",
        level: a.level ?? "",
        group_size: a.group_size ?? "",
        timing: a.timing ?? "",
        notes,
        variant,
        ad_id: params.get("ad_id") ?? undefined
      });
    } catch {}
    setSubmitting(false);
    setDone(true);
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors: ["#8FAE6D", "#F6E3A1", "#FBF4EA"] });
  };

  if (done) {
    return (
      <section id="cta" className="relative bg-sage/10 py-32">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sage text-cream"
          >
            <Check className="h-10 w-10" />
          </motion.div>
          <h2 className="mt-6 font-display text-3xl font-bold text-ink md:text-4xl">
            Terkirim! 🐼
          </h2>
          <p className="mt-3 text-lg text-ink/70">
            Tim Huahua bakal WA kamu max 30 menit ya.
          </p>
          <a
            href="https://wa.me/6281939304002"
            className="mt-6 inline-flex rounded-full bg-sage px-6 py-3 font-medium text-cream"
          >
            Atau chat langsung di WA →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="relative bg-cream/80 py-32">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Daftar dalam 30 detik</h2>
          <p className="mt-3 text-ink/70">Tim Huahua bakal WA kamu max 30 menit setelah submit.</p>
        </div>

        <div className="mt-10 rounded-3xl bg-cream p-6 shadow-xl ring-1 ring-ink/10 md:p-10">
          {/* progress */}
          <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
            <motion.div
              layout
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              className="h-full rounded-full bg-gradient-to-r from-sage to-gold"
            />
          </div>

          <AnimatePresence mode="wait">
            {step < STEPS.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-sage">
                  Pertanyaan {step + 1} / {STEPS.length + 1}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">{STEPS[step].q}</h3>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {STEPS[step].options.map((opt) => (
                    <Radio
                      key={opt}
                      label={opt}
                      checked={a[STEPS[step].key] === opt}
                      onSelect={() => next(opt)}
                    />
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="mt-6 text-sm text-ink/60 hover:text-ink"
                  >
                    ← Balik
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="contact"
                onSubmit={onSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-sage">
                  Pertanyaan {STEPS.length + 1} / {STEPS.length + 1}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">Kontak kamu</h3>
                <div className="mt-6 space-y-4">
                  <Input placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input
                    placeholder="WhatsApp (08… / +62… / 62…)"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                  />
                  <Textarea
                    placeholder="Ada hal spesifik yang mau disampaikan ke Laoshi? (opsional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  {err && <div className="text-sm text-red-600">{err}</div>}
                  <ShimmerSubmit disabled={submitting}>
                    {submitting ? "Mengirim…" : "Submit & tunggu chat WA →"}
                  </ShimmerSubmit>
                </div>
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-4 text-sm text-ink/60 hover:text-ink"
                >
                  ← Balik
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ShimmerSubmit({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-sage to-sage-dark px-8 font-medium text-cream shadow-lg shadow-sage/30 transition disabled:opacity-50"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-0 animate-shimmer bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.4),55%,transparent)] [background-size:200%_100%]"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
