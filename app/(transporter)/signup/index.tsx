import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, CSupplyLogo, CSupplyMark } from "@/components/ui";
import { Truck, Check, ArrowRight } from "@/components/ui/Icon";

const HIGHLIGHTS = [
  "Get matched to nearby pickup jobs",
  "Weekly payouts straight to your bank",
  "Call masking protects your number",
  "Live navigation built into the app",
];

export default function TransporterWelcome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <View style={{ alignItems: "center", marginTop: 32, gap: 16 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                backgroundColor: tokens.color.brand.green50,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(22,163,74,0.2)",
              }}
            >
              <Truck size={40} color={tokens.color.brand.green} />
            </View>
            <CSupplyLogo size="md" variant="green" />
          </View>

          <View style={{ alignItems: "center", marginTop: 8, gap: 8 }}>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: tokens.color.brand.green50,
                borderWidth: 1,
                borderColor: "rgba(22,163,74,0.2)",
              }}
            >
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 11,
                  fontWeight: "600",
                  color: tokens.color.brand.green600,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                Transporter Program
              </Text>
            </View>
            <Text
              style={{
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 28,
                color: tokens.color.ink[900],
                letterSpacing: -0.8,
                textAlign: "center",
                lineHeight: 34,
              }}
            >
              Deliver more.{"\n"}
              <Text style={{ color: tokens.color.brand.green }}>Earn more.</Text>
            </Text>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                color: tokens.color.ink[500],
                textAlign: "center",
                lineHeight: 20,
                maxWidth: 360,
              }}
            >
              Join the largest fleet of construction-material movers in India.
            </Text>
          </View>

          <Card padded={20}>
            <View style={{ gap: 12 }}>
              {HIGHLIGHTS.map((h) => (
                <View key={h} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: tokens.color.brand.green50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={12} color={tokens.color.brand.green} strokeWidth={3} />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: tokens.font.family.body,
                      fontSize: 13,
                      color: tokens.color.ink[700],
                    }}
                  >
                    {h}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          <View style={{ gap: 10, marginTop: 8 }}>
            <Button
              label="Join now"
              onPress={() => router.push("/(transporter)/signup/mobile")}
              surface="transporter"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
            <Button
              label="I already have an account"
              variant="secondary"
              onPress={() => router.push("/auth/login")}
              surface="transporter"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
