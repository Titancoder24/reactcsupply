import React from "react";
import { View, Text } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { tokens } from "@/theme/tokens";

type Variant = "blue-orange" | "green" | "white" | "mono";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: Size;
  variant?: Variant;
  showTagline?: boolean;
}

const sizeMap: Record<Size, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 30,
  xl: 38,
};

export const CSupplyLogo: React.FC<LogoProps> = ({
  size = "md",
  variant = "blue-orange",
  showTagline = false,
}) => {
  const fontSize = sizeMap[size];

  let cColor: string;
  let dashColor: string;
  let supplyColor: string;
  let taglineColor: string;

  if (variant === "white") {
    cColor = "#fff";
    dashColor = "rgba(255,255,255,0.7)";
    supplyColor = tokens.color.customer.accent;
    taglineColor = "rgba(255,255,255,0.7)";
  } else if (variant === "green") {
    cColor = tokens.color.brand.green;
    dashColor = tokens.color.ink[400];
    supplyColor = tokens.color.ink[900];
    taglineColor = tokens.color.ink[500];
  } else if (variant === "mono") {
    cColor = tokens.color.ink[900];
    dashColor = tokens.color.ink[300];
    supplyColor = tokens.color.ink[900];
    taglineColor = tokens.color.ink[500];
  } else {
    cColor = tokens.color.customer.primary;
    dashColor = tokens.color.ink[300];
    supplyColor = tokens.color.customer.accent;
    taglineColor = tokens.color.ink[500];
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text
          style={{
            fontSize,
            fontFamily: tokens.font.family.display,
            fontWeight: "800",
            color: cColor,
            letterSpacing: -0.8,
          }}
        >
          C
        </Text>
        <Text
          style={{
            fontSize,
            fontFamily: tokens.font.family.display,
            fontWeight: "300",
            color: dashColor,
            letterSpacing: -0.8,
            marginHorizontal: 1,
          }}
        >
          ·
        </Text>
        <Text
          style={{
            fontSize,
            fontFamily: tokens.font.family.display,
            fontWeight: "800",
            color: supplyColor,
            letterSpacing: -0.8,
          }}
        >
          Supply
        </Text>
      </View>
      {showTagline && (
        <Text
          style={{
            fontSize: 11,
            fontFamily: tokens.font.family.body,
            fontWeight: "500",
            color: taglineColor,
            marginTop: 4,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Build Faster · Build Better
        </Text>
      )}
    </View>
  );
};

interface LogoMarkProps {
  size?: number;
  variant?: Variant;
}

/**
 * Geometric brand mark — a stacked layered mark in the spirit of mature SaaS
 * marks. Renders as SVG so it scales crisply across density and platform.
 */
export const CSupplyMark: React.FC<LogoMarkProps> = ({
  size = 56,
  variant = "blue-orange",
}) => {
  const accent =
    variant === "green"
      ? tokens.color.brand.green
      : variant === "white"
        ? "#fff"
        : tokens.color.customer.accent;
  const base =
    variant === "white" ? "#fff" : variant === "mono" ? tokens.color.ink[900] : tokens.color.customer.primary;

  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <LinearGradient id="g1" x1="0" y1="0" x2="64" y2="64">
          <Stop offset="0" stopColor={base} stopOpacity="1" />
          <Stop offset="1" stopColor={base} stopOpacity="0.75" />
        </LinearGradient>
      </Defs>
      {/* Outer rounded square */}
      <Rect x={3} y={3} width={58} height={58} rx={16} fill="url(#g1)" />
      {/* Inner C-shape carved as overlapping rectangles */}
      <Path
        d="M44 22 H26 a8 8 0 0 0 -8 8 v4 a8 8 0 0 0 8 8 h18"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.95}
      />
      {/* Accent dot */}
      <Rect x={42} y={38} width={10} height={10} rx={3} fill={accent} />
    </Svg>
  );
};
