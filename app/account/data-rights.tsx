import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import { Shield, Tag, Lock, Package, Headphones, ArrowRight, Check } from "@/components/ui/Icon";
import { supabase } from "@/services/supabase";

type Action = "access" | "export" | "rectification" | "erasure" | "portability" | "restriction" | "withdraw_consent" | "grievance";

const ACTIONS: { kind: Action; title: string; subtitle: string; icon: any }[] = [
  { kind: "access", title: "Access my data", subtitle: "See a summary of what we hold", icon: Shield },
  { kind: "export", title: "Export my data", subtitle: "Download a JSON archive of your records", icon: Package },
  { kind: "rectification", title: "Correct my data", subtitle: "Fix profile, address or KYC details", icon: Tag },
  { kind: "portability", title: "Port my data", subtitle: "Transfer data to another service", icon: Package },
  { kind: "restriction", title: "Restrict processing", subtitle: "Pause analytics or marketing on your data", icon: Lock },
  { kind: "withdraw_consent", title: "Withdraw consent", subtitle: "Stop a previously-granted consent", icon: Lock },
  { kind: "erasure", title: "Delete my account", subtitle: "Permanent — 30-day cool-off applies", icon: Shield },
  { kind: "grievance", title: "Raise a grievance", subtitle: "Officer responds within 24 hours", icon: Headphones },
];

export default function DataRightsScreen() {
  const router = useRouter();
  const [pending, setPending] = useState<Action | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  const submit = async (kind: Action) => {
    if (kind === "erasure") {
      router.push("/account/delete");
      return;
    }
    setPending(kind);
    const { data, error } = await supabase
      .from("dsr_requests")
      .insert({ kind, status: "received" })
      .select("ticket_number")
      .single();
    if (!error && data) {
      setTicket((data as any).ticket_number);
    } else {
      setTicket(`DSR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-PEND`);
    }
    setPending(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Manage your data" subtitle="DPDPA Section 11 rights" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 32 }}>
          {ticket && (
            <Card padded={16} tone="subtle" elevation="none" style={{ borderColor: "rgba(22,163,74,0.2)" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: tokens.color.brand.green,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={16} color="#fff" strokeWidth={3} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontWeight: "600",
                      fontSize: 13,
                      color: tokens.color.ink[900],
                    }}
                  >
                    Request received
                  </Text>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.mono,
                      fontSize: 12,
                      color: tokens.color.ink[600],
                      marginTop: 2,
                    }}
                  >
                    {ticket}
                  </Text>
                </View>
                <StatusPill label="30 days" tone="info" size="xs" />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: tokens.font.family.body,
                  fontSize: 12,
                  color: tokens.color.ink[600],
                  lineHeight: 18,
                }}
              >
                We'll respond within 30 days as required by DPDPA Section 11. Updates will be sent to
                your registered phone and email.
              </Text>
            </Card>
          )}

          <Card padded={16}>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 11,
                fontWeight: "600",
                color: tokens.color.ink[500],
                letterSpacing: 0.6,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Your rights
            </Text>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 13,
                color: tokens.color.ink[700],
                lineHeight: 20,
              }}
            >
              Under the Digital Personal Data Protection Act 2023 (Section 11) and the EU GDPR
              (Articles 15-22) you have the rights below. We respond to every request within 30 days.
            </Text>
          </Card>

          <View style={{ gap: 8 }}>
            <SectionLabel label="Available actions" caps size="sm" />
            <Card padded={false}>
              {ACTIONS.map((a, idx) => (
                <ListItem
                  key={a.kind}
                  icon={<a.icon size={18} color={tokens.color.customer.primary} />}
                  title={a.title}
                  subtitle={a.subtitle}
                  divider={idx > 0}
                  onPress={() => submit(a.kind)}
                  trailing={
                    pending === a.kind ? (
                      <Text
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 12,
                          color: tokens.color.ink[500],
                        }}
                      >
                        ...
                      </Text>
                    ) : undefined
                  }
                />
              ))}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
