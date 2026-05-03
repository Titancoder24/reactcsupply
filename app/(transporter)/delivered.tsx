import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { Check, Rupee, Truck, ArrowRight } from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

export default function Delivered() {
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
              Delivery completed
            </Text>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                color: tokens.color.ink[500],
                textAlign: "center",
                maxWidth: 320,
              }}
            >
              Your earnings will be added to the next payout cycle.
            </Text>
          </View>

          <Card padded={20} style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1, alignItems: "center", gap: 6 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    backgroundColor: tokens.color.brand.green50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rupee size={18} color={tokens.color.brand.green} />
                </View>
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
                  Earned
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.4,
                  }}
                >
                  {formatINR(2400)}
                </Text>
              </View>
              <View style={{ width: 1, backgroundColor: tokens.color.border.hairline }} />
              <View style={{ flex: 1, alignItems: "center", gap: 6 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    backgroundColor: tokens.color.bgKpi.purple,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Truck size={18} color="#7C3AED" />
                </View>
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
                  Distance
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.4,
                  }}
                >
                  18 km
                </Text>
              </View>
            </View>
          </Card>

          <View style={{ width: "100%", gap: 10 }}>
            <Button
              label="Back to dashboard"
              onPress={() => router.replace("/(transporter)/dashboard")}
              surface="transporter"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
