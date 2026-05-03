import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, CSupplyMark, CSupplyLogo } from "@/components/ui";
import { ArrowRight, Building, Check } from "@/components/ui/Icon";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
];

const HIGHLIGHTS = [
  "Reach contractors and builders in your city",
  "Manage stock, orders, and payouts in one place",
  "Get paid weekly via direct bank transfer",
  "Free vendor app · low-data optimized",
];

export default function VendorWelcome() {
  const router = useRouter();
  const [lang, setLang] = React.useState("en");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <View style={{ alignItems: "center", marginTop: 32, gap: 16 }}>
            <CSupplyMark size={64} variant="green" />
            <CSupplyLogo size="md" variant="green" />
          </View>

          <View style={{ alignItems: "center", marginTop: 12, gap: 8 }}>
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
                Vendor Partner Program
              </Text>
            </View>
            <Text
              style={{
                marginTop: 4,
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 26,
                color: tokens.color.ink[900],
                textAlign: "center",
                letterSpacing: -0.6,
                lineHeight: 32,
              }}
            >
              Grow your{" "}
              <Text style={{ color: tokens.color.brand.green }}>materials business</Text>{" "}
              with C-Supply
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
              Join 2,400+ vendors selling cement, steel, sand and aggregates across India.
            </Text>
          </View>

          {/* Highlights card */}
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

          {/* Language */}
          <View style={{ gap: 8 }}>
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
              Language
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {LANGS.map((l) => {
                const sel = lang === l.code;
                return (
                  <Pressable
                    key={l.code}
                    onPress={() => setLang(l.code)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 9,
                      borderRadius: 999,
                      backgroundColor: sel ? tokens.color.brand.green50 : tokens.color.surface.white,
                      borderWidth: 1,
                      borderColor: sel ? tokens.color.brand.green : tokens.color.border.hairline,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 13,
                        fontWeight: sel ? "600" : "500",
                        color: sel ? tokens.color.brand.green600 : tokens.color.ink[700],
                      }}
                    >
                      {l.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ gap: 10, marginTop: 8 }}>
            <Button
              label="Start vendor registration"
              onPress={() => router.push("/(vendor)/signup/mobile")}
              surface="vendor"
              iconRight={<ArrowRight size={18} color="#fff" />}
            />
            <Button
              label="I already have an account"
              variant="secondary"
              onPress={() => router.push("/auth/login")}
              surface="vendor"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
