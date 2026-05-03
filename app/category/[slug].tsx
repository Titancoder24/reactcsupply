import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, FilterPill, Header, StatusPill } from "@/components/ui";
import { Search, Filter, Star } from "@/components/ui/Icon";
import { useProducts } from "@/hooks/use-catalog";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

const FILTERS = ["All", "Ordinary Portland", "PPC", "PSC"];

export default function CategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ slug?: string }>();
  const slug = params.slug ?? "cement";
  const [selected, setSelected] = useState("All");
  const { data: products = [], isLoading } = useProducts(slug);
  const add = useCartStore((s) => s.add);

  const title = slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
          title={title}
          subtitle={`${products.length} products available`}
          rightActions={
            <>
              <Pressable
                hitSlop={6}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: tokens.color.ink[50],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Search size={18} color={tokens.color.ink[800]} />
              </Pressable>
              <Pressable
                hitSlop={6}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: tokens.color.ink[50],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Filter size={18} color={tokens.color.ink[800]} />
              </Pressable>
            </>
          }
        />

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 14, gap: 8 }}
        >
          {FILTERS.map((f) => (
            <FilterPill
              key={f}
              label={f}
              active={selected === f}
              onPress={() => setSelected(f)}
              surface="customer"
            />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 12 }}>
          {isLoading && (
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                color: tokens.color.ink[500],
                textAlign: "center",
                padding: 24,
              }}
            >
              Loading products...
            </Text>
          )}

          {products.map((p) => (
            <Card key={p.id} padded={false} elevation="xs">
              <View style={{ flexDirection: "row", padding: 12, gap: 12 }}>
                <Pressable
                  onPress={() => router.push(`/product/${p.slug}`)}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 12,
                    backgroundColor: tokens.color.ink[50],
                    overflow: "hidden",
                  }}
                >
                  {p.images?.[0] && (
                    <Image
                      source={{ uri: p.images[0] }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                </Pressable>

                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 10,
                        fontWeight: "600",
                        color: tokens.color.ink[500],
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                      }}
                    >
                      {p.brand ?? "C-Supply"}
                    </Text>
                    <Pressable onPress={() => router.push(`/product/${p.slug}`)}>
                      <Text
                        numberOfLines={2}
                        style={{
                          marginTop: 2,
                          fontFamily: tokens.font.family.display,
                          fontSize: 14,
                          fontWeight: "600",
                          color: tokens.color.ink[900],
                          lineHeight: 18,
                          letterSpacing: -0.2,
                        }}
                      >
                        {p.name}
                      </Text>
                    </Pressable>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <Star size={11} color={tokens.color.star} />
                      <Text
                        style={{
                          fontFamily: tokens.font.family.mono,
                          fontSize: 11,
                          fontWeight: "600",
                          color: tokens.color.ink[700],
                        }}
                      >
                        {Number(p.rating).toFixed(1)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 11,
                          color: tokens.color.ink[500],
                        }}
                      >
                        · 50 kg
                      </Text>
                      <View style={{ marginLeft: 4 }}>
                        <StatusPill label="In stock" tone="success" size="xs" />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
                      <Text
                        style={{
                          fontFamily: tokens.font.family.display,
                          fontSize: 18,
                          fontWeight: "700",
                          color: tokens.color.ink[900],
                          letterSpacing: -0.4,
                        }}
                      >
                        {formatINR(Number(p.base_price))}
                      </Text>
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 11,
                          color: tokens.color.ink[500],
                        }}
                      >
                        / {p.unit.toLowerCase()}
                      </Text>
                    </View>
                    <Button
                      label="Add"
                      size="sm"
                      surface="customer"
                      fullWidth={false}
                      onPress={() =>
                        add({
                          productId: p.id,
                          name: p.name,
                          brand: p.brand ?? undefined,
                          unit: p.unit,
                          unitPrice: Number(p.base_price),
                          qty: 1,
                          image: p.images?.[0],
                          vendorId: p.vendor_id,
                        })
                      }
                    />
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
