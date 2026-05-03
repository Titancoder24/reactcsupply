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
}

export const Input: React.FC<InputProps> = ({
  label,
  helper,
  error,
  prefix,
  suffix,
  surface = "customer",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const focusBorder =
    surface === "customer" ? tokens.color.customer.primary : tokens.color.brand.green;

  return (
    <View style={{ width: "100%" }}>
      {label && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins",
            fontWeight: "500",
            color: tokens.color.text.muted,
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          height: 52,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: error
            ? tokens.color.state.danger
            : focused
              ? focusBorder
              : tokens.color.border.input,
          backgroundColor: tokens.color.surface.white,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        {prefix && <View style={{ marginRight: 8 }}>{prefix}</View>}
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
          placeholderTextColor={tokens.color.text.secondary}
          style={{
            flex: 1,
            fontSize: 14,
            fontFamily: "Poppins",
            color: tokens.color.text.dark,
            ...noOutline,
          }}
        />
        {suffix && <View style={{ marginLeft: 8 }}>{suffix}</View>}
      </View>
      {(helper || error) && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins",
            color: error ? tokens.color.state.danger : tokens.color.text.muted,
            marginTop: 6,
          }}
        >
          {error ?? helper}
        </Text>
      )}
    </View>
  );
};
