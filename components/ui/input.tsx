"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 text-base text-ink placeholder:text-muted",
      "focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30 transition",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
