import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, OtpInput, CSupplyMark } from "@/components/ui";
import { Shield, ArrowRight } from "@/components/ui/Icon";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@demo.csupply.in");
  const [password, setPassword] = useState("Demo@2026");
  const [totp, setTotp] = useState("");
  const [stage, setStage] = useState<"login" | "totp">("login");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Admin sign in" variant="ghost" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <View style={{ alignItems: "center", marginTop: 8, marginBottom: 8 }}>
            <CSupplyMark size={56} variant="mono" />
            <Text
              style={{
                marginTop: 18,
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 24,
                color: tokens.color.ink[900],
                letterSpacing: -0.5,
              }}
            >
              {stage === "login" ? "Admin console" : "Two-factor verification"}
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                color: tokens.color.ink[500],
                textAlign: "center",
                maxWidth: 320,
              }}
            >
              {stage === "login"
                ? "Use your platform credentials to continue."
                : "Enter the 6-digit code from your authenticator app."}
            </Text>
          </View>

          <Card padded={20}>
            {stage === "login" ? (
              <View style={{ gap: 12 }}>
                <Input label="Email" value={email} onChangeText={setEmail} placeholder="admin@example.com" />
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />
                <View style={{ height: 8 }} />
                <Button
                  label="Continue"
                  onPress={() => setStage("totp")}
                  iconRight={<ArrowRight size={18} color="#fff" />}
                />
              </View>
            ) : (
              <View style={{ gap: 12, alignItems: "center" }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: tokens.color.bgKpi.blue,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Shield size={28} color={tokens.color.customer.primary} />
                </View>
                <OtpInput value={totp} onChange={setTotp} length={6} cellSize={48} />
                <View style={{ height: 8 }} />
                <View style={{ width: "100%" }}>
                  <Button
                    label="Verify & sign in"
                    onPress={() => {
                      if (email.includes("super")) router.replace("/(admin)/super-dashboard");
                      else router.replace("/(admin)/dashboard");
                    }}
                    disabled={totp.length !== 6}
                    iconRight={<ArrowRight size={18} color="#fff" />}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 12,
                    color: tokens.color.ink[500],
                    textAlign: "center",
                  }}
                >
                  Demo: any 6 digits will work
                </Text>
              </View>
            )}
          </Card>

          <Card tone="subtle" elevation="none" padded={16}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: tokens.color.state.success,
                }}
              />
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontWeight: "600",
                  fontSize: 11,
                  color: tokens.color.ink[600],
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                Demo accounts
              </Text>
            </View>
            <View style={{ gap: 6 }}>
              {[
                { role: "Admin", email: "admin@demo.csupply.in" },
                { role: "Super Admin", email: "superadmin@demo.csupply.in" },
              ].map((d, idx) => (
                <Pressable
                  key={d.role}
                  onPress={() => setEmail(d.email)}
                  style={({ pressed }) => ({
                    paddingVertical: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.hairline,
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 13,
                      fontWeight: "500",
                      color: tokens.color.ink[800],
                    }}
                  >
                    {d.role}
                  </Text>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.mono,
                      fontSize: 12,
                      color: tokens.color.ink[600],
                    }}
                  >
                    {d.email}
                  </Text>
                </Pressable>
              ))}
              <Text
                style={{
                  marginTop: 4,
                  fontFamily: tokens.font.family.body,
                  fontSize: 11,
                  color: tokens.color.ink[500],
                }}
              >
                Password ·{" "}
                <Text style={{ fontFamily: tokens.font.family.mono, color: tokens.color.ink[800] }}>
                  Demo@2026
                </Text>
              </Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
