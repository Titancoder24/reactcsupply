import React from "react";
import { View, Text, Pressable } from "react-native";
import { tokens } from "@/theme/tokens";
import { ChevronRight } from "./Icon";

interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  divider?: boolean;
  destructive?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  subtitle,
  trailing,
  onPress,
  showChevron = true,
  divider = true,
  destructive = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 14,
        backgroundColor: pressed ? tokens.color.ink[50] : "transparent",
        borderTopWidth: divider ? 1 : 0,
        borderTopColor: tokens.color.border.hairline,
      })}
    >
      {icon && (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: tokens.color.ink[50],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: tokens.font.family.body,
            fontSize: 14,
            fontWeight: "500",
            color: destructive ? tokens.color.state.danger : tokens.color.ink[900],
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              marginTop: 2,
              fontFamily: tokens.font.family.body,
              fontSize: 12,
              color: tokens.color.ink[500],
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {trailing}
      {showChevron && !trailing && <ChevronRight size={18} color={tokens.color.ink[400]} />}
    </Pressable>
  );
};
