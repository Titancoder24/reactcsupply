import React, { useRef } from "react";
import { TextInput, View } from "react-native";
import { tokens } from "@/theme/tokens";
import { noOutline } from "@/lib/web-style";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  surface?: "customer" | "vendor" | "transporter";
  cellSize?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  surface = "customer",
  cellSize = 52,
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
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      {Array.from({ length }).map((_, idx) => {
        const filled = !!value[idx];
        return (
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
              width: cellSize,
              height: cellSize,
              borderRadius: 12,
              borderWidth: filled ? 1.5 : 1,
              borderColor: filled ? accent : tokens.color.border.input,
              textAlign: "center",
              fontSize: 22,
              fontFamily: tokens.font.family.display,
              fontWeight: "700",
              color: tokens.color.ink[900],
              backgroundColor: filled ? tokens.color.surface.white : tokens.color.ink[50],
              ...noOutline,
            }}
          />
        );
      })}
    </View>
  );
};
