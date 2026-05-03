import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, FilterPill, Header } from "@/components/ui";
import { Search, Filter } from "@/components/ui/Icon";
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
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
          title={title}
          rightActions={
            <>
              <Pressable hitSlop={8}>
                <Search size={22} color={tokens.color.text.dark} />
              </Pressable>
              <Pressable hitSlop={8}>
                <Filter size={22} color={tokens.color.text.dark} />
              </Pressable>
            </>
          }
        />

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 12 }}
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

        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 16 }}>
          {isLoading && (
            <Text style={{ fontFamily: "Poppins", color: tokens.color.text.muted, textAlign: "center", padding: 24 }}>
              Loading products...
            </Text>
          )}

          {products.map((p) => (
            <Card key={p.id} elevated padded={false} style={{ overflow: "hidden" }}>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => router.push(`/product/${p.slug}`)}
                  style={{
                    width: 96,
                    height: 96,
                    margin: 12,
                    borderRadius: 8,
                    backgroundColor: tokens.color.surface.light,
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

                <View style={{ flex: 1, padding: 12, paddingLeft: 0, justifyContent: "space-between" }}>
                  <View>
                    <Pressable onPress={() => router.push(`/product/${p.slug}`)}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 14,
                          fontFamily: "Poppins",
                          fontWeight: "600",
                          color: tokens.color.text.dark,
                          lineHeight: 18,
                        }}
                      >
                        {p.name}
                      </Text>
                    </Pressable>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Poppins",
                        color: tokens.color.text.muted,
                        marginTop: 2,
                      }}
                    >
                      50 kg
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins",
                        fontWeight: "600",
                        color: tokens.color.text.dark,
                        marginTop: 6,
                      }}
                    >
                      {formatINR(Number(p.base_price))}{" "}
                      <Text style={{ fontWeight: "400", color: tokens.color.text.muted, fontSize: 12 }}>
                        / {p.unit.toLowerCase()}
                      </Text>
                    </Text>
                  </View>

                  <View style={{ marginTop: 8 }}>
                    <Button
                      label="Add to Cart"
                      size="sm"
                      surface="customer"
                      onPress={() =>
                        add({
                          productId: p.id,
                          name: p.name,
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
