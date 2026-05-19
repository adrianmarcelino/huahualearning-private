"use client";

// Inspired by Magic UI OrbitingCircles — children distributed around a circular path.
// https://magicui.design/docs/components/orbiting-circles
import { cn } from "@/lib/utils";

export function OrbitingCircles({
  children,
  className,
  radius = 160,
  duration = 20,
  reverse = false,
  iconSize = 30,
  path = true
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  duration?: number;
  reverse?: boolean;
  iconSize?: number;
  path?: boolean;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <>
      {path && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto"
          width={radius * 2}
          height={radius * 2}
        >
          <circle
            cx={radius}
            cy={radius}
            r={radius - 1}
            fill="none"
            stroke="rgba(143,174,109,0.18)"
            strokeDasharray="4 6"
          />
        </svg>
      )}
      <div
        className={cn("pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", className)}
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {items.map((child, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                animation: `aurora 1s linear`,
                animationName: "orbit-rot",
                animationDuration: `${duration}s`,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
                animationDirection: reverse ? "reverse" : "normal",
                animationDelay: `${-(duration / items.length) * i}s`
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: iconSize,
                  height: iconSize,
                  marginLeft: -iconSize / 2,
                  marginTop: -iconSize / 2 - radius
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes orbit-rot {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
