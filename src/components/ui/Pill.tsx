import React from "react";
import { View, Text, Pressable } from "react-native";
import { tokens } from "@/theme/tokens";

type PillTone = "success" | "info" | "warning" | "danger" | "neutral" | "selected" | "brand";

interface StatusPillProps {
  label: string;
  tone?: PillTone;
  dot?: boolean;
  size?: "xs" | "sm";
}

const palettes: Record<PillTone, { bg: string; fg: string; dot: string }> = {
  success: {
    bg: tokens.color.state.successBg,
    fg: tokens.color.state.successText,
    dot: tokens.color.state.success,
  },
  info: {
    bg: tokens.color.state.infoBg,
    fg: tokens.color.state.info,
    dot: tokens.color.state.info,
  },
  warning: {
    bg: tokens.color.state.warningBg,
    fg: tokens.color.state.warning,
    dot: tokens.color.state.warning,
  },
  danger: {
    bg: tokens.color.state.dangerBg,
    fg: tokens.color.state.danger,
    dot: tokens.color.state.danger,
  },
  neutral: {
    bg: tokens.color.ink[100],
    fg: tokens.color.ink[700],
    dot: tokens.color.ink[400],
  },
  selected: {
    bg: tokens.color.customer.accent,
    fg: "#fff",
    dot: "#fff",
  },
  brand: {
    bg: tokens.color.customer.tint,
    fg: tokens.color.customer.primary,
    dot: tokens.color.customer.primary,
  },
};

export const StatusPill: React.FC<StatusPillProps> = ({
  label,
  tone = "neutral",
  dot = true,
  size = "sm",
}) => {
  const c = palettes[tone];
  const isXs = size === "xs";
  return (
    <View
      style={{
        backgroundColor: c.bg,
        borderRadius: 999,
        paddingHorizontal: isXs ? 8 : 10,
        paddingVertical: isXs ? 2 : 4,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: dot ? 6 : 0,
      }}
    >
      {dot && (
        <View
          style={{
            width: isXs ? 5 : 6,
            height: isXs ? 5 : 6,
            borderRadius: 999,
            backgroundColor: c.dot,
          }}
        />
      )}
      <Text
        style={{
          fontSize: isXs ? 11 : 12,
          fontFamily: tokens.font.family.body,
          fontWeight: "600",
          color: c.fg,
          letterSpacing: 0.1,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

interface FilterPillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  surface?: "customer" | "vendor" | "transporter";
}

export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  active,
  onPress,
  surface = "customer",
}) => {
  const activeBg =
    surface === "customer" ? tokens.color.ink[900] : tokens.color.brand.green;
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: active ? activeBg : tokens.color.surface.white,
        borderWidth: 1,
        borderColor: active ? activeBg : tokens.color.border.input,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontFamily: tokens.font.family.body,
          fontWeight: active ? "600" : "500",
          color: active ? "#fff" : tokens.color.ink[700],
          letterSpacing: -0.05,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
