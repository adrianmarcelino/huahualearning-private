"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Radio({
  label,
  checked,
  delay = 0,
  onSelect
}: {
  label: string;
  checked: boolean;
  delay?: number;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-200",
        checked
          ? "border-transparent text-white shadow-soft-lg scale-[1.02]"
          : "border-[1.5px] border-sage/40 bg-white text-ink-deep hover:bg-sage/8 hover:shadow-soft"
      )}
      style={
        checked
          ? { background: "linear-gradient(135deg, #8FAE6D 0%, #4A6B3A 100%)" }
          : undefined
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(160px circle at var(--x,50%) var(--y,50%), rgba(143,174,109,0.22), transparent 60%)"
        }}
      />
      <div className="relative flex items-center gap-3">
        <span
          className={cn(
            "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
            checked ? "border-white bg-white" : "border-sage/50 group-hover:border-sage"
          )}
        >
          {checked && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="grid h-3 w-3 place-items-center rounded-full bg-forest"
            >
              <Check className="h-2 w-2 text-white" strokeWidth={3.5} />
            </motion.span>
          )}
        </span>
        <span className="text-[15px] font-medium">{label}</span>
      </div>
    </motion.button>
  );
}
