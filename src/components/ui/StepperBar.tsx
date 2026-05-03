import React from "react";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";

interface StepperBarProps {
  current: number;
  total: number;
  surface?: "customer" | "vendor" | "transporter";
  label?: string;
}

export const StepperBar: React.FC<StepperBarProps> = ({
  current,
  total,
  surface = "vendor",
  label,
}) => {
  const fillColor =
    surface === "customer" ? tokens.color.customer.accent : tokens.color.brand.green;
  const pct = Math.max(0, Math.min(1, current / total));

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 14, backgroundColor: tokens.color.surface.white, borderBottomWidth: 1, borderBottomColor: tokens.color.border.hairline }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
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
          {label ?? `Step ${current} of ${total}`}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: tokens.font.family.mono,
            fontWeight: "600",
            color: tokens.color.ink[700],
          }}
        >
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Text>
      </View>
      <View
        style={{
          height: 4,
          borderRadius: 2,
          backgroundColor: tokens.color.ink[100],
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${pct * 100}%`,
            height: "100%",
            backgroundColor: fillColor,
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  );
};
