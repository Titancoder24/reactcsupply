import React from "react";
import { View, Text, ImageBackground, Pressable, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, CSupplyLogo, CSupplyMark } from "@/components/ui";

const ConstructionScene = () => (
  <View style={{ height: 280, justifyContent: "flex-end", alignItems: "center" }}>
    {/* Stylized cityscape silhouette with cranes */}
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        opacity: 0.3,
      }}
    >
      {/* Crane 1 */}
      <View
        style={{
          position: "absolute",
          left: "10%",
          bottom: 40,
          width: 4,
          height: 140,
          backgroundColor: tokens.color.customer.accent,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: "10%",
          bottom: 170,
          width: 90,
          height: 3,
          backgroundColor: tokens.color.customer.accent,
        }}
      />
      {/* Crane 2 */}
      <View
        style={{
          position: "absolute",
          right: "15%",
          bottom: 60,
          width: 4,
          height: 120,
          backgroundColor: "#FBBF24",
        }}
      />
      <View
        style={{
          position: "absolute",
          right: "15%",
          bottom: 170,
          width: 70,
          height: 3,
          backgroundColor: "#FBBF24",
        }}
      />
      {/* Buildings silhouettes */}
      {[
        { left: "5%", w: 60, h: 80 },
        { left: "20%", w: 50, h: 100 },
        { left: "35%", w: 80, h: 120 },
        { left: "55%", w: 60, h: 90 },
        { left: "70%", w: 70, h: 110 },
        { left: "85%", w: 50, h: 70 },
      ].map((b, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            left: b.left as any,
            bottom: 0,
            width: b.w,
            height: b.h,
            backgroundColor: "rgba(255,255,255,0.15)",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
      ))}
    </View>

    {/* Truck + materials in foreground */}
    <View
      style={{
        position: "absolute",
        bottom: 24,
        left: 24,
        right: 24,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
    >
      {/* Brick stack */}
      <View style={{ width: 36, height: 28 }}>
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <View
              key={`${row}-${col}`}
              style={{
                position: "absolute",
                left: col * 12 + (row % 2 === 1 ? 4 : 0),
                bottom: row * 9,
                width: 11,
                height: 8,
                backgroundColor: "#DC2626",
                borderRadius: 1,
              }}
            />
          )),
        )}
      </View>

      {/* Truck body */}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View
          style={{
            width: 70,
            height: 42,
            backgroundColor: "#fff",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 4,
          }}
        />
        <View
          style={{
            width: 36,
            height: 30,
            backgroundColor: "#1E40AF",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 0,
          }}
        />
      </View>

      {/* Cement bags */}
      <View>
        <View
          style={{
            width: 44,
            height: 24,
            backgroundColor: "#94A3B8",
            borderRadius: 2,
            marginBottom: 2,
          }}
        />
        <View
          style={{
            width: 44,
            height: 24,
            backgroundColor: "#94A3B8",
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  </View>
);

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.customer.primary }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 32,
            paddingBottom: 24,
          }}
        >
          {/* Top brand block */}
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <CSupplyMark size={120} variant="white" />
            <View style={{ height: 24 }} />
            <CSupplyLogo size="xl" variant="white" showTagline />
          </View>

          {/* Construction scene */}
          <ConstructionScene />

          {/* CTAs */}
          <View style={{ gap: 12, marginTop: 16 }}>
            <Button
              label="Get Started"
              onPress={() => router.push("/auth/login")}
              variant="primary"
              surface="customer"
            />
            <Pressable
              onPress={() => router.push("/auth/login")}
              style={({ pressed }) => ({
                height: 52,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? "rgba(255,255,255,0.08)" : "transparent",
              })}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Poppins",
                  fontWeight: "600",
                }}
              >
                Login / Sign Up
              </Text>
            </Pressable>

            {/* Quick role-switch hints (web demo navigation) */}
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, marginTop: 12 }}>
              <Pressable onPress={() => router.push("/(customer)/home")}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Poppins" }}>
                  Customer
                </Text>
              </Pressable>
              <Text style={{ color: "rgba(255,255,255,0.4)" }}>·</Text>
              <Pressable onPress={() => router.push("/(vendor)/signup")}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Poppins" }}>
                  Vendor
                </Text>
              </Pressable>
              <Text style={{ color: "rgba(255,255,255,0.4)" }}>·</Text>
              <Pressable onPress={() => router.push("/(transporter)/signup")}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Poppins" }}>
                  Transporter
                </Text>
              </Pressable>
              <Text style={{ color: "rgba(255,255,255,0.4)" }}>·</Text>
              <Pressable onPress={() => router.push("/(admin)/login")}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Poppins" }}>
                  Admin
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
