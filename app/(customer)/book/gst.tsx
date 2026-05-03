import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input, Card } from "@/components/ui";
import { Check } from "@/components/ui/Icon";
import { useBookingStore } from "@/stores/booking-store";
import { BookingShell } from "@/components/booking/BookingShell";
import { isValidGstin } from "@/lib/utils";

export default function GstStep() {
  const router = useRouter();
  const hasGst = useBookingStore((s) => s.hasGst);
  const gstNumber = useBookingStore((s) => s.gstNumber);
  const businessName = useBookingStore((s) => s.businessName);
  const setField = useBookingStore((s) => s.setField);

  const isValid =
    hasGst === false
      ? businessName.trim().length >= 3
      : hasGst === true
        ? isValidGstin(gstNumber) && businessName.trim().length >= 3
        : false;

  const validGst = hasGst === true && isValidGstin(gstNumber);

  return (
    <BookingShell
      title="GST Details"
      step={2}
      ctaLabel="Continue"
      ctaDisabled={!isValid}
      onCta={() => router.push("/(customer)/book/material")}
    >
      <Card>
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: 16,
            color: tokens.color.text.primary,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Do you have GST?
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
            const selected = hasGst === opt.value;
            return (
              <Pressable
                key={opt.label}
                onPress={() => setField("hasGst", opt.value)}
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

      {hasGst === true && (
        <Input
          label="GST Number"
          value={gstNumber}
          onChangeText={(t) => setField("gstNumber", t.toUpperCase())}
          placeholder="33ABCDE1234F1Z5"
          maxLength={15}
          surface="vendor"
          suffix={
            validGst ? <Check size={18} color={tokens.color.brand.green} /> : null
          }
        />
      )}

      <Input
        label="Business Name"
        value={businessName}
        onChangeText={(t) => setField("businessName", t)}
        placeholder="ABC Constructions"
        surface="vendor"
      />
    </BookingShell>
  );
}
