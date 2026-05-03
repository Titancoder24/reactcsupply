import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { ChevronRight, Package, ShoppingCart, User, Truck, Bell, Headphones, Shield, Settings, Building } from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Admin Dashboard" showBack={false} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 32 }}>
          {/* KPIs */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {[
              { label: "GMV Today", value: formatINR(284560), bg: tokens.color.bgKpi.green },
              { label: "Orders Today", value: "47", bg: tokens.color.bgKpi.blue },
              { label: "Pending Approvals", value: "5", bg: tokens.color.bgKpi.orange },
              { label: "Open Tickets", value: "12", bg: tokens.color.bgKpi.red },
            ].map((k) => (
              <Card key={k.label} style={{ width: "47%", backgroundColor: k.bg, elevation: 0, shadowOpacity: 0 }} elevated={false}>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>{k.label}</Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    fontSize: 22,
                    color: tokens.color.text.primary,
                  }}
                >
                  {k.value}
                </Text>
              </Card>
            ))}
          </View>

          <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.dark, marginTop: 8 }}>
            Approvals Queue
          </Text>
          <Card padded={false}>
            {[
              { name: "Sri Balaji Building Materials", role: "Vendor", status: "submitted", since: "2h ago" },
              { name: "Karthik Logistics", role: "Transporter", status: "submitted", since: "3h ago" },
              { name: "Lakshmi Cement Suppliers", role: "Vendor", status: "under_review", since: "1d ago" },
            ].map((row, idx) => (
              <Pressable
                key={row.name}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: tokens.color.border.divider,
                }}
              >
                {row.role === "Vendor" ? (
                  <Building size={20} color={tokens.color.customer.primary} />
                ) : (
                  <Truck size={20} color={tokens.color.customer.primary} />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.dark }}>
                    {row.name}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                    {row.role} • {row.since}
                  </Text>
                </View>
                <StatusPill
                  label={row.status === "submitted" ? "New" : "Reviewing"}
                  tone={row.status === "submitted" ? "warning" : "info"}
                />
              </Pressable>
            ))}
          </Card>

          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 16,
              color: tokens.color.text.dark,
              marginTop: 8,
            }}
          >
            Operations
          </Text>
          <Card padded={false}>
            {[
              { label: "Customers", Icon: User },
              { label: "Vendors", Icon: Building },
              { label: "Transporters", Icon: Truck },
              { label: "Orders", Icon: ShoppingCart },
              { label: "Tickets", Icon: Headphones },
              { label: "Reports", Icon: Package },
            ].map((it, idx) => (
              <Pressable
                key={it.label}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: tokens.color.border.divider,
                }}
              >
                <it.Icon size={20} color={tokens.color.customer.primary} />
                <Text style={{ flex: 1, fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.dark }}>
                  {it.label}
                </Text>
                <ChevronRight size={18} color={tokens.color.text.muted} />
              </Pressable>
            ))}
          </Card>

          <Pressable
            onPress={() => router.replace("/(admin)/super-dashboard")}
            style={{
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 12,
              backgroundColor: tokens.color.text.primary,
            }}
          >
            <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: "#fff" }}>
              Open Super Admin Console
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/")}
            style={{
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 12,
              borderWidth: 1.5,
              borderColor: tokens.color.state.danger,
            }}
          >
            <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.state.danger }}>
              Logout
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
