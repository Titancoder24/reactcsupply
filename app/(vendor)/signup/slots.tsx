import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { Check, Clock } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const SLOTS: { key: "morning" | "afternoon" | "night"; label: string; sub: string }[] = [
  { key: "morning", label: "Morning", sub: "6 AM – 12 PM" },
  { key: "afternoon", label: "Afternoon", sub: "12 PM – 5 PM" },
  { key: "night", label: "Night", sub: "5 PM – 10 PM" },
];

export default function VendorSlots() {
  const router = useRouter();
  const { slots, setField } = useVendorOnboarding();

  const toggle = (key: "morning" | "afternoon" | "night") =>
    setField("slots", { ...slots, [key]: !slots[key] });

  return (
    <VendorShell
      title="Delivery Time Slots"
      step={10}
      ctaLabel="Continue"
      onCta={() => router.push("/(vendor)/signup/vehicles")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary }}>
        Select available time slots
      </Text>

      {SLOTS.map((s) => {
        const sel = slots[s.key];
        return (
          <Pressable key={s.key} onPress={() => toggle(s.key)}>
            <Card
              style={{
                borderWidth: sel ? 1.5 : 1,
                borderColor: sel ? tokens.color.brand.green : tokens.color.border.divider,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: tokens.color.brand.green50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Clock size={22} color={tokens.color.brand.green} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
                    {s.label}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {s.sub}
                  </Text>
                </View>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: sel ? tokens.color.brand.green : "#fff",
                    borderWidth: 1.5,
                    borderColor: sel ? tokens.color.brand.green : tokens.color.border.input,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sel && <Check size={14} color="#fff" strokeWidth={3} />}
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}
    </VendorShell>
  );
}
