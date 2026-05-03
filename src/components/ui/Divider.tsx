import React from "react";
import { View } from "react-native";
import { tokens } from "@/theme/tokens";

interface DividerProps {
  vertical?: boolean;
  color?: string;
  inset?: number;
}

export const Divider: React.FC<DividerProps> = ({
  vertical = false,
  color = tokens.color.border.hairline,
  inset = 0,
}) => (
  <View
    style={
      vertical
        ? { width: 1, alignSelf: "stretch", marginVertical: inset, backgroundColor: color }
        : { height: 1, alignSelf: "stretch", marginHorizontal: inset, backgroundColor: color }
    }
  />
);
