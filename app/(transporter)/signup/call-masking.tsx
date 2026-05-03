import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { TransporterShell } from "@/components/transporter/TransporterShell";
import { Phone, Lock } from "@/components/ui/Icon";

export default function TransporterCallMasking() {
  const router = useRouter();
  return (
    <TransporterShell
      title="Call Masking Active"
      step={8}
      ctaLabel="Got It"
      onCta={() => router.push("/(transporter)/signup/available")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary, textAlign: "center" }}>
        Your number is protected
      </Text>

      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <View
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: tokens.color.brand.green50,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: tokens.color.brand.green,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Phone size={42} color="#fff" />
          </View>
          <View
            style={{
              position: "absolute",
              right: 6,
              bottom: 6,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: tokens.color.text.primary,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 3,
              borderColor: "#fff",
            }}
          >
            <Lock size={18} color="#fff" />
          </View>
        </View>

        <Text
          style={{
            marginTop: 20,
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: 22,
            color: tokens.color.text.primary,
            letterSpacing: 1,
          }}
        >
          9XXXX XXXXX
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontFamily: "Poppins",
            fontSize: 12,
            color: tokens.color.text.secondary,
            textAlign: "center",
          }}
        >
          Customer will see masked number
        </Text>
      </View>
    </TransporterShell>
  );
}
