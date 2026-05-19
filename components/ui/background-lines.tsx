"use client";

// 13. Background Lines
// Source URL: https://ui.aceternity.com/components/background-lines
// Source saved: research/aceternity-source/background-lines.tsx
// Adaptation: sage strokes with gold accents, opacity 30%, light bg.
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PATHS = [
  "M720 450C720 450 742.459 440.315 755.249 425.626C768.039 410.937 778.88 376.21 794.5 367.5C810.12 358.79 835.65 386.314 851.5 386.314C867.35 386.314 887.27 374.156 901.5 367.5C915.73 360.844 933.908 357.169 945.5 343.125C957.092 329.081 953.673 296.601 970.5 295.937C987.327 295.273 1011.83 333.612 1025.5 343.124C1039.17 352.636 1053.81 350.115 1070.5 355.625C1087.19 361.135 1083.6 393.583 1101.5 395.124C1119.4 396.665 1141.91 363.165 1163.5 357.501",
  "M720 450C720 450 741.822 463.865 754.5 471.836C767.178 479.807 766.578 491.058 781.5 496.501C796.422 501.944 829.05 507.713 843.5 497.501C857.95 487.289 854.952 460.171 870.5 451.501C886.048 442.831 911.95 442.978 927.5 433.501C943.05 424.024 942.95 414.085 958.5 403.501C974.05 392.917 1007.66 391.156 1021.5 379.501C1035.34 367.846 1027.79 350.802 1042.5 343.501C1057.21 336.2 1093.5 343.5 1110.5 343.5C1127.5 343.5 1127.5 343.5 1163.5 343.5",
  "M720 450C720 450 705.598 462.998 689.5 467.501C673.402 472.004 645.972 480.348 626.5 472.501C607.028 464.654 600.501 433.829 580.5 425.001C560.499 416.173 525.531 442.842 506.5 432.001C487.469 421.16 487.225 391.467 470.5 379.001C453.775 366.535 423.998 358.314 411.5 358.314C399.002 358.314 376.55 372.234 358.5 367.501C340.45 362.768 322.5 343.5 322.5 343.5",
  "M720 450C720 450 697.842 458.5 685.5 466.5C673.158 474.5 670.305 487.336 655.5 491.5C640.695 495.664 600.625 502.5 585.5 492.5C570.375 482.5 569.524 459.171 555.5 451.5C541.476 443.829 519.395 442.5 506.5 432.5C493.605 422.5 491.405 414.502 478.5 404.5C465.595 394.498 433.585 391.156 419.5 379.5C405.415 367.844 412.05 348.802 396.5 343.5C380.95 338.198 343.5 343.5 326.5 343.5"
];

function CoreLines({ className, svgOptions }: { className?: string; svgOptions?: { duration?: number } }) {
  const dur = svgOptions?.duration ?? 10;
  return (
    <div className={cn("absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]", className)}>
      <svg viewBox="0 0 1440 900" className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none" aria-hidden>
        {PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={i % 2 === 0 ? "#8FAE6D" : "#F6E3A1"}
            strokeWidth="1.4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: dur, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

export const BackgroundLines = React.memo(CoreLines);
