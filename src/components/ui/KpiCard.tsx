import React from "react";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";
import { Card } from "./Card";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: { value: string; trend: "up" | "down" | "flat" };
  icon?: React.ReactNode;
  tone?: "default" | "green" | "orange" | "purple" | "red" | "blue";
  fullWidth?: boolean;
}

const toneBg: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  default: tokens.color.surface.white,
  green: tokens.color.bgKpi.green,
  orange: tokens.color.bgKpi.orange,
  purple: tokens.color.bgKpi.purple,
  red: tokens.color.bgKpi.red,
  blue: tokens.color.bgKpi.blue,
};

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  delta,
  icon,
  tone = "default",
  fullWidth,
}) => {
  const trendColor =
    delta?.trend === "up"
      ? tokens.color.state.success
      : delta?.trend === "down"
        ? tokens.color.state.danger
        : tokens.color.ink[500];
  const trendArrow = delta?.trend === "up" ? "↑" : delta?.trend === "down" ? "↓" : "→";

  return (
    <Card
      elevation="xs"
      padded
      bordered
      style={{
        backgroundColor: toneBg[tone],
        flex: fullWidth ? 1 : undefined,
        minHeight: 96,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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
        {icon}
      </View>
      <Text
        style={{
          marginTop: 8,
          fontSize: 26,
          fontFamily: tokens.font.family.display,
          fontWeight: "700",
          color: tokens.color.ink[900],
          letterSpacing: -0.6,
        }}
      >
        {value}
      </Text>
      {delta && (
        <View style={{ marginTop: 6, flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: tokens.font.family.body,
              fontWeight: "600",
              color: trendColor,
            }}
          >
            {trendArrow} {delta.value}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: tokens.font.family.body,
              color: tokens.color.ink[500],
            }}
          >
            vs last week
          </Text>
        </View>
      )}
    </Card>
  );
};
