import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import {
  Bell,
  Package,
  ShoppingCart,
  Plus,
  Tag,
  Clock,
  Check,
  Settings,
  ChevronRight,
  User,
  Headphones,
  Building,
} from "@/components/ui/Icon";

const KPI: { label: string; value: string; bg: string }[] = [
  { label: "Today Orders", value: "12", bg: tokens.color.bgKpi.green },
  { label: "Pending Orders", value: "08", bg: tokens.color.bgKpi.orange },
  { label: "Revenue (Today)", value: "₹24,650", bg: tokens.color.bgKpi.purple },
  { label: "Low Stock Items", value: "03", bg: tokens.color.bgKpi.red },
];

const QUICK_ACTIONS = [
  { label: "Add Product", Icon: Plus },
  { label: "Update Price", Icon: Tag },
  { label: "Update Stock", Icon: Package },
  { label: "Open / Close Slot", Icon: Clock },
  { label: "Accept Orders", Icon: Check },
  { label: "More", Icon: Settings },
];

const ADDITIONAL_LINKS = [
  { label: "My Profile", Icon: User },
  { label: "Bank Details", Icon: Building },
  { label: "Business Documents", Icon: Package },
  { label: "Support & Help", Icon: Headphones },
];

export default function VendorDashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header */}
          <View
            style={{
              padding: 20,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: tokens.color.border.divider,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: tokens.color.brand.green,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "700", fontSize: 18 }}>R</Text>
              </View>
              <View>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                  Welcome,
                </Text>
                <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
                  Ramesh Kumar
                </Text>
              </View>
            </View>
            <Bell size={24} color={tokens.color.text.primary} />
          </View>

          {/* KPI grid */}
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {KPI.map((k) => (
                <Card
                  key={k.label}
                  style={{
                    width: "47%",
                    backgroundColor: k.bg,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  elevated={false}
                >
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {k.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "700",
                      fontSize: 24,
                      color: tokens.color.text.primary,
                      marginTop: 4,
                    }}
                  >
                    {k.value}
                  </Text>
                </Card>
              ))}
            </View>

            {/* Quick actions */}
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
                color: tokens.color.text.primary,
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              Quick Actions
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {QUICK_ACTIONS.map((q) => (
                <Card
                  key={q.label}
                  style={{ width: "30%", alignItems: "center", paddingVertical: 16, gap: 8 }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: tokens.color.brand.green50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <q.Icon size={20} color={tokens.color.brand.green} />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: 11,
                      color: tokens.color.text.primary,
                      textAlign: "center",
                    }}
                  >
                    {q.label}
                  </Text>
                </Card>
              ))}
            </View>

            {/* Additional menu */}
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
                color: tokens.color.text.primary,
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              Additional
            </Text>
            <Card padded={false}>
              {ADDITIONAL_LINKS.map((it, idx) => (
                <Pressable
                  key={it.label}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    gap: 12,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.divider,
                  }}
                >
                  <it.Icon size={20} color={tokens.color.brand.green} />
                  <Text style={{ flex: 1, fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.primary }}>
                    {it.label}
                  </Text>
                  <ChevronRight size={18} color={tokens.color.text.muted} />
                </Pressable>
              ))}
            </Card>

            <Pressable
              onPress={() => router.replace("/")}
              style={{
                marginTop: 24,
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
