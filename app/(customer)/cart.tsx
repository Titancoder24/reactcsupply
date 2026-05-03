import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, QtyStepper, EmptyState } from "@/components/ui";
import { MapPin, Trash, ShoppingCart, ArrowRight } from "@/components/ui/Icon";
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
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
          title="Cart"
          subtitle={lines.length === 0 ? "Empty" : `${lines.length} item${lines.length === 1 ? "" : "s"}`}
          showBack={false}
        />

        {lines.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart size={32} color={tokens.color.ink[400]} />}
            title="Your cart is empty"
            description="Browse the catalog and start adding materials. Your cart syncs across devices."
            cta={{ label: "Browse catalog", onPress: () => router.push("/(customer)/home") }}
          />
        ) : (
          <>
            <ScrollView contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 140 }}>
              {/* Address card */}
              <Card padded={16}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: tokens.color.customer.tint,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MapPin size={16} color={tokens.color.customer.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 11,
                        fontWeight: "600",
                        color: tokens.color.ink[500],
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                      }}
                    >
                      Deliver to
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.display,
                        fontSize: 14,
                        fontWeight: "600",
                        color: tokens.color.ink[900],
                        letterSpacing: -0.2,
                      }}
                    >
                      Ahmedabad, Gujarat · 380001
                    </Text>
                  </View>
                  <Pressable hitSlop={8}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 13,
                        fontWeight: "600",
                        color: tokens.color.customer.primary,
                      }}
                    >
                      Change
                    </Text>
                  </Pressable>
                </View>
              </Card>

              {/* Line items */}
              <View style={{ gap: 10 }}>
                {lines.map((line) => (
                  <Card key={line.productId} padded={14}>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <View
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 12,
                          backgroundColor: tokens.color.ink[50],
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

                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
                          <View style={{ flex: 1 }}>
                            {line.brand && (
                              <Text
                                style={{
                                  fontFamily: tokens.font.family.body,
                                  fontSize: 10,
                                  fontWeight: "600",
                                  color: tokens.color.ink[500],
                                  letterSpacing: 0.5,
                                  textTransform: "uppercase",
                                }}
                              >
                                {line.brand}
                              </Text>
                            )}
                            <Text
                              numberOfLines={2}
                              style={{
                                fontFamily: tokens.font.family.display,
                                fontSize: 14,
                                fontWeight: "600",
                                color: tokens.color.ink[900],
                                lineHeight: 18,
                                letterSpacing: -0.2,
                              }}
                            >
                              {line.name}
                            </Text>
                            <Text
                              style={{
                                marginTop: 2,
                                fontFamily: tokens.font.family.mono,
                                fontSize: 11,
                                color: tokens.color.ink[500],
                              }}
                            >
                              {formatINR(line.unitPrice)} / {line.unit.toLowerCase()}
                            </Text>
                          </View>
                          <Pressable onPress={() => remove(line.productId)} hitSlop={8}>
                            <Trash size={16} color={tokens.color.ink[400]} />
                          </Pressable>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <QtyStepper
                            value={line.qty}
                            onChange={(q) => setQty(line.productId, q)}
                            size="sm"
                          />
                          <Text
                            style={{
                              fontFamily: tokens.font.family.display,
                              fontSize: 16,
                              fontWeight: "700",
                              color: tokens.color.ink[900],
                              letterSpacing: -0.4,
                            }}
                          >
                            {formatINR(line.qty * line.unitPrice)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>

              {/* Price breakdown */}
              <Card padded={16}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Order summary
                </Text>
                <View style={{ gap: 8 }}>
                  <Row label="Item subtotal" value={formatINR(subtotal + youSave)} />
                  <Row label="Delivery" value={formatINR(deliveryCharge)} />
                  <Row
                    label="Discount"
                    value={`− ${formatINR(youSave)}`}
                    valueColor={tokens.color.state.successText}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: tokens.color.border.hairline,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontWeight: "700",
                      fontSize: 16,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.3,
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontWeight: "700",
                      fontSize: 22,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.6,
                    }}
                  >
                    {formatINR(toPay)}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor: tokens.color.bgKpi.green,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: tokens.color.state.success,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.state.successText,
                      fontWeight: "500",
                    }}
                  >
                    You're saving {formatINR(youSave)} on this order
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
                backgroundColor: "rgba(255,255,255,0.97)",
                paddingHorizontal: 20,
                paddingTop: 14,
                paddingBottom: 28,
                borderTopWidth: 1,
                borderTopColor: tokens.color.border.hairline,
              }}
            >
              <Button
                label={`Checkout · ${formatINR(toPay)}`}
                onPress={() => router.push("/(customer)/book/address")}
                surface="customer"
                iconRight={<ArrowRight size={18} color="#fff" />}
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
    <Text
      style={{
        fontFamily: tokens.font.family.body,
        fontSize: 13,
        color: tokens.color.ink[600],
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        fontFamily: tokens.font.family.mono,
        fontSize: 13,
        fontWeight: "600",
        color: valueColor ?? tokens.color.ink[900],
      }}
    >
      {value}
    </Text>
  </View>
);
