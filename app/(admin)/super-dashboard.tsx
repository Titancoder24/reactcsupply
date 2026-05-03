import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { Settings, Shield, Tag, Package, Building, ChevronRight, Bell, Headphones, Truck, User, Lock } from "@/components/ui/Icon";
import { noOutline } from "@/lib/web-style";

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [flagDemo, setFlagDemo] = useState(true);
  const [flagOnlinePay, setFlagOnlinePay] = useState(false);
  const [flagSignup, setFlagSignup] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [accentColor, setAccentColor] = useState("#F97316");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Super Admin Console" showBack={false} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 32 }}>
          <Card>
            <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.muted }}>
              Welcome back
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontFamily: "Poppins",
                fontWeight: "700",
                fontSize: 22,
                color: tokens.color.text.dark,
              }}
            >
              Demo Super Admin
            </Text>
            <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.muted, marginTop: 2 }}>
              superadmin@demo.csupply.in
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <StatusPill label="Super Admin" tone="info" />
              <StatusPill label="Hardware Key Linked" tone="success" />
            </View>
          </Card>

          {/* Theme editor */}
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 16,
              color: tokens.color.text.dark,
              marginTop: 8,
            }}
          >
            Theme Editor (Customer surface)
          </Text>
          <Card style={{ gap: 16 }}>
            <View>
              <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted, marginBottom: 6 }}>
                Primary Color
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: primaryColor,
                    borderWidth: 1,
                    borderColor: tokens.color.border.divider,
                  }}
                />
                <TextInput
                  value={primaryColor}
                  onChangeText={setPrimaryColor}
                  style={{
                    flex: 1,
                    height: 44,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: tokens.color.border.input,
                    fontFamily: "Poppins",
                    color: tokens.color.text.dark,
                    backgroundColor: "#fff",
                    ...noOutline,
                  }}
                />
              </View>
            </View>

            <View>
              <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted, marginBottom: 6 }}>
                Accent Color
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: accentColor,
                    borderWidth: 1,
                    borderColor: tokens.color.border.divider,
                  }}
                />
                <TextInput
                  value={accentColor}
                  onChangeText={setAccentColor}
                  style={{
                    flex: 1,
                    height: 44,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: tokens.color.border.input,
                    fontFamily: "Poppins",
                    color: tokens.color.text.dark,
                    backgroundColor: "#fff",
                    ...noOutline,
                  }}
                />
              </View>
            </View>

            {/* Live preview */}
            <View
              style={{
                marginTop: 8,
                padding: 16,
                borderRadius: 12,
                backgroundColor: primaryColor,
                gap: 12,
              }}
            >
              <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600", fontSize: 16 }}>
                Live Preview
              </Text>
              <Pressable
                style={{
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: accentColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600", fontSize: 14 }}>
                  Sample CTA
                </Text>
              </Pressable>
            </View>

            <Pressable
              style={{
                height: 44,
                borderRadius: 12,
                backgroundColor: tokens.color.brand.green,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600", fontSize: 14 }}>
                Save & Activate
              </Text>
            </Pressable>
          </Card>

          {/* Feature flags */}
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 16,
              color: tokens.color.text.dark,
              marginTop: 8,
            }}
          >
            Feature Flags
          </Text>
          <Card>
            {[
              { key: "demo_mode_enabled", label: "Demo Mode", value: flagDemo, set: setFlagDemo },
              { key: "online_payment_enabled", label: "Online Payment", value: flagOnlinePay, set: setFlagOnlinePay },
              { key: "signup_open", label: "Signups Open", value: flagSignup, set: setFlagSignup },
            ].map((f, idx) => (
              <View
                key={f.key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 12,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: tokens.color.border.divider,
                }}
              >
                <View>
                  <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.dark }}>
                    {f.label}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                    {f.key}
                  </Text>
                </View>
                <Switch
                  value={f.value}
                  onValueChange={f.set}
                  thumbColor="#fff"
                  trackColor={{ true: tokens.color.brand.green, false: "#D1D5DB" }}
                />
              </View>
            ))}
          </Card>

          {/* Crawler permissions */}
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 16,
              color: tokens.color.text.dark,
              marginTop: 8,
            }}
          >
            AI Crawler Permissions
          </Text>
          <Card padded={false}>
            {[
              { name: "GPTBot", allowed: true, paths: "/product/*, /category/*" },
              { name: "ClaudeBot", allowed: true, paths: "/product/*, /category/*" },
              { name: "PerplexityBot", allowed: true, paths: "/product/*, /category/*" },
              { name: "Google-Extended", allowed: true, paths: "/product/*" },
              { name: "Googlebot", allowed: true, paths: "all" },
            ].map((c, idx) => (
              <View
                key={c.name}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: tokens.color.border.divider,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.dark }}>
                    {c.name}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.muted }}>
                    {c.paths}
                  </Text>
                </View>
                <StatusPill label={c.allowed ? "Allowed" : "Blocked"} tone={c.allowed ? "success" : "danger"} />
              </View>
            ))}
          </Card>

          {/* Other admin surfaces */}
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 16,
              color: tokens.color.text.dark,
              marginTop: 8,
            }}
          >
            Configuration
          </Text>
          <Card padded={false}>
            {[
              { label: "Geography & Pincodes", Icon: Building },
              { label: "Pricing Rules", Icon: Tag },
              { label: "SEO Routes", Icon: Settings },
              { label: "Notification Templates", Icon: Bell },
              { label: "Admin Management", Icon: User },
              { label: "Audit Log", Icon: Shield },
              { label: "System Settings", Icon: Lock },
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
            onPress={() => router.replace("/")}
            style={{
              marginTop: 8,
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
