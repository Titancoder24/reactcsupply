import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightActions?: React.ReactNode;
  surface?: "customer" | "vendor" | "transporter";
  variant?: "light" | "dark";
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  rightActions,
  surface = "customer",
  variant = "light",
}) => {
  const router = useRouter();
  const titleColor =
    variant === "dark" ? "#fff" : tokens.color.text.dark;
  const bg = variant === "dark"
    ? (surface === "customer" ? tokens.color.customer.primary : tokens.color.brand.green)
    : tokens.color.surface.white;

  return (
    <View
      style={{
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bg,
        paddingHorizontal: 20,
        borderBottomWidth: variant === "light" ? 1 : 0,
        borderBottomColor: tokens.color.border.divider,
      }}
    >
      {showBack ? (
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          style={{ width: 40, height: 40, justifyContent: "center", alignItems: "flex-start" }}
          hitSlop={8}
        >
          <Text style={{ fontSize: 24, color: titleColor, lineHeight: 24 }}>‹</Text>
        </Pressable>
      ) : (
        <View style={{ width: 40 }} />
      )}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            fontFamily: "Poppins",
            fontWeight: "600",
            color: titleColor,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ minWidth: 40, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
        {rightActions}
      </View>
    </View>
  );
};
