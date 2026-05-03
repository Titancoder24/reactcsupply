import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { MapPin } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const STEPS = [5, 10, 15, 20, 25, 30, 40, 50];

export default function VendorRadius() {
  const router = useRouter();
  const { radiusKm, setField } = useVendorOnboarding();

  return (
    <VendorShell
      title="Delivery Radius"
      step={13}
      ctaLabel="Continue"
      onCta={() => router.push("/(vendor)/signup/review")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary, textAlign: "center" }}>
        Set your service area
      </Text>

      <View style={{ alignItems: "center", paddingVertical: 16 }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: 36,
            color: tokens.color.text.primary,
          }}
        >
          {radiusKm} KM
        </Text>
      </View>

      {/* Stepped radius selector (simulating slider on web) */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {STEPS.map((s) => {
          const sel = radiusKm === s;
          return (
            <Pressable
              key={s}
              onPress={() => setField("radiusKm", s)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                backgroundColor: sel ? tokens.color.brand.green : "#fff",
                borderWidth: 1,
                borderColor: sel ? tokens.color.brand.green : tokens.color.border.input,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 13,
                  color: sel ? "#fff" : tokens.color.text.primary,
                }}
              >
                {s} KM
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Map preview placeholder with concentric circles */}
      <Card style={{ alignItems: "center", paddingVertical: 32 }}>
        <View
          style={{
            width: 240,
            height: 240,
            borderRadius: 120,
            backgroundColor: tokens.color.brand.green50,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <View
            style={{
              width: 240 * (radiusKm / 50),
              height: 240 * (radiusKm / 50),
              borderRadius: 120,
              backgroundColor: "rgba(34, 197, 94, 0.25)",
              borderWidth: 2,
              borderColor: tokens.color.brand.green,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapPin size={32} color={tokens.color.brand.green} />
          </View>
        </View>
        <Text
          style={{
            marginTop: 12,
            fontFamily: "Poppins",
            fontSize: 12,
            color: tokens.color.text.secondary,
          }}
        >
          Coverage area: {radiusKm} km
        </Text>
      </Card>
    </VendorShell>
  );
}
