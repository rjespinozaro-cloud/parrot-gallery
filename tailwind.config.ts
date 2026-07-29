import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "#e6edf9",
          100: "#b3c8ea",
          200: "#80a3db",
          300: "#4d7ecc",
          400: "#2659b8",
          500: "#0047E6",
          600: "#0036b3",
          700: "#002680",
          800: "#00154d",
          900: "#000a1a",
        },
        azure: {
          50: "#e6f6fe",
          100: "#b3e4fb",
          200: "#80d2f8",
          300: "#4dc0f5",
          400: "#26aef2",
          500: "#0EA5E9",
          600: "#0b84ba",
          700: "#08638b",
          800: "#05425c",
          900: "#03212d",
        },
        primary: {
          50: "#e6f7f5",
          100: "#b3e5de",
          200: "#80d3c7",
          300: "#4dc1b0",
          400: "#26a898",
          500: "#0F766E",
          600: "#0c5f58",
          700: "#094842",
          800: "#06312c",
          900: "#031b16",
        },
        accent: "#F59E0B",
        secondary: "#A78BFA",
        carbon: {
          50: "#f5f7f9",
          100: "#e3e8ef",
          200: "#c7d1de",
          300: "#9ba8ba",
          400: "#6b7a90",
          500: "#4a5568",
          600: "#373f54",
          700: "#2a3142",
          800: "#1e2430",
          900: "#141821",
        },
      },
      boxShadow: {
        "neon-navy": "0 0 20px rgba(0, 71, 230, 0.15), 0 0 4px rgba(0, 71, 230, 0.3)",
        "neon-navy-lg": "0 0 30px rgba(0, 71, 230, 0.2), 0 0 8px rgba(0, 71, 230, 0.25)",
        "neon-sky": "0 0 20px rgba(14, 165, 233, 0.15), 0 0 4px rgba(14, 165, 233, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        "glass-navy": "0 8px 32px rgba(0, 71, 230, 0.1), 0 2px 8px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      },
      dropShadow: {
        neon: "0 0 8px rgba(37, 99, 235, 0.4)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 14px rgba(37, 99, 235, 0.2)" },
          "50%": { boxShadow: "0 0 24px rgba(37, 99, 235, 0.4)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2.4s ease-in-out infinite",
        scanline: "scanline 3s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
