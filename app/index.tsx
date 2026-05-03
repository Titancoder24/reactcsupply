import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Defs, LinearGradient, Stop, Rect, Circle, Path } from "react-native-svg";
import { tokens } from "@/theme/tokens";
import { Button, CSupplyLogo, CSupplyMark, StatusPill } from "@/components/ui";
import { ArrowRight } from "@/components/ui/Icon";

const HeroBackdrop = () => (
  <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
    <Svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="400" y2="800">
          <Stop offset="0" stopColor="#0F2340" />
          <Stop offset="0.5" stopColor="#0B3B6E" />
          <Stop offset="1" stopColor="#082A53" />
        </LinearGradient>
        <LinearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F97316" stopOpacity="0.18" />
          <Stop offset="1" stopColor="#F97316" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={400} height={800} fill="url(#bg)" />
      {/* Soft accent glow */}
      <Circle cx={320} cy={120} r={180} fill="url(#glow)" />
      {/* Subtle grid lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Path
          key={`l${i}`}
          d={`M0 ${40 * (i + 1)} L400 ${40 * (i + 1)}`}
          stroke="rgba(255,255,255,0.025)"
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <Path
          key={`v${i}`}
          d={`M${40 * (i + 1)} 0 L${40 * (i + 1)} 800`}
          stroke="rgba(255,255,255,0.025)"
          strokeWidth={1}
        />
      ))}
    </Svg>
  </View>
);

const StatBadge: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <View
    style={{
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.12)",
      backgroundColor: "rgba(255,255,255,0.04)",
    }}
  >
    <Text
      style={{
        fontFamily: tokens.font.family.display,
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: -0.6,
      }}
    >
      {value}
    </Text>
    <Text
      style={{
        marginTop: 2,
        fontFamily: tokens.font.family.body,
        fontSize: 11,
        fontWeight: "500",
        color: "rgba(255,255,255,0.6)",
        letterSpacing: 0.5,
        textTransform: "uppercase",
      }}
    >
      {label}
    </Text>
  </View>
);

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#0B3B6E" }}>
      <HeroBackdrop />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 24,
            gap: 24,
          }}
        >
          {/* Top bar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <CSupplyMark size={32} variant="white" />
              <CSupplyLogo size="sm" variant="white" />
            </View>
            <Pressable
              onPress={() => router.push("/auth/login")}
              style={({ pressed }) => ({
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.2)",
                backgroundColor: pressed ? "rgba(255,255,255,0.08)" : "transparent",
              })}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  fontWeight: "500",
                }}
              >
                Sign in
              </Text>
            </Pressable>
          </View>

          {/* Hero */}
          <View style={{ marginTop: 32, gap: 16 }}>
            <View
              style={{
                alignSelf: "flex-start",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: "rgba(249,115,22,0.16)",
                borderWidth: 1,
                borderColor: "rgba(249,115,22,0.3)",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: tokens.color.customer.accent,
                }}
              />
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#FED7AA",
                  letterSpacing: 0.4,
                }}
              >
                Now serving 6 cities across India
              </Text>
            </View>

            <Text
              style={{
                fontFamily: tokens.font.family.display,
                fontSize: 40,
                fontWeight: "800",
                color: "#fff",
                lineHeight: 46,
                letterSpacing: -1.4,
              }}
            >
              Construction{"\n"}materials,{" "}
              <Text style={{ color: tokens.color.customer.accent }}>delivered</Text>.
            </Text>

            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 22,
                maxWidth: 340,
              }}
            >
              Cement, steel, sand, bricks and aggregates from verified vendors. Live tracking,
              transparent pricing, scheduled delivery to your site.
            </Text>
          </View>

          {/* Stat row */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <StatBadge value="2,400+" label="Verified vendors" />
            <StatBadge value="98.4%" label="On-time delivery" />
            <StatBadge value="14k+" label="Sites served" />
          </View>

          <View style={{ flex: 1 }} />

          {/* CTAs */}
          <View style={{ gap: 10 }}>
            <Button
              label="Get started"
              onPress={() => router.push("/auth/login")}
              variant="primary"
              surface="customer"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => router.push("/(customer)/home")}
                style={({ pressed }) => ({
                  flex: 1,
                  height: 48,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.18)",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pressed ? "rgba(255,255,255,0.06)" : "transparent",
                })}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: tokens.font.family.body,
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  Browse catalog
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(vendor)/signup")}
                style={({ pressed }) => ({
                  flex: 1,
                  height: 48,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.18)",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pressed ? "rgba(255,255,255,0.06)" : "transparent",
                })}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: tokens.font.family.body,
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  Become a partner
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Role quick-switch */}
          <View
            style={{
              paddingTop: 12,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: tokens.font.family.body,
                fontSize: 11,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                marginRight: 6,
              }}
            >
              Demo
            </Text>
            {[
              { label: "Customer", route: "/(customer)/home" },
              { label: "Vendor", route: "/(vendor)/dashboard" },
              { label: "Transporter", route: "/(transporter)/dashboard" },
              { label: "Admin", route: "/(admin)/login" },
            ].map((d) => (
              <Pressable
                key={d.label}
                onPress={() => router.push(d.route as any)}
                style={({ pressed }) => ({
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  backgroundColor: pressed ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                })}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "500",
                  }}
                >
                  {d.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
