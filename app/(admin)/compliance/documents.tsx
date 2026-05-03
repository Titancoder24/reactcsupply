import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill, ListItem } from "@/components/ui";
import { useAllLegalDocuments } from "@/hooks/use-legal";
import { Tag, Shield, ChevronRight, Headphones, Lock, Package, Settings } from "@/components/ui/Icon";

const ICONS: Record<string, any> = {
  privacy_policy: Shield,
  terms_of_service: Tag,
  refund_policy: Tag,
  cancellation_policy: Tag,
  cookie_policy: Package,
  children_policy: Shield,
  data_retention_policy: Lock,
  accessibility_statement: Settings,
  grievance_redressal: Headphones,
  community_guidelines: Tag,
};

export default function ComplianceDocuments() {
  const router = useRouter();
  const { data: docs = [] } = useAllLegalDocuments();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Legal documents" subtitle={`${docs.length} live versions`} />

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
              Each document has a single live version. Editing creates a new version with a future
              effective date; the old version is archived but never deleted. Users are prompted to
              re-accept on next launch when a version flips.
            </Text>
          </Card>

          <Card padded={false}>
            {docs.map((d, idx) => {
              const Icon = ICONS[d.kind] ?? Tag;
              return (
                <Pressable
                  key={d.id}
                  onPress={() => router.push(`/legal/${d.kind.replace(/_/g, "-")}` as any)}
                  style={({ pressed }) => ({
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.hairline,
                    backgroundColor: pressed ? tokens.color.ink[50] : "transparent",
                  })}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: tokens.color.ink[50],
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={16} color={tokens.color.customer.primary} />
                  </View>
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
                      {d.title}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.mono,
                        fontSize: 11,
                        color: tokens.color.ink[500],
                      }}
                    >
                      {d.kind} · v{d.version}
                    </Text>
                  </View>
                  <StatusPill label="Live" tone="success" size="xs" />
                  <ChevronRight size={14} color={tokens.color.ink[400]} />
                </Pressable>
              );
            })}
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
