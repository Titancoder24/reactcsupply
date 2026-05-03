import React from "react";
import { Image, ImageStyle, View, ViewStyle } from "react-native";
import { useImageSlot } from "@/hooks/use-cms";
import { tokens } from "@/theme/tokens";

interface CmsImageProps {
  slotKey: string;
  fallback?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  borderRadius?: number;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
  accessibilityLabel?: string;
}

/**
 * Renders an image from a CMS slot. Falls back to:
 * 1. The explicit `fallback` prop
 * 2. The slot's `fallback_url` from DB
 * 3. A neutral placeholder block
 */
export const CmsImage: React.FC<CmsImageProps> = ({
  slotKey,
  fallback,
  width,
  height,
  aspectRatio,
  borderRadius,
  style,
  containerStyle,
  resizeMode = "cover",
  accessibilityLabel,
}) => {
  const { data: slot } = useImageSlot(slotKey, fallback);

  const url = slot?.resolved_url ?? fallback ?? null;
  const alt = accessibilityLabel ?? slot?.resolved_alt ?? slot?.display_name ?? slotKey;

  const dims: ViewStyle = {
    width: (width as any) ?? "100%",
    height: (height as any) ?? (aspectRatio ? undefined : 200),
    aspectRatio,
    borderRadius,
    overflow: "hidden",
    backgroundColor: tokens.color.ink[100],
  };

  if (!url) {
    return (
      <View style={[dims, containerStyle]}>
        <View
          style={{
            flex: 1,
            backgroundColor: tokens.color.ink[100],
          }}
        />
      </View>
    );
  }

  return (
    <View style={[dims, containerStyle]}>
      <Image
        source={{ uri: url }}
        style={[{ width: "100%", height: "100%" }, style]}
        resizeMode={resizeMode}
        accessibilityLabel={alt ?? undefined}
        accessible
      />
    </View>
  );
};
