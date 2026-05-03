import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { supabase } from "@/services/supabase";

export default function AuditLog() {
  const { data: events = [] } = useQuery({
    queryKey: ["audit-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Audit log" subtitle="Immutable record of privileged actions" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 10, paddingBottom: 32 }}>
          {events.length === 0 ? (
            <Card padded={20}>
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  color: tokens.color.ink[600],
                  textAlign: "center",
                }}
              >
                No privileged actions recorded yet. Every Super Admin and Admin action — theme
                changes, document publishing, KYC approvals, refunds, deletions — is appended here
                with before/after diffs.
              </Text>
            </Card>
          ) : (
            events.map((e: any) => (
              <Card key={e.id} padded={14}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: tokens.font.family.mono,
                      fontWeight: "600",
                      fontSize: 12,
                      color: tokens.color.ink[700],
                    }}
                  >
                    {e.action}
                  </Text>
                  <StatusPill label={e.actor_role ?? "system"} tone="neutral" size="xs" dot={false} />
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[700],
                  }}
                >
                  {e.target_type} · {String(e.target_id ?? "").slice(0, 12)}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.mono,
                    fontSize: 11,
                    color: tokens.color.ink[500],
                  }}
                >
                  {new Date(e.created_at).toLocaleString("en-IN")}
                </Text>
              </Card>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
