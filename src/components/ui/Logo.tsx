import React from "react";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "blue-orange" | "green" | "white";
  showTagline?: boolean;
}

export const CSupplyLogo: React.FC<LogoProps> = ({
  size = "md",
  variant = "blue-orange",
  showTagline = false,
}) => {
  const fontSize = size === "xl" ? 36 : size === "lg" ? 28 : size === "md" ? 22 : 18;

  let cColor: string;
  let supplyColor: string;
  let taglineColor: string;

  if (variant === "white") {
    cColor = "#fff";
    supplyColor = tokens.color.customer.accent;
    taglineColor = "#fff";
  } else if (variant === "green") {
    cColor = tokens.color.brand.green;
    supplyColor = tokens.color.brand.green;
    taglineColor = tokens.color.text.muted;
  } else {
    cColor = tokens.color.customer.primary;
    supplyColor = tokens.color.customer.accent;
    taglineColor = tokens.color.text.muted;
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text
          style={{
            fontSize,
            fontFamily: "Poppins",
            fontWeight: "700",
            color: cColor,
            letterSpacing: -0.5,
          }}
        >
          C
        </Text>
        <Text
          style={{
            fontSize,
            fontFamily: "Poppins",
            fontWeight: "700",
            color: variant === "white" ? "#fff" : tokens.color.text.dark,
          }}
        >
          -
        </Text>
        <Text
          style={{
            fontSize,
            fontFamily: "Poppins",
            fontWeight: "700",
            color: supplyColor,
            letterSpacing: -0.5,
          }}
        >
          Supply
        </Text>
      </View>
      {showTagline && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins",
            fontWeight: "500",
            color: taglineColor,
            marginTop: 4,
            letterSpacing: 0.4,
          }}
        >
          Build Faster. Build Better.
        </Text>
      )}
    </View>
  );
};

interface LogoMarkProps {
  size?: number;
  variant?: "blue-orange" | "green" | "white";
}

/**
 * Hexagonal logo mark — stylized "C" formed by orange + white planes inside a hex outline.
 * Approximated with overlapping rectangles in pure RN to avoid SVG dependency.
 */
export const CSupplyMark: React.FC<LogoMarkProps> = ({
  size = 96,
  variant = "blue-orange",
}) => {
  const stroke = variant === "white" ? "#fff" : tokens.color.customer.primary;
  const accent = variant === "green"
    ? tokens.color.brand.green
    : tokens.color.customer.accent;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size * 0.92,
          height: size * 0.82,
          borderRadius: size * 0.16,
          borderWidth: 3,
          borderColor: stroke,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ rotate: "0deg" }],
        }}
      >
        <View
          style={{
            width: size * 0.54,
            height: size * 0.54,
            borderRadius: size * 0.08,
            borderWidth: size * 0.1,
            borderColor: accent,
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            transform: [{ rotate: "-45deg" }],
          }}
        />
      </View>
    </View>
  );
};
