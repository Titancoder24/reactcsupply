import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input } from "@/components/ui";
import { Phone } from "@/components/ui/Icon";
import { isValidIndianPhone } from "@/lib/utils";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSendOtp = async () => {
    setError(null);
    if (!isValidIndianPhone(phone)) {
      setError("Enter a valid 10-digit Indian mobile number");
      return;
    }
    setSubmitting(true);
    // In production this calls the send-otp Edge Function. For now, navigate to verify.
    setTimeout(() => {
      setSubmitting(false);
      router.push({ pathname: "/auth/verify", params: { phone } });
    }, 400);
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Login" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
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
              <Phone size={28} color={tokens.color.customer.primary} />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Poppins",
                fontWeight: "600",
                color: tokens.color.text.dark,
                marginBottom: 4,
              }}
            >
              Welcome to C-Supply
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: tokens.color.text.muted,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Enter your mobile number to continue
            </Text>

            <View style={{ width: "100%" }}>
              <Input
                label="Mobile Number"
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))}
                keyboardType="number-pad"
                placeholder="98765 43210"
                maxLength={10}
                error={error ?? undefined}
                prefix={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "500", color: tokens.color.text.dark }}>
                      +91
                    </Text>
                    <View style={{ width: 1, height: 20, backgroundColor: tokens.color.border.input, marginHorizontal: 12 }} />
                  </View>
                }
              />
            </View>

            <View style={{ height: 24 }} />
            <Button
              label="Send OTP"
              onPress={onSendOtp}
              loading={submitting}
              disabled={phone.length !== 10}
              surface="customer"
            />
          </Card>

          <Card>
            <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: "600", color: tokens.color.text.dark, marginBottom: 8 }}>
              Demo Accounts
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "Poppins", color: tokens.color.text.muted, marginBottom: 12 }}>
              Use these phone numbers with OTP 123456 (demo mode):
            </Text>
            {[
              { role: "Customer", phone: "9000000001" },
              { role: "Vendor", phone: "9000000002" },
              { role: "Transporter", phone: "9000000003" },
            ].map((d) => (
              <Pressable
                key={d.phone}
                onPress={() => setPhone(d.phone)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.dark }}>
                  {d.role}
                </Text>
                <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.customer.primary, fontWeight: "500" }}>
                  +91 {d.phone}
                </Text>
              </Pressable>
            ))}
          </Card>

          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins",
              color: tokens.color.text.muted,
              textAlign: "center",
              paddingHorizontal: 16,
            }}
          >
            By continuing, you agree to our Terms & Conditions and Privacy Policy
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
