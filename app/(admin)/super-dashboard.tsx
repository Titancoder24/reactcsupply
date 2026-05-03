import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, ListItem, SectionLabel, StatusPill, Avatar, Button } from "@/components/ui";
import {
  Settings,
  Shield,
  Tag,
  Package,
  Building,
  Bell,
  User,
  Lock,
  Check,
  ArrowRight,
} from "@/components/ui/Icon";
import { noOutline } from "@/lib/web-style";

const COLOR_PRESETS = [
  { name: "Default", primary: "#0F4C81", accent: "#F97316" },
  { name: "Slate", primary: "#0F172A", accent: "#3B82F6" },
  { name: "Emerald", primary: "#064E3B", accent: "#10B981" },
  { name: "Rose", primary: "#1F2937", accent: "#EC4899" },
];

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [flagDemo, setFlagDemo] = useState(true);
  const [flagOnlinePay, setFlagOnlinePay] = useState(false);
  const [flagSignup, setFlagSignup] = useState(true);
  const [flagAi, setFlagAi] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [accentColor, setAccentColor] = useState("#F97316");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Super Admin" subtitle="Platform configuration" showBack={false} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 22, paddingBottom: 32 }}>
          {/* Operator card */}
          <Card padded={20}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <Avatar name="Demo Super Admin" size={48} tone="primary" showStatus />
              <View style={{ flex: 1 }}>
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
                  Signed in as
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
                  Demo Super Admin
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.mono,
                    fontSize: 12,
                    color: tokens.color.ink[500],
                  }}
                >
                  superadmin@demo.csupply.in
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                <StatusPill label="2FA on" tone="success" size="xs" />
                <StatusPill label="HW key" tone="info" size="xs" />
              </View>
            </View>
          </Card>

          {/* Compliance shortcut */}
          <Pressable
            onPress={() => router.push("/(admin)/compliance")}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            <Card
              padded={18}
              style={{
                borderColor: "rgba(22,163,74,0.2)",
                backgroundColor: tokens.color.brand.green50,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Shield size={22} color={tokens.color.brand.green} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 11,
                      fontWeight: "600",
                      color: tokens.color.brand.green600,
                      letterSpacing: 0.6,
                      textTransform: "uppercase",
                    }}
                  >
                    Compliance
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.display,
                      fontWeight: "700",
                      fontSize: 16,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.3,
                    }}
                  >
                    Open Compliance Console
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.ink[600],
                    }}
                  >
                    Legal docs · DSR · Grievances · Privacy manifest · App + Play submission
                  </Text>
                </View>
                <ArrowRight size={18} color={tokens.color.ink[600]} />
              </View>
            </Card>
          </Pressable>

          {/* Theme editor */}
          <View style={{ gap: 12 }}>
            <SectionLabel
              label="Theme · Customer surface"
              action={{ label: "View history", onPress: () => {} }}
            />
            <Card padded={20}>
              {/* Presets */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                {COLOR_PRESETS.map((p) => {
                  const sel = primaryColor === p.primary;
                  return (
                    <Pressable
                      key={p.name}
                      onPress={() => {
                        setPrimaryColor(p.primary);
                        setAccentColor(p.accent);
                      }}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: sel ? tokens.color.ink[900] : tokens.color.border.hairline,
                        backgroundColor: sel ? tokens.color.ink[50] : "transparent",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 4,
                          backgroundColor: p.primary,
                        }}
                      />
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 4,
                          backgroundColor: p.accent,
                          marginLeft: -10,
                          borderWidth: 2,
                          borderColor: "#fff",
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 12,
                          fontWeight: "600",
                          color: tokens.color.ink[800],
                          marginLeft: 4,
                        }}
                      >
                        {p.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Color tokens */}
              {[
                { label: "Primary", value: primaryColor, set: setPrimaryColor },
                { label: "Accent", value: accentColor, set: setAccentColor },
              ].map((c) => (
                <View key={c.label} style={{ marginBottom: 14 }}>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 11,
                      fontWeight: "600",
                      color: tokens.color.ink[500],
                      marginBottom: 6,
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    {c.label}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        backgroundColor: c.value,
                        borderWidth: 1,
                        borderColor: tokens.color.border.hairline,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        height: 44,
                        paddingHorizontal: 12,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: tokens.color.border.input,
                        backgroundColor: "#fff",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        value={c.value}
                        onChangeText={c.set}
                        style={{
                          flex: 1,
                          fontFamily: tokens.font.family.mono,
                          fontSize: 13,
                          fontWeight: "600",
                          color: tokens.color.ink[900],
                          ...noOutline,
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}

              {/* Live preview */}
              <View
                style={{
                  marginTop: 4,
                  borderRadius: 14,
                  overflow: "hidden",
                  backgroundColor: primaryColor,
                  padding: 18,
                  gap: 12,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  Live preview
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    letterSpacing: -0.3,
                  }}
                >
                  Construction materials, delivered.
                </Text>
                <View
                  style={{
                    alignSelf: "flex-start",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 12,
                    backgroundColor: accentColor,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
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
                    Get started
                  </Text>
                  <ArrowRight size={14} color="#fff" />
                </View>
              </View>

              <View style={{ height: 14 }} />
              <Button
                label="Save & activate"
                onPress={() => {}}
                surface="vendor"
                iconLeft={<Check size={16} color="#fff" />}
              />
            </Card>
          </View>

          {/* Feature flags */}
          <View style={{ gap: 12 }}>
            <SectionLabel label="Feature flags" />
            <Card padded={false}>
              {[
                { key: "demo_mode_enabled", label: "Demo mode", value: flagDemo, set: setFlagDemo, sub: "Allow demo phones to bypass OTP" },
                { key: "online_payment_enabled", label: "Online payment", value: flagOnlinePay, set: setFlagOnlinePay, sub: "Razorpay checkout for customers" },
                { key: "signup_open", label: "Signups open", value: flagSignup, set: setFlagSignup, sub: "Allow new vendor and transporter signup" },
                { key: "ai_insights_enabled", label: "AI insights", value: flagAi, set: setFlagAi, sub: "Demand forecasts and trending products" },
              ].map((f, idx) => (
                <View
                  key={f.key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.hairline,
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontWeight: "500",
                        fontSize: 14,
                        color: tokens.color.ink[900],
                      }}
                    >
                      {f.label}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.body,
                        fontSize: 12,
                        color: tokens.color.ink[500],
                      }}
                    >
                      {f.sub}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.mono,
                        fontSize: 10,
                        color: tokens.color.ink[400],
                      }}
                    >
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
          </View>

          {/* Crawler permissions */}
          <View style={{ gap: 12 }}>
            <SectionLabel label="AI crawler permissions" />
            <Card padded={false}>
              {[
                { name: "GPTBot", allowed: true, paths: "/product/*, /category/*", vendor: "OpenAI" },
                { name: "ClaudeBot", allowed: true, paths: "/product/*, /category/*", vendor: "Anthropic" },
                { name: "PerplexityBot", allowed: true, paths: "/product/*, /category/*", vendor: "Perplexity" },
                { name: "Google-Extended", allowed: true, paths: "/product/*", vendor: "Google" },
                { name: "Googlebot", allowed: true, paths: "all routes", vendor: "Google" },
              ].map((c, idx) => (
                <View
                  key={c.name}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.hairline,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text
                        style={{
                          fontFamily: tokens.font.family.display,
                          fontWeight: "600",
                          fontSize: 14,
                          color: tokens.color.ink[900],
                          letterSpacing: -0.2,
                        }}
                      >
                        {c.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 11,
                          color: tokens.color.ink[500],
                        }}
                      >
                        {c.vendor}
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.mono,
                        fontSize: 11,
                        color: tokens.color.ink[600],
                      }}
                    >
                      {c.paths}
                    </Text>
                  </View>
                  <StatusPill label={c.allowed ? "Allowed" : "Blocked"} tone={c.allowed ? "success" : "danger"} size="xs" />
                </View>
              ))}
            </Card>
          </View>

          {/* Configuration */}
          <View style={{ gap: 12 }}>
            <SectionLabel label="Configuration" />
            <Card padded={false}>
              {[
                { icon: Building, label: "Geography & pincodes", subtitle: "6 cities · 240+ pincodes" },
                { icon: Tag, label: "Pricing rules", subtitle: "Commission 8% · GST 18%" },
                { icon: Settings, label: "SEO routes", subtitle: "Per-route metadata + canonicals" },
                { icon: Bell, label: "Notification templates", subtitle: "SMS, email, WhatsApp, push" },
                { icon: User, label: "Admin management", subtitle: "Invite, revoke, audit" },
                { icon: Shield, label: "Audit log", subtitle: "Immutable event history" },
                { icon: Lock, label: "System & danger zone", subtitle: "Maintenance, key rotation" },
              ].map((it, idx) => (
                <ListItem
                  key={it.label}
                  icon={<it.icon size={18} color={tokens.color.ink[800]} />}
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
