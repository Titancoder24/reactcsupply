/**
 * C-Supply design tokens
 * These mirror APPENDIX A of the PRD and are also exposed as Tailwind/NativeWind colors.
 */
export const tokens = {
  color: {
    customer: {
      primary: "#0F4C81",
      accent: "#F97316",
      accent700: "#EA580C",
    },
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
    text: {
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
    bgKpi: {
      green: "#DCFCE7",
      orange: "#FFEDD5",
      purple: "#EDE9FE",
      red: "#FEE2E2",
      blue: "#DBEAFE",
    },
  },
  font: {
    family: "Poppins",
    weight: { regular: "400", medium: "500", semibold: "600", bold: "700" } as const,
    size: {
      display: 32,
      h1: 22,
      h2: 18,
      h3: 16,
      body: 14,
      label: 12,
      button: 16,
      tab: 11,
      priceLg: 20,
      priceSm: 14,
    },
  },
  space: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 },
  radius: { sm: 8, md: 12, lg: 16, pill: 999 },
  motion: {
    fast: 80,
    normal: 200,
    slow: 320,
    slower: 480,
  },
} as const;

export type Surface = "customer" | "vendor" | "transporter" | "admin" | "super_admin";

/** Convenience helpers to retrieve the primary color for a surface. */
export const primaryFor = (surface: Surface): string => {
  switch (surface) {
    case "customer":
      return tokens.color.customer.primary;
    case "vendor":
    case "transporter":
      return tokens.color.brand.green;
    case "admin":
    case "super_admin":
      return tokens.color.text.primary;
  }
};

export const accentFor = (surface: Surface): string => {
  switch (surface) {
    case "customer":
      return tokens.color.customer.accent;
    case "vendor":
    case "transporter":
      return tokens.color.brand.green;
    default:
      return tokens.color.text.primary;
  }
};
