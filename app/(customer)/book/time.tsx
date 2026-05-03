import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Input } from "@/components/ui";
import { Calendar, Clock } from "@/components/ui/Icon";
import { useBookingStore } from "@/stores/booking-store";
import { BookingShell } from "@/components/booking/BookingShell";

const SLOTS = ["6 AM - 8 AM", "8 AM - 12 PM", "12 PM - 3 PM", "3 PM - 6 PM", "6 PM - 9 PM"];

export default function TimeStep() {
  const router = useRouter();
  const mode = useBookingStore((s) => s.deliveryMode);
  const date = useBookingStore((s) => s.deliveryDate);
  const slot = useBookingStore((s) => s.deliverySlot);
  const setField = useBookingStore((s) => s.setField);

  const isValid = mode === "instant" || (mode === "schedule" && date && slot);

  return (
    <BookingShell
      title="Delivery Time"
      step={4}
      ctaLabel="Continue"
      ctaDisabled={!isValid}
      onCta={() => router.push("/(customer)/book/vehicle-entry")}
    >
      {[
        { value: "instant", label: "Instant Delivery", sub: "Within 2-4 hours" },
        { value: "schedule", label: "Schedule Delivery", sub: "Pick a date and slot" },
      ].map((opt) => {
        const selected = mode === opt.value;
        return (
          <Pressable key={opt.value} onPress={() => setField("deliveryMode", opt.value as any)}>
            <Card
              style={{
                borderWidth: selected ? 1.5 : 1,
                borderColor: selected ? tokens.color.brand.green : tokens.color.border.divider,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: selected ? tokens.color.brand.green : tokens.color.border.input,
                    backgroundColor: selected ? tokens.color.brand.green : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" }} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
                    {opt.label}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {opt.sub}
                  </Text>
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}

      {mode === "schedule" && (
        <>
          <Input
            label="Select Date"
            value={date ?? ""}
            onChangeText={(t) => setField("deliveryDate", t)}
            placeholder="24 May 2026"
            surface="vendor"
            suffix={<Calendar size={18} color={tokens.color.text.muted} />}
          />

          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 14,
              color: tokens.color.text.primary,
              marginTop: 8,
            }}
          >
            Select Time Slot
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {SLOTS.map((s) => {
              const selected = slot === s;
              return (
                <Pressable
                  key={s}
                  onPress={() => setField("deliverySlot", s)}
                  style={{
                    minWidth: "47%",
                    paddingHorizontal: 12,
                    paddingVertical: 14,
                    borderRadius: 8,
                    backgroundColor: selected ? tokens.color.brand.green : "#fff",
                    borderWidth: 1,
                    borderColor: selected ? tokens.color.brand.green : tokens.color.border.divider,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: selected ? "600" : "500",
                      fontSize: 13,
                      color: selected ? "#fff" : tokens.color.text.primary,
                    }}
                  >
                    {s}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      )}
    </BookingShell>
  );
}
