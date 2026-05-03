import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, FilterPill, Header, StatusPill } from "@/components/ui";
import { supabase } from "@/services/supabase";

const FILTERS = ["All", "Open", "Acknowledged", "Resolved"];

export default function GrievanceQueue() {
  const [filter, setFilter] = useState("All");

  const { data: tickets = [] } = useQuery({
    queryKey: ["grievance-queue"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("grievance_tickets")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = tickets.filter((t: any) => {
    if (filter === "All") return true;
    if (filter === "Open") return t.status === "open";
    if (filter === "Acknowledged") return t.status === "acknowledged";
    if (filter === "Resolved") return t.status === "resolved" || t.status === "closed";
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Grievance queue" subtitle="IT Rules 2021 · 15-day SLA" />

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
                No grievances in this view.
              </Text>
            </Card>
          )}
          {filtered.map((t: any) => (
            <Card key={t.id} padded={14}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.mono,
                    fontWeight: "600",
                    fontSize: 12,
                    color: tokens.color.ink[700],
                  }}
                >
                  {t.ticket_number}
                </Text>
                <StatusPill
                  label={t.status}
                  tone={
                    t.status === "resolved" || t.status === "closed"
                      ? "success"
                      : t.status === "open"
                        ? "warning"
                        : "info"
                  }
                  size="xs"
                />
              </View>
              <Text
                style={{
                  marginTop: 6,
                  fontFamily: tokens.font.family.display,
                  fontWeight: "600",
                  fontSize: 14,
                  color: tokens.color.ink[900],
                  letterSpacing: -0.2,
                }}
              >
                {t.category ?? "Other"} · {t.severity ?? "medium"}
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  color: tokens.color.ink[600],
                  lineHeight: 19,
                }}
                numberOfLines={3}
              >
                {t.description}
              </Text>
              {t.reporter_contact && (
                <Text
                  style={{
                    marginTop: 6,
                    fontFamily: tokens.font.family.mono,
                    fontSize: 11,
                    color: tokens.color.ink[500],
                  }}
                >
                  {t.reporter_contact}
                </Text>
              )}
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
