import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { MapPin, Plus } from "@/components/ui/Icon";
import { useBookingStore } from "@/stores/booking-store";
import { BookingShell } from "@/components/booking/BookingShell";

const ADDRESSES = [
  {
    id: "addr-home",
    label: "Home",
    line: "12, Green Street, Coimbatore - 641001",
  },
  {
    id: "addr-site",
    label: "Site Address",
    line: "Building Construction, Avinashi Road, Coimbatore - 641037",
  },
];

export default function AddressStep() {
  const router = useRouter();
  const addressId = useBookingStore((s) => s.addressId);
  const setField = useBookingStore((s) => s.setField);

  return (
    <BookingShell
      title="Delivery Address"
      step={1}
      ctaLabel="Continue"
      ctaDisabled={!addressId}
      onCta={() => router.push("/(customer)/book/gst")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.muted }}>
        Select delivery address
      </Text>

      {ADDRESSES.map((a) => {
        const selected = addressId === a.id;
        return (
          <Pressable key={a.id} onPress={() => setField("addressId", a.id)}>
            <Card
              style={{
                borderWidth: selected ? 1.5 : 1,
                borderColor: selected ? tokens.color.brand.green : tokens.color.border.divider,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <MapPin size={20} color={tokens.color.brand.green} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 16,
                      color: tokens.color.text.primary,
                    }}
                  >
                    {a.label}
                  </Text>
                  <Text
                    style={{
                      marginTop: 4,
                      fontFamily: "Poppins",
                      fontSize: 13,
                      color: tokens.color.text.secondary,
                    }}
                  >
                    {a.line}
                  </Text>
                </View>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: selected ? tokens.color.brand.green : "transparent",
                    borderWidth: 1.5,
                    borderColor: selected ? tokens.color.brand.green : tokens.color.border.input,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selected && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#fff",
                      }}
                    />
                  )}
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          paddingVertical: 12,
        }}
      >
        <Plus size={18} color={tokens.color.brand.green} />
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: 14,
            color: tokens.color.brand.green,
          }}
        >
          Add New Address
        </Text>
      </Pressable>
    </BookingShell>
  );
}
