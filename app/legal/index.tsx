import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import {
  Shield,
  Tag,
  Headphones,
  Lock,
  Package,
  ChevronRight,
  Settings,
} from "@/components/ui/Icon";
import { useAllLegalDocuments, type LegalDocKind } from "@/hooks/use-legal";

const SECTIONS: { kind: LegalDocKind; icon: any; group: string }[] = [
  { kind: "privacy_policy", icon: Shield, group: "Policies" },
  { kind: "terms_of_service", icon: Tag, group: "Policies" },
  { kind: "refund_policy", icon: Tag, group: "Policies" },
  { kind: "cancellation_policy", icon: Tag, group: "Policies" },
  { kind: "data_retention_policy", icon: Lock, group: "Privacy" },
  { kind: "cookie_policy", icon: Package, group: "Privacy" },
  { kind: "children_policy", icon: Shield, group: "Privacy" },
  { kind: "community_guidelines", icon: Tag, group: "Trust & safety" },
  { kind: "accessibility_statement", icon: Settings, group: "Trust & safety" },
  { kind: "grievance_redressal", icon: Headphones, group: "Trust & safety" },
];

export default function LegalIndex() {
  const router = useRouter();
  const { data: docs = [], isLoading } = useAllLegalDocuments();
  const lookup = new Map(docs.map((d) => [d.kind, d]));

  const groups = ["Policies", "Privacy", "Trust & safety"];

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Legal & policies" subtitle="Versioned, machine-readable" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 22, paddingBottom: 32 }}>
          <Card padded={16} tone="subtle" elevation="none">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: tokens.color.state.success,
                }}
              />
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 11,
                  fontWeight: "600",
                  color: tokens.color.ink[600],
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                Compliance
              </Text>
            </View>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 13,
                color: tokens.color.ink[700],
                lineHeight: 20,
              }}
            >
              C-Supply complies with the Digital Personal Data Protection Act 2023, IT Rules 2021, and the
              Consumer Protection (E-Commerce) Rules 2020. Every document below is versioned and your
              acceptance is recorded with a timestamp.
            </Text>
          </Card>

          {groups.map((g) => {
            const groupItems = SECTIONS.filter((s) => s.group === g);
            return (
              <View key={g} style={{ gap: 8 }}>
                <SectionLabel label={g} caps size="sm" />
                <Card padded={false}>
                  {groupItems.map((s, idx) => {
                    const doc = lookup.get(s.kind);
                    return (
                      <ListItem
                        key={s.kind}
                        icon={<s.icon size={18} color={tokens.color.customer.primary} />}
                        title={doc?.title ?? prettyName(s.kind)}
                        subtitle={doc ? `Version ${doc.version}` : "Loading..."}
                        divider={idx > 0}
                        onPress={() => router.push(`/legal/${s.kind.replace(/_/g, "-")}` as any)}
                      />
                    );
                  })}
                </Card>
              </View>
            );
          })}

          <Card padded={16}>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 11,
                fontWeight: "600",
                color: tokens.color.ink[500],
                letterSpacing: 0.6,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Need to reach us?
            </Text>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 14,
                fontWeight: "500",
                color: tokens.color.ink[900],
              }}
            >
              Grievance Officer
            </Text>
            <Text
              style={{
                marginTop: 2,
                fontFamily: tokens.font.family.mono,
                fontSize: 12,
                color: tokens.color.ink[600],
              }}
            >
              grievance@csupply.in
            </Text>
            <Text
              style={{
                marginTop: 1,
                fontFamily: tokens.font.family.body,
                fontSize: 12,
                color: tokens.color.ink[500],
              }}
            >
              Acknowledged within 24 hours · Resolved within 15 days
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function prettyName(kind: string) {
  return kind.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
