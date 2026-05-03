import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Upload, Check } from "@/components/ui/Icon";
import { TransporterShell } from "@/components/transporter/TransporterShell";

export default function TransporterDocuments() {
  const router = useRouter();
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});

  const docs = [
    { key: "license", label: "Driving License" },
    { key: "rc", label: "RC Book" },
    { key: "insurance", label: "Insurance" },
  ];

  return (
    <TransporterShell
      title="Upload Documents"
      step={6}
      ctaLabel="Submit & Continue"
      onCta={() => router.push("/(transporter)/signup/passcode")}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary, textAlign: "center" }}>
        Upload clear photos
      </Text>

      {docs.map((d) => {
        const isUp = uploaded[d.key];
        return (
          <Pressable
            key={d.key}
            onPress={() => setUploaded({ ...uploaded, [d.key]: !isUp })}
            style={{
              minHeight: 56,
              backgroundColor: tokens.color.surface.softBg,
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: tokens.color.border.input,
            }}
          >
            <Text style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: 14, color: tokens.color.text.primary }}>
              {d.label}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              {isUp ? (
                <Check size={18} color={tokens.color.brand.green} />
              ) : (
                <Upload size={16} color={tokens.color.brand.green} />
              )}
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 14,
                  color: tokens.color.brand.green,
                }}
              >
                {isUp ? "Uploaded" : "Upload"}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </TransporterShell>
  );
}
