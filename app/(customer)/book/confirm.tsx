import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { Check, ArrowRight } from "@/components/ui/Icon";
import { useBookingStore } from "@/stores/booking-store";
import { useCartStore } from "@/stores/cart-store";

const STAGES = [
  "Order Confirmed",
  "Vendor Accepted",
  "Vehicle Assigned",
  "Out for Delivery",
  "Delivered",
];

export default function ConfirmStep() {
  const router = useRouter();
  const resetBooking = useBookingStore((s) => s.reset);
  const clearCart = useCartStore((s) => s.clear);

  const orderId = `CS-${Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0")}`;

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ padding: 20, gap: 24, flex: 1 }}>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 32,
                backgroundColor: tokens.color.brand.green50,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(22,163,74,0.2)",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 999,
                  backgroundColor: tokens.color.brand.green,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={32} color="#fff" strokeWidth={3} />
              </View>
            </View>
            <Text
              style={{
                marginTop: 24,
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 24,
                color: tokens.color.ink[900],
                letterSpacing: -0.6,
                textAlign: "center",
              }}
            >
              Order placed
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                color: tokens.color.ink[500],
                textAlign: "center",
                maxWidth: 320,
              }}
            >
              Your vendor has been notified. We'll match a transporter shortly.
            </Text>
          </View>

          <Card padded={18}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Order ID
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.mono,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: 0.2,
                  }}
                >
                  {orderId}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Estimated delivery
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.display,
                    fontWeight: "600",
                    fontSize: 14,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.2,
                  }}
                >
                  24 May, 10:30 AM
                </Text>
              </View>
            </View>
          </Card>

          {/* Live status tracker */}
          <Card padded={20}>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 11,
                fontWeight: "600",
                color: tokens.color.ink[500],
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Live status
            </Text>
            <View style={{ gap: 16 }}>
              {STAGES.map((stage, idx) => {
                const completed = idx === 0;
                const isLast = idx === STAGES.length - 1;
                return (
                  <View key={stage} style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          backgroundColor: completed ? tokens.color.brand.green : tokens.color.ink[100],
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 2,
                          borderColor: completed ? tokens.color.brand.green : tokens.color.border.input,
                        }}
                      >
                        {completed && <Check size={11} color="#fff" strokeWidth={3} />}
                      </View>
                      {!isLast && (
                        <View
                          style={{
                            width: 2,
                            height: 24,
                            backgroundColor: completed ? tokens.color.brand.green : tokens.color.ink[200],
                            marginTop: 2,
                          }}
                        />
                      )}
                    </View>
                    <View style={{ flex: 1, paddingTop: 1 }}>
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 13,
                          fontWeight: completed ? "600" : "500",
                          color: completed ? tokens.color.ink[900] : tokens.color.ink[500],
                        }}
                      >
                        {stage}
                      </Text>
                      {completed && (
                        <Text
                          style={{
                            marginTop: 2,
                            fontFamily: tokens.font.family.body,
                            fontSize: 11,
                            color: tokens.color.ink[500],
                          }}
                        >
                          Just now
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </Card>

          <View style={{ flex: 1 }} />

          <View style={{ gap: 10 }}>
            <Button
              label="Track order"
              onPress={() => {
                resetBooking();
                clearCart();
                router.replace("/(customer)/orders");
              }}
              surface="vendor"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
            <Button
              label="Back to home"
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
