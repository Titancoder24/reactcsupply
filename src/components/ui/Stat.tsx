import React from "react";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";

interface StatProps {
  label: string;
  value: string;
  align?: "left" | "right" | "center";
  size?: "sm" | "md" | "lg";
  mono?: boolean;
}

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  align = "left",
  size = "md",
  mono = false,
}) => {
  const fontSize = size === "lg" ? 22 : size === "md" ? 17 : 14;
  return (
    <View style={{ alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start" }}>
      <Text
        style={{
          fontSize: 11,
          fontFamily: tokens.font.family.body,
          fontWeight: "600",
          color: tokens.color.ink[500],
          letterSpacing: 0.6,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize,
          fontFamily: mono ? tokens.font.family.mono : tokens.font.family.display,
          fontWeight: "700",
          color: tokens.color.ink[900],
          letterSpacing: -0.4,
        }}
      >
        {value}
      </Text>
    </View>
  );
};
