import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          300: "#7AB0CC",
          400: "#4A80AA",
          500: "#2C6090",
          600: "#234E74",
          700: "#1A3C5B",
          800: "#0F2842",
          900: "#0A1929",
        },
        orange: {
          300: "#FAAA72",
          400: "#F78C4A",
          500: "#F46F22",
          600: "#D45F15",
        },
        offwhite: "#F8FAFC",
        grayline: {
          100: "#EEF2F7",
          200: "#D8E4EE",
          400: "#8FA8BC",
          600: "#4D6678",
          800: "#1E3040",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "36px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(244,111,34,0.25)",
        navy: "0 20px 60px rgba(10,25,41,0.5)",
        card: "0 4px 24px rgba(10,25,41,0.08)",
        lgnavy: "0 16px 48px rgba(10,25,41,0.16)",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
      },
      container: {
        center: true,
        padding: "24px",
        screens: { "2xl": "1280px" },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ring: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(15deg)" },
          "20%": { transform: "rotate(-12deg)" },
          "30%": { transform: "rotate(10deg)" },
          "40%": { transform: "rotate(-8deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        ring: "ring 1.8s infinite",
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
