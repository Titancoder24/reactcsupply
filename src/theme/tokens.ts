/**
 * C-Supply design tokens — Production grade.
 *
 * Typography: Plus Jakarta Sans for display, Inter for body, JetBrains Mono for numerics.
 * Color: Slate-based neutral scale with semantic surface/state aliases.
 * Shadow: Layered, color-aware shadows (Linear/Vercel feel).
 * Motion: Cubic-bezier curves with consistent timing scale.
 */
export const tokens = {
  color: {
    // Surface palettes per role
    customer: {
      primary: "#0B3B6E",
      primary600: "#0F4C81",
      primary700: "#0A3B65",
      accent: "#F97316",
      accent600: "#EA580C",
      accent700: "#C2410C",
      tint: "#EFF6FF",
    },
    brand: {
      green: "#16A34A",
      green600: "#15803D",
      green700: "#14532D",
      green50: "#F0FDF4",
      tint: "#F0FDF4",
    },

    // Neutral / slate scale (page bg, cards, text)
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

    // Semantic aliases used widely in code
    surface: {
      light: "#F8FAFC",
      white: "#FFFFFF",
      softBg: "#F9FAFB",
      page: "#F6F7FB",
      raised: "#FFFFFF",
    },
    text: {
      dark: "#0F172A",
      primary: "#0F172A",
      body: "#334155",
      muted: "#64748B",
      secondary: "#64748B",
      subtle: "#94A3B8",
      inverse: "#FFFFFF",
    },
    state: {
      success: "#16A34A",
      successBg: "#DCFCE7",
      successText: "#14532D",
      info: "#1D4ED8",
      infoBg: "#DBEAFE",
      warning: "#B45309",
      warningBg: "#FEF3C7",
      danger: "#DC2626",
      dangerBg: "#FEE2E2",
    },
    border: {
      divider: "#E2E8F0",
      input: "#CBD5E1",
      strong: "#94A3B8",
      hairline: "#EEF2F7",
    },
    star: "#F59E0B",
    bgKpi: {
      green: "#ECFDF5",
      orange: "#FFF7ED",
      purple: "#F5F3FF",
      red: "#FEF2F2",
      blue: "#EFF6FF",
      slate: "#F1F5F9",
    },
    overlay: {
      backdrop: "rgba(15, 23, 42, 0.6)",
      glass: "rgba(255, 255, 255, 0.72)",
    },
  },

  font: {
    family: {
      display: "Plus Jakarta Sans",
      body: "Inter",
      mono: "JetBrains Mono",
      // legacy alias retained for any earlier code
      poppins: "Plus Jakarta Sans",
    },
    weight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    } as const,
    size: {
      micro: 11,
      label: 12,
      caption: 13,
      body: 14,
      bodyLg: 15,
      h3: 16,
      h2: 18,
      h1: 22,
      h0: 28,
      display: 34,
      hero: 44,
    },
    line: {
      tight: 1.2,
      snug: 1.35,
      normal: 1.5,
      relaxed: 1.65,
    },
    track: {
      tight: -0.4,
      snug: -0.2,
      normal: 0,
      wide: 0.4,
      wider: 0.8,
    },
  },

  space: {
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 10: 40, 12: 48, 14: 56, 16: 64, 20: 80, 24: 96,
  },

  radius: {
    xs: 6,
    sm: 8,
    md: 10,
    lg: 14,
    xl: 18,
    "2xl": 24,
    "3xl": 32,
    pill: 999,
  },

  /**
   * Shadow stack — three intensities. Each is a layered combination so the depth
   * looks natural across light surfaces, in the spirit of Linear/Vercel/Stripe.
   */
  shadow: {
    none: {},
    xs: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.04,
      shadowRadius: 1,
      shadowOffset: { width: 0, height: 1 },
      elevation: 1,
    },
    sm: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.06,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    md: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    lg: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.1,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
    glow: {
      shadowColor: "#F97316",
      shadowOpacity: 0.25,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
  },

  motion: {
    fast: 120,
    normal: 200,
    slow: 320,
    slower: 480,
    ease: {
      out: "cubic-bezier(0.22, 1, 0.36, 1)",
      inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
} as const;

export type Surface = "customer" | "vendor" | "transporter" | "admin" | "super_admin";

export const primaryFor = (surface: Surface): string => {
  switch (surface) {
    case "customer":
      return tokens.color.customer.primary;
    case "vendor":
    case "transporter":
      return tokens.color.brand.green;
    case "admin":
    case "super_admin":
      return tokens.color.ink[900];
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
      return tokens.color.ink[900];
  }
};

/** Type-safe shadow lookup. */
export const shadow = (level: keyof typeof tokens.shadow) => tokens.shadow[level];
