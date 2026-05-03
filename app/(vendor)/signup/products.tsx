import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input, Card } from "@/components/ui";
import { Camera, Plus, Trash } from "@/components/ui/Icon";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";
import { formatINR } from "@/lib/utils";

export default function VendorProducts() {
  const router = useRouter();
  const { products, addProduct } = useVendorOnboarding();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("Bag");

  const canAdd = name.length > 1 && Number(price) > 0;

  return (
    <VendorShell
      title="Upload Products"
      step={7}
      ctaLabel="Continue"
      ctaDisabled={products.length === 0}
      onCta={() => router.push("/(vendor)/signup/stock")}
    >
      {products.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
            Added Products ({products.length})
          </Text>
          {products.map((p, idx) => (
            <Card key={idx} padded>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.text.primary }}>
                    {p.name}
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {formatINR(p.price)} / {p.unit.toLowerCase()}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      )}

      <Card>
        <Input
          label="Product Name"
          value={name}
          onChangeText={setName}
          placeholder="OPC 53 Grade Cement"
          surface="vendor"
        />
        <View style={{ height: 12 }} />

        {/* Photo placeholder */}
        <Pressable
          style={{
            height: 120,
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: tokens.color.border.input,
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Camera size={28} color={tokens.color.text.muted} />
          <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.secondary }}>
            Upload Product Photo
          </Text>
        </Pressable>

        <View style={{ height: 12 }} />
        <Input
          label="Price (₹)"
          value={price}
          onChangeText={(t) => setPrice(t.replace(/\D/g, ""))}
          placeholder="420"
          keyboardType="number-pad"
          surface="vendor"
        />

        <View style={{ height: 12 }} />
        <View>
          <Text style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: 12, color: tokens.color.text.secondary, marginBottom: 6 }}>
            Unit
          </Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {["Bag", "Ton", "Piece", "MT"].map((u) => {
              const sel = u === unit;
              return (
                <Pressable
                  key={u}
                  onPress={() => setUnit(u)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: sel ? tokens.color.brand.green : "#fff",
                    borderWidth: 1,
                    borderColor: sel ? tokens.color.brand.green : tokens.color.border.input,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 13,
                      color: sel ? "#fff" : tokens.color.text.primary,
                    }}
                  >
                    {u}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ height: 16 }} />
        <Pressable
          disabled={!canAdd}
          onPress={() => {
            addProduct({ name, price: Number(price), unit });
            setName("");
            setPrice("");
          }}
          style={{
            height: 44,
            borderRadius: 8,
            backgroundColor: canAdd ? tokens.color.brand.green : tokens.color.surface.softBg,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Plus size={16} color={canAdd ? "#fff" : tokens.color.text.muted} />
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 14,
              color: canAdd ? "#fff" : tokens.color.text.muted,
            }}
          >
            Add Product
          </Text>
        </Pressable>
      </Card>
    </VendorShell>
  );
}
