import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card } from "@/components/ui";
import { CSupplyLogo, CSupplyMark } from "@/components/ui/Logo";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
];

export default function VendorWelcome() {
  const router = useRouter();
  const [lang, setLang] = React.useState("en");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 16 }}>
          <CSupplyMark size={96} variant="green" />
          <CSupplyLogo size="lg" variant="green" />
          <Text
            style={{
              marginTop: 12,
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 22,
              color: tokens.color.text.primary,
            }}
          >
            Join as Vendor
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 14,
              color: tokens.color.text.secondary,
              textAlign: "center",
            }}
          >
            Grow your business with C-Supply
          </Text>

          <View style={{ height: 8 }} />

          <Card style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 12,
                color: tokens.color.text.secondary,
                marginBottom: 8,
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
                      paddingVertical: 8,
                      borderRadius: 999,
                      backgroundColor: sel ? tokens.color.brand.green50 : "transparent",
                      borderWidth: 1,
                      borderColor: sel ? tokens.color.brand.green : tokens.color.border.input,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 13,
                        fontWeight: sel ? "600" : "500",
                        color: sel ? tokens.color.brand.green : tokens.color.text.primary,
                      }}
                    >
                      {l.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Card>

          <View style={{ width: "100%", gap: 12, marginTop: 16 }}>
            <Button label="Login" onPress={() => router.push("/auth/login")} surface="vendor" />
            <Button
              label="New Registration"
              variant="secondary"
              onPress={() => router.push("/(vendor)/signup/mobile")}
              surface="vendor"
            />
          </View>

          <Pressable onPress={() => router.push("/auth/login")}>
            <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary, marginTop: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: tokens.color.brand.green, fontWeight: "600" }}>Login</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
