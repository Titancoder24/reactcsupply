import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, OtpInput } from "@/components/ui";
import { Lock, Shield } from "@/components/ui/Icon";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@demo.csupply.in");
  const [password, setPassword] = useState("Demo@2026");
  const [totp, setTotp] = useState("");
  const [stage, setStage] = useState<"login" | "totp">("login");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Admin Login" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <Card style={{ alignItems: "center", paddingVertical: 32 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: tokens.color.state.infoBg,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Shield size={32} color={tokens.color.customer.primary} />
            </View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 22,
                color: tokens.color.text.primary,
              }}
            >
              {stage === "login" ? "Sign in to Admin" : "Two-factor authentication"}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 14,
                color: tokens.color.text.secondary,
                marginBottom: 24,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {stage === "login"
                ? "Use your platform credentials"
                : "Enter the 6-digit code from your authenticator app"}
            </Text>

            {stage === "login" ? (
              <View style={{ width: "100%", gap: 12 }}>
                <Input label="Email" value={email} onChangeText={setEmail} placeholder="admin@demo.csupply.in" />
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />
                <View style={{ height: 8 }} />
                <Button label="Continue" onPress={() => setStage("totp")} />
              </View>
            ) : (
              <View style={{ width: "100%", gap: 12 }}>
                <OtpInput value={totp} onChange={setTotp} length={6} />
                <View style={{ height: 8 }} />
                <Button
                  label="Verify & Sign In"
                  onPress={() => {
                    if (email.includes("super")) {
                      router.replace("/(admin)/super-dashboard");
                    } else {
                      router.replace("/(admin)/dashboard");
                    }
                  }}
                  disabled={totp.length !== 6}
                />
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 12,
                    color: tokens.color.text.muted,
                    textAlign: "center",
                  }}
                >
                  Demo: any 6 digits will work
                </Text>
              </View>
            )}
          </Card>

          <Card>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 13,
                color: tokens.color.text.dark,
                marginBottom: 8,
              }}
            >
              Demo Admins
            </Text>
            <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.muted, marginBottom: 4 }}>
              admin@demo.csupply.in · Demo@2026 (Admin)
            </Text>
            <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.muted }}>
              superadmin@demo.csupply.in · Demo@2026 (Super Admin)
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
