import React from "react";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";

interface StepperBarProps {
  current: number;
  total: number;
  surface?: "customer" | "vendor" | "transporter";
}

export const StepperBar: React.FC<StepperBarProps> = ({
  current,
  total,
  surface = "vendor",
}) => {
  const fillColor =
    surface === "customer" ? tokens.color.customer.accent : tokens.color.brand.green;
  const pct = Math.max(0, Math.min(1, current / total));

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins",
            fontWeight: "500",
            color: tokens.color.text.secondary,
          }}
        >
          Step {current} of {total}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins",
            fontWeight: "500",
            color: tokens.color.text.secondary,
          }}
        >
          {current}/{total}
        </Text>
      </View>
      <View
        style={{
          height: 4,
          borderRadius: 2,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${pct * 100}%`,
            height: "100%",
            backgroundColor: fillColor,
          }}
        />
      </View>
    </View>
  );
};
