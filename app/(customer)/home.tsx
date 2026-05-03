import React from "react";
import { View, Text, ScrollView, Pressable, Image, TextInput, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Button } from "@/components/ui";
import {
  Bell,
  MapPin,
  Search,
  ChevronDown,
  Shield,
  Truck,
  Rupee,
} from "@/components/ui/Icon";
import { useCategories } from "@/hooks/use-catalog";
import { CSupplyMark } from "@/components/ui/Logo";
import { noOutline } from "@/lib/web-style";

const TopBrands = () => {
  const brands = [
    { name: "UltraTech", color: "#DC2626", subtext: "Cement" },
    { name: "JSW", color: "#1E40AF", subtext: "Steel" },
    { name: "ACC", color: "#15803D", subtext: "Cement" },
    { name: "Ambuja", color: "#0891B2", subtext: "Cement" },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
    >
      {brands.map((b) => (
        <View
          key={b.name}
          style={{
            width: 110,
            height: 64,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: tokens.color.border.divider,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: 16,
              color: b.color,
              letterSpacing: -0.4,
            }}
          >
            {b.name}
          </Text>
          <Text style={{ fontFamily: "Poppins", fontSize: 10, color: tokens.color.text.muted }}>
            {b.subtext}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const FeatureCard: React.FC<{
  icon: React.ComponentType<any>;
  title: string;
}> = ({ icon: Icon, title }) => (
  <Card
    elevated
    padded
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      gap: 8,
      minHeight: 96,
    }}
  >
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: tokens.color.state.infoBg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon size={20} color={tokens.color.customer.primary} />
    </View>
    <Text
      style={{
        fontSize: 11,
        fontFamily: "Poppins",
        fontWeight: "600",
        color: tokens.color.text.dark,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  </Card>
);

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { data: categories = [] } = useCategories();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Top header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MapPin size={22} color={tokens.color.customer.primary} />
                <View>
                  <Text style={{ fontSize: 12, fontFamily: "Poppins", color: tokens.color.text.muted }}>
                    Deliver to
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        color: tokens.color.text.dark,
                      }}
                    >
                      Ahmedabad, Gujarat
                    </Text>
                    <ChevronDown size={14} color={tokens.color.text.dark} />
                  </View>
                </View>
              </Pressable>
              <Pressable style={{ position: "relative" }}>
                <Bell size={24} color={tokens.color.text.dark} />
                <View
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: tokens.color.state.danger,
                    paddingHorizontal: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                >
                  <Text style={{ fontSize: 10, color: "#fff", fontWeight: "700", fontFamily: "Poppins" }}>
                    3
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* Search */}
            <View
              style={{
                marginTop: 16,
                height: 48,
                borderRadius: 12,
                backgroundColor: tokens.color.surface.light,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                gap: 8,
              }}
            >
              <Search size={18} color={tokens.color.text.muted} />
              <TextInput
                placeholder="Search materials, brands..."
                placeholderTextColor={tokens.color.text.muted}
                style={{
                  flex: 1,
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: tokens.color.text.dark,
                  ...noOutline,
                }}
              />
            </View>
          </View>

          {/* Hero promo card */}
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <View
              style={{
                backgroundColor: tokens.color.customer.primary,
                borderRadius: 16,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
                minHeight: 140,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  All Your Construction
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Materials
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 18,
                    lineHeight: 24,
                    marginBottom: 12,
                  }}
                >
                  One Click Away!
                </Text>
                <Pressable
                  onPress={() => router.push("/category/cement")}
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? tokens.color.customer.accent700 : tokens.color.customer.accent,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignSelf: "flex-start",
                  })}
                >
                  <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600", fontSize: 14 }}>
                    Order Now
                  </Text>
                </Pressable>
              </View>
              <View style={{ width: 110, alignItems: "center", justifyContent: "center" }}>
                {/* Stylized materials cluster */}
                <View style={{ position: "relative", width: 110, height: 100 }}>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 8,
                      width: 50,
                      height: 50,
                      backgroundColor: "#FBBF24",
                      borderRadius: 4,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 0,
                      width: 60,
                      height: 70,
                      backgroundColor: "#fff",
                      borderRadius: 4,
                    }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      top: 30,
                      right: 8,
                      fontSize: 10,
                      fontFamily: "Poppins",
                      fontWeight: "700",
                      color: "#1E40AF",
                    }}
                  >
                    CEMENT
                  </Text>
                  {/* Brick stack */}
                  <View style={{ position: "absolute", top: 0, left: 0 }}>
                    {[0, 1].map((row) =>
                      [0, 1].map((col) => (
                        <View
                          key={`${row}-${col}`}
                          style={{
                            position: "absolute",
                            top: row * 8,
                            left: col * 14 + (row === 1 ? 4 : 0),
                            width: 12,
                            height: 7,
                            backgroundColor: "#DC2626",
                            borderRadius: 1,
                          }}
                        />
                      )),
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Categories */}
          <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.text.dark }}>
                Shop by Category
              </Text>
              <Pressable>
                <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.customer.accent }}>
                  View All
                </Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
              {categories.slice(0, 8).map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => router.push(`/category/${cat.slug}`)}
                  style={{
                    width: "22%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 16,
                      backgroundColor: tokens.color.surface.light,
                      borderWidth: 1,
                      borderColor: tokens.color.border.divider,
                      alignItems: "center",
                      justifyContent: "center",
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
                      <Text style={{ fontFamily: "Poppins", fontSize: 22, fontWeight: "700", color: tokens.color.customer.primary }}>
                        {cat.name[0]}
                      </Text>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      color: tokens.color.text.dark,
                    }}
                  >
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Top Brands */}
          <View style={{ marginTop: 24 }}>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.text.dark }}>
                Top Brands
              </Text>
              <Pressable>
                <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.customer.accent }}>
                  View All
                </Text>
              </Pressable>
            </View>
            <TopBrands />
          </View>

          {/* Why Choose */}
          <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.text.dark, marginBottom: 16 }}>
              Why Choose C-Supply?
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <FeatureCard icon={Shield} title={"Best Quality\nProducts"} />
              <FeatureCard icon={Truck} title={"On Time\nDelivery"} />
              <FeatureCard icon={Rupee} title={"Competitive\nPrices"} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
