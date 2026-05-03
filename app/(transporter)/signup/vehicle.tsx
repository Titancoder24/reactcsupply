import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input } from "@/components/ui";
import { Truck, ChevronDown } from "@/components/ui/Icon";
import { TransporterShell } from "@/components/transporter/TransporterShell";

export default function TransporterVehicle() {
  const router = useRouter();
  const [reg, setReg] = useState("TS 12 AB 1234");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("8");
  const [rcNumber, setRcNumber] = useState("RC123456789");

  return (
    <TransporterShell
      title="Enter Vehicle Information"
      step={5}
      ctaLabel="Save & Continue"
      onCta={() => router.push("/(transporter)/signup/documents")}
    >
      <Input
        label="Vehicle Number"
        value={reg}
        onChangeText={(t) => setReg(t.toUpperCase())}
        placeholder="TS 12 AB 1234"
        surface="transporter"
        prefix={<Truck size={18} color={tokens.color.text.muted} />}
      />

      {/* Vehicle type dropdown */}
      <View>
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: 12,
            color: tokens.color.text.secondary,
            marginBottom: 6,
          }}
        >
          Select Vehicle Type
        </Text>
        <Pressable
          style={{
            height: 52,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: tokens.color.border.input,
            backgroundColor: "#fff",
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.primary }}>
            {vehicleType || "Select a type"}
          </Text>
          <ChevronDown size={18} color={tokens.color.text.muted} />
        </Pressable>
      </View>

      <Input
        label="Loading Capacity (Tons)"
        value={capacity}
        onChangeText={(t) => setCapacity(t.replace(/\D/g, ""))}
        placeholder="8"
        keyboardType="number-pad"
        surface="transporter"
      />

      <Input
        label="RC Number"
        value={rcNumber}
        onChangeText={(t) => setRcNumber(t.toUpperCase())}
        placeholder="RC123456789"
        surface="transporter"
      />
    </TransporterShell>
  );
}
