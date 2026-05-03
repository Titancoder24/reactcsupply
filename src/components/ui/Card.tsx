import React from "react";
import { View, ViewProps } from "react-native";
import { tokens } from "@/theme/tokens";

interface CardProps extends ViewProps {
  elevated?: boolean;
  padded?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  elevated = true,
  padded = true,
  style,
  children,
  ...rest
}) => {
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: tokens.color.surface.white,
          borderRadius: tokens.radius.md,
          padding: padded ? 16 : 0,
          shadowColor: "#000",
          shadowOpacity: elevated ? 0.06 : 0,
          shadowRadius: elevated ? 6 : 0,
          shadowOffset: { width: 0, height: 1 },
          elevation: elevated ? 2 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
