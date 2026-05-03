import React from "react";
import { View, Text, ScrollView, Pressable, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, SectionLabel, StatusPill, Avatar } from "@/components/ui";
import {
  Bell,
  MapPin,
  Search,
  ChevronDown,
  Shield,
  Truck,
  Rupee,
  ArrowRight,
} from "@/components/ui/Icon";
import { useCategories, useProducts } from "@/hooks/use-catalog";
import { noOutline } from "@/lib/web-style";
import { formatINR, formatCount } from "@/lib/utils";

const TRUST_FEATURES = [
  { Icon: Shield, title: "Verified", sub: "vendors only" },
  { Icon: Truck, title: "On-time", sub: "98.4% rate" },
  { Icon: Rupee, title: "Best price", sub: "guarantee" },
];

const BRANDS = [
  { name: "UltraTech", color: "#DC2626", category: "Cement" },
  { name: "JSW Steel", color: "#1E40AF", category: "Steel" },
  { name: "ACC", color: "#15803D", category: "Cement" },
  { name: "Ambuja", color: "#0891B2", category: "Cement" },
  { name: "Tata Tiscon", color: "#BE185D", category: "TMT" },
];

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Top bar */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: tokens.color.surface.page,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: tokens.color.customer.tint,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={18} color={tokens.color.customer.primary} />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: tokens.font.family.body,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  Deliver to
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: tokens.font.family.display,
                      fontWeight: "600",
                      color: tokens.color.ink[900],
                      letterSpacing: -0.2,
                    }}
                  >
                    Ahmedabad, Gujarat
                  </Text>
                  <ChevronDown size={14} color={tokens.color.ink[500]} />
                </View>
              </View>
            </Pressable>

            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: tokens.color.surface.white,
                  borderWidth: 1,
                  borderColor: tokens.color.border.hairline,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bell size={18} color={tokens.color.ink[800]} />
                <View
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: tokens.color.state.danger,
                    borderWidth: 1.5,
                    borderColor: "#fff",
                  }}
                />
              </Pressable>
            </View>
          </View>

          {/* Search */}
          <View style={{ paddingHorizontal: 20, marginTop: 4 }}>
            <View
              style={{
                height: 50,
                borderRadius: 14,
                backgroundColor: tokens.color.surface.white,
                borderWidth: 1,
                borderColor: tokens.color.border.hairline,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                gap: 10,
                ...(tokens.shadow.xs as any),
              }}
            >
              <Search size={18} color={tokens.color.ink[400]} />
              <TextInput
                placeholder="Search materials, brands, or vendors"
                placeholderTextColor={tokens.color.ink[400]}
                style={{
                  flex: 1,
                  fontFamily: tokens.font.family.body,
                  fontSize: 14,
                  color: tokens.color.ink[900],
                  ...noOutline,
                }}
              />
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 6,
                  backgroundColor: tokens.color.ink[100],
                }}
              >
                <Text
                  style={{
                    fontFamily: tokens.font.family.mono,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[600],
                  }}
                >
                  ⌘K
                </Text>
              </View>
            </View>
          </View>

          {/* Hero promo */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Pressable onPress={() => router.push("/category/cement")}>
              <View
                style={{
                  borderRadius: 20,
                  padding: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  overflow: "hidden",
                  minHeight: 160,
                  backgroundColor: tokens.color.customer.primary,
                  ...(tokens.shadow.md as any),
                }}
              >
                {/* Subtle pattern */}
                <View
                  style={{
                    position: "absolute",
                    right: -30,
                    top: -30,
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    backgroundColor: "rgba(249,115,22,0.18)",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    right: 60,
                    bottom: -40,
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: "rgba(249,115,22,0.1)",
                  }}
                />

                <View style={{ flex: 1, gap: 8 }}>
                  <View
                    style={{
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 999,
                      backgroundColor: "rgba(255,255,255,0.12)",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 11,
                        fontWeight: "600",
                        color: "rgba(255,255,255,0.9)",
                        letterSpacing: 0.4,
                        textTransform: "uppercase",
                      }}
                    >
                      Featured · Cement
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: tokens.font.family.display,
                      fontWeight: "700",
                      fontSize: 24,
                      lineHeight: 30,
                      letterSpacing: -0.6,
                    }}
                  >
                    Build Faster.{"\n"}Build Better.
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: tokens.font.family.body,
                      fontSize: 13,
                      lineHeight: 18,
                    }}
                  >
                    All your materials, one click away.
                  </Text>
                  <View
                    style={{
                      marginTop: 8,
                      alignSelf: "flex-start",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 10,
                      backgroundColor: tokens.color.customer.accent,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: tokens.font.family.body,
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      Shop now
                    </Text>
                    <ArrowRight size={14} color="#fff" />
                  </View>
                </View>
              </View>
            </Pressable>
          </View>

          {/* Trust strip */}
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              flexDirection: "row",
              gap: 10,
            }}
          >
            {TRUST_FEATURES.map((f) => (
              <View
                key={f.title}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  borderRadius: 14,
                  backgroundColor: tokens.color.surface.white,
                  borderWidth: 1,
                  borderColor: tokens.color.border.hairline,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: tokens.color.customer.tint,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <f.Icon size={16} color={tokens.color.customer.primary} />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontSize: 12,
                      fontWeight: "700",
                      color: tokens.color.ink[900],
                      letterSpacing: -0.1,
                    }}
                  >
                    {f.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 10,
                      color: tokens.color.ink[500],
                    }}
                  >
                    {f.sub}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Categories */}
          <View style={{ marginTop: 28, paddingHorizontal: 20 }}>
            <SectionLabel
              label="Shop by category"
              action={{ label: "View all", onPress: () => router.push("/category/cement") }}
            />
            <View style={{ marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {categories.slice(0, 8).map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => router.push(`/category/${cat.slug}`)}
                  style={({ pressed }) => ({
                    width: "22.4%",
                    alignItems: "center",
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <View
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                      borderRadius: 16,
                      backgroundColor: tokens.color.surface.white,
                      borderWidth: 1,
                      borderColor: tokens.color.border.hairline,
                      overflow: "hidden",
                    }}
                  >
                    {cat.image_url ? (
                      <Image
                        source={{ uri: cat.image_url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text
                          style={{
                            fontFamily: tokens.font.family.display,
                            fontSize: 24,
                            fontWeight: "700",
                            color: tokens.color.customer.primary,
                          }}
                        >
                          {cat.name[0]}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontFamily: tokens.font.family.body,
                      fontWeight: "500",
                      color: tokens.color.ink[800],
                    }}
                  >
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Featured products */}
          <View style={{ marginTop: 28 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <SectionLabel
                label="Trending in your city"
                action={{ label: "Browse all", onPress: () => router.push("/category/cement") }}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14, gap: 12 }}
            >
              {products.slice(0, 6).map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => router.push(`/product/${p.slug}`)}
                  style={({ pressed }) => ({
                    width: 200,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Card padded={false} elevation="xs">
                    <View
                      style={{
                        height: 140,
                        backgroundColor: tokens.color.ink[50],
                        borderTopLeftRadius: tokens.radius.lg,
                        borderTopRightRadius: tokens.radius.lg,
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
                      <View style={{ position: "absolute", top: 8, left: 8 }}>
                        <StatusPill label="In stock" tone="success" size="xs" />
                      </View>
                    </View>
                    <View style={{ padding: 12, gap: 4 }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 11,
                          fontWeight: "600",
                          color: tokens.color.ink[500],
                          letterSpacing: 0.4,
                          textTransform: "uppercase",
                        }}
                      >
                        {p.brand ?? "C-Supply"}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontFamily: tokens.font.family.display,
                          fontSize: 14,
                          fontWeight: "600",
                          color: tokens.color.ink[900],
                          letterSpacing: -0.2,
                          lineHeight: 18,
                        }}
                      >
                        {p.name}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4, marginTop: 4 }}>
                        <Text
                          style={{
                            fontFamily: tokens.font.family.display,
                            fontSize: 16,
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
                    </View>
                  </Card>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Top brands */}
          <View style={{ marginTop: 28, paddingHorizontal: 20 }}>
            <SectionLabel label="Top brands" />
            <View style={{ marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {BRANDS.map((b) => (
                <Pressable
                  key={b.name}
                  style={({ pressed }) => ({
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 12,
                    backgroundColor: tokens.color.surface.white,
                    borderWidth: 1,
                    borderColor: tokens.color.border.hairline,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      backgroundColor: b.color,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: tokens.font.family.display,
                        fontWeight: "700",
                        fontSize: 11,
                      }}
                    >
                      {b.name[0]}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontSize: 13,
                      fontWeight: "600",
                      color: tokens.color.ink[900],
                      letterSpacing: -0.2,
                    }}
                  >
                    {b.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Marketing block */}
          <View style={{ marginTop: 28, paddingHorizontal: 20 }}>
            <Card padded={20}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <Avatar name="C-Supply" size={44} tone="primary" />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontWeight: "700",
                      fontSize: 15,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.2,
                    }}
                  >
                    Material Calculator
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.ink[500],
                    }}
                  >
                    Estimate cement, steel, and sand for your site
                  </Text>
                </View>
                <ArrowRight size={18} color={tokens.color.ink[400]} />
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
