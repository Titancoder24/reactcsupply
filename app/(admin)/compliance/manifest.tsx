import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { supabase } from "@/services/supabase";

export default function PrivacyManifestAdmin() {
  const { data: rows = [] } = useQuery({
    queryKey: ["privacy-manifest"],
    queryFn: async () => {
      const { data, error } = await supabase.from("privacy_manifest").select("*").order("category");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Privacy manifest" subtitle="App Privacy + Data Safety source of truth" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 32 }}>
          <Card padded={16} tone="subtle" elevation="none">
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 13,
                color: tokens.color.ink[700],
                lineHeight: 20,
              }}
            >
              This table is the canonical record of what we collect. The build pipeline reads it to
              generate `PrivacyInfo.xcprivacy` for iOS and to populate the Play Console Data Safety
              form. Edit cautiously — every change requires a store resubmission.
            </Text>
          </Card>

          {rows.map((r: any) => (
            <Card key={r.id} padded={16}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontWeight: "600",
                      fontSize: 14,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.2,
                    }}
                  >
                    {prettyCategory(r.category)}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.mono,
                      fontSize: 11,
                      color: tokens.color.ink[500],
                    }}
                  >
                    {r.category}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  {r.linked_to_user && <StatusPill label="Linked" tone="info" size="xs" dot={false} />}
                  {r.used_for_tracking && <StatusPill label="Tracking" tone="danger" size="xs" />}
                </View>
              </View>
              <Text
                style={{
                  marginTop: 8,
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  color: tokens.color.ink[700],
                  lineHeight: 19,
                }}
              >
                {r.notes}
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {(r.purposes ?? []).map((p: string) => (
                  <View
                    key={p}
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 6,
                      backgroundColor: tokens.color.ink[100],
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 10,
                        fontWeight: "600",
                        color: tokens.color.ink[700],
                        letterSpacing: 0.2,
                      }}
                    >
                      {p.replace(/_/g, " ")}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderTopColor: tokens.color.border.hairline,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    color: tokens.color.ink[500],
                  }}
                >
                  Retention {r.retention_days}d
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.mono,
                    fontSize: 11,
                    color: tokens.color.ink[600],
                  }}
                >
                  iOS · {r.ios_descriptor} · Play · {r.android_descriptor}
                </Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function prettyCategory(c: string) {
  return c.replace(/_/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
}
