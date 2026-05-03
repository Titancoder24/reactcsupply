import React from "react";
import { Pressable, Text, View } from "react-native";
import { tokens } from "@/theme/tokens";

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  step?: number;
  size?: "sm" | "md";
}

export const QtyStepper: React.FC<QtyStepperProps> = ({
  value,
  onChange,
  min = 1,
  step = 1,
  size = "md",
}) => {
  const buttonSize = size === "sm" ? 28 : 32;
  const fontSize = size === "sm" ? 14 : 16;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: tokens.color.surface.light,
        borderRadius: 999,
        padding: 4,
      }}
    >
      <Pressable
        onPress={() => onChange(Math.max(min, value - step))}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: tokens.color.surface.white,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: fontSize + 2, color: tokens.color.text.dark, lineHeight: fontSize + 4 }}>−</Text>
      </Pressable>
      <View style={{ minWidth: 40, alignItems: "center" }}>
        <Text
          style={{
            fontSize,
            fontFamily: "Poppins",
            fontWeight: "700",
            color: tokens.color.text.dark,
            fontVariant: ["tabular-nums"],
          }}
        >
          {value}
        </Text>
      </View>
      <Pressable
        onPress={() => onChange(value + step)}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: tokens.color.surface.white,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: fontSize + 2, color: tokens.color.text.dark, lineHeight: fontSize + 4 }}>+</Text>
      </Pressable>
    </View>
  );
};
