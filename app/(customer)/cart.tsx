import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, QtyStepper } from "@/components/ui";
import { MapPin, Trash, ShoppingCart } from "@/components/ui/Icon";
import { useCartStore } from "@/stores/cart-store";
import { formatINR } from "@/lib/utils";

export default function CartScreen() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const subtotal = useCartStore((s) => s.subtotal());

  const deliveryCharge = lines.length > 0 ? 200 : 0;
  const youSave = lines.length > 0 ? 350 : 0;
  const toPay = subtotal + deliveryCharge - youSave;

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header title={`My Cart (${lines.length})`} />

        {lines.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32 }}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: tokens.color.surface.white,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                borderWidth: 1,
                borderColor: tokens.color.border.divider,
              }}
            >
              <ShoppingCart size={56} color={tokens.color.text.muted} />
            </View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 18,
                fontWeight: "600",
                color: tokens.color.text.dark,
                marginBottom: 4,
              }}
            >
              Your cart is empty
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 14,
                color: tokens.color.text.muted,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Browse materials and start adding to your cart
            </Text>
            <Button
              label="Browse Categories"
              onPress={() => router.push("/(customer)/home")}
              fullWidth={false}
              surface="customer"
            />
          </View>
        ) : (
          <>
            <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 120 }}>
              {/* Address card */}
              <Card>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <MapPin size={20} color={tokens.color.customer.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontFamily: "Poppins", color: tokens.color.text.muted }}>
                      Deliver to
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.text.dark }}>
                      Ahmedabad, Gujarat - 380001
                    </Text>
                  </View>
                  <Pressable>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.customer.accent }}>
                      Change
                    </Text>
                  </Pressable>
                </View>
              </Card>

              {/* Line items */}
              {lines.map((line) => (
                <Card key={line.productId}>
                  <View style={{ flexDirection: "row" }}>
                    {/* Image */}
                    <View
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        backgroundColor: tokens.color.surface.light,
                        overflow: "hidden",
                      }}
                    >
                      {line.image && (
                        <Image
                          source={{ uri: line.image }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      )}
                    </View>

                    {/* Info */}
                    <View style={{ flex: 1, marginLeft: 12, justifyContent: "space-between" }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            flex: 1,
                            fontSize: 14,
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            color: tokens.color.text.dark,
                          }}
                        >
                          {line.name}
                        </Text>
                        <Pressable onPress={() => remove(line.productId)} hitSlop={8}>
                          <Trash size={18} color={tokens.color.text.muted} />
                        </Pressable>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins",
                          color: tokens.color.text.muted,
                        }}
                      >
                        {line.unit}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins",
                          fontWeight: "600",
                          color: tokens.color.text.dark,
                        }}
                      >
                        {formatINR(line.unitPrice)} / {line.unit.toLowerCase()}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 8,
                        }}
                      >
                        <QtyStepper
                          value={line.qty}
                          onChange={(q) => setQty(line.productId, q)}
                          size="sm"
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins",
                            fontWeight: "700",
                            color: tokens.color.text.dark,
                          }}
                        >
                          {formatINR(line.qty * line.unitPrice)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              ))}

              {/* Price details */}
              <Card>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 16,
                    color: tokens.color.text.dark,
                    marginBottom: 12,
                  }}
                >
                  Price Details
                </Text>
                <View style={{ gap: 8 }}>
                  <Row label="Total MRP" value={formatINR(subtotal + youSave)} />
                  <Row label="Delivery Charges" value={formatINR(deliveryCharge)} />
                  <Row
                    label="You Save"
                    value={`- ${formatINR(youSave)}`}
                    valueColor={tokens.color.state.successText}
                  />
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
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 16,
                      color: tokens.color.text.dark,
                    }}
                  >
                    To Pay
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "700",
                      fontSize: 16,
                      color: tokens.color.text.dark,
                    }}
                  >
                    {formatINR(toPay)}
                  </Text>
                </View>
              </Card>
            </ScrollView>

            {/* Sticky CTA */}
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#fff",
                padding: 20,
                borderTopWidth: 1,
                borderTopColor: tokens.color.border.divider,
              }}
            >
              <Button
                label="Proceed to Checkout"
                onPress={() => router.push("/(customer)/book/address")}
                surface="customer"
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

const Row: React.FC<{ label: string; value: string; valueColor?: string }> = ({
  label,
  value,
  valueColor,
}) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.dark }}>{label}</Text>
    <Text
      style={{
        fontFamily: "Poppins",
        fontSize: 14,
        color: valueColor ?? tokens.color.text.dark,
      }}
    >
      {value}
    </Text>
  </View>
);
