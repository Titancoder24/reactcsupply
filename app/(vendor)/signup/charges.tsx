import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const PRICES = [
  { v: "3 Wheeler (300 kg)", p: "₹15 /km" },
  { v: "Mini Pickup (1 Ton)", p: "₹20 /km" },
  { v: "4 Wheeler (2 Ton)", p: "₹25 /km" },
  { v: "5 Ton Truck", p: "₹30 /km" },
  { v: "6 Wheeler", p: "₹40 /km" },
  { v: "10 Tyre Truck", p: "₹45 /km" },
  { v: "14 Tyre Truck", p: "₹50 /km" },
];

export default function VendorCharges() {
  const router = useRouter();
  const { deliveryMode, setField } = useVendorOnboarding();

  return (
    <VendorShell
      title="Delivery Charges"
      step={12}
      ctaLabel="Continue"
      onCta={() => router.push("/(vendor)/signup/radius")}
    >
      <View
        style={{
          flexDirection: "row",
          height: 48,
          borderRadius: 8,
          backgroundColor: "#F3F4F6",
          overflow: "hidden",
        }}
      >
        {[
          { value: "free", label: "Free Delivery" },
          { value: "paid", label: "Paid Delivery" },
        ].map((opt) => {
          const sel = deliveryMode === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setField("deliveryMode", opt.value as any)}
              style={{
                flex: 1,
                backgroundColor: sel ? tokens.color.brand.green : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 14,
                  color: sel ? "#fff" : tokens.color.text.primary,
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {deliveryMode === "paid" && (
        <>
          <Card>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 13,
                color: tokens.color.text.primary,
                marginBottom: 8,
              }}
            >
              Admin Rates (Reference)
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>Base Price</Text>
              <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.primary, fontWeight: "500" }}>
                ₹200
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
              <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>Price per KM</Text>
              <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.primary, fontWeight: "500" }}>
                ₹25
              </Text>
            </View>
          </Card>

          <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
            Vehicle Wise Pricing (₹ per KM)
          </Text>

          <Card padded={false}>
            {PRICES.map((p, idx) => (
              <View
                key={p.v}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: tokens.color.border.divider,
                }}
              >
                <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.primary }}>{p.v}</Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 13,
                    color: tokens.color.text.primary,
                  }}
                >
                  {p.p}
                </Text>
              </View>
            ))}
          </Card>
        </>
      )}
    </VendorShell>
  );
}
