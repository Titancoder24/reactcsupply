/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Customer app palette
        customer: {
          primary: "#0F4C81",
          accent: "#F97316",
          accent700: "#EA580C",
        },
        // Vendor / Transporter green
        brand: {
          green: "#22C55E",
          green700: "#16A34A",
          green50: "#F0FDF4",
        },
        surface: {
          light: "#F8FAFC",
          white: "#FFFFFF",
          softBg: "#F9FAFB",
        },
        ink: {
          dark: "#334155",
          muted: "#64748B",
          primary: "#111827",
          secondary: "#6B7280",
        },
        state: {
          success: "#22C55E",
          successBg: "#DCFCE7",
          successText: "#15803D",
          info: "#1E40AF",
          infoBg: "#DBEAFE",
          warning: "#B45309",
          warningBg: "#FEF3C7",
          danger: "#EF4444",
          dangerBg: "#FEE2E2",
        },
        border: {
          divider: "#E2E8F0",
          input: "#D1D5DB",
        },
        star: "#FBBF24",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "system-ui"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
