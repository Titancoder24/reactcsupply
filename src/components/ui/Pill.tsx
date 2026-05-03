import React from "react";
import { View, Text, Pressable } from "react-native";
import { tokens } from "@/theme/tokens";

type PillTone = "success" | "info" | "warning" | "danger" | "neutral" | "selected";

interface StatusPillProps {
  label: string;
  tone?: PillTone;
}

const palettes: Record<PillTone, { bg: string; fg: string }> = {
  success: { bg: tokens.color.state.successBg, fg: tokens.color.state.successText },
  info: { bg: tokens.color.state.infoBg, fg: tokens.color.state.info },
  warning: { bg: tokens.color.state.warningBg, fg: tokens.color.state.warning },
  danger: { bg: tokens.color.state.dangerBg, fg: tokens.color.state.danger },
  neutral: { bg: tokens.color.surface.light, fg: tokens.color.text.muted },
  selected: { bg: tokens.color.customer.accent, fg: "#fff" },
};

export const StatusPill: React.FC<StatusPillProps> = ({ label, tone = "neutral" }) => {
  const c = palettes[tone];
  return (
    <View
      style={{
        backgroundColor: c.bg,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Poppins",
          fontWeight: "500",
          color: c.fg,
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
    surface === "customer" ? tokens.color.customer.accent : tokens.color.brand.green;
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: active ? activeBg : "transparent",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Poppins",
          fontWeight: active ? "600" : "500",
          color: active ? "#fff" : tokens.color.text.muted,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
