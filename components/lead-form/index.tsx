"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Check, Loader2 } from "lucide-react";
import { Radio } from "./radio";
import { FloatingInput, FloatingTextarea } from "./floating-input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { submitLead, genLeadId, isValidIndoPhone } from "@/lib/apps-script";

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
  const total = STEPS.length + 1;

  const next = (val: string) => {
    setA((x) => ({ ...x, [STEPS[step].key]: val }));
    setTimeout(() => setStep((s) => s + 1), 280);
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
    confetti({
      particleCount: 180,
      spread: 110,
      startVelocity: 38,
      origin: { y: 0.55 },
      colors: ["#8FAE6D", "#4A6B3A", "#F6E3A1", "#FFD700"]
    });
  };

  if (done) return <SuccessScreen />;

  return (
    <section id="cta" className="relative bg-cream py-32">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <AnimatedGradientText className="font-display text-4xl font-black md:text-5xl" colors={["#8FAE6D", "#4A6B3A", "#FFD700", "#8FAE6D"]}>
            Daftar dalam 30 detik
          </AnimatedGradientText>
          <p className="mt-3 text-lg text-muted">Tim Huahua bakal WA kamu max 30 menit setelah submit.</p>
        </div>

        <div className="mt-12 rounded-[2rem] border border-sage/10 bg-white p-7 shadow-soft-lg md:p-12">
          <DotProgress current={step} total={total} />

          <AnimatePresence mode="wait">
            {step < STEPS.length ? (
              <motion.div
                key={`q${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
                  Pertanyaan {step + 1} / {total}
                </div>
                <h3 className="mt-2 font-display text-2xl font-black text-ink-deep md:text-3xl">
                  {STEPS[step].q}
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {STEPS[step].options.map((opt, i) => (
                    <Radio
                      key={opt}
                      label={opt}
                      checked={a[STEPS[step].key] === opt}
                      delay={i * 0.05}
                      onSelect={() => next(opt)}
                    />
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="mt-6 text-sm font-medium text-muted transition-colors hover:text-ink"
                  >
                    ← Balik
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="contact"
                onSubmit={onSubmit}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
                  Pertanyaan {total} / {total}
                </div>
                <h3 className="mt-2 font-display text-2xl font-black text-ink-deep md:text-3xl">Kontak kamu</h3>
                <div className="mt-6 space-y-5">
                  <FloatingInput label="Nama lengkap" value={name} onChange={(v) => setName(v)} />
                  <FloatingInput label="WhatsApp (08… / +62… / 62…)" value={wa} onChange={(v) => setWa(v)} />
                  <FloatingTextarea
                    label="Ada hal spesifik buat Laoshi? (opsional)"
                    value={notes}
                    onChange={(v) => setNotes(v)}
                  />
                  {err && <div className="text-sm font-medium text-red-600">{err}</div>}
                  <ShimmerButton
                    type="submit"
                    disabled={submitting}
                    background="linear-gradient(120deg,#FFD700,#F6E3A1)"
                    shimmerColor="#FFFFFF"
                    shimmerDuration="2.4s"
                    className="h-16 w-full text-base font-black tracking-wide"
                    style={{ color: "#2C2A26" }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Mengirim…
                      </>
                    ) : (
                      "Submit & tunggu chat WA →"
                    )}
                  </ShimmerButton>
                </div>
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-4 text-sm font-medium text-muted transition-colors hover:text-ink"
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

function DotProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <span
            className={
              "relative grid place-items-center rounded-full transition-all duration-300 " +
              (i < current
                ? "h-2.5 w-2.5 bg-sage"
                : i === current
                  ? "h-3.5 w-3.5 bg-sage ring-4 ring-sage/20"
                  : "h-2.5 w-2.5 bg-ink/15")
            }
          >
            {i < current && <Check className="h-2 w-2 text-white" strokeWidth={3} />}
          </span>
          {i < total - 1 && (
            <span className={"h-px w-6 " + (i < current ? "bg-sage" : "bg-ink/15")} />
          )}
        </div>
      ))}
    </div>
  );
}

function SuccessScreen() {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        startVelocity: 30,
        origin: { y: 0.6 },
        colors: ["#8FAE6D", "#FFD700", "#F6E3A1"]
      });
    }, 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <section id="cta" className="relative bg-sage/10 py-32">
      <div className="container mx-auto max-w-xl px-4 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 14 }}
          className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-sage to-forest text-white shadow-soft-lg"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-sage/40" />
          <Check className="relative h-12 w-12" strokeWidth={3} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 font-display text-3xl font-black text-ink-deep md:text-4xl"
        >
          Terkirim! 🐼
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-lg text-ink/70"
        >
          Tim Huahua bakal WA kamu max 30 menit ya.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <a href="https://wa.me/6281939304002" target="_blank" rel="noreferrer">
            <ShimmerButton background="#8FAE6D" shimmerColor="#F6E3A1" className="h-14 px-8 text-base">
              Atau chat langsung di WA →
            </ShimmerButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
