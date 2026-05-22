"use client";

// Lead form — Multi Step Loader on submit.

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { submitLead, genLeadId, isValidIndoPhone } from "@/lib/apps-script";
import { fbqTrack } from "@/lib/fpixel";
import { cn } from "@/lib/utils";

const PAY_REDIRECT = "https://www.huahualearning.com/pay-private";

const STEPS = [
  {
    key: "goal",
    q: "Tujuan utama belajar Mandarin?",
    options: [
      "Persiapan ujian HSK",
      "Bisnis / kerja terkait China",
      "Persiapan kuliah / beasiswa",
      "Conversation sehari-hari",
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
    options: ["Sendiri (1-on-1)", "Berdua", "Bertiga atau lebih"]
  },
  {
    key: "material_choice",
    q: "Materi yang dipilih?",
    options: [
      "Materi Buku HSK",
      "Materi Request (Bisnis/Traveling/Conversation)",
      "Belum yakin — diskusi dulu"
    ]
  },
  {
    key: "timing",
    q: "Target mulai kapan?",
    options: ["Minggu ini", "2 minggu ke depan", "Bulan depan", "Masih riset dulu"]
  }
] as const;

const LOAD_STEPS_A = [
  { text: "Menyimpan datamu…" },
  { text: "Notif ke tim Huahua…" },
  { text: "Selesai! Cek WA kamu 🐼" }
];

const LOAD_STEPS_B = [
  { text: "Menyimpan datamu…" },
  { text: "Notif ke tim Huahua…" },
  { text: "Lanjut ke halaman pembayaran 💳" }
];

type Answers = Record<string, string>;

export function LeadForm({
  variant = "A",
  heading,
  subheading,
  eyebrow
}: {
  variant?: "A" | "B";
  heading?: string;
  subheading?: string;
  eyebrow?: string;
}) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const leadIdRef = useRef<string>("");

  // variant B (direct) skips the contact step — pembayaran re-asks kontak.
  const total = STEPS.length + 1;

  const next = (val: string) => {
    const updated = { ...a, [STEPS[step].key]: val };
    setA(updated);
    setTimeout(() => setStep((s) => s + 1), 280);
  };

  const doSubmit = async (answers: Answers) => {
    setErr("");
    setLoading(true);
    const leadId = genLeadId();
    leadIdRef.current = leadId;
    const adId =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("ad_id") ?? undefined
        : undefined;
    try {
      await submitLead({
        lead_id: leadId,
        name,
        whatsapp: wa,
        goal: answers.goal ?? "",
        level: answers.level ?? "",
        group_size: answers.group_size ?? "",
        material_choice: answers.material_choice ?? "",
        timing: answers.timing ?? "",
        notes,
        variant,
        ad_id: adId
      } as any);
    } catch {}
    // Meta Pixel — form completed
    fbqTrack("Lead", { value: 4350000, currency: "IDR" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("Nama wajib diisi.");
    if (!isValidIndoPhone(wa)) return setErr("Nomor WA harus mulai 08, +62, atau 62.");
    await doSubmit(a);
  };

  const onLoaderDone = () => {
    setLoading(false);
    if (variant === "B") {
      const params = new URLSearchParams({
        lead_id: leadIdRef.current,
        name,
        whatsapp: wa,
        goal: a.goal ?? "",
        level: a.level ?? "",
        group_size: a.group_size ?? "",
        material_choice: a.material_choice ?? "",
        timing: a.timing ?? "",
        notes
      });
      // Meta Pixel — heading to the payment page
      fbqTrack("InitiateCheckout");
      // Forward Meta + UTM tracking params from current page to /pay-private
      const trackingKeys = ["fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      const currentParams = new URLSearchParams(window.location.search);
      trackingKeys.forEach((key) => {
        const value = currentParams.get(key);
        if (value && !params.has(key)) {
          params.set(key, value);
        }
      });
      window.location.href = `${PAY_REDIRECT}?${params.toString()}`;
      return;
    }
    setDone(true);
  };

  if (done) return <Success />;

  return (
    <section id="cta" className="relative bg-cream py-20 md:py-28">
      <MultiStepLoader
        loading={loading}
        steps={variant === "B" ? LOAD_STEPS_B : LOAD_STEPS_A}
        duration={900}
        onDone={onLoaderDone}
      />

      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sage">{eyebrow ?? "📝 DAFTAR"}</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-ink-deep text-3xl md:text-4xl leading-tight">
            {heading ?? "Daftar dalam 30 detik"}
          </h2>
          <p className="mt-3 text-base text-muted">
            {subheading ?? "Tim Huahua bakal WA kamu max 30 menit setelah submit."}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-sage/15 bg-white p-6 md:p-8">
          <DotProgress current={step} total={total} />
          <AnimatePresence mode="wait">
            {step < STEPS.length ? (
              <motion.div
                key={`q${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
                  Pertanyaan {step + 1} / {total}
                </div>
                <h3 className="mt-2 font-display text-xl font-black text-ink-deep md:text-2xl">{STEPS[step].q}</h3>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  {STEPS[step].options.map((opt) => (
                    <Radio key={opt} label={opt} checked={a[STEPS[step].key] === opt} onSelect={() => next(opt)} />
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-5 min-h-[44px] text-sm font-medium text-muted hover:text-ink-deep"
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
                <h3 className="mt-2 font-display text-xl font-black text-ink-deep md:text-2xl">Kontak kamu</h3>
                <div className="mt-5 space-y-4">
                  <FloatInput label="Nama lengkap" value={name} onChange={setName} />
                  <FloatInput label="WhatsApp (08… / +62… / 62…)" value={wa} onChange={setWa} />
                  <FloatTextarea label="Hal spesifik buat Laoshi? (opsional)" value={notes} onChange={setNotes} />
                  {err && <div className="text-sm font-medium text-red-600">{err}</div>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-14 min-h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-bright text-base font-black text-ink-deep shadow-soft-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : variant === "B" ? (
                      "Submit & lanjut ke pembayaran →"
                    ) : (
                      "Submit & tunggu chat WA →"
                    )}
                  </button>
                </div>
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
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <span
            key={i}
            className={cn(
              "rounded-full transition-all",
              done ? "h-2.5 w-2.5 bg-sage" : active ? "h-3 w-3 bg-sage ring-4 ring-sage/20" : "h-2.5 w-2.5 bg-ink/15"
            )}
          />
        );
      })}
    </div>
  );
}

function Radio({ label, checked, onSelect }: { label: string; checked: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "min-h-[48px] w-full rounded-2xl border-[1.5px] px-4 py-3 text-left transition-all",
        checked
          ? "border-transparent bg-gradient-to-br from-sage to-forest text-white shadow-soft-lg scale-[1.02]"
          : "border-sage/40 bg-white text-ink-deep active:bg-sage/8"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
            checked ? "border-white bg-white" : "border-sage/50"
          )}
        >
          {checked && (
            <span className="grid h-3 w-3 place-items-center rounded-full bg-forest">
              <Check className="h-2 w-2 text-white" strokeWidth={3.5} />
            </span>
          )}
        </span>
        <span className="text-[15px] font-medium">{label}</span>
      </div>
    </button>
  );
}

function FloatInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  return (
    <label className="relative block">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="peer h-14 w-full rounded-2xl border-[1.5px] border-sage/30 bg-white px-4 pt-4 text-base text-ink-deep focus:border-sage focus:outline-none focus:ring-4 focus:ring-sage/15"
      />
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all",
          active ? "top-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sage" : "top-4 text-base text-muted"
        )}
      >
        {label}
      </span>
    </label>
  );
}

function FloatTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  return (
    <label className="relative block">
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full rounded-2xl border-[1.5px] border-sage/30 bg-white px-4 pb-3 pt-6 text-base text-ink-deep focus:border-sage focus:outline-none focus:ring-4 focus:ring-sage/15"
      />
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all",
          active ? "top-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sage" : "top-4 text-base text-muted"
        )}
      >
        {label}
      </span>
    </label>
  );
}

function Success() {
  return (
    <section id="cta" className="relative bg-sage/10 py-16 md:py-24">
      <div className="container mx-auto max-w-xl px-4 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-sage text-cream shadow-soft-lg">
          <Check className="h-12 w-12" strokeWidth={3} />
        </div>
        <h2 className="mt-6 font-display text-3xl font-black text-ink-deep md:text-4xl">Terkirim! 🐼</h2>
        <p className="mt-3 text-base text-muted">Tim Huahua bakal WA kamu max 30 menit ya.</p>
        <a
          href="https://wa.me/6281939304002"
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex h-14 min-h-[48px] items-center gap-2 rounded-full bg-sage px-7 font-semibold text-cream shadow-soft hover:bg-sage-dark"
        >
          Atau chat langsung di WA →
        </a>
      </div>
    </section>
  );
}
