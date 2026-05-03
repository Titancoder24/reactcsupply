import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, FilterPill, Header, StatusPill } from "@/components/ui";
import { supabase } from "@/services/supabase";

const PLATFORMS = ["All", "iOS", "Android"];

export default function PermissionsAdmin() {
  const [platform, setPlatform] = useState("All");

  const { data: rows = [] } = useQuery({
    queryKey: ["permissions-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("permissions_inventory")
        .select("*")
        .order("platform")
        .order("permission_key");
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = rows.filter((r: any) => platform === "All" || r.platform === platform.toLowerCase());

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Permissions inventory" subtitle="iOS Info.plist + Android" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}
        >
          {PLATFORMS.map((p) => (
            <FilterPill key={p} label={p} active={platform === p} onPress={() => setPlatform(p)} />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 12, paddingBottom: 32 }}>
          {filtered.map((r: any) => (
            <Card key={r.id} padded={16}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
                    {r.display_name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.mono,
                      fontSize: 11,
                      color: tokens.color.ink[500],
                    }}
                  >
                    {r.permission_key}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <StatusPill
                    label={r.platform.toUpperCase()}
                    tone={r.platform === "ios" ? "info" : "success"}
                    size="xs"
                    dot={false}
                  />
                  {r.background && <StatusPill label="Background" tone="warning" size="xs" />}
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
                {r.rationale}
              </Text>
              <View
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTopWidth: 1,
                  borderTopColor: tokens.color.border.hairline,
                  gap: 4,
                }}
              >
                {r.triggered_when && (
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.ink[600],
                    }}
                  >
                    <Text style={{ fontWeight: "600", color: tokens.color.ink[800] }}>Triggered: </Text>
                    {r.triggered_when}
                  </Text>
                )}
                {r.fallback_behaviour && (
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.ink[600],
                    }}
                  >
                    <Text style={{ fontWeight: "600", color: tokens.color.ink[800] }}>Fallback: </Text>
                    {r.fallback_behaviour}
                  </Text>
                )}
              </View>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
