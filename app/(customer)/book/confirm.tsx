import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { Check } from "@/components/ui/Icon";
import { useBookingStore } from "@/stores/booking-store";
import { useCartStore } from "@/stores/cart-store";

const ORDER_STAGES = ["Order Confirmed", "Vendor Accepted", "Vehicle Assigned", "Out for Delivery", "Delivered"];

export default function ConfirmStep() {
  const router = useRouter();
  const resetBooking = useBookingStore((s) => s.reset);
  const clearCart = useCartStore((s) => s.clear);

  useEffect(() => {
    return () => {
      // Cleanup when unmounting (return to home)
    };
  }, []);

  const orderId = `CS${Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0")}`;

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ padding: 20, gap: 24, flex: 1 }}>
          <View style={{ alignItems: "center", marginTop: 32 }}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: tokens.color.brand.green50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: tokens.color.brand.green,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={48} color="#fff" strokeWidth={3} />
              </View>
            </View>
            <Text
              style={{
                marginTop: 24,
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 18,
                color: tokens.color.text.primary,
                textAlign: "center",
              }}
            >
              Your order has been placed{"\n"}successfully!
            </Text>

            <View style={{ alignItems: "center", marginTop: 24 }}>
              <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>Order ID</Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 18,
                  color: tokens.color.text.primary,
                }}
              >
                {orderId}
              </Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 16 }}>
              <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                Estimated Delivery
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 14,
                  color: tokens.color.text.primary,
                }}
              >
                24 May 2026, 10:30 AM
              </Text>
            </View>
          </View>

          {/* Live status tracker */}
          <Card>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 14,
                color: tokens.color.text.primary,
                marginBottom: 16,
              }}
            >
              Order Tracking (Live Status)
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {ORDER_STAGES.map((stage, idx) => {
                const completed = idx === 0;
                return (
                  <View key={stage} style={{ flex: 1, alignItems: "center" }}>
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: completed ? tokens.color.brand.green : "#E5E7EB",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {completed && <Check size={14} color="#fff" strokeWidth={3} />}
                    </View>
                    <Text
                      style={{
                        marginTop: 6,
                        fontFamily: "Poppins",
                        fontSize: 9,
                        textAlign: "center",
                        color: completed ? tokens.color.text.primary : tokens.color.text.muted,
                        fontWeight: completed ? "600" : "400",
                      }}
                    >
                      {stage}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Card>

          <View style={{ flex: 1 }} />

          <View style={{ gap: 12 }}>
            <Button
              label="Track Order"
              onPress={() => {
                resetBooking();
                clearCart();
                router.replace("/(customer)/orders");
              }}
              surface="vendor"
            />
            <Button
              label="Back to Home"
              variant="secondary"
              onPress={() => {
                resetBooking();
                clearCart();
                router.replace("/(customer)/home");
              }}
              surface="vendor"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
