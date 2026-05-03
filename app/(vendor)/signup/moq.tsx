import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card } from "@/components/ui";
import { Plus } from "@/components/ui/Icon";
import { VendorShell } from "@/components/vendor/VendorShell";

interface MoqRow {
  product: string;
  size: string;
  moq: string;
  unit: string;
}

const INITIAL: MoqRow[] = [
  { product: "Sand", size: "River", moq: "1", unit: "Ton" },
  { product: "Bricks", size: "9 inch", moq: "500", unit: "Pieces" },
  { product: "Cement", size: "OPC 53", moq: "20", unit: "Bags" },
];

export default function VendorMoq() {
  const router = useRouter();
  const [rows, setRows] = useState<MoqRow[]>(INITIAL);

  return (
    <VendorShell
      title="MOQ + Sizes Setup"
      step={9}
      ctaLabel="Continue"
      onCta={() => router.push("/(vendor)/signup/slots")}
    >
      <Card padded={false}>
        {/* Header row */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 12,
            paddingVertical: 12,
            backgroundColor: tokens.color.surface.softBg,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          {["Product", "Size / Type", "MOQ", "Unit"].map((h, i) => (
            <Text
              key={h}
              style={{
                flex: i === 0 ? 1.2 : 1,
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 12,
                color: tokens.color.text.secondary,
              }}
            >
              {h}
            </Text>
          ))}
        </View>

        {rows.map((r, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: "row",
              padding: 12,
              borderTopWidth: 1,
              borderTopColor: tokens.color.border.divider,
            }}
          >
            {[r.product, r.size, r.moq, r.unit].map((v, i) => (
              <Text
                key={i}
                style={{
                  flex: i === 0 ? 1.2 : 1,
                  fontFamily: "Poppins",
                  fontSize: 13,
                  color: tokens.color.text.primary,
                }}
              >
                {v}
              </Text>
            ))}
          </View>
        ))}
      </Card>

      <Pressable
        onPress={() =>
          setRows([...rows, { product: "Cement", size: "PPC", moq: "10", unit: "Bags" }])
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          paddingVertical: 12,
        }}
      >
        <Plus size={16} color={tokens.color.brand.green} />
        <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.brand.green }}>
          Add More Row
        </Text>
      </Pressable>
    </VendorShell>
  );
}
