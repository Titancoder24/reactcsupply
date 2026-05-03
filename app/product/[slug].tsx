import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Avatar, Button, Card, Header, QtyStepper, StatusPill, Stat } from "@/components/ui";
import { Heart, Star, ShoppingCart, MapPin, Truck, Shield, Check } from "@/components/ui/Icon";
import { useProductBySlug } from "@/hooks/use-catalog";
import { formatCount, formatINR } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const { data, isLoading } = useProductBySlug(slug);
  const add = useCartStore((s) => s.add);
  const [favorite, setFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(10);

  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Header title="Product" />
          <Text
            style={{
              textAlign: "center",
              padding: 32,
              fontFamily: tokens.font.family.body,
              color: tokens.color.ink[500],
            }}
          >
            Loading product...
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  const { product, variants } = data;
  const minMoq = variants[0]?.moq ?? 1;
  const activeVariant =
    [...variants].reverse().find((v) => v.moq <= qty) ?? variants[0];
  const unitPrice = activeVariant ? Number(activeVariant.price_per_unit) : Number(product.base_price);

  const onAddToCart = () => {
    add({
      productId: product.id,
      variantId: activeVariant?.id,
      name: product.name,
      brand: product.brand ?? undefined,
      unit: product.unit,
      unitPrice,
      qty,
      weightPerUnitKg: activeVariant?.weight_per_unit_kg ?? undefined,
      image: product.images?.[0],
      vendorId: product.vendor_id,
    });
    router.push("/(customer)/cart");
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
          title="Product"
          rightActions={
            <Pressable
              onPress={() => setFavorite(!favorite)}
              hitSlop={8}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: tokens.color.ink[50],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heart
                size={18}
                color={favorite ? tokens.color.state.danger : tokens.color.ink[800]}
              />
            </Pressable>
          }
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          {/* Hero */}
          <View
            style={{
              height: 360,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 320,
                borderRadius: 24,
                backgroundColor: tokens.color.surface.white,
                borderWidth: 1,
                borderColor: tokens.color.border.hairline,
                overflow: "hidden",
                ...(tokens.shadow.sm as any),
              }}
            >
              {product.images?.[0] && (
                <Image
                  source={{ uri: product.images[0] }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>

          {/* Thumbnails */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              paddingBottom: 20,
            }}
          >
            {[0, 1, 2].map((i) => (
              <Pressable
                key={i}
                onPress={() => setActiveImage(i)}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  borderWidth: activeImage === i ? 2 : 1,
                  borderColor:
                    activeImage === i
                      ? tokens.color.customer.accent
                      : tokens.color.border.hairline,
                  backgroundColor: tokens.color.surface.white,
                  overflow: "hidden",
                }}
              >
                {product.images?.[0] && (
                  <Image
                    source={{ uri: product.images[0] }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                )}
              </Pressable>
            ))}
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: tokens.color.ink[800],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: tokens.font.family.display,
                  fontWeight: "700",
                  fontSize: 14,
                }}
              >
                +2
              </Text>
            </View>
          </View>

          {/* Product info */}
          <View style={{ paddingHorizontal: 20, gap: 16 }}>
            <View>
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
                {product.brand ?? "C-Supply"} · 50 kg
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontFamily: tokens.font.family.display,
                  fontSize: 24,
                  fontWeight: "700",
                  color: tokens.color.ink[900],
                  letterSpacing: -0.6,
                  lineHeight: 30,
                }}
              >
                {product.name}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 999,
                    backgroundColor: tokens.color.bgKpi.orange,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Star size={12} color={tokens.color.star} />
                  <Text
                    style={{
                      fontFamily: tokens.font.family.mono,
                      fontSize: 12,
                      fontWeight: "700",
                      color: tokens.color.ink[800],
                    }}
                  >
                    {Number(product.rating).toFixed(1)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[500],
                  }}
                >
                  {formatCount(product.reviews_count)} reviews
                </Text>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: tokens.color.ink[300] }} />
                <StatusPill label="In stock" tone="success" />
              </View>
            </View>

            {/* Price + quantity */}
            <Card padded={20}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View>
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
                    Price per {product.unit.toLowerCase()}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.display,
                        fontSize: 28,
                        fontWeight: "700",
                        color: tokens.color.ink[900],
                        letterSpacing: -0.8,
                      }}
                    >
                      {formatINR(unitPrice)}
                    </Text>
                    {Number(product.base_price) > unitPrice && (
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 13,
                          color: tokens.color.ink[400],
                          textDecorationLine: "line-through",
                        }}
                      >
                        {formatINR(Number(product.base_price))}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
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
                    Quantity
                  </Text>
                  <View style={{ marginTop: 4 }}>
                    <QtyStepper value={qty} onChange={setQty} min={minMoq} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTopWidth: 1,
                  borderTopColor: tokens.color.border.hairline,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[600],
                  }}
                >
                  Subtotal · {qty} {product.unit.toLowerCase()}{qty === 1 ? "" : "s"}
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontSize: 18,
                    fontWeight: "700",
                    color: tokens.color.ink[900],
                    letterSpacing: -0.4,
                  }}
                >
                  {formatINR(qty * unitPrice)}
                </Text>
              </View>
            </Card>

            {/* MOQ tiers */}
            {variants.length > 1 && (
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
                  Bulk pricing tiers
                </Text>
                <View style={{ gap: 8 }}>
                  {variants.map((v) => {
                    const isActive = activeVariant?.id === v.id;
                    return (
                      <View
                        key={v.id}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          borderRadius: 10,
                          backgroundColor: isActive ? tokens.color.customer.tint : tokens.color.ink[50],
                          borderWidth: isActive ? 1 : 0,
                          borderColor: isActive ? tokens.color.customer.primary : "transparent",
                        }}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                          {isActive && <Check size={14} color={tokens.color.customer.primary} strokeWidth={3} />}
                          <Text
                            style={{
                              fontFamily: tokens.font.family.body,
                              fontSize: 13,
                              fontWeight: "500",
                              color: tokens.color.ink[800],
                            }}
                          >
                            {v.tier_name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: tokens.font.family.mono,
                            fontSize: 13,
                            fontWeight: "600",
                            color: tokens.color.ink[900],
                          }}
                        >
                          {formatINR(Number(v.price_per_unit))} / {product.unit.toLowerCase()}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Card>
            )}

            {/* Vendor card */}
            <Card padded={16}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Avatar name="Sri Balaji Building Materials" size={44} tone="primary" />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.display,
                        fontSize: 14,
                        fontWeight: "600",
                        color: tokens.color.ink[900],
                        letterSpacing: -0.2,
                      }}
                    >
                      Sri Balaji Building Materials
                    </Text>
                    <Shield size={14} color={tokens.color.state.success} />
                  </View>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.ink[500],
                    }}
                  >
                    Verified vendor · Hyderabad · 4.7 ★
                  </Text>
                </View>
                <Pressable>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 13,
                      fontWeight: "600",
                      color: tokens.color.customer.primary,
                    }}
                  >
                    View
                  </Text>
                </Pressable>
              </View>
            </Card>

            {/* Trust strip */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              {[
                { Icon: Truck, label: "Delivery", value: "in 24h" },
                { Icon: MapPin, label: "From", value: "Hyderabad" },
                { Icon: Shield, label: "Warranty", value: "Mfg" },
              ].map((c) => (
                <Card key={c.label} padded={12} style={{ flex: 1 }}>
                  <c.Icon size={14} color={tokens.color.customer.primary} />
                  <Text
                    style={{
                      marginTop: 6,
                      fontFamily: tokens.font.family.body,
                      fontSize: 10,
                      fontWeight: "600",
                      color: tokens.color.ink[500],
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    {c.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontSize: 13,
                      fontWeight: "600",
                      color: tokens.color.ink[900],
                      letterSpacing: -0.2,
                    }}
                  >
                    {c.value}
                  </Text>
                </Card>
              ))}
            </View>

            {/* Description */}
            <View>
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 11,
                  fontWeight: "600",
                  color: tokens.color.ink[500],
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 14,
                  color: tokens.color.ink[700],
                  lineHeight: 22,
                }}
              >
                {product.description}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Sticky bottom CTA */}
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
            flexDirection: "row",
            gap: 10,
            borderTopWidth: 1,
            borderTopColor: tokens.color.border.hairline,
          }}
        >
          <Pressable
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: tokens.color.ink[50],
              borderWidth: 1,
              borderColor: tokens.color.border.hairline,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/(customer)/cart")}
          >
            <ShoppingCart size={20} color={tokens.color.ink[800]} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Button
              label={`Add to cart · ${formatINR(qty * unitPrice)}`}
              onPress={onAddToCart}
              surface="customer"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
