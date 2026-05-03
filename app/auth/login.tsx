import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, CSupplyMark } from "@/components/ui";
import { Phone, ArrowRight } from "@/components/ui/Icon";
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
    setTimeout(() => {
      setSubmitting(false);
      router.push({ pathname: "/auth/verify", params: { phone } });
    }, 400);
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Sign in" variant="ghost" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <View style={{ alignItems: "center", marginTop: 8, marginBottom: 8 }}>
            <CSupplyMark size={56} variant="blue-orange" />
            <Text
              style={{
                marginTop: 20,
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 26,
                color: tokens.color.ink[900],
                letterSpacing: -0.6,
              }}
            >
              Welcome back
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                color: tokens.color.ink[500],
                textAlign: "center",
              }}
            >
              Enter your mobile number to continue
            </Text>
          </View>

          <Card padded={20}>
            <Input
              label="Mobile number"
              value={phone}
              onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))}
              keyboardType="number-pad"
              placeholder="98765 43210"
              maxLength={10}
              error={error ?? undefined}
              prefix={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                      backgroundColor: tokens.color.ink[100],
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: tokens.font.family.mono,
                        fontWeight: "600",
                        color: tokens.color.ink[800],
                      }}
                    >
                      +91
                    </Text>
                  </View>
                </View>
              }
            />
            <View style={{ height: 14 }} />
            <Button
              label="Continue"
              onPress={onSendOtp}
              loading={submitting}
              disabled={phone.length !== 10}
              surface="customer"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
          </Card>

          {/* Demo accounts panel */}
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
                Demo accounts · OTP 123456
              </Text>
            </View>

            {[
              { role: "Customer", phone: "9000000001" },
              { role: "Vendor", phone: "9000000002" },
              { role: "Transporter", phone: "9000000003" },
            ].map((d, idx) => (
              <Pressable
                key={d.phone}
                onPress={() => setPhone(d.phone)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
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
                    fontSize: 13,
                    fontWeight: "500",
                    color: tokens.color.ink[600],
                  }}
                >
                  +91 {d.phone}
                </Text>
              </Pressable>
            ))}
          </Card>

          <Text
            style={{
              fontSize: 12,
              fontFamily: tokens.font.family.body,
              color: tokens.color.ink[500],
              textAlign: "center",
              paddingHorizontal: 16,
              lineHeight: 18,
            }}
          >
            By continuing, you agree to our Terms & Conditions and Privacy Policy
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
