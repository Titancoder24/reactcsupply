import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header } from "@/components/ui";
import { MapPin, Truck } from "@/components/ui/Icon";

export default function Tracking() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Live Tracking" surface="transporter" />

        {/* Map placeholder */}
        <View style={{ flex: 1, backgroundColor: "#E0F2FE", margin: 0, position: "relative", overflow: "hidden" }}>
          {/* Grid background */}
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={`h-${i}`}
              style={{
                position: "absolute",
                top: i * 40,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: "rgba(34, 197, 94, 0.08)",
              }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <View
              key={`v-${i}`}
              style={{
                position: "absolute",
                left: i * 40,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: "rgba(34, 197, 94, 0.08)",
              }}
            />
          ))}

          {/* Pickup pin */}
          <View style={{ position: "absolute", top: 80, left: 60 }}>
            <MapPin size={32} color={tokens.color.brand.green} />
          </View>

          {/* Drop pin */}
          <View style={{ position: "absolute", bottom: 240, right: 60 }}>
            <MapPin size={32} color={tokens.color.state.danger} />
          </View>

          {/* Route line (dashed simulated by series of dots) */}
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={`d-${i}`}
              style={{
                position: "absolute",
                top: 100 + i * 12,
                left: 80 + i * 10,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: tokens.color.brand.green,
              }}
            />
          ))}

          {/* Truck */}
          <View style={{ position: "absolute", top: 200, left: 200 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: tokens.color.brand.green,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Truck size={28} color="#fff" />
            </View>
          </View>
        </View>

        {/* Bottom card */}
        <View style={{ padding: 16 }}>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: tokens.color.surface.softBg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Truck size={20} color={tokens.color.brand.green} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
                  Bowenpally, Secunderabad
                </Text>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                  Enroute to Pickup • 15 km away
                </Text>
              </View>
            </View>
            <Button
              label="Reached Pickup"
              onPress={() => router.push("/(transporter)/proof")}
              surface="transporter"
            />
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}
