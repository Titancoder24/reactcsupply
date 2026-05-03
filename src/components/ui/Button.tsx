import React from "react";
import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { tokens, Surface } from "@/theme/tokens";

type Variant = "primary" | "secondary" | "ghost" | "destructive";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  surface?: Surface;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  testID?: string;
}

const colorFor = (surface: Surface, variant: Variant) => {
  const isCustomerCTA = surface === "customer";
  const primary = isCustomerCTA
    ? tokens.color.customer.accent
    : tokens.color.brand.green;
  const primaryDark = isCustomerCTA
    ? tokens.color.customer.accent700
    : tokens.color.brand.green700;
  const outlineColor = isCustomerCTA
    ? tokens.color.customer.primary
    : tokens.color.brand.green;

  if (variant === "primary") {
    return { bg: primary, bgPressed: primaryDark, text: "#fff", border: "transparent" };
  }
  if (variant === "secondary") {
    return {
      bg: "transparent",
      bgPressed: tokens.color.surface.light,
      text: outlineColor,
      border: outlineColor,
    };
  }
  if (variant === "destructive") {
    return {
      bg: tokens.color.state.dangerBg,
      bgPressed: "#FCA5A5",
      text: tokens.color.state.danger,
      border: tokens.color.state.danger,
    };
  }
  return {
    bg: "transparent",
    bgPressed: tokens.color.surface.light,
    text: tokens.color.text.dark,
    border: "transparent",
  };
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  surface = "customer",
  disabled,
  loading,
  fullWidth = true,
  icon,
  size = "lg",
  testID,
}) => {
  const palette = colorFor(surface, variant);
  const height = size === "sm" ? 36 : size === "md" ? 44 : 52;
  const radius = size === "sm" ? 8 : 12;

  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      testID={testID}
      style={({ pressed }) => ({
        height,
        borderRadius: radius,
        paddingHorizontal: 20,
        backgroundColor: pressed ? palette.bgPressed : palette.bg,
        borderWidth: variant === "secondary" ? 1.5 : 0,
        borderColor: palette.border,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        opacity: disabled ? 0.5 : 1,
        alignSelf: fullWidth ? "stretch" : "flex-start",
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {icon}
          <Text
            style={{
              color: palette.text,
              fontSize: size === "sm" ? 14 : 16,
              fontFamily: "Poppins",
              fontWeight: "600",
              letterSpacing: 0.2,
            }}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
