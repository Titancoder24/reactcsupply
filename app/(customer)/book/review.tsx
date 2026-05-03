import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { useBookingStore } from "@/stores/booking-store";
import { useCartStore } from "@/stores/cart-store";
import { BookingShell } from "@/components/booking/BookingShell";
import { formatINR } from "@/lib/utils";

export default function ReviewStep() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const addressId = useBookingStore((s) => s.addressId);

  const deliveryCharge = 500;
  const gstAmount = Math.round((subtotal + deliveryCharge) * 0.18);
  const total = subtotal + deliveryCharge + gstAmount;

  const addressLabel = addressId === "addr-home"
    ? { label: "Home", line: "12, Green Street, Coimbatore - 641001" }
    : { label: "Site Address", line: "Building Construction, Avinashi Road, Coimbatore - 641037" };

  return (
    <BookingShell
      title="Review Order"
      step={6}
      ctaLabel="Continue to Pay"
      onCta={() => router.push("/(customer)/book/confirm")}
    >
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>Deliver To</Text>
          <Pressable>
            <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 13, color: tokens.color.brand.green }}>
              Change
            </Text>
          </Pressable>
        </View>
        <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
          {addressLabel.label}
        </Text>
        <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
          {addressLabel.line}
        </Text>
      </Card>

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
          Order Items ({lines.length})
        </Text>
        {lines.map((line) => (
          <View
            key={line.productId}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
          >
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: "500",
                  color: tokens.color.text.primary,
                }}
              >
                {line.name}
              </Text>
              <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                {line.qty} {line.unit}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 14,
                color: tokens.color.text.primary,
              }}
            >
              {formatINR(line.qty * line.unitPrice)}
            </Text>
          </View>
        ))}

        <View
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: tokens.color.border.divider,
            gap: 6,
          }}
        >
          <Row label="Item Total" value={formatINR(subtotal)} />
          <Row label="Delivery Charges" value={formatINR(deliveryCharge)} />
          <Row label="GST (18%)" value={formatINR(gstAmount)} />
        </View>

        <View
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: tokens.color.border.divider,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
            Total Amount
          </Text>
          <Text style={{ fontFamily: "Poppins", fontWeight: "700", fontSize: 18, color: tokens.color.text.primary }}>
            {formatINR(total)}
          </Text>
        </View>
      </Card>
    </BookingShell>
  );
}

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary }}>{label}</Text>
    <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.primary }}>{value}</Text>
  </View>
);
