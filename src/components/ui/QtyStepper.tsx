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
  const buttonSize = size === "sm" ? 28 : 34;
  const fontSize = size === "sm" ? 13 : 15;
  const minVal = Math.max(0, min);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: tokens.color.surface.white,
        borderRadius: 999,
        padding: 3,
        borderWidth: 1,
        borderColor: tokens.color.border.input,
      }}
    >
      <Pressable
        onPress={() => onChange(Math.max(minVal, value - step))}
        style={({ pressed }) => ({
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: pressed ? tokens.color.ink[100] : "transparent",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Text style={{ fontSize: fontSize + 4, color: tokens.color.ink[800], lineHeight: fontSize + 4, fontWeight: "300" }}>−</Text>
      </Pressable>
      <View style={{ minWidth: size === "sm" ? 32 : 44, alignItems: "center" }}>
        <Text
          style={{
            fontSize,
            fontFamily: tokens.font.family.mono,
            fontWeight: "600",
            color: tokens.color.ink[900],
          }}
        >
          {value}
        </Text>
      </View>
      <Pressable
        onPress={() => onChange(value + step)}
        style={({ pressed }) => ({
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: pressed ? tokens.color.ink[100] : "transparent",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Text style={{ fontSize: fontSize + 4, color: tokens.color.ink[800], lineHeight: fontSize + 4, fontWeight: "300" }}>+</Text>
      </Pressable>
    </View>
  );
};
