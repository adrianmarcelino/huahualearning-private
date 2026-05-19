"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { readStored, assignNew, setVariant } from "@/lib/variant";

export function VariantInit({ redirectIfB = false, force }: { redirectIfB?: boolean; force?: "A" | "B" }) {
  const router = useRouter();
  useEffect(() => {
    if (force) {
      setVariant(force);
      return;
    }
    const v = readStored() ?? assignNew();
    if (redirectIfB && v === "B") router.replace("/direct");
  }, [redirectIfB, force, router]);
  return null;
}
