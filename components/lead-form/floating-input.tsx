"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FloatingInput({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <label className="relative block">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer h-14 w-full rounded-2xl border-[1.5px] border-sage/30 bg-white px-4 pt-4 text-base text-ink-deep transition-colors focus:border-sage focus:outline-none focus:ring-4 focus:ring-sage/15"
      />
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          active ? "top-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sage" : "top-4 text-base text-muted"
        )}
      >
        {label}
      </span>
    </label>
  );
}

export function FloatingTextarea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <label className="relative block">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        className="peer w-full rounded-2xl border-[1.5px] border-sage/30 bg-white px-4 pb-3 pt-6 text-base text-ink-deep transition-colors focus:border-sage focus:outline-none focus:ring-4 focus:ring-sage/15"
      />
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          active ? "top-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sage" : "top-4 text-base text-muted"
        )}
      >
        {label}
      </span>
    </label>
  );
}
