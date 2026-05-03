import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { Check, Clock, ArrowRight } from "@/components/ui/Icon";

export default function VendorSuccess() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 22 }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 32,
              backgroundColor: tokens.color.brand.green50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgba(22,163,74,0.2)",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                backgroundColor: tokens.color.brand.green,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={32} color="#fff" strokeWidth={3} />
            </View>
          </View>

          <View style={{ alignItems: "center", gap: 8 }}>
            <Text
              style={{
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 24,
                color: tokens.color.ink[900],
                letterSpacing: -0.5,
              }}
            >
              Application submitted
            </Text>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                color: tokens.color.ink[500],
                textAlign: "center",
                maxWidth: 320,
                lineHeight: 20,
              }}
            >
              Our team will verify your details within 24 hours. We'll notify you on{" "}
              <Text style={{ fontFamily: tokens.font.family.mono, color: tokens.color.ink[800] }}>
                +91 9876543210
              </Text>
              .
            </Text>
          </View>

          <Card padded={16} style={{ width: "100%", borderColor: "rgba(22,163,74,0.2)", backgroundColor: tokens.color.brand.green50 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock size={14} color={tokens.color.brand.green600} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 14,
                    color: tokens.color.brand.green700,
                    letterSpacing: -0.2,
                  }}
                >
                  Verification in progress
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    fontFamily: tokens.font.family.body,
                    fontSize: 12,
                    color: tokens.color.brand.green600,
                  }}
                >
                  KYC checks · GST verification · Bank account validation
                </Text>
              </View>
            </View>
          </Card>

          <View style={{ width: "100%" }}>
            <Button
              label="Go to dashboard"
              onPress={() => router.replace("/(vendor)/dashboard")}
              surface="vendor"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
