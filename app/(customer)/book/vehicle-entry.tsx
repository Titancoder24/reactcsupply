import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Input } from "@/components/ui";
import { Clock } from "@/components/ui/Icon";
import { useBookingStore } from "@/stores/booking-store";
import { BookingShell } from "@/components/booking/BookingShell";

export default function VehicleEntryStep() {
  const router = useRouter();
  const need = useBookingStore((s) => s.needVehicleEntry);
  const vehicleNumber = useBookingStore((s) => s.vehicleNumber);
  const entryTime = useBookingStore((s) => s.entryTime);
  const contactPerson = useBookingStore((s) => s.contactPerson);
  const contactPhone = useBookingStore((s) => s.contactPhone);
  const setField = useBookingStore((s) => s.setField);

  return (
    <BookingShell
      title="Vehicle Entry"
      step={5}
      ctaLabel="Continue"
      onCta={() => router.push("/(customer)/book/review")}
    >
      <Card>
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: 16,
            color: tokens.color.text.primary,
            marginBottom: 12,
          }}
        >
          Need Vehicle Entry Slip?
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 48,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#F3F4F6",
          }}
        >
          {[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ].map((opt) => {
            const selected = need === opt.value;
            return (
              <Pressable
                key={opt.label}
                onPress={() => setField("needVehicleEntry", opt.value)}
                style={{
                  flex: 1,
                  backgroundColor: selected ? tokens.color.brand.green : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 16,
                    color: selected ? "#fff" : tokens.color.text.primary,
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      {need && (
        <>
          <Input
            label="Vehicle Number"
            value={vehicleNumber}
            onChangeText={(t) => setField("vehicleNumber", t.toUpperCase())}
            placeholder="TN 38 AB 1234"
            surface="vendor"
          />
          <Input
            label="Entry Time (At Site)"
            value={entryTime}
            onChangeText={(t) => setField("entryTime", t)}
            placeholder="10:30 AM"
            surface="vendor"
            suffix={<Clock size={18} color={tokens.color.text.muted} />}
          />
          <Input
            label="Contact Person (At Gate)"
            value={contactPerson}
            onChangeText={(t) => setField("contactPerson", t)}
            placeholder="Ramesh"
            surface="vendor"
          />
          <Input
            label="Phone Number"
            value={contactPhone}
            onChangeText={(t) => setField("contactPhone", t.replace(/\D/g, "").slice(0, 10))}
            placeholder="9876543210"
            keyboardType="number-pad"
            surface="vendor"
            maxLength={10}
          />
        </>
      )}
    </BookingShell>
  );
}
