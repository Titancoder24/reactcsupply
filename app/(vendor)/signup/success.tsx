import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { Check, Clock } from "@/components/ui/Icon";

export default function VendorSuccess() {
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
                fontWeight: "600",
                fontSize: 22,
                color: tokens.color.text.primary,
              }}
            >
              Registration Submitted!
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 14,
                color: tokens.color.text.secondary,
                textAlign: "center",
              }}
            >
              Your registration is submitted successfully.
            </Text>
          </View>

          <Card style={{ width: "100%", backgroundColor: tokens.color.brand.green50, borderColor: "transparent" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Clock size={22} color={tokens.color.brand.green} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 14,
                    color: tokens.color.text.primary,
                  }}
                >
                  Verification in Progress
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 12,
                    color: tokens.color.text.secondary,
                  }}
                >
                  We will verify your details and notify you soon.
                </Text>
              </View>
            </View>
          </Card>

          <View style={{ width: "100%" }}>
            <Button
              label="Go to Dashboard"
              onPress={() => router.replace("/(vendor)/dashboard")}
              surface="vendor"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
