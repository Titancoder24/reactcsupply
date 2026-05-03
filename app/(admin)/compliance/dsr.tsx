import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, FilterPill, Header, StatusPill } from "@/components/ui";
import { supabase } from "@/services/supabase";

const FILTERS = ["All", "Open", "In progress", "Completed"];

export default function DsrQueue() {
  const [filter, setFilter] = useState("All");

  const { data: requests = [] } = useQuery({
    queryKey: ["dsr-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dsr_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = requests.filter((r: any) => {
    if (filter === "All") return true;
    if (filter === "Open") return ["received", "verifying_identity"].includes(r.status);
    if (filter === "In progress") return r.status === "in_progress";
    if (filter === "Completed") return r.status === "completed";
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Data subject requests" subtitle="DPDPA Section 11 · 30-day SLA" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}
        >
          {FILTERS.map((f) => (
            <FilterPill key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 10, paddingBottom: 32 }}>
          {filtered.length === 0 && (
            <Card padded={20}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: tokens.font.family.body,
                  color: tokens.color.ink[500],
                }}
              >
                No requests in this view.
              </Text>
            </Card>
          )}

          {filtered.map((r: any) => (
            <Card key={r.id} padded={14}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.mono,
                    fontWeight: "600",
                    fontSize: 12,
                    color: tokens.color.ink[700],
                  }}
                >
                  {r.ticket_number}
                </Text>
                <StatusPill
                  label={r.status.replace(/_/g, " ")}
                  tone={
                    r.status === "completed"
                      ? "success"
                      : r.status === "rejected" || r.status === "cancelled"
                        ? "neutral"
                        : "warning"
                  }
                  size="xs"
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "600",
                    fontSize: 14,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.2,
                  }}
                >
                  {prettyKind(r.kind)}
                </Text>
                {r.due_date && (
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 11,
                      color: tokens.color.ink[500],
                    }}
                  >
                    · due {r.due_date}
                  </Text>
                )}
              </View>
              {r.reason && (
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.body,
                    fontSize: 12,
                    color: tokens.color.ink[500],
                    lineHeight: 17,
                  }}
                  numberOfLines={2}
                >
                  {r.reason}
                </Text>
              )}
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function prettyKind(k: string) {
  return k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
