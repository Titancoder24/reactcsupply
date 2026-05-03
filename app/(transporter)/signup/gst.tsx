import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input } from "@/components/ui";
import { Check, Package } from "@/components/ui/Icon";
import { TransporterShell } from "@/components/transporter/TransporterShell";
import { isValidGstin } from "@/lib/utils";

export default function TransporterGst() {
  const router = useRouter();
  const [gst, setGst] = useState("");
  const valid = isValidGstin(gst);

  return (
    <TransporterShell
      title="Enter GST Number"
      step={4}
      ctaLabel="Verify & Continue"
      ctaDisabled={!valid}
      onCta={() => router.push("/(transporter)/signup/vehicle")}
    >
      <Input
        label="GST Number"
        value={gst}
        onChangeText={(t) => setGst(t.toUpperCase())}
        placeholder="36ABCDE1234F1Z5"
        maxLength={15}
        surface="transporter"
        suffix={valid ? <Check size={18} color={tokens.color.brand.green} /> : null}
      />

      <View style={{ alignItems: "center", paddingVertical: 24 }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 16,
            backgroundColor: tokens.color.surface.softBg,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1.5,
            borderColor: tokens.color.border.input,
            position: "relative",
          }}
        >
          <Package size={48} color={tokens.color.text.secondary} />
          {valid && (
            <View
              style={{
                position: "absolute",
                bottom: -8,
                right: -8,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: tokens.color.brand.green,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: "#fff",
              }}
            >
              <Check size={16} color="#fff" strokeWidth={3} />
            </View>
          )}
        </View>
      </View>
    </TransporterShell>
  );
}
