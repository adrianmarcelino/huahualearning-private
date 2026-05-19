"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "./frame";
import { Conversation } from "./conversation";
import { BlurFade } from "@/components/ui/blur-fade";
import { useAppState } from "@/lib/state-context";

const STEPS = [
  {
    tag: "01 — Kirim suara",
    title: "Rekam pengucapanmu langsung di WhatsApp",
    body: "Ucapkan kata atau kalimat Mandarin. Laoshi AI dengerin langsung — bukan baca teks. Tone 1-4 ditangkap per detik."
  },
  {
    tag: "02 — Dinilai per nada",
    title: "Skor pelafalan tiap karakter, tiap nada",
    body: "Tone 1-4 dinilai per hanzi. Bukan cuma 'bagus' atau 'kurang'. Kamu tahu persis nada mana yang masih meleset."
  },
  {
    tag: "03 — Koreksi spesifik",
    title: "Feedback yang bisa langsung diulang",
    body: "Initial salah? Final kurang panjang? Dibilangin tepat, plus contoh audio buat dibandingin. Tiap minggu, Laoshi manusia recap progress kamu."
  }
];

export function PhoneMockupSection() {
  const ref = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { setMascotPose, setMascotLookAt } = useAppState();
  const [hoverSpeed, setHoverSpeed] = useState(1);

  // scroll-driven tilt
  const scrollRotY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-14, 0, 0, 14]);
  const scrollRotX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [8, 0, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.94]);

  // STATE 8 — mouse-driven tilt overlay (max ±5deg) added to scroll tilt
  const mouseRotY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const mouseRotX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  const rotateY = useTransform([scrollRotY, mouseRotY], ([s, m]: any) => Number(s) + Number(m));
  const rotateX = useTransform([scrollRotX, mouseRotX], ([s, m]: any) => Number(s) + Number(m));

  const onPhoneMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const r = phoneRef.current.getBoundingClientRect();
    const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
    mouseRotY.set(nx * 10); // ±5deg-ish
    mouseRotX.set(-ny * 10);
    setMascotLookAt({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setMascotPose("listening");
    setHoverSpeed(1.5);
  };
  const onPhoneLeave = () => {
    mouseRotY.set(0);
    mouseRotX.set(0);
    setMascotPose("idle");
    setHoverSpeed(1);
  };

  // step driver — based on which step panel is most in view
  const [activeStep, setActiveStep] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observers = panelRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActiveStep(i);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      o.observe(el);
      return o;
    });
    return () => {
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  return (
    <section id="phone" ref={ref} className="relative bg-cream py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <BlurFade>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sage">Cara kerja</div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-black text-ink-deep md:text-5xl">
              Belajar di WhatsApp yang sama yang sudah kamu pakai
            </h2>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Sticky phone */}
          <div className="relative order-2 lg:order-1">
            <div className="sticky top-24">
              <motion.div
                ref={phoneRef}
                onMouseMove={onPhoneMove}
                onMouseLeave={onPhoneLeave}
                style={{ rotateY, rotateX, scale, transformPerspective: 1200 }}
                className="mx-auto"
              >
                <PhoneFrame>
                  <Conversation activeStep={activeStep} speed={hoverSpeed} />
                </PhoneFrame>
              </motion.div>
            </div>
          </div>

          {/* Scrolling panels */}
          <div className="order-1 flex flex-col gap-44 pt-12 lg:order-2">
            {STEPS.map((p, i) => (
              <div
                key={i}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="min-h-[40vh]"
              >
                <BlurFade>
                  <div
                    className={
                      "text-xs font-semibold uppercase tracking-[0.3em] " +
                      (activeStep === i ? "text-forest" : "text-muted")
                    }
                  >
                    {p.tag}
                  </div>
                </BlurFade>
                <BlurFade delay={0.05}>
                  <h3
                    className={
                      "mt-3 font-display text-3xl font-black md:text-4xl transition-colors " +
                      (activeStep === i ? "text-ink-deep" : "text-ink/60")
                    }
                  >
                    {p.title}
                  </h3>
                </BlurFade>
                <BlurFade delay={0.1}>
                  <p className={"mt-4 text-lg " + (activeStep === i ? "text-ink/80" : "text-ink/50")}>
                    {p.body}
                  </p>
                </BlurFade>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
