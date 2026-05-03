/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customer: {
          primary: "#0B3B6E",
          primary600: "#0F4C81",
          primary700: "#0A3B65",
          accent: "#F97316",
          accent600: "#EA580C",
          tint: "#EFF6FF",
        },
        brand: {
          green: "#16A34A",
          green600: "#15803D",
          green700: "#14532D",
          green50: "#F0FDF4",
        },
        ink: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        surface: {
          light: "#F8FAFC",
          white: "#FFFFFF",
          page: "#F6F7FB",
          softBg: "#F9FAFB",
        },
        state: {
          success: "#16A34A",
          successBg: "#DCFCE7",
          info: "#1D4ED8",
          infoBg: "#DBEAFE",
          warning: "#B45309",
          warningBg: "#FEF3C7",
          danger: "#DC2626",
          dangerBg: "#FEE2E2",
        },
        star: "#F59E0B",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "system-ui"],
        sans: ["Inter", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
