import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, StatusPill } from "@/components/ui";
import { Check, ArrowRight, Headphones } from "@/components/ui/Icon";
import { supabase } from "@/services/supabase";

const CATEGORIES = [
  "Privacy concern",
  "Order or refund issue",
  "KYC or verification",
  "Abuse or harassment",
  "Content removal",
  "Accessibility",
  "Other",
];

export default function GrievanceScreen() {
  const router = useRouter();
  const [category, setCategory] = useState("Privacy concern");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState<{ ticket: string } | null>(null);

  const submit = async () => {
    const { data, error } = await supabase
      .from("grievance_tickets")
      .insert({
        category,
        reporter_name: name,
        reporter_contact: contact,
        description,
        status: "open",
      })
      .select("ticket_number")
      .single();
    if (!error && data) {
      setSubmitted({ ticket: (data as any).ticket_number });
    } else {
      setSubmitted({
        ticket: `GRV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-PEND`,
      });
    }
  };

  if (submitted) {
    return (
      <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
          <Header title="Grievance submitted" />
          <View style={{ padding: 20, gap: 18 }}>
            <Card padded={20}>
              <View style={{ alignItems: "center", marginBottom: 12 }}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    backgroundColor: tokens.color.brand.green50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={28} color={tokens.color.brand.green} strokeWidth={3} />
                </View>
              </View>
              <Text
                style={{
                  fontFamily: tokens.font.family.display,
                  fontWeight: "700",
                  fontSize: 18,
                  color: tokens.color.ink[900],
                  textAlign: "center",
                  letterSpacing: -0.3,
                }}
              >
                We received your grievance
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  color: tokens.color.ink[500],
                  textAlign: "center",
                }}
              >
                Acknowledged within 24 hours · Resolution in 15 days
              </Text>
              <View
                style={{
                  marginTop: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderRadius: 12,
                  backgroundColor: tokens.color.ink[50],
                }}
              >
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Ticket number
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.mono,
                    fontWeight: "700",
                    fontSize: 16,
                    color: tokens.color.ink[900],
                  }}
                >
                  {submitted.ticket}
                </Text>
              </View>
            </Card>

            <Button
              label="Back to home"
              onPress={() => router.replace("/")}
              variant="secondary"
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Raise a grievance" subtitle="IT Rules 2021 redressal" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 32 }}>
          <Card padded={16} tone="subtle" elevation="none">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Headphones size={18} color={tokens.color.customer.primary} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontWeight: "600",
                    fontSize: 13,
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
              </View>
              <StatusPill label="24h ack" tone="success" size="xs" />
            </View>
          </Card>

          <Card padded={18}>
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
              Category
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map((c) => {
                const sel = category === c;
                return (
                  <Pressable
                    key={c}
                    onPress={() => setCategory(c)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 999,
                      backgroundColor: sel ? tokens.color.customer.primary : tokens.color.surface.white,
                      borderWidth: 1,
                      borderColor: sel ? tokens.color.customer.primary : tokens.color.border.input,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 12,
                        fontWeight: sel ? "600" : "500",
                        color: sel ? "#fff" : tokens.color.ink[700],
                      }}
                    >
                      {c}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Card>

          <Card padded={18} style={{ gap: 12 }}>
            <Input label="Your name" value={name} onChangeText={setName} placeholder="Optional" />
            <Input
              label="Email or phone"
              value={contact}
              onChangeText={setContact}
              placeholder="So we can reach you"
            />
            <Input
              label="Describe the issue"
              value={description}
              onChangeText={setDescription}
              placeholder="What happened? When? Any reference numbers?"
              multiline
              numberOfLines={5}
            />
          </Card>

          <Button
            label="Submit grievance"
            onPress={submit}
            disabled={description.trim().length < 10}
            iconRight={<ArrowRight size={18} color="#fff" />}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
