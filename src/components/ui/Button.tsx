import React from "react";
import { Pressable, Text, ActivityIndicator, View, ViewStyle } from "react-native";
import { tokens, Surface } from "@/theme/tokens";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  surface?: Surface;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: Size;
  testID?: string;
  style?: ViewStyle;
}

const palette = (surface: Surface, variant: Variant) => {
  const isCustomer = surface === "customer";
  const primary = isCustomer ? tokens.color.customer.accent : tokens.color.brand.green;
  const primaryDark = isCustomer ? tokens.color.customer.accent600 : tokens.color.brand.green600;
  const outline = isCustomer ? tokens.color.customer.primary : tokens.color.brand.green;

  if (variant === "primary") {
    return {
      bg: primary,
      bgPressed: primaryDark,
      text: "#fff",
      border: primaryDark,
      shadow: tokens.shadow.sm,
    };
  }
  if (variant === "secondary") {
    return {
      bg: tokens.color.surface.white,
      bgPressed: tokens.color.ink[50],
      text: tokens.color.ink[900],
      border: tokens.color.border.input,
      shadow: tokens.shadow.xs,
    };
  }
  if (variant === "subtle") {
    return {
      bg: tokens.color.ink[100],
      bgPressed: tokens.color.ink[200],
      text: tokens.color.ink[900],
      border: "transparent",
      shadow: tokens.shadow.none,
    };
  }
  if (variant === "destructive") {
    return {
      bg: tokens.color.state.danger,
      bgPressed: "#B91C1C",
      text: "#fff",
      border: "#991B1B",
      shadow: tokens.shadow.sm,
    };
  }
  return {
    bg: "transparent",
    bgPressed: tokens.color.ink[100],
    text: outline,
    border: "transparent",
    shadow: tokens.shadow.none,
  };
};

const dims = (size: Size) => {
  if (size === "sm") return { height: 36, radius: 10, fontSize: 13, padX: 14 };
  if (size === "md") return { height: 44, radius: 12, fontSize: 14, padX: 18 };
  return { height: 52, radius: 14, fontSize: 15, padX: 22 };
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  surface = "customer",
  disabled,
  loading,
  fullWidth = true,
  iconLeft,
  iconRight,
  size = "lg",
  testID,
  style,
}) => {
  const c = palette(surface, variant);
  const d = dims(size);
  const showBorder = variant === "secondary" || variant === "destructive";

  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      testID={testID}
      style={({ pressed }) => [
        {
          height: d.height,
          borderRadius: d.radius,
          paddingHorizontal: d.padX,
          backgroundColor: pressed ? c.bgPressed : c.bg,
          borderWidth: showBorder ? 1 : 0,
          borderColor: c.border,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          opacity: disabled ? 0.5 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          transform: [{ scale: pressed ? 0.985 : 1 }],
          ...(disabled ? {} : (c.shadow as any)),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={c.text} size="small" />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {iconLeft}
          <Text
            style={{
              color: c.text,
              fontSize: d.fontSize,
              fontFamily: tokens.font.family.display,
              fontWeight: "600",
              letterSpacing: -0.1,
            }}
          >
            {label}
          </Text>
          {iconRight}
        </View>
      )}
    </Pressable>
  );
};
