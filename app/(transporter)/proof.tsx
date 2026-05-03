import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, OtpInput } from "@/components/ui";
import { Camera, Check } from "@/components/ui/Icon";

const SAMPLE_PROOF =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80";

export default function ProofScreen() {
  const router = useRouter();
  const [photo, setPhoto] = useState(true);
  const [otp, setOtp] = useState("247196");

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Delivery Completed" surface="transporter" />

        <View style={{ padding: 20, gap: 16, flex: 1 }}>
          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
                color: tokens.color.text.primary,
              }}
            >
              Upload Photo Proof
            </Text>
            <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary, marginTop: 2 }}>
              Take a clear photo at the delivery location
            </Text>
          </View>

          {/* Photo preview */}
          <Pressable
            onPress={() => setPhoto((p) => !p)}
            style={{
              height: 200,
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: tokens.color.surface.softBg,
              borderWidth: 1,
              borderColor: tokens.color.border.divider,
              position: "relative",
            }}
          >
            {photo ? (
              <Image source={{ uri: SAMPLE_PROOF }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            ) : (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Camera size={32} color={tokens.color.text.muted} />
                <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
                  Tap to capture
                </Text>
              </View>
            )}
            {photo && (
              <Pressable
                onPress={() => setPhoto(false)}
                style={{
                  position: "absolute",
                  bottom: 12,
                  alignSelf: "center",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Poppins", fontSize: 12, fontWeight: "500" }}>Retake Photo</Text>
              </Pressable>
            )}
          </Pressable>

          <View style={{ marginTop: 8 }}>
            <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
              WhatsApp OTP Verification
            </Text>
            <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary, marginTop: 2 }}>
              Enter the 6-digit OTP sent to the customer
            </Text>
          </View>

          <OtpInput value={otp} onChange={setOtp} length={6} surface="transporter" />

          <View style={{ flex: 1 }} />
        </View>

        <View
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: tokens.color.border.divider,
          }}
        >
          <Button
            label="Submit Delivery"
            onPress={() => router.replace("/(transporter)/delivered")}
            disabled={!photo || otp.length !== 6}
            surface="transporter"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
