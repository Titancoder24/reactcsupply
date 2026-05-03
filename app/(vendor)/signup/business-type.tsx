import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { Building, User } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const TYPES = [
  { value: "GST Vendor", label: "GST Vendor", sub: "I have GST Number", Icon: Building },
  { value: "Non-GST Vendor", label: "Non-GST Vendor", sub: "Non GST", Icon: User },
  { value: "Individual Supplier", label: "Individual Supplier", sub: "Personal supplier", Icon: User },
] as const;

export default function VendorBusinessType() {
  const router = useRouter();
  const { businessType, setField } = useVendorOnboarding();

  return (
    <VendorShell
      title="Business Type"
      step={3}
      ctaLabel="Continue"
      ctaDisabled={!businessType}
      onCta={() => router.push("/(vendor)/signup/details")}
    >
      <Text
        style={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: 18,
          color: tokens.color.text.primary,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Select your business type
      </Text>

      {TYPES.map((t) => {
        const sel = businessType === t.value;
        return (
          <Pressable key={t.value} onPress={() => setField("businessType", t.value as any)}>
            <Card
              style={{
                backgroundColor: sel ? tokens.color.brand.green50 : "#fff",
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
                    backgroundColor: sel ? "#fff" : tokens.color.surface.softBg,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <t.Icon size={22} color={sel ? tokens.color.brand.green : tokens.color.text.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 16,
                      color: tokens.color.text.primary,
                    }}
                  >
                    {t.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 12,
                      color: tokens.color.text.secondary,
                    }}
                  >
                    {t.sub}
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
    </VendorShell>
  );
}
