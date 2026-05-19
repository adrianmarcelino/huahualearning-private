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
        sage: "#8FAE6D",
        "sage-dark": "#6F8A52",
        gold: "#F6E3A1",
        ink: "#4F4A45",
        muted: "#9C948B",
        background: "#FBF4EA",
        foreground: "#4F4A45",
        primary: { DEFAULT: "#8FAE6D", foreground: "#FBF4EA" },
        accent: { DEFAULT: "#F6E3A1", foreground: "#4F4A45" }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      keyframes: {
        shimmer: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "-200% 0" } },
        "border-beam": { "100%": { "offset-distance": "100%" } },
        meteor: { "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" }, "70%": { opacity: "1" }, "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" } },
        wave: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        float: { "0%, 100%": { transform: "translateY(0px) rotate(0deg)" }, "50%": { transform: "translateY(-12px) rotate(2deg)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-100% - var(--gap)))" } }
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        meteor: "meteor 5s linear infinite",
        wave: "wave 1.2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        marquee: "marquee var(--duration, 30s) linear infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
