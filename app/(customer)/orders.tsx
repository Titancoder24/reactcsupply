import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { ChevronRight, Package } from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

const DEMO_ORDERS = [
  {
    id: "CS123456789",
    status: "delivered" as const,
    items: 3,
    total: 12154,
    date: "May 1, 2026",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80",
    title: "Cement S3 Grade + 2 more",
  },
  {
    id: "CS123456790",
    status: "in_transit" as const,
    items: 2,
    total: 8200,
    date: "May 2, 2026",
    image: "https://images.unsplash.com/photo-1565711561500-49678a10a63f?auto=format&fit=crop&w=200&q=80",
    title: "TMT Steel Bar 12mm + 1 more",
  },
  {
    id: "CS123456791",
    status: "placed" as const,
    items: 1,
    total: 6500,
    date: "May 3, 2026",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=200&q=80",
    title: "Red Bricks (First Class)",
  },
];

const statusToTone = (s: string) => {
  if (s === "delivered") return { tone: "success" as const, label: "Delivered" };
  if (s === "in_transit") return { tone: "info" as const, label: "On the Way" };
  return { tone: "warning" as const, label: "Pending" };
};

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header title="My Orders" showBack={false} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
          {DEMO_ORDERS.map((o) => {
            const meta = statusToTone(o.status);
            return (
              <Pressable
                key={o.id}
                onPress={() => router.push({ pathname: "/(customer)/orders", params: { id: o.id } })}
              >
                <Card>
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 8,
                        backgroundColor: tokens.color.surface.light,
                        overflow: "hidden",
                      }}
                    >
                      <Image source={{ uri: o.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            fontSize: 14,
                            color: tokens.color.text.dark,
                          }}
                        >
                          #{o.id}
                        </Text>
                        <StatusPill label={meta.label} tone={meta.tone} />
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{
                          marginTop: 4,
                          fontFamily: "Poppins",
                          fontSize: 13,
                          color: tokens.color.text.muted,
                        }}
                      >
                        {o.title} • {o.items} {o.items === 1 ? "item" : "items"}
                      </Text>
                      <View
                        style={{
                          marginTop: 8,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                          {o.date}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "700",
                            fontSize: 14,
                            color: tokens.color.text.dark,
                          }}
                        >
                          {formatINR(o.total)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
