import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { TransporterShell } from "@/components/transporter/TransporterShell";
import { Truck, MapPin } from "@/components/ui/Icon";

export default function TransporterAvailable() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);

  return (
    <TransporterShell
      title="Available for Jobs"
      step={9}
      ctaLabel="Go to Dashboard"
      onCta={() => router.replace("/(transporter)/dashboard")}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 8,
        }}
      >
        <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
          Available for Jobs
        </Text>
        <Switch
          value={available}
          onValueChange={setAvailable}
          trackColor={{ true: tokens.color.brand.green, false: "#D1D5DB" }}
          thumbColor="#fff"
        />
      </View>

      {/* Cityscape illustration */}
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <View
          style={{
            width: 240,
            height: 200,
            borderRadius: 16,
            backgroundColor: tokens.color.brand.green50,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Buildings */}
          <View style={{ position: "absolute", bottom: 60, left: 24, width: 24, height: 60, backgroundColor: "rgba(34,197,94,0.3)" }} />
          <View style={{ position: "absolute", bottom: 60, left: 56, width: 28, height: 80, backgroundColor: "rgba(34,197,94,0.4)" }} />
          <View style={{ position: "absolute", bottom: 60, right: 56, width: 28, height: 70, backgroundColor: "rgba(34,197,94,0.3)" }} />
          <View style={{ position: "absolute", bottom: 60, right: 24, width: 24, height: 50, backgroundColor: "rgba(34,197,94,0.4)" }} />
          {/* Truck */}
          <Truck size={64} color={tokens.color.brand.green} />
          {/* Pin */}
          <View style={{ position: "absolute", top: 32, right: 60 }}>
            <MapPin size={28} color={tokens.color.brand.green} />
          </View>
        </View>
        <Text
          style={{
            marginTop: 16,
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: 14,
            color: tokens.color.text.primary,
            textAlign: "center",
          }}
        >
          {available
            ? "You are online and will receive job requests"
            : "You are offline. Turn on availability to receive jobs."}
        </Text>
      </View>
    </TransporterShell>
  );
}
