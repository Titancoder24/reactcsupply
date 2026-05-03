import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { Building, User } from "@/components/ui/Icon";
import { TransporterShell } from "@/components/transporter/TransporterShell";

export default function TransporterJoinAs() {
  const router = useRouter();
  const [type, setType] = useState<"gst" | "individual" | null>(null);

  return (
    <TransporterShell
      title="Choose your type"
      step={3}
      ctaLabel="Continue"
      ctaDisabled={!type}
      onCta={() =>
        router.push(type === "gst" ? "/(transporter)/signup/gst" : "/(transporter)/signup/vehicle")
      }
    >
      {[
        { value: "gst", label: "Gst Transporter", sub: "I have GST Number", Icon: Building },
        { value: "individual", label: "Individual Vehicle", sub: "Non GST", Icon: User },
      ].map((opt) => {
        const sel = type === opt.value;
        return (
          <Pressable key={opt.value} onPress={() => setType(opt.value as any)}>
            <Card
              style={{
                backgroundColor: sel ? tokens.color.brand.green50 : "#fff",
                borderWidth: sel ? 1.5 : 1,
                borderColor: sel ? tokens.color.brand.green : tokens.color.border.divider,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                <opt.Icon size={28} color={sel ? tokens.color.brand.green : tokens.color.text.secondary} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}
                  >
                    {opt.label}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {opt.sub}
                  </Text>
                </View>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: sel ? tokens.color.brand.green : tokens.color.border.input,
                    backgroundColor: sel ? tokens.color.brand.green : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sel && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" }} />}
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}
    </TransporterShell>
  );
}
