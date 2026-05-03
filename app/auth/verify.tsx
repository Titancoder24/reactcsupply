import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, OtpInput } from "@/components/ui";

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

    // Demo phone numbers + 123456 OTP route to their dashboards.
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

    // Default: customer dashboard
    if (code === "123456") {
      router.replace("/(customer)/home");
      return;
    }

    setError("Invalid OTP. Try 123456 in demo mode.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Verify OTP" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
          <Card style={{ alignItems: "center", paddingVertical: 32 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Poppins",
                fontWeight: "600",
                color: tokens.color.text.dark,
                marginBottom: 4,
              }}
            >
              Enter the OTP
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
              We've sent a 6-digit code to{"\n"}+91 {phone}
            </Text>

            <OtpInput value={code} onChange={setCode} length={6} />

            {error && (
              <Text
                style={{
                  marginTop: 12,
                  color: tokens.color.state.danger,
                  fontFamily: "Poppins",
                  fontSize: 13,
                }}
              >
                {error}
              </Text>
            )}

            <Text
              style={{
                marginTop: 16,
                fontFamily: "Poppins",
                fontSize: 12,
                color: tokens.color.text.muted,
              }}
            >
              {seconds > 0 ? `Resend in ${seconds}s` : "Resend OTP"}
            </Text>

            <View style={{ height: 24 }} />
            <Button label="Verify & Continue" onPress={onVerify} disabled={code.length !== 6} />
          </Card>

          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins",
              color: tokens.color.text.muted,
              textAlign: "center",
            }}
          >
            Demo mode: use OTP 123456
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
