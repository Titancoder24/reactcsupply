import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Avatar, Button, Card, KpiCard, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import {
  Truck,
  Bell,
  Package,
  User,
  Headphones,
  Clock,
  Shield,
  ArrowRight,
} from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

export default function TransporterDashboard() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header */}
          <View
            style={{
              padding: 20,
              backgroundColor: tokens.color.surface.white,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: tokens.color.border.hairline,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Avatar name="Suresh Reddy" size={42} tone="green" showStatus />
              <View>
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
                  Driver
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 17,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                  }}
                >
                  Suresh Reddy
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: tokens.color.ink[50],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={18} color={tokens.color.ink[800]} />
            </Pressable>
          </View>

          <View style={{ padding: 20, gap: 22 }}>
            {/* Availability card */}
            <Card padded={18}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: available ? tokens.color.state.success : tokens.color.ink[400],
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontWeight: "600",
                        fontSize: 11,
                        color: available ? tokens.color.state.successText : tokens.color.ink[500],
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      {available ? "Online" : "Offline"}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginTop: 6,
                      fontFamily: tokens.font.family.display,
                      fontWeight: "700",
                      fontSize: 18,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.3,
                    }}
                  >
                    {available ? "Receiving job offers" : "Not accepting jobs"}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: tokens.font.family.body,
                      fontSize: 13,
                      color: tokens.color.ink[500],
                    }}
                  >
                    {available
                      ? "We'll notify you when a job matches your vehicle."
                      : "Toggle on to start receiving requests."}
                  </Text>
                </View>
                <Switch
                  value={available}
                  onValueChange={setAvailable}
                  thumbColor="#fff"
                  trackColor={{ true: tokens.color.brand.green, false: "#D1D5DB" }}
                />
              </View>
            </Card>

            {/* KPIs */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="Today trips"
                value="04"
                delta={{ value: "+1", trend: "up" }}
                tone="green"
                fullWidth
              />
              <KpiCard
                label="This week"
                value={formatINR(18200)}
                delta={{ value: "+22%", trend: "up" }}
                tone="purple"
                fullWidth
              />
            </View>

            {/* Demo simulator */}
            <View style={{ gap: 12 }}>
              <SectionLabel label="Demo simulator" />
              <Card padded={16}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.body,
                    fontSize: 13,
                    color: tokens.color.ink[600],
                    lineHeight: 20,
                  }}
                >
                  Walk through the operating loop end-to-end.
                </Text>
                <View style={{ height: 12 }} />
                <View style={{ gap: 8 }}>
                  <Button
                    label="Simulate incoming job"
                    onPress={() => router.push("/(transporter)/job-request")}
                    surface="transporter"
                    iconRight={<ArrowRight size={16} color="#fff" />}
                  />
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <View style={{ flex: 1 }}>
                      <Button
                        label="Live tracking"
                        variant="secondary"
                        onPress={() => router.push("/(transporter)/tracking")}
                        size="md"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button
                        label="Delivery proof"
                        variant="secondary"
                        onPress={() => router.push("/(transporter)/proof")}
                        size="md"
                      />
                    </View>
                  </View>
                </View>
              </Card>
            </View>

            {/* Verification + vehicles summary */}
            <View style={{ gap: 12 }}>
              <SectionLabel label="Operations" />
              <Card padded={false}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: tokens.color.bgKpi.green,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Shield size={18} color={tokens.color.state.success} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: tokens.font.family.body,
                        fontSize: 14,
                        fontWeight: "500",
                        color: tokens.color.ink[900],
                      }}
                    >
                      KYC verified
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: tokens.font.family.body,
                        fontSize: 12,
                        color: tokens.color.ink[500],
                      }}
                    >
                      License, RC, insurance up to date
                    </Text>
                  </View>
                  <StatusPill label="Active" tone="success" size="xs" />
                </View>

                {[
                  { icon: User, label: "Profile" },
                  { icon: Truck, label: "My vehicles", subtitle: "TS 12 AB 1234 · TS 09 CD 5678" },
                  { icon: Package, label: "Documents" },
                  { icon: Clock, label: "Earnings & payouts", subtitle: "Pending payout: ₹18,200" },
                  { icon: Headphones, label: "Support & help" },
                ].map((it) => (
                  <ListItem
                    key={it.label}
                    icon={<it.icon size={18} color={tokens.color.brand.green} />}
                    title={it.label}
                    subtitle={(it as any).subtitle}
                  />
                ))}
              </Card>
            </View>

            <Pressable
              onPress={() => router.replace("/")}
              style={({ pressed }) => ({
                alignItems: "center",
                paddingVertical: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: tokens.color.border.hairline,
                backgroundColor: pressed ? tokens.color.state.dangerBg : "transparent",
              })}
            >
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontWeight: "600",
                  fontSize: 14,
                  color: tokens.color.state.danger,
                }}
              >
                Log out
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
