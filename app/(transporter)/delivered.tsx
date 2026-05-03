import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { Check, Rupee, Truck } from "@/components/ui/Icon";

export default function Delivered() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 24 }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: tokens.color.brand.green50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: tokens.color.brand.green,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={48} color="#fff" strokeWidth={3} />
            </View>
          </View>

          <View style={{ alignItems: "center", gap: 6 }}>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "700",
                fontSize: 22,
                color: tokens.color.brand.green,
                letterSpacing: 0.5,
              }}
            >
              DELIVERY COMPLETED!
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 14,
                color: tokens.color.text.secondary,
                textAlign: "center",
              }}
            >
              Payment will be released soon.
            </Text>
          </View>

          <Card style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center", gap: 6 }}>
                <Rupee size={28} color={tokens.color.brand.green} />
                <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
                  More Deliveries
                </Text>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                  More Earnings
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 6 }}>
                <Truck size={28} color={tokens.color.brand.green} />
                <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
                  Stay Online
                </Text>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                  Get next job
                </Text>
              </View>
            </View>
          </Card>

          <View style={{ width: "100%", gap: 12 }}>
            <Button
              label="Back to Dashboard"
              onPress={() => router.replace("/(transporter)/dashboard")}
              surface="transporter"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
