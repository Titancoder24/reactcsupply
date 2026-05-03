import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";
import { User, Package, Truck, Clock, MapPin, Rupee } from "@/components/ui/Icon";

export default function VendorReview() {
  const router = useRouter();
  const s = useVendorOnboarding();

  const slotsLabel = [
    s.slots.morning && "Morning",
    s.slots.afternoon && "Afternoon",
    s.slots.night && "Night",
  ]
    .filter(Boolean)
    .join(", ") || "—";

  const sections = [
    {
      icon: User,
      label: "Vendor Info",
      value: `${s.shopName || "—"}\n${s.ownerName || "—"}`,
      backTo: "/(vendor)/signup/details",
    },
    {
      icon: Package,
      label: "Products",
      value: `${s.products.length} Products Added`,
      backTo: "/(vendor)/signup/products",
    },
    {
      icon: Package,
      label: "Stock",
      value: `Total Stock: ${s.totalStock} ${s.stockUnit}`,
      backTo: "/(vendor)/signup/stock",
    },
    {
      icon: Clock,
      label: "Time Slots",
      value: slotsLabel,
      backTo: "/(vendor)/signup/slots",
    },
    {
      icon: Truck,
      label: "Vehicles",
      value: `${s.vehicles.length} Vehicles Selected`,
      backTo: "/(vendor)/signup/vehicles",
    },
    {
      icon: Rupee,
      label: "Delivery Charges",
      value: s.deliveryMode === "paid" ? "Paid Delivery" : "Free Delivery",
      backTo: "/(vendor)/signup/charges",
    },
    {
      icon: MapPin,
      label: "Delivery Radius",
      value: `${s.radiusKm} KM`,
      backTo: "/(vendor)/signup/radius",
    },
  ];

  return (
    <VendorShell
      title="Final Review"
      step={14}
      ctaLabel="Submit"
      onCta={() => router.push("/(vendor)/signup/success")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary }}>
        Please review your details
      </Text>
      {sections.map((sec) => (
        <Card key={sec.label}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: tokens.color.brand.green50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <sec.icon size={18} color={tokens.color.brand.green} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}
              >
                {sec.label}
              </Text>
              <Text
                style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary, marginTop: 2 }}
              >
                {sec.value}
              </Text>
            </View>
            <Pressable onPress={() => router.push(sec.backTo as any)}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 13,
                  color: tokens.color.brand.green,
                }}
              >
                Edit
              </Text>
            </Pressable>
          </View>
        </Card>
      ))}
    </VendorShell>
  );
}
