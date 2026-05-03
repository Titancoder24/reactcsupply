import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input } from "@/components/ui";
import { Upload, Check } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const DOCS = [
  { key: "gstCertUploaded", label: "GST Certificate", optional: true },
  { key: "idProofUploaded", label: "ID Proof (Aadhaar / PAN)", optional: false },
  { key: "selfieUploaded", label: "Selfie Photo", optional: false },
] as const;

export default function VendorVerification() {
  const router = useRouter();
  const store = useVendorOnboarding();

  return (
    <VendorShell
      title="Vendor Verification"
      step={5}
      ctaLabel="Submit for Verification"
      onCta={() => router.push("/(vendor)/signup/categories")}
    >
      <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
        Upload Documents
      </Text>

      {DOCS.map((d) => {
        const uploaded = (store as any)[d.key];
        return (
          <Pressable
            key={d.key}
            onPress={() => store.setField(d.key as any, !uploaded as any)}
            style={{
              minHeight: 56,
              backgroundColor: tokens.color.surface.softBg,
              borderRadius: 8,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: 14,
                  color: tokens.color.text.primary,
                }}
              >
                {d.label}
                {d.optional && (
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {"  "}(Optional)
                  </Text>
                )}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              {uploaded ? (
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
                {uploaded ? "Uploaded" : "Upload"}
              </Text>
            </View>
          </Pressable>
        );
      })}

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary, marginBottom: 8 }}>
          Bank Details
        </Text>
        <View style={{ gap: 12 }}>
          <Input
            label="Account Number"
            value={store.bankAccount}
            onChangeText={(t) => store.setField("bankAccount", t.replace(/\D/g, "").slice(0, 16))}
            placeholder="1234 5678 9012"
            surface="vendor"
            keyboardType="number-pad"
          />
          <Input
            label="IFSC Code"
            value={store.ifscCode}
            onChangeText={(t) => store.setField("ifscCode", t.toUpperCase())}
            placeholder="SBIN0001234"
            surface="vendor"
            maxLength={11}
          />
        </View>
      </View>
    </VendorShell>
  );
}
