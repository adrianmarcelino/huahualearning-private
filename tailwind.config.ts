import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
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
        muted: "#9C948B"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(74,107,58,0.12)",
        "soft-lg": "0 24px 80px rgba(74,107,58,0.18)"
      },
      keyframes: {
        shimmer: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "-200% 0" } },
        "aurora-bg": { "0%, 100%": { backgroundPosition: "50% 50%" }, "50%": { backgroundPosition: "350% 50%" } },
        "scroll-x": { to: { transform: "translateX(calc(-50% - 0.5rem))" } },
        meteor: { "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" }, "70%": { opacity: "1" }, "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" } },
        "spotlight-anim": { "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" }, "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" } }
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "aurora-bg": "aurora-bg 60s ease infinite",
        "scroll-x": "scroll-x var(--duration,40s) linear infinite",
        meteor: "meteor 5s linear infinite",
        spotlight: "spotlight-anim 2s ease 0.75s 1 forwards"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
