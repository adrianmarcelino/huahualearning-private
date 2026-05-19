"use client";

// 12. Multi Step Loader
// Source URL: https://ui.aceternity.com/components/multi-step-loader
// Source saved: research/aceternity-source/multi-step-loader.tsx
// Adaptation: sage checks, cream backdrop, BM copy steps.
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadStep {
  text: string;
}

export function MultiStepLoader({
  loading,
  steps,
  duration = 900,
  onDone
}: {
  loading: boolean;
  steps: LoadStep[];
  duration?: number;
  onDone?: () => void;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!loading) {
      setActive(0);
      return;
    }
    if (active < steps.length - 1) {
      const id = setTimeout(() => setActive((a) => a + 1), duration);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(id);
  }, [active, loading, steps.length, duration, onDone]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-cream/95 backdrop-blur-sm"
        >
          <div className="space-y-3">
            {steps.map((s, i) => {
              const done = i < active;
              const cur = i === active;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-5 py-3 transition-all",
                    cur ? "bg-white shadow-soft" : done ? "" : "opacity-40"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full",
                      done ? "bg-sage text-white" : cur ? "border-2 border-sage" : "border border-ink/20"
                    )}
                  >
                    {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    {cur && <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />}
                  </span>
                  <span className={cn("text-base font-medium", cur && "text-ink-deep", done && "text-ink/60")}>
                    {s.text}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
