import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, OtpInput } from "@/components/ui";
import { ArrowRight } from "@/components/ui/Icon";

export default function VerifyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone?: string }>();
  const phone = params.phone ?? "";
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const onVerify = () => {
    setError(null);
    if (code.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    const demoMap: Record<string, string> = {
      "9000000001": "/(customer)/home",
      "9000000002": "/(vendor)/dashboard",
      "9000000003": "/(transporter)/dashboard",
    };
    const route = demoMap[phone];
    if (route && code === "123456") {
      router.replace(route as any);
      return;
    }
    if (code === "123456") {
      router.replace("/(customer)/home");
      return;
    }
    setError("Invalid OTP. Use 123456 in demo mode.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Verify" variant="ghost" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Text
              style={{
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 26,
                color: tokens.color.ink[900],
                letterSpacing: -0.6,
              }}
            >
              Enter the code
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
              We sent a 6-digit code to{" "}
              <Text style={{ fontFamily: tokens.font.family.mono, color: tokens.color.ink[800] }}>
                +91 {phone}
              </Text>
            </Text>
          </View>

          <Card padded={20}>
            <View style={{ alignItems: "center" }}>
              <OtpInput value={code} onChange={setCode} length={6} cellSize={48} />

              {error && (
                <Text
                  style={{
                    marginTop: 14,
                    color: tokens.color.state.danger,
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                  }}
                >
                  {error}
                </Text>
              )}

              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 12,
                    color: tokens.color.ink[500],
                  }}
                >
                  Didn't get it?
                </Text>
                {seconds > 0 ? (
                  <Text
                    style={{
                      fontFamily: tokens.font.family.mono,
                      fontSize: 12,
                      color: tokens.color.ink[700],
                      fontWeight: "600",
                    }}
                  >
                    Resend in {String(seconds).padStart(2, "0")}s
                  </Text>
                ) : (
                  <Pressable onPress={() => setSeconds(60)}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 12,
                        color: tokens.color.customer.primary,
                        fontWeight: "600",
                      }}
                    >
                      Resend now
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>

            <View style={{ height: 16 }} />
            <Button
              label="Verify & continue"
              onPress={onVerify}
              disabled={code.length !== 6}
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
          </Card>

          <Text
            style={{
              fontSize: 12,
              fontFamily: tokens.font.family.body,
              color: tokens.color.ink[500],
              textAlign: "center",
            }}
          >
            Demo mode: use OTP{" "}
            <Text
              style={{ fontFamily: tokens.font.family.mono, fontWeight: "600", color: tokens.color.ink[800] }}
            >
              123456
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
