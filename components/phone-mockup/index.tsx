"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneFrame } from "./frame";
import { Conversation } from "./conversation";
import { stickyPanels } from "./sticky-panels";

export function PhoneMockupSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);

  return (
    <section id="phone" ref={ref} className="relative py-32">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-2">
        {/* Sticky phone (effect 13) */}
        <div className="relative">
          <div className="sticky top-24">
            <motion.div
              style={{ rotateY, rotateX, scale, transformPerspective: 1000 }}
              className="mx-auto w-full max-w-[320px]"
            >
              <PhoneFrame>
                <Conversation />
              </PhoneFrame>
            </motion.div>
          </div>
        </div>

        {/* Scrolling panels next to phone */}
        <div className="space-y-32 pt-12">
          {stickyPanels.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs font-medium uppercase tracking-widest text-sage">
                {String(i + 1).padStart(2, "0")} — {p.tag}
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">{p.title}</h3>
              <p className="mt-3 text-lg text-ink/70">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
