import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, QtyStepper, StatusPill } from "@/components/ui";
import { Heart, Star, ShoppingCart, MapPin, Truck, Shield } from "@/components/ui/Icon";
import { useProductBySlug } from "@/hooks/use-catalog";
import { formatCount, formatINR } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const { data, isLoading } = useProductBySlug(slug);
  const add = useCartStore((s) => s.add);
  const [favorite, setFavorite] = useState(false);
  const [qty, setQty] = useState(10);

  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Header title="Product Detail" />
          <Text style={{ textAlign: "center", padding: 32, fontFamily: "Poppins", color: tokens.color.text.muted }}>
            Loading product...
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  const { product, variants } = data;
  const minMoq = variants[0]?.moq ?? 1;

  // Auto-pick variant with highest MOQ <= qty
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
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
          title="Product Detail"
          rightActions={
            <Pressable onPress={() => setFavorite(!favorite)} hitSlop={8}>
              <Heart
                size={22}
                color={favorite ? tokens.color.state.danger : tokens.color.text.dark}
              />
            </Pressable>
          }
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Hero */}
          <View
            style={{
              height: 320,
              backgroundColor: tokens.color.surface.light,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 40,
            }}
          >
            <View
              style={{
                width: 220,
                height: 280,
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "#fff",
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
              gap: 12,
              paddingVertical: 16,
            }}
          >
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  borderWidth: i === 0 ? 2 : 1,
                  borderColor: i === 0 ? tokens.color.customer.accent : tokens.color.border.divider,
                  backgroundColor: "#fff",
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
              </View>
            ))}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                backgroundColor: tokens.color.text.dark,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "700", fontSize: 16 }}>+2</Text>
            </View>
          </View>

          {/* Info */}
          <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#fff" }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Poppins",
                fontWeight: "600",
                color: tokens.color.text.dark,
                paddingTop: 16,
              }}
            >
              {product.name}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 14,
                fontFamily: "Poppins",
                fontWeight: "500",
                color: tokens.color.text.muted,
              }}
            >
              50 kg | {product.brand ?? "C-Supply"}
            </Text>

            {/* Rating */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, gap: 4 }}>
              <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.text.dark }}>
                {Number(product.rating).toFixed(1)}
              </Text>
              <View style={{ flexDirection: "row", marginLeft: 4, gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    color={i < Math.round(Number(product.rating)) ? tokens.color.star : "#E5E7EB"}
                  />
                ))}
              </View>
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 14,
                  fontFamily: "Poppins",
                  color: tokens.color.text.muted,
                }}
              >
                ({formatCount(product.reviews_count)} reviews)
              </Text>
            </View>

            {/* Price + stock */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Text style={{ fontFamily: "Poppins", fontWeight: "700", fontSize: 20, color: tokens.color.text.dark }}>
                {formatINR(unitPrice)}{" "}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: tokens.color.text.muted,
                  }}
                >
                  / {product.unit.toLowerCase()}
                </Text>
              </Text>
              <StatusPill label="In Stock" tone="success" />
            </View>

            {/* Quantity */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 24,
              }}
            >
              <View>
                <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.dark }}>
                  Quantity
                </Text>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                  (Min. {minMoq} {product.unit.toLowerCase()})
                </Text>
              </View>
              <QtyStepper value={qty} onChange={setQty} min={minMoq} />
            </View>

            {/* Description */}
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.dark }}>
                Product Description
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: tokens.color.text.dark,
                  lineHeight: 20,
                }}
              >
                {product.description}
              </Text>
            </View>

            {/* Info chips */}
            <View style={{ marginTop: 16, flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
              {[
                { icon: Truck, label: "Delivery in 24h" },
                { icon: MapPin, label: "Hyderabad" },
                { icon: Shield, label: "Verified Vendor" },
              ].map((c, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: tokens.color.surface.light,
                  }}
                >
                  <c.icon size={14} color={tokens.color.customer.primary} />
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.dark }}>{c.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Sticky bottom action bar */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 24,
            flexDirection: "row",
            gap: 12,
            borderTopWidth: 1,
            borderTopColor: tokens.color.border.divider,
          }}
        >
          <Pressable
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: tokens.color.surface.light,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/(customer)/cart")}
          >
            <ShoppingCart size={24} color={tokens.color.text.dark} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Button label="Add to Cart" onPress={onAddToCart} surface="customer" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
