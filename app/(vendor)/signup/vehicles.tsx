import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { Check, Truck } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const GROUPS = [
  {
    label: "Light Vehicles",
    items: [
      { key: "3w", label: "3 Wheeler (300 kg)" },
      { key: "mini", label: "Mini Pickup (1 Ton)" },
      { key: "4w", label: "4 Wheeler (2 Ton)" },
      { key: "5t", label: "5 Ton Truck" },
    ],
  },
  {
    label: "Medium Vehicles",
    items: [{ key: "6w", label: "6 Wheeler (6 to 13 Ton)" }],
  },
  {
    label: "Heavy Vehicles",
    items: [
      { key: "10t", label: "10 Tyre Truck" },
      { key: "14t", label: "14 Tyre Truck" },
    ],
  },
];

export default function VendorVehicles() {
  const router = useRouter();
  const { vehicles, toggleVehicle } = useVendorOnboarding();

  return (
    <VendorShell
      title="Vehicle Types"
      step={11}
      ctaLabel="Continue"
      onCta={() => router.push("/(vendor)/signup/charges")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary }}>
        Select vehicles you have
      </Text>

      {GROUPS.map((g) => (
        <View key={g.label}>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 13,
              color: tokens.color.text.primary,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            {g.label}
          </Text>
          <Card padded={false}>
            {g.items.map((it, idx) => {
              const sel = vehicles.includes(it.key);
              return (
                <Pressable
                  key={it.key}
                  onPress={() => toggleVehicle(it.key)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.divider,
                  }}
                >
                  <Truck size={20} color={tokens.color.text.secondary} />
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: "Poppins",
                      fontSize: 14,
                      color: tokens.color.text.primary,
                    }}
                  >
                    {it.label}
                  </Text>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      backgroundColor: sel ? tokens.color.brand.green : "#fff",
                      borderWidth: 1.5,
                      borderColor: sel ? tokens.color.brand.green : tokens.color.border.input,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {sel && <Check size={12} color="#fff" strokeWidth={3} />}
                  </View>
                </Pressable>
              );
            })}
          </Card>
        </View>
      ))}
    </VendorShell>
  );
}
