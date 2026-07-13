import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          950: "#070707",
          900: "#0A0A0A",
          800: "#111111",
          700: "#1A1A1A",
          600: "#262626",
          500: "#3A3A3A",
          400: "#5A5A5A",
        },
        bone: {
          DEFAULT: "#FAFAFA",
          100: "#FAFAFA",
          200: "#EAEAEA",
          300: "#C4C4C4",
          400: "#8A8A8A",
        },
        accent: {
          DEFAULT: "#FF4500",
          glow: "#FF6A33",
          deep: "#CC3700",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        glitch: ["var(--font-glitch)", "Rubik Glitch", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "fluid-xs": ["clamp(0.75rem, 0.7vw + 0.6rem, 0.875rem)", { lineHeight: "1.4" }],
        "fluid-sm": ["clamp(0.875rem, 0.8vw + 0.7rem, 1rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 0.9vw + 0.8rem, 1.125rem)", { lineHeight: "1.6" }],
        "fluid-lg": ["clamp(1.125rem, 1.2vw + 0.9rem, 1.375rem)", { lineHeight: "1.5" }],
        "fluid-xl": ["clamp(1.375rem, 2vw + 1rem, 2rem)", { lineHeight: "1.2" }],
        "fluid-2xl": ["clamp(2rem, 4vw + 1rem, 3.5rem)", { lineHeight: "1.05" }],
        "fluid-3xl": ["clamp(2.75rem, 6vw + 1rem, 5.5rem)", { lineHeight: "0.95" }],
        "fluid-mega": ["clamp(3.5rem, 12vw + 1rem, 12rem)", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        "tightest-2": "-0.04em",
        "wider-2": "0.18em",
        "widest-2": "0.32em",
      },
      borderRadius: {
        none: "0", xs: "2px", sm: "4px", DEFAULT: "6px", md: "8px", lg: "12px", xl: "16px",
      },
      backgroundImage: {
        "diagonal-lines":
          "repeating-linear-gradient(135deg, transparent 0, transparent 12px, rgba(255,255,255,0.025) 12px, rgba(255,255,255,0.025) 13px)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "glitch": "glitch 0.3s linear",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -2px)" },
          "80%": { transform: "translate(1px, 2px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      screens: { xs: "380px" },
    },
  },
  plugins: [],
};

export default config;
