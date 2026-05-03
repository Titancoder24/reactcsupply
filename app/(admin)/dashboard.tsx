import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, KpiCard, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import {
  Package,
  ShoppingCart,
  User,
  Truck,
  Headphones,
  Building,
  Settings,
  Shield,
  ArrowRight,
} from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header
          title="Admin"
          subtitle="Operations overview"
          showBack={false}
          rightActions={
            <Pressable
              onPress={() => router.replace("/(admin)/super-dashboard")}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: tokens.color.ink[900],
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Shield size={12} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontFamily: tokens.font.family.body,
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 0.2,
                }}
              >
                Super Admin
              </Text>
            </Pressable>
          }
        />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 22, paddingBottom: 32 }}>
          {/* KPIs */}
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="GMV today"
                value={formatINR(284560)}
                delta={{ value: "+18.2%", trend: "up" }}
                tone="green"
                fullWidth
              />
              <KpiCard
                label="Orders"
                value="47"
                delta={{ value: "+12", trend: "up" }}
                tone="blue"
                fullWidth
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="Pending KYC"
                value="05"
                delta={{ value: "+2", trend: "up" }}
                tone="orange"
                fullWidth
              />
              <KpiCard
                label="Open tickets"
                value="12"
                delta={{ value: "-3", trend: "down" }}
                tone="red"
                fullWidth
              />
            </View>
          </View>

          {/* Approvals queue */}
          <View style={{ gap: 12 }}>
            <SectionLabel
              label="Approvals queue"
              action={{ label: "View all", onPress: () => {} }}
            />
            <Card padded={false}>
              {[
                {
                  name: "Sri Balaji Building Materials",
                  role: "Vendor",
                  status: "submitted",
                  since: "2h ago",
                  Icon: Building,
                },
                {
                  name: "Karthik Logistics",
                  role: "Transporter",
                  status: "submitted",
                  since: "3h ago",
                  Icon: Truck,
                },
                {
                  name: "Lakshmi Cement Suppliers",
                  role: "Vendor",
                  status: "under_review",
                  since: "1d ago",
                  Icon: Building,
                },
              ].map((row, idx) => (
                <Pressable
                  key={row.name}
                  style={({ pressed }) => ({
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.hairline,
                    backgroundColor: pressed ? tokens.color.ink[50] : "transparent",
                  })}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: tokens.color.ink[50],
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <row.Icon size={16} color={tokens.color.customer.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.display,
                        fontWeight: "600",
                        fontSize: 14,
                        color: tokens.color.ink[900],
                        letterSpacing: -0.2,
                      }}
                    >
                      {row.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.body,
                        fontSize: 12,
                        color: tokens.color.ink[500],
                      }}
                    >
                      {row.role} · {row.since}
                    </Text>
                  </View>
                  <StatusPill
                    label={row.status === "submitted" ? "New" : "Reviewing"}
                    tone={row.status === "submitted" ? "warning" : "info"}
                    size="xs"
                  />
                  <ArrowRight size={14} color={tokens.color.ink[400]} />
                </Pressable>
              ))}
            </Card>
          </View>

          {/* Operations menu */}
          <View style={{ gap: 12 }}>
            <SectionLabel label="Operations" />
            <Card padded={false}>
              {[
                { icon: User, label: "Customers", subtitle: "1,248 active" },
                { icon: Building, label: "Vendors", subtitle: "412 verified" },
                { icon: Truck, label: "Transporters", subtitle: "316 verified" },
                { icon: ShoppingCart, label: "Orders", subtitle: "47 today" },
                { icon: Headphones, label: "Support tickets", subtitle: "12 open" },
                { icon: Package, label: "Reports & exports" },
                { icon: Settings, label: "Notifications" },
              ].map((it, idx) => (
                <ListItem
                  key={it.label}
                  icon={<it.icon size={18} color={tokens.color.customer.primary} />}
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
