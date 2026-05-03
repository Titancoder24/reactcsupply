import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, QtyStepper } from "@/components/ui";
import { useCartStore } from "@/stores/cart-store";
import { BookingShell } from "@/components/booking/BookingShell";
import { formatINR } from "@/lib/utils";

export default function MaterialStep() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const setQty = useCartStore((s) => s.setQty);

  return (
    <BookingShell
      title="Select Material"
      step={3}
      ctaLabel={`View Cart (${lines.length})`}
      ctaDisabled={lines.length === 0}
      onCta={() => router.push("/(customer)/book/time")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.muted }}>
        Search and add materials with required quantity
      </Text>

      {lines.length === 0 && (
        <Card style={{ alignItems: "center", paddingVertical: 32 }}>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: tokens.color.text.primary,
              marginBottom: 4,
            }}
          >
            No materials yet
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 13,
              color: tokens.color.text.muted,
              textAlign: "center",
            }}
          >
            Browse the catalog and add materials to your cart first.
          </Text>
        </Card>
      )}

      {lines.map((line) => (
        <Card key={line.productId}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                backgroundColor: tokens.color.surface.light,
                overflow: "hidden",
              }}
            >
              {line.image && (
                <Image source={{ uri: line.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 14,
                  color: tokens.color.text.primary,
                }}
              >
                {line.name}
              </Text>
              <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                {formatINR(line.unitPrice)} / {line.unit.toLowerCase()}
              </Text>
            </View>
            <QtyStepper value={line.qty} onChange={(q) => setQty(line.productId, q)} size="sm" />
          </View>
        </Card>
      ))}
    </BookingShell>
  );
}
