"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Radio({
  label,
  checked,
  onSelect
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition",
        checked
          ? "border-sage bg-sage/10 shadow-md shadow-sage/20"
          : "border-ink/15 bg-cream hover:border-sage/60 hover:shadow-md"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "radial-gradient(120px circle at var(--x,50%) var(--y,50%), rgba(143,174,109,0.18), transparent 60%)" }}
      />
      <div className="relative flex items-center gap-3">
        <span
          className={cn(
            "grid h-5 w-5 place-items-center rounded-full border-2",
            checked ? "border-sage" : "border-ink/30 group-hover:border-sage"
          )}
        >
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-sage" />}
        </span>
        <span className="text-base text-ink">{label}</span>
      </div>
    </motion.button>
  );
}
