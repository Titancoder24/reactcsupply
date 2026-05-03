import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Button, Header } from "@/components/ui";
import { MapPin, Package } from "@/components/ui/Icon";

export default function JobRequest() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="New Job Request" surface="transporter" />

        {/* Auto-decline countdown bar */}
        <View
          style={{
            height: 4,
            backgroundColor: "#E5E7EB",
            marginHorizontal: 20,
            marginTop: 12,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${(seconds / 30) * 100}%`,
              height: "100%",
              backgroundColor: tokens.color.brand.green,
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 12,
            color: tokens.color.text.secondary,
            textAlign: "center",
            marginTop: 6,
          }}
        >
          Auto-declines in {seconds}s
        </Text>

        <View style={{ padding: 20, gap: 16, flex: 1 }}>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: 13,
              color: tokens.color.text.secondary,
            }}
          >
            #CS123456
          </Text>

          <Card>
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: tokens.color.brand.green,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={16} color="#fff" />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 14,
                      color: tokens.color.text.primary,
                    }}
                  >
                    Pickup Location
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
                    Bowenpally, Secunderabad
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: tokens.color.state.danger,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={16} color="#fff" />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 14,
                      color: tokens.color.text.primary,
                    }}
                  >
                    Drop Location
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
                    Gachibowli, Hyderabad
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <Package size={28} color={tokens.color.text.secondary} />
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 14,
                      color: tokens.color.text.primary,
                    }}
                  >
                    Material
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
                    Cement
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <Package size={28} color={tokens.color.text.secondary} />
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 14,
                      color: tokens.color.text.primary,
                    }}
                  >
                    Weight
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
                    10 Tons
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <View style={{ flex: 1 }} />
        </View>

        <View
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: tokens.color.border.divider,
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Pressable
              onPress={() => router.back()}
              style={{
                height: 52,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: tokens.color.state.danger,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.state.danger }}>
                Reject
              </Text>
            </Pressable>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              label="Accept"
              onPress={() => router.replace("/(transporter)/tracking")}
              surface="transporter"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
