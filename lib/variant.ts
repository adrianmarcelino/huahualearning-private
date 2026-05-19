"use client";

export type Variant = "A" | "B";
const KEY = "private_variant";

export function readStored(): Variant | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "A" || v === "B" ? v : null;
}

export function assignNew(): Variant {
  const v: Variant = Math.random() < 0.5 ? "A" : "B";
  window.localStorage.setItem(KEY, v);
  return v;
}

export function setVariant(v: Variant) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, v);
}
