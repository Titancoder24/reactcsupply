import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, Markdown, StatusPill } from "@/components/ui";
import { useLegalDocument, type LegalDocKind } from "@/hooks/use-legal";

export default function LegalDocumentScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const kind = (slug ?? "privacy-policy").replace(/-/g, "_") as LegalDocKind;
  const { data: doc, isLoading } = useLegalDocument(kind);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title={doc?.title ?? "Legal"} subtitle={doc ? `v${doc.version}` : undefined} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 32 }}>
          {isLoading ? (
            <Text
              style={{
                textAlign: "center",
                padding: 32,
                fontFamily: tokens.font.family.body,
                color: tokens.color.ink[500],
              }}
            >
              Loading document...
            </Text>
          ) : !doc ? (
            <Text
              style={{
                textAlign: "center",
                padding: 32,
                fontFamily: tokens.font.family.body,
                color: tokens.color.ink[500],
              }}
            >
              Document not available.
            </Text>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <StatusPill label="Current" tone="success" size="xs" />
                <StatusPill label={`Effective ${formatDate(doc.effective_at)}`} tone="info" size="xs" />
                <StatusPill label="India" tone="neutral" size="xs" />
              </View>
              <Card padded={20}>
                <Markdown text={doc.body_md} />
              </Card>
              <Text
                style={{
                  fontFamily: tokens.font.family.mono,
                  fontSize: 11,
                  color: tokens.color.ink[400],
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {doc.kind} · v{doc.version} · {doc.locale}
              </Text>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
