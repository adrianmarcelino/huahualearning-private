"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOrAssignVariant, setVariant, getStoredVariant } from "@/lib/variant";

export function VariantInit({
  redirectIfB = false,
  assign
}: {
  redirectIfB?: boolean;
  assign?: "A" | "B";
}) {
  const router = useRouter();
  useEffect(() => {
    if (assign) {
      setVariant(assign);
      return;
    }
    const stored = getStoredVariant();
    const v = stored ?? getOrAssignVariant();
    if (redirectIfB && v === "B") {
      router.replace("/direct");
    }
  }, [redirectIfB, assign, router]);
  return null;
}
