import React, { useState } from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";
import { tokens } from "@/theme/tokens";
import { noOutline } from "@/lib/web-style";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  helper?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  surface?: "customer" | "vendor" | "transporter";
  size?: "md" | "lg";
}

export const Input: React.FC<InputProps> = ({
  label,
  helper,
  error,
  prefix,
  suffix,
  surface = "customer",
  size = "lg",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const focusBorder =
    surface === "customer" ? tokens.color.customer.primary : tokens.color.brand.green;
  const height = size === "lg" ? 52 : 44;

  return (
    <View style={{ width: "100%" }}>
      {label && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: tokens.font.family.body,
            fontWeight: "500",
            color: tokens.color.ink[600],
            marginBottom: 8,
            letterSpacing: 0.1,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          height,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: error
            ? tokens.color.state.danger
            : focused
              ? focusBorder
              : tokens.color.border.input,
          backgroundColor: tokens.color.surface.white,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 14,
          ...(focused ? { ...(tokens.shadow.xs as any) } : {}),
        }}
      >
        {prefix && <View style={{ marginRight: 10 }}>{prefix}</View>}
        <TextInput
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          placeholderTextColor={tokens.color.ink[400]}
          style={{
            flex: 1,
            fontSize: 14,
            fontFamily: tokens.font.family.body,
            color: tokens.color.ink[900],
            ...noOutline,
          }}
        />
        {suffix && <View style={{ marginLeft: 10 }}>{suffix}</View>}
      </View>
      {(helper || error) && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: tokens.font.family.body,
            color: error ? tokens.color.state.danger : tokens.color.ink[500],
            marginTop: 6,
          }}
        >
          {error ?? helper}
        </Text>
      )}
    </View>
  );
};
