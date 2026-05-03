import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { TransporterShell } from "@/components/transporter/TransporterShell";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "<"] as const;

export default function TransporterPasscode() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const onKey = (k: string) => {
    if (k === "<") setCode((c) => c.slice(0, -1));
    else if (k && code.length < 4) setCode((c) => c + k);
  };

  return (
    <TransporterShell
      title="Set Your Passcode"
      step={7}
      ctaLabel="Confirm Passcode"
      ctaDisabled={code.length !== 4}
      onCta={() => router.push("/(transporter)/signup/call-masking")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary, textAlign: "center" }}>
        Use a 4-digit passcode to log in
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, paddingVertical: 24 }}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: code.length > i ? tokens.color.text.primary : "#E5E7EB",
            }}
          />
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
          paddingHorizontal: 32,
        }}
      >
        {KEYS.map((k, idx) =>
          k === "" ? (
            <View key={idx} style={{ width: 64, height: 64 }} />
          ) : (
            <Pressable
              key={idx}
              onPress={() => onKey(k)}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: tokens.color.border.divider,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 22,
                  color: tokens.color.text.primary,
                }}
              >
                {k}
              </Text>
            </Pressable>
          ),
        )}
      </View>
    </TransporterShell>
  );
}
