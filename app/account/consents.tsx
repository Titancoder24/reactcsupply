import React, { useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Card, Header, SectionLabel } from "@/components/ui";

interface ConsentRow {
  key: string;
  title: string;
  description: string;
  defaultGranted?: boolean;
  required?: boolean;
}

const GROUPS: { label: string; rows: ConsentRow[] }[] = [
  {
    label: "Communications",
    rows: [
      {
        key: "transactional_email",
        title: "Transactional email",
        description:
          "Order confirmations, delivery updates, payment receipts. Required for service.",
        defaultGranted: true,
        required: true,
      },
      {
        key: "transactional_sms",
        title: "Transactional SMS",
        description: "OTPs and order status updates by text. Required for service.",
        defaultGranted: true,
        required: true,
      },
      {
        key: "push_notifications",
        title: "Push notifications",
        description: "Order updates, job offers, delivery alerts.",
        defaultGranted: true,
      },
      {
        key: "marketing_email",
        title: "Marketing email",
        description: "Promotions, new vendors, monthly digest. Off by default.",
      },
      {
        key: "marketing_sms",
        title: "Marketing SMS",
        description: "Limited promotional messages. Off by default.",
      },
      {
        key: "marketing_whatsapp",
        title: "WhatsApp marketing",
        description: "Order confirmations and offers via WhatsApp Business.",
      },
    ],
  },
  {
    label: "Data and personalisation",
    rows: [
      {
        key: "analytics",
        title: "Analytics",
        description: "Anonymised usage to improve performance and reliability.",
        defaultGranted: true,
      },
      {
        key: "crash_reporting",
        title: "Crash reporting",
        description: "Diagnostics to fix bugs faster. Not linked to your identity.",
        defaultGranted: true,
      },
      {
        key: "personalised_ads",
        title: "Personalised ads",
        description: "Off — we don't run personalised ads in v1.",
      },
      {
        key: "profiling",
        title: "Behavioural profiling",
        description: "Off — we don't profile users for automated decisions.",
      },
    ],
  },
  {
    label: "Sharing and tracking",
    rows: [
      {
        key: "third_party_sharing",
        title: "Sharing with third parties (beyond service providers)",
        description: "Off — we never sell your personal data.",
      },
      {
        key: "app_tracking",
        title: "App tracking transparency",
        description: "iOS only. Off by default.",
      },
      {
        key: "location_precise",
        title: "Precise location",
        description: "Used during delivery flows only. You can revoke any time in Settings.",
      },
    ],
  },
];

export default function ConsentsScreen() {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    GROUPS.forEach((g) => g.rows.forEach((r) => (init[r.key] = !!r.defaultGranted)));
    return init;
  });

  const set = (key: string, v: boolean) => setState((s) => ({ ...s, [key]: v }));

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Consent center" subtitle="DPDPA Section 6" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 20, paddingBottom: 32 }}>
          <Card padded={16} tone="subtle" elevation="none">
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 13,
                color: tokens.color.ink[700],
                lineHeight: 20,
              }}
            >
              You can grant, revise, or withdraw consent at any time. Required consents power core
              service functionality and cannot be turned off — if you no longer wish to use the
              service, please delete your account from{" "}
              <Text style={{ fontWeight: "600", color: tokens.color.ink[900] }}>
                Account → Privacy → Delete account
              </Text>
              .
            </Text>
          </Card>

          {GROUPS.map((g) => (
            <View key={g.label} style={{ gap: 8 }}>
              <SectionLabel label={g.label} caps size="sm" />
              <Card padded={false}>
                {g.rows.map((r, idx) => (
                  <View
                    key={r.key}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 14,
                      borderTopWidth: idx > 0 ? 1 : 0,
                      borderTopColor: tokens.color.border.hairline,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text
                          style={{
                            fontFamily: tokens.font.family.body,
                            fontWeight: "500",
                            fontSize: 14,
                            color: tokens.color.ink[900],
                          }}
                        >
                          {r.title}
                        </Text>
                        {r.required && (
                          <View
                            style={{
                              paddingHorizontal: 6,
                              paddingVertical: 1,
                              borderRadius: 4,
                              backgroundColor: tokens.color.ink[100],
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: tokens.font.family.body,
                                fontSize: 9,
                                fontWeight: "600",
                                color: tokens.color.ink[600],
                                letterSpacing: 0.4,
                                textTransform: "uppercase",
                              }}
                            >
                              Required
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text
                        style={{
                          marginTop: 3,
                          fontFamily: tokens.font.family.body,
                          fontSize: 12,
                          color: tokens.color.ink[500],
                          lineHeight: 17,
                        }}
                      >
                        {r.description}
                      </Text>
                    </View>
                    <Switch
                      value={!!state[r.key]}
                      onValueChange={(v) => {
                        if (!r.required) set(r.key, v);
                      }}
                      disabled={r.required}
                      thumbColor="#fff"
                      trackColor={{ true: tokens.color.brand.green, false: "#D1D5DB" }}
                    />
                  </View>
                ))}
              </Card>
            </View>
          ))}

          <Text
            style={{
              fontFamily: tokens.font.family.mono,
              fontSize: 11,
              color: tokens.color.ink[400],
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Recorded with timestamp + IP for DPDPA proof of consent
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
