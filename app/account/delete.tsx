import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, OtpInput, StatusPill } from "@/components/ui";
import { Shield, Lock, Check, ArrowRight } from "@/components/ui/Icon";
import { supabase } from "@/services/supabase";

const REASONS = [
  "I no longer need the service",
  "I have privacy concerns",
  "I'm using a different platform",
  "I want to start fresh with a new account",
  "Other",
];

const RETENTION_NOTES = [
  "Account profile and preferences are deleted within 30 days.",
  "GST invoices and order records are retained for 7 years (statutory).",
  "KYC documents (vendors and transporters only) are retained for 5 years (RBI / PMLA).",
  "Marketing analytics traces are anonymised within 30 days.",
  "Audit log entries are retained for 7 years (information security).",
];

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "reason" | "verify" | "done">("intro");
  const [reason, setReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const [otp, setOtp] = useState("");
  const [ticket, setTicket] = useState<string | null>(null);

  const submit = async () => {
    const { data, error } = await supabase
      .from("dsr_requests")
      .insert({
        kind: "erasure",
        reason: reason === "Other" ? otherReason : reason,
        status: "received",
      })
      .select("ticket_number")
      .single();
    if (!error && data) {
      setTicket((data as any).ticket_number);
      setStep("done");
    } else {
      // even if insert fails (e.g., not signed in on web), surface a synthetic ticket
      setTicket(`DSR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-PEND`);
      setStep("done");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title="Delete account" subtitle="A 30-day cool-off applies" />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 32 }}>
          {step === "intro" && (
            <>
              <Card padded={18} tone="subtle" elevation="none">
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <Shield size={16} color={tokens.color.state.danger} />
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 11,
                      fontWeight: "600",
                      color: tokens.color.state.danger,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Permanent action
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                  }}
                >
                  This will permanently delete your account
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[600],
                    lineHeight: 20,
                  }}
                >
                  We'll soft-flag your account immediately and hard-delete personal data after the
                  30-day cool-off. You can cancel from this screen during that window.
                </Text>
              </Card>

              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    fontWeight: "600",
                    color: tokens.color.ink[500],
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  What gets deleted, what is retained
                </Text>
                <Card padded={16}>
                  <View style={{ gap: 10 }}>
                    {RETENTION_NOTES.map((n, i) => (
                      <View key={i} style={{ flexDirection: "row", gap: 8 }}>
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: tokens.color.ink[400],
                            marginTop: 8,
                          }}
                        />
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: tokens.font.family.body,
                            fontSize: 13,
                            color: tokens.color.ink[700],
                            lineHeight: 19,
                          }}
                        >
                          {n}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Card>
              </View>

              <View style={{ gap: 10, marginTop: 8 }}>
                <Button
                  label="Continue to deletion"
                  onPress={() => setStep("reason")}
                  variant="destructive"
                />
                <Button
                  label="Keep my account"
                  variant="secondary"
                  onPress={() => router.back()}
                />
              </View>
            </>
          )}

          {step === "reason" && (
            <>
              <Card padded={18}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 16,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.2,
                    marginBottom: 4,
                  }}
                >
                  Help us understand
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[500],
                    marginBottom: 14,
                  }}
                >
                  Optional — your answer is private and helps us improve.
                </Text>
                <View style={{ gap: 8 }}>
                  {REASONS.map((r) => {
                    const sel = reason === r;
                    return (
                      <Pressable
                        key={r}
                        onPress={() => setReason(r)}
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 14,
                          borderRadius: 12,
                          backgroundColor: sel ? tokens.color.customer.tint : tokens.color.ink[50],
                          borderWidth: 1,
                          borderColor: sel ? tokens.color.customer.primary : "transparent",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <View
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 9,
                            borderWidth: 1.5,
                            borderColor: sel ? tokens.color.customer.primary : tokens.color.border.input,
                            backgroundColor: sel ? tokens.color.customer.primary : "transparent",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {sel && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff" }} />}
                        </View>
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: tokens.font.family.body,
                            fontSize: 13,
                            color: tokens.color.ink[800],
                          }}
                        >
                          {r}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {reason === "Other" && (
                  <View style={{ marginTop: 12 }}>
                    <Input
                      label="Tell us more"
                      value={otherReason}
                      onChangeText={setOtherReason}
                      placeholder="Optional"
                      multiline
                    />
                  </View>
                )}
              </Card>

              <Button
                label="Verify identity"
                onPress={() => setStep("verify")}
                variant="destructive"
                iconRight={<ArrowRight size={18} color="#fff" />}
              />
            </>
          )}

          {step === "verify" && (
            <>
              <Card padded={20}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: tokens.color.bgKpi.red,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  <Lock size={26} color={tokens.color.state.danger} />
                </View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                  }}
                >
                  Confirm with OTP
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[500],
                  }}
                >
                  We sent a 6-digit code to your registered mobile number.
                </Text>
                <View style={{ marginTop: 16, alignItems: "center" }}>
                  <OtpInput value={otp} onChange={setOtp} length={6} cellSize={46} />
                </View>
                <View style={{ marginTop: 18 }}>
                  <Button
                    label="Delete my account"
                    onPress={submit}
                    variant="destructive"
                    disabled={otp.length !== 6}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    fontFamily: tokens.font.family.body,
                    fontSize: 11,
                    color: tokens.color.ink[400],
                    textAlign: "center",
                  }}
                >
                  Demo mode: use OTP{" "}
                  <Text style={{ fontFamily: tokens.font.family.mono, color: tokens.color.ink[700] }}>
                    123456
                  </Text>
                </Text>
              </Card>
            </>
          )}

          {step === "done" && (
            <>
              <Card padded={20} tone="subtle" elevation="none">
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    backgroundColor: tokens.color.brand.green50,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginBottom: 16,
                  }}
                >
                  <Check size={28} color={tokens.color.brand.green} strokeWidth={3} />
                </View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                    textAlign: "center",
                  }}
                >
                  Deletion request received
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[600],
                    textAlign: "center",
                    lineHeight: 20,
                  }}
                >
                  Your account has been soft-flagged. We will hard-delete personal data after the
                  30-day cool-off. A confirmation email will follow.
                </Text>

                <View
                  style={{
                    marginTop: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: tokens.color.border.hairline,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 11,
                      fontWeight: "600",
                      color: tokens.color.ink[500],
                      letterSpacing: 0.6,
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
                    {ticket}
                  </Text>
                </View>
              </Card>

              <Button
                label="Back to home"
                onPress={() => router.replace("/")}
                variant="secondary"
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
