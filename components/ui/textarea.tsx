"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[120px] w-full rounded-2xl border border-ink/15 bg-cream/60 px-4 py-3 text-base text-ink placeholder:text-muted",
      "focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30 transition",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
