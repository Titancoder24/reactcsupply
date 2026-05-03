import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { supabase } from "@/services/supabase";

export default function ConsentsAdmin() {
  const { data: consents = [] } = useQuery({
    queryKey: ["consents-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_consents")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });

  // Aggregate counts per kind
  const byKind = consents.reduce<Record<string, { granted: number; withdrawn: number }>>(
    (acc, c: any) => {
      const k = c.kind;
      if (!acc[k]) acc[k] = { granted: 0, withdrawn: 0 };
      if (c.granted) acc[k].granted += 1;
      else acc[k].withdrawn += 1;
      return acc;
    },
    {},
  );

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="User consents" subtitle="DPDPA Section 6 · audit trail" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 32 }}>
          <Card padded={16} tone="subtle" elevation="none">
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 13,
                color: tokens.color.ink[700],
                lineHeight: 20,
              }}
            >
              Each consent is recorded with timestamp, IP, user agent, and the legal document
              version active at the time. Withdrawals retain the original record with a
              `withdrawn_at` stamp — never deleted.
            </Text>
          </Card>

          <Card padded={false}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: tokens.color.ink[50],
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
              }}
            >
              <Text
                style={{
                  flex: 2,
                  fontFamily: tokens.font.family.body,
                  fontWeight: "600",
                  fontSize: 11,
                  color: tokens.color.ink[600],
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                Consent
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontFamily: tokens.font.family.body,
                  fontWeight: "600",
                  fontSize: 11,
                  color: tokens.color.ink[600],
                  textAlign: "right",
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                Granted
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontFamily: tokens.font.family.body,
                  fontWeight: "600",
                  fontSize: 11,
                  color: tokens.color.ink[600],
                  textAlign: "right",
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                Withdrawn
              </Text>
            </View>
            {Object.entries(byKind).map(([kind, counts], idx) => (
              <View
                key={kind}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  borderTopWidth: idx > 0 ? 1 : 1,
                  borderTopColor: tokens.color.border.hairline,
                }}
              >
                <Text
                  style={{
                    flex: 2,
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[800],
                  }}
                >
                  {kind.replace(/_/g, " ")}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontFamily: tokens.font.family.mono,
                    fontSize: 13,
                    fontWeight: "600",
                    color: tokens.color.state.successText,
                  }}
                >
                  {counts.granted}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontFamily: tokens.font.family.mono,
                    fontSize: 13,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                  }}
                >
                  {counts.withdrawn}
                </Text>
              </View>
            ))}
            {Object.keys(byKind).length === 0 && (
              <Text
                style={{
                  padding: 32,
                  textAlign: "center",
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  color: tokens.color.ink[500],
                }}
              >
                No consent records yet.
              </Text>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
