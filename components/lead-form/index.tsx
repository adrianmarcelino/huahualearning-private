"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Check, Loader2 } from "lucide-react";
import { Radio } from "./radio";
import { FloatingInput, FloatingTextarea } from "./floating-input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { submitLead, genLeadId, isValidIndoPhone } from "@/lib/apps-script";
import { useAppState } from "@/lib/state-context";

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
  const { setMascotPose, setMascotLookAt } = useAppState();
  const formRef = useRef<HTMLDivElement>(null);

  // STATE 6 — when contact step is active, mascot pupils look at form
  useEffect(() => {
    if (step === STEPS.length && formRef.current) {
      const r = formRef.current.getBoundingClientRect();
      setMascotLookAt({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  }, [step, setMascotLookAt]);

  // STATE 5 — radio select triggers happy 800ms
  const next = (val: string) => {
    setA((x) => ({ ...x, [STEPS[step].key]: val }));
    setMascotPose("happy", 800);
    setTimeout(() => setStep((s) => s + 1), 280);
  };

  // STATE 6 — after 3 chars in any field, thinking 500ms
  const typed = useRef({ name: 0, wa: 0, notes: 0 });
  const onTyped = (which: "name" | "wa" | "notes", v: string) => {
    if (v.length === 3 && typed.current[which] === 0) {
      typed.current[which] = 1;
      setMascotPose("thinking", 500);
    }
    if (v.length === 0) typed.current[which] = 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("Nama wajib diisi.");
    if (!isValidIndoPhone(wa)) return setErr("Nomor WA harus mulai 08, +62, atau 62.");
    setSubmitting(true);
    setMascotPose("thinking");
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
    // STATE 7 — cheer 3s + confetti + screen flash via overlay handled in SuccessScreen
    setMascotPose("cheer", 3000);
    confetti({
      particleCount: 200,
      spread: 110,
      startVelocity: 38,
      origin: { y: 0.55 },
      colors: ["#8FAE6D", "#4A6B3A", "#F6E3A1", "#FFD700", "#FBF4EA"]
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

        <div ref={formRef} className="mt-12 rounded-[2rem] border border-sage/10 bg-white p-7 shadow-soft-lg md:p-12">
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
                  <FloatingInput label="Nama lengkap" value={name} onChange={(v) => { setName(v); onTyped("name", v); }} />
                  <FloatingInput label="WhatsApp (08… / +62… / 62…)" value={wa} onChange={(v) => { setWa(v); onTyped("wa", v); }} />
                  <FloatingTextarea
                    label="Ada hal spesifik buat Laoshi? (opsional)"
                    value={notes}
                    onChange={(v) => { setNotes(v); onTyped("notes", v); }}
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

// STATE 5 — SVG stroke-dashoffset progress dot animation.
function DotProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center gap-3">
            <span
              className={
                "relative grid place-items-center rounded-full transition-all duration-300 " +
                (active ? "h-7 w-7" : "h-5 w-5")
              }
            >
              <svg viewBox="0 0 24 24" className="absolute inset-0">
                <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(143,174,109,0.18)" strokeWidth="2" />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill={done ? "#8FAE6D" : "transparent"}
                  stroke="#8FAE6D"
                  strokeWidth="2"
                  strokeDasharray={2 * Math.PI * 10}
                  initial={false}
                  animate={{ strokeDashoffset: done ? 0 : active ? 2 * Math.PI * 10 * 0.4 : 2 * Math.PI * 10 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  transform="rotate(-90 12 12)"
                />
              </svg>
              {done && <Check className="relative h-3 w-3 text-white" strokeWidth={3} />}
            </span>
            {i < total - 1 && (
              <span className={"h-px w-6 transition-colors " + (done ? "bg-sage" : "bg-ink/15")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SuccessScreen() {
  // STATE 7 — typewriter heading + screen flash overlay + intense WA shimmer
  const heading = "Terkirim! 🐼";
  const [shown, setShown] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const fOff = setTimeout(() => setFlash(false), 250);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= heading.length) clearInterval(id);
    }, 60);
    const t = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        startVelocity: 30,
        origin: { y: 0.6 },
        colors: ["#8FAE6D", "#FFD700", "#F6E3A1"]
      });
    }, 600);
    return () => {
      clearTimeout(t);
      clearTimeout(fOff);
      clearInterval(id);
    };
  }, []);

  return (
    <section id="cta" className="relative bg-sage/10 py-32">
      {/* sage screen flash overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: flash ? 0.3 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed inset-0 z-50 bg-sage"
        aria-hidden
      />
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
        <h2 className="mt-8 font-display text-3xl font-black text-ink-deep md:text-4xl">
          {heading.slice(0, shown)}
          <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-ink-deep" style={{ height: "0.85em" }} />
        </h2>
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
            <ShimmerButton
              background="#8FAE6D"
              shimmerColor="#F6E3A1"
              shimmerDuration="1.5s"
              className="h-14 px-8 text-base"
            >
              Atau chat langsung di WA →
            </ShimmerButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
