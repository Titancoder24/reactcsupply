import React from "react";
import { View, Text, Image } from "react-native";
import { tokens } from "@/theme/tokens";

interface AvatarProps {
  name?: string;
  uri?: string;
  size?: number;
  tone?: "primary" | "neutral" | "green";
  showStatus?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  uri,
  size = 40,
  tone = "primary",
  showStatus = false,
}) => {
  const initials = (name ?? "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bg =
    tone === "neutral"
      ? tokens.color.ink[200]
      : tone === "green"
        ? tokens.color.brand.green
        : tokens.color.customer.primary;
  const fg = tone === "neutral" ? tokens.color.ink[700] : "#fff";

  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {uri ? (
          <Image source={{ uri }} style={{ width: size, height: size }} resizeMode="cover" />
        ) : (
          <Text
            style={{
              color: fg,
              fontFamily: tokens.font.family.display,
              fontWeight: "700",
              fontSize: size * 0.42,
              letterSpacing: -0.3,
            }}
          >
            {initials || "?"}
          </Text>
        )}
      </View>
      {showStatus && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: 999,
            backgroundColor: tokens.color.state.success,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      )}
    </View>
  );
};
