import React, { useRef } from "react";
import { TextInput, View } from "react-native";
import { tokens } from "@/theme/tokens";
import { noOutline } from "@/lib/web-style";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  surface?: "customer" | "vendor" | "transporter";
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  surface = "customer",
}) => {
  const refs = useRef<TextInput[]>([]);
  const accent =
    surface === "customer" ? tokens.color.customer.primary : tokens.color.brand.green;

  const handleChange = (idx: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = value.split("");
    next[idx] = digit;
    const joined = next.join("").slice(0, length);
    onChange(joined);
    if (digit && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (idx: number, key: string) => {
    if (key === "Backspace" && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}>
      {Array.from({ length }).map((_, idx) => (
        <TextInput
          key={idx}
          ref={(el) => {
            if (el) refs.current[idx] = el;
          }}
          value={value[idx] ?? ""}
          onChangeText={(t) => handleChange(idx, t)}
          onKeyPress={(e) => handleKeyPress(idx, (e.nativeEvent as any).key)}
          keyboardType="number-pad"
          maxLength={1}
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            borderWidth: value[idx] ? 1.5 : 1,
            borderColor: value[idx] ? accent : tokens.color.border.input,
            textAlign: "center",
            fontSize: 22,
            fontFamily: "Poppins",
            fontWeight: "700",
            color: tokens.color.text.dark,
            backgroundColor: "#fff",
            ...noOutline,
          }}
        />
      ))}
    </View>
  );
};
