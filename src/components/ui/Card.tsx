import React from "react";
import { View, ViewProps } from "react-native";
import { tokens } from "@/theme/tokens";

interface CardProps extends ViewProps {
  elevation?: "none" | "xs" | "sm" | "md" | "lg";
  padded?: boolean | number;
  bordered?: boolean;
  tone?: "white" | "subtle" | "tint";
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  elevation = "xs",
  padded = true,
  bordered = true,
  tone = "white",
  style,
  children,
  ...rest
}) => {
  const bg =
    tone === "subtle"
      ? tokens.color.surface.softBg
      : tone === "tint"
        ? tokens.color.customer.tint
        : tokens.color.surface.white;

  const padding = typeof padded === "number" ? padded : padded ? 16 : 0;

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: bg,
          borderRadius: tokens.radius.lg,
          padding,
          borderWidth: bordered ? 1 : 0,
          borderColor: tokens.color.border.hairline,
          ...(tokens.shadow[elevation] as any),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
