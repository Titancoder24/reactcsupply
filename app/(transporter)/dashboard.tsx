import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Button } from "@/components/ui";
import { Truck, MapPin, Bell, Package, User, Headphones, ChevronRight, Clock } from "@/components/ui/Icon";
import { formatINR } from "@/lib/utils";

export default function TransporterDashboard() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header */}
          <View
            style={{
              padding: 20,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: tokens.color.border.divider,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: tokens.color.brand.green,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "700", fontSize: 18 }}>S</Text>
              </View>
              <View>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>Welcome,</Text>
                <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 16, color: tokens.color.text.primary }}>
                  Suresh Reddy
                </Text>
              </View>
            </View>
            <Bell size={24} color={tokens.color.text.primary} />
          </View>

          {/* Availability toggle */}
          <View style={{ padding: 20 }}>
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      fontSize: 16,
                      color: tokens.color.text.primary,
                    }}
                  >
                    Available for Jobs
                  </Text>
                  <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>
                    {available ? "Online — receiving requests" : "Offline"}
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

            {/* KPI */}
            <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
              <Card style={{ flex: 1, backgroundColor: tokens.color.bgKpi.green, elevation: 0, shadowOpacity: 0 }} elevated={false}>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>Today Trips</Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    fontSize: 24,
                    color: tokens.color.text.primary,
                    marginTop: 4,
                  }}
                >
                  04
                </Text>
              </Card>
              <Card style={{ flex: 1, backgroundColor: tokens.color.bgKpi.purple, elevation: 0, shadowOpacity: 0 }} elevated={false}>
                <Text style={{ fontFamily: "Poppins", fontSize: 12, color: tokens.color.text.secondary }}>This Week</Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    fontSize: 24,
                    color: tokens.color.text.primary,
                    marginTop: 4,
                  }}
                >
                  {formatINR(18200)}
                </Text>
              </Card>
            </View>

            {/* Demo: open a fake job */}
            <View style={{ marginTop: 24 }}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 16,
                  color: tokens.color.text.primary,
                  marginBottom: 12,
                }}
              >
                Demo Actions
              </Text>
              <View style={{ gap: 12 }}>
                <Button
                  label="Simulate Incoming Job Request"
                  onPress={() => router.push("/(transporter)/job-request")}
                  surface="transporter"
                />
                <Button
                  label="View Live Tracking"
                  variant="secondary"
                  onPress={() => router.push("/(transporter)/tracking")}
                  surface="transporter"
                />
                <Button
                  label="Delivery & Proof"
                  variant="secondary"
                  onPress={() => router.push("/(transporter)/proof")}
                  surface="transporter"
                />
              </View>
            </View>

            {/* Menu */}
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
                color: tokens.color.text.primary,
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              Account
            </Text>
            <Card padded={false}>
              {[
                { label: "My Profile", Icon: User },
                { label: "Vehicles", Icon: Truck },
                { label: "Documents", Icon: Package },
                { label: "Earnings", Icon: Clock },
                { label: "Support & Help", Icon: Headphones },
              ].map((it, idx) => (
                <Pressable
                  key={it.label}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    gap: 12,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: tokens.color.border.divider,
                  }}
                >
                  <it.Icon size={20} color={tokens.color.brand.green} />
                  <Text style={{ flex: 1, fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.primary }}>
                    {it.label}
                  </Text>
                  <ChevronRight size={18} color={tokens.color.text.muted} />
                </Pressable>
              ))}
            </Card>

            <Pressable
              onPress={() => router.replace("/")}
              style={{
                marginTop: 24,
                alignItems: "center",
                paddingVertical: 14,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: tokens.color.state.danger,
              }}
            >
              <Text style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: 14, color: tokens.color.state.danger }}>
                Logout
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
