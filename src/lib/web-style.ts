import { Platform } from "react-native";

/**
 * Cross-platform style for an input that needs the web's `outline: none` effect.
 * On native this is a no-op. On web it casts to `any` since `outlineStyle` is
 * not part of React Native's TS types but is honored by react-native-web.
 */
export const noOutline = Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : {};
