import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Package, Check } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const CATS = [
  { slug: "cement-sand", label: "Cement n- Sand" },
  { slug: "bricks", label: "Bricks" },
  { slug: "steel", label: "Steel" },
  { slug: "metal", label: "Metal" },
  { slug: "aggregates", label: "Aggregates" },
  { slug: "tiles", label: "Tiles" },
  { slug: "plumbing", label: "Plumbing" },
  { slug: "electrical", label: "Electrical" },
];

export default function VendorCategories() {
  const router = useRouter();
  const { categories, toggleCategory } = useVendorOnboarding();

  return (
    <VendorShell
      title="Product Categories"
      step={6}
      ctaLabel="Continue"
      ctaDisabled={categories.length === 0}
      onCta={() => router.push("/(vendor)/signup/products")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary }}>
        Select categories you deal in
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {CATS.map((c) => {
          const sel = categories.includes(c.slug);
          return (
            <Pressable
              key={c.slug}
              onPress={() => toggleCategory(c.slug)}
              style={{
                width: "47%",
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: sel ? tokens.color.brand.green50 : "#fff",
                borderWidth: sel ? 1.5 : 1,
                borderColor: sel ? tokens.color.brand.green : tokens.color.border.divider,
                alignItems: "center",
                gap: 8,
                position: "relative",
              }}
            >
              <Package size={28} color={sel ? tokens.color.brand.green : tokens.color.text.secondary} />
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 13,
                  color: tokens.color.text.primary,
                  textAlign: "center",
                }}
              >
                {c.label}
              </Text>
              {sel && (
                <View
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: tokens.color.brand.green,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={12} color="#fff" strokeWidth={3} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </VendorShell>
  );
}
