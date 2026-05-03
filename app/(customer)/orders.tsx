import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill, FilterPill, EmptyState } from "@/components/ui";
import { Package } from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

const DEMO_ORDERS = [
  {
    id: "CS-12345689",
    status: "delivered" as const,
    items: 3,
    total: 12154,
    date: "May 1",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80",
    title: "Cement S3 Grade + 2 more",
  },
  {
    id: "CS-12345690",
    status: "in_transit" as const,
    items: 2,
    total: 8200,
    date: "May 2",
    image: "https://images.unsplash.com/photo-1565711561500-49678a10a63f?auto=format&fit=crop&w=200&q=80",
    title: "TMT Steel Bar 12mm + 1 more",
  },
  {
    id: "CS-12345691",
    status: "placed" as const,
    items: 1,
    total: 6500,
    date: "May 3",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=200&q=80",
    title: "Red Bricks (First Class)",
  },
];

const statusToTone = (s: string) => {
  if (s === "delivered") return { tone: "success" as const, label: "Delivered" };
  if (s === "in_transit") return { tone: "info" as const, label: "On the way" };
  return { tone: "warning" as const, label: "Pending" };
};

const FILTERS = ["All", "Active", "Delivered", "Cancelled"];

export default function OrdersScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header title="Orders" subtitle={`${DEMO_ORDERS.length} total`} showBack={false} />

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}
        >
          {FILTERS.map((f) => (
            <FilterPill key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
        </ScrollView>

        {DEMO_ORDERS.length === 0 ? (
          <EmptyState
            icon={<Package size={32} color={tokens.color.ink[400]} />}
            title="No orders yet"
            description="Place your first order from the catalog and track it live here."
          />
        ) : (
          <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 10 }}>
            {DEMO_ORDERS.map((o) => {
              const meta = statusToTone(o.status);
              return (
                <Pressable key={o.id} onPress={() => router.push("/(customer)/orders")}>
                  <Card padded={14}>
                    <View style={{ flexDirection: "row", gap: 14 }}>
                      <View
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 12,
                          backgroundColor: tokens.color.ink[50],
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={{ uri: o.image }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={{ flex: 1, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                          <Text
                            style={{
                              fontFamily: tokens.font.family.mono,
                              fontWeight: "600",
                              fontSize: 12,
                              color: tokens.color.ink[600],
                              letterSpacing: 0.2,
                            }}
                          >
                            {o.id}
                          </Text>
                          <StatusPill label={meta.label} tone={meta.tone} size="xs" />
                        </View>
                        <Text
                          numberOfLines={1}
                          style={{
                            marginTop: 4,
                            fontFamily: tokens.font.family.display,
                            fontSize: 14,
                            fontWeight: "600",
                            color: tokens.color.ink[900],
                            letterSpacing: -0.2,
                          }}
                        >
                          {o.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: tokens.font.family.body,
                              fontSize: 12,
                              color: tokens.color.ink[500],
                            }}
                          >
                            {o.items} {o.items === 1 ? "item" : "items"} · {o.date}
                          </Text>
                          <Text
                            style={{
                              fontFamily: tokens.font.family.display,
                              fontWeight: "700",
                              fontSize: 14,
                              color: tokens.color.ink[900],
                              letterSpacing: -0.3,
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
        )}
      </SafeAreaView>
    </View>
  );
}
