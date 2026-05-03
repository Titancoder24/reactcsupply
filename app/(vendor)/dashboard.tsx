import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Avatar, Card, KpiCard, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import {
  Bell,
  Package,
  Plus,
  Tag,
  Clock,
  Check,
  Settings,
  User,
  Headphones,
  Building,
  ShoppingCart,
  Truck,
} from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "Add product", Icon: Plus, tone: tokens.color.brand.green },
  { label: "Update price", Icon: Tag, tone: tokens.color.customer.primary },
  { label: "Update stock", Icon: Package, tone: "#9333EA" },
  { label: "Slot status", Icon: Clock, tone: "#0891B2" },
  { label: "Accept orders", Icon: Check, tone: tokens.color.state.success },
  { label: "More", Icon: Settings, tone: tokens.color.ink[600] },
];

const RECENT_ORDERS = [
  { id: "CS-44231", title: "OPC 53 · 50 bags", amount: 20500, status: "in_transit" as const, customer: "Coimbatore" },
  { id: "CS-44230", title: "Red Bricks · 1000 pcs", amount: 6500, status: "vendor_pending" as const, customer: "Hyderabad" },
  { id: "CS-44229", title: "M-Sand · 5 MT", amount: 7750, status: "delivered" as const, customer: "Hyderabad" },
];

const statusMap = (s: string) => {
  if (s === "delivered") return { label: "Delivered", tone: "success" as const };
  if (s === "in_transit") return { label: "On the way", tone: "info" as const };
  if (s === "vendor_pending") return { label: "Awaiting", tone: "warning" as const };
  return { label: s, tone: "neutral" as const };
};

export default function VendorDashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header */}
          <View
            style={{
              padding: 20,
              backgroundColor: tokens.color.surface.white,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: tokens.color.border.hairline,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Avatar name="Ramesh Kumar" size={42} tone="green" showStatus />
              <View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Welcome back
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 17,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                  }}
                >
                  Ramesh Kumar
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: tokens.color.ink[50],
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

          <View style={{ padding: 20, gap: 22 }}>
            {/* KPIs */}
            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <KpiCard
                  label="Today orders"
                  value="12"
                  delta={{ value: "+18%", trend: "up" }}
                  tone="green"
                  fullWidth
                />
                <KpiCard
                  label="Pending"
                  value="08"
                  delta={{ value: "+3", trend: "up" }}
                  tone="orange"
                  fullWidth
                />
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <KpiCard
                  label="Revenue today"
                  value={formatINR(24650)}
                  delta={{ value: "+12.4%", trend: "up" }}
                  tone="purple"
                  fullWidth
                />
                <KpiCard
                  label="Low stock"
                  value="03"
                  delta={{ value: "-1", trend: "down" }}
                  tone="red"
                  fullWidth
                />
              </View>
            </View>

            {/* Quick actions */}
            <View style={{ gap: 12 }}>
              <SectionLabel label="Quick actions" />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {QUICK_ACTIONS.map((q) => (
                  <Card
                    key={q.label}
                    padded={14}
                    style={{ width: "31.5%", alignItems: "center", gap: 8 }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: `${q.tone}15`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <q.Icon size={18} color={q.tone} />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontWeight: "500",
                        fontSize: 11,
                        color: tokens.color.ink[800],
                        letterSpacing: -0.1,
                      }}
                    >
                      {q.label}
                    </Text>
                  </Card>
                ))}
              </View>
            </View>

            {/* Recent orders */}
            <View style={{ gap: 12 }}>
              <SectionLabel
                label="Recent orders"
                action={{ label: "See all", onPress: () => {} }}
              />
              <Card padded={false}>
                {RECENT_ORDERS.map((o, idx) => {
                  const meta = statusMap(o.status);
                  return (
                    <View
                      key={o.id}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 14,
                        borderTopWidth: idx > 0 ? 1 : 0,
                        borderTopColor: tokens.color.border.hairline,
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text
                          style={{
                            fontFamily: tokens.font.family.mono,
                            fontWeight: "600",
                            fontSize: 12,
                            color: tokens.color.ink[600],
                          }}
                        >
                          {o.id}
                        </Text>
                        <StatusPill label={meta.label} tone={meta.tone} size="xs" />
                      </View>
                      <Text
                        style={{
                          marginTop: 4,
                          fontFamily: tokens.font.family.display,
                          fontWeight: "600",
                          fontSize: 14,
                          color: tokens.color.ink[900],
                          letterSpacing: -0.2,
                        }}
                      >
                        {o.title}
                      </Text>
                      <View
                        style={{
                          marginTop: 4,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: tokens.font.family.body,
                            fontSize: 12,
                            color: tokens.color.ink[500],
                          }}
                        >
                          {o.customer}
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
                          {formatINR(o.amount)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </Card>
            </View>

            {/* Menu */}
            <View style={{ gap: 12 }}>
              <SectionLabel label="Manage" />
              <Card padded={false}>
                {[
                  { icon: User, label: "Profile" },
                  { icon: Building, label: "Bank details", subtitle: "HDFC Bank · ****9012" },
                  { icon: Package, label: "Business documents", subtitle: "GST, ID proof, bank" },
                  { icon: ShoppingCart, label: "Catalog", subtitle: "8 products live" },
                  { icon: Truck, label: "Delivery settings", subtitle: "25 km radius · paid" },
                  { icon: Headphones, label: "Support" },
                ].map((it, idx) => (
                  <ListItem
                    key={it.label}
                    icon={<it.icon size={18} color={tokens.color.brand.green} />}
                    title={it.label}
                    subtitle={(it as any).subtitle}
                    divider={idx > 0}
                  />
                ))}
              </Card>
            </View>

            <Pressable
              onPress={() => router.replace("/")}
              style={({ pressed }) => ({
                alignItems: "center",
                paddingVertical: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: tokens.color.border.hairline,
                backgroundColor: pressed ? tokens.color.state.dangerBg : "transparent",
              })}
            >
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontWeight: "600",
                  fontSize: 14,
                  color: tokens.color.state.danger,
                }}
              >
                Log out
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
