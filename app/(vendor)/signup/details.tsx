import React from "react";
import { View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input } from "@/components/ui";
import { MapPin } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";
import { noOutline } from "@/lib/web-style";

export default function VendorDetails() {
  const router = useRouter();
  const { shopName, ownerName, address, pickupLandmark, setField } = useVendorOnboarding();

  const ok = shopName.length > 2 && ownerName.length > 2 && address.length > 5;

  return (
    <VendorShell
      title="Vendor Details"
      step={4}
      ctaLabel="Continue"
      ctaDisabled={!ok}
      onCta={() => router.push("/(vendor)/signup/verification")}
    >
      <Input
        label="Shop / Business Name"
        value={shopName}
        onChangeText={(t) => setField("shopName", t)}
        placeholder="Sri Balaji Building Materials"
        surface="vendor"
      />

      <Input
        label="Owner Name"
        value={ownerName}
        onChangeText={(t) => setField("ownerName", t)}
        placeholder="Ramesh Kumar"
        surface="vendor"
      />

      {/* Address (multiline) */}
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
          Address
        </Text>
        <View
          style={{
            minHeight: 96,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: tokens.color.border.input,
            backgroundColor: "#fff",
            padding: 12,
          }}
        >
          <TextInput
            multiline
            value={address}
            onChangeText={(t) => setField("address", t)}
            placeholder="12-1-98, Main Road, Kukatpally, Hyderabad, Telangana - 500072"
            placeholderTextColor={tokens.color.text.secondary}
            style={{
              flex: 1,
              fontFamily: "Poppins",
              fontSize: 14,
              color: tokens.color.text.primary,
              minHeight: 72,
              textAlignVertical: "top",
              ...noOutline,
            }}
          />
        </View>
      </View>

      {/* Location pin (read-only chip) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: tokens.color.surface.softBg,
          padding: 12,
          borderRadius: 8,
        }}
      >
        <MapPin size={18} color={tokens.color.brand.green} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>Location Pin</Text>
          <Text style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: 13, color: tokens.color.text.primary }}>
            17.4979, 78.3975
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: 13,
            color: tokens.color.brand.green,
          }}
        >
          See on Map
        </Text>
      </View>

      <Input
        label="Pickup Landmark (Optional)"
        value={pickupLandmark}
        onChangeText={(t) => setField("pickupLandmark", t)}
        placeholder="Opp. Sai Temple"
        surface="vendor"
      />
    </VendorShell>
  );
}
