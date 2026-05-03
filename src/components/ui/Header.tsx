import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightActions?: React.ReactNode;
  surface?: "customer" | "vendor" | "transporter";
  variant?: "light" | "dark" | "ghost";
  align?: "center" | "left";
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  rightActions,
  surface = "customer",
  variant = "light",
  align = "center",
}) => {
  const router = useRouter();
  const titleColor = variant === "dark" ? "#fff" : tokens.color.ink[900];
  const subtitleColor = variant === "dark" ? "rgba(255,255,255,0.7)" : tokens.color.ink[500];
  const iconColor = variant === "dark" ? "#fff" : tokens.color.ink[800];
  const bg =
    variant === "dark"
      ? surface === "customer"
        ? tokens.color.customer.primary
        : tokens.color.brand.green
      : variant === "ghost"
        ? "transparent"
        : tokens.color.surface.white;

  return (
    <View
      style={{
        height: subtitle ? 64 : 56,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bg,
        paddingHorizontal: 16,
        borderBottomWidth: variant === "light" ? 1 : 0,
        borderBottomColor: tokens.color.border.hairline,
      }}
    >
      {showBack ? (
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: variant === "light" ? tokens.color.ink[50] : "transparent",
          }}
          hitSlop={8}
        >
          <Text style={{ fontSize: 22, color: iconColor, lineHeight: 22, fontWeight: "300" }}>‹</Text>
        </Pressable>
      ) : (
        <View style={{ width: 36 }} />
      )}
      <View
        style={{
          flex: 1,
          alignItems: align === "center" ? "center" : "flex-start",
          paddingLeft: align === "center" ? 0 : 12,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontFamily: tokens.font.family.display,
            fontWeight: "600",
            color: titleColor,
            letterSpacing: -0.2,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            numberOfLines={1}
            style={{
              marginTop: 2,
              fontSize: 12,
              fontFamily: tokens.font.family.body,
              color: subtitleColor,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      <View
        style={{
          minWidth: 36,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        {rightActions}
      </View>
    </View>
  );
};
