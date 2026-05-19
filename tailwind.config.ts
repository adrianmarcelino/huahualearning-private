import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        cream: "#FBF4EA",
        "cream-2": "#F7F0E2",
        sage: "#8FAE6D",
        "sage-dark": "#6F8A52",
        forest: "#4A6B3A",
        gold: "#F6E3A1",
        "gold-bright": "#FFD700",
        ink: "#4F4A45",
        "ink-deep": "#2C2A26",
        muted: "#9C948B",
        background: "#FBF4EA",
        foreground: "#4F4A45",
        primary: { DEFAULT: "#8FAE6D", foreground: "#FBF4EA" },
        accent: { DEFAULT: "#F6E3A1", foreground: "#4F4A45" }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(74,107,58,0.12)",
        "soft-lg": "0 24px 80px rgba(74,107,58,0.18)",
        "phone": "0 60px 100px -20px rgba(74,107,58,0.30), 0 30px 60px -30px rgba(44,42,38,0.4)"
      },
      keyframes: {
        shimmer: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "-200% 0" } },
        "border-beam": { "100%": { "offset-distance": "100%" } },
        meteor: { "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" }, "70%": { opacity: "1" }, "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" } },
        wave: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        float: { "0%, 100%": { transform: "translateY(0px) rotate(0deg)" }, "50%": { transform: "translateY(-12px) rotate(2deg)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-100% - var(--gap)))" } },
        "marquee-y": { from: { transform: "translateY(0)" }, to: { transform: "translateY(calc(-100% - var(--gap)))" } },
        aurora: { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,30px) scale(0.97)" }
        },
        "watermark-rock": { "0%, 100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        "shine-sweep": { from: { transform: "translateX(-100%)" }, to: { transform: "translateX(100%)" } },
        "pulse-soft": { "0%, 100%": { opacity: "0.5", transform: "scale(1)" }, "50%": { opacity: "0.9", transform: "scale(1.04)" } },
        bounce: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } }
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        meteor: "meteor 5s linear infinite",
        wave: "wave 1.2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        marquee: "marquee var(--duration, 30s) linear infinite",
        "marquee-y": "marquee-y var(--duration, 30s) linear infinite",
        aurora: "aurora 8s ease infinite",
        "blob-drift": "blob-drift 22s ease-in-out infinite",
        "watermark-rock": "watermark-rock 14s ease-in-out infinite",
        "shine-sweep": "shine-sweep 3s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
