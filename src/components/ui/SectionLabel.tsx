import React from "react";
import { View, Text, Pressable } from "react-native";
import { tokens } from "@/theme/tokens";

interface SectionLabelProps {
  label: string;
  action?: { label: string; onPress: () => void };
  size?: "sm" | "md" | "lg";
  caps?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  action,
  size = "md",
  caps = false,
}) => {
  const fontSize = size === "lg" ? 18 : size === "md" ? 15 : 12;
  const weight = size === "sm" ? "600" : "700";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontFamily: caps ? tokens.font.family.body : tokens.font.family.display,
          fontWeight: weight,
          fontSize,
          color: tokens.color.ink[900],
          letterSpacing: caps ? 0.8 : -0.3,
          textTransform: caps ? "uppercase" : "none",
        }}
      >
        {label}
      </Text>
      {action && (
        <Pressable onPress={action.onPress} hitSlop={6}>
          <Text
            style={{
              fontFamily: tokens.font.family.body,
              fontWeight: "600",
              fontSize: 13,
              color: tokens.color.customer.primary,
            }}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
