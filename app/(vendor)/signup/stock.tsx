import React from "react";
import { View, Text, Switch } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Input } from "@/components/ui";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";

const Toggle: React.FC<{ label: string; value: boolean; onChange: (v: boolean) => void }> = ({
  label,
  value,
  onChange,
}) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.primary }}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      thumbColor="#fff"
      trackColor={{ true: tokens.color.brand.green, false: "#D1D5DB" }}
    />
  </View>
);

export default function VendorStock() {
  const router = useRouter();
  const store = useVendorOnboarding();

  return (
    <VendorShell
      title="Stock Setup"
      step={8}
      ctaLabel="Continue"
      onCta={() => router.push("/(vendor)/signup/moq")}
    >
      <Card>
        <Input
          label="Total Stock Available"
          value={store.totalStock}
          onChangeText={(t) => store.setField("totalStock", t.replace(/\D/g, ""))}
          placeholder="500"
          keyboardType="number-pad"
          surface="vendor"
          suffix={<Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.muted }}>{store.stockUnit}</Text>}
        />
      </Card>

      <Card style={{ gap: 16 }}>
        <Toggle
          label="Low Stock Alert"
          value={store.lowStockAlert}
          onChange={(v) => store.setField("lowStockAlert", v)}
        />

        {store.lowStockAlert && (
          <Input
            label="When stock goes below"
            value={store.lowStockThreshold}
            onChangeText={(t) => store.setField("lowStockThreshold", t.replace(/\D/g, ""))}
            placeholder="50"
            keyboardType="number-pad"
            surface="vendor"
          />
        )}

        <Toggle
          label="Auto Hide Out of Stock"
          value={store.autoHideOos}
          onChange={(v) => store.setField("autoHideOos", v)}
        />
      </Card>
    </VendorShell>
  );
}
