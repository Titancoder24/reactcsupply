import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, CSupplyLogo } from "@/components/ui";
import { Truck } from "@/components/ui/Icon";

export default function TransporterWelcome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 16 }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: tokens.color.brand.green50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Truck size={48} color={tokens.color.brand.green} />
          </View>

          <CSupplyLogo size="lg" variant="green" />

          <View style={{ alignItems: "center", marginTop: 12, gap: 4 }}>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 22,
                color: tokens.color.text.primary,
              }}
            >
              Deliver More
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 22,
                color: tokens.color.text.primary,
              }}
            >
              Earn More
            </Text>
          </View>

          <View style={{ width: "100%", gap: 12, marginTop: 24 }}>
            <Button
              label="Join Now"
              onPress={() => router.push("/(transporter)/signup/mobile")}
              surface="transporter"
            />
            <Button
              label="Already have an account? Login"
              variant="secondary"
              onPress={() => router.push("/auth/login")}
              surface="transporter"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
