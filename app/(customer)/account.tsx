import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, Header, StatusPill } from "@/components/ui";
import { ChevronRight, User, Settings, Lock, Bell, Headphones, Shield, Tag } from "@/components/ui/Icon";

const MENU_GROUPS = [
  {
    label: "Account",
    items: [
      { icon: User, label: "Personal Information", route: null },
      { icon: Tag, label: "Saved Addresses", route: null },
      { icon: Tag, label: "GST Details", route: null },
    ],
  },
  {
    label: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", route: null },
      { icon: Settings, label: "App Settings", route: null },
    ],
  },
  {
    label: "Security",
    items: [
      { icon: Lock, label: "Change Passcode", route: null },
      { icon: Shield, label: "Privacy & Data", route: null },
    ],
  },
  {
    label: "Support",
    items: [
      { icon: Headphones, label: "Support & Help", route: null },
    ],
  },
];

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header title="Account" showBack={false} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 32 }}>
          {/* Profile card */}
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: tokens.color.customer.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Poppins", fontWeight: "700", fontSize: 24 }}>
                  R
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: 18,
                    color: tokens.color.text.dark,
                  }}
                >
                  Ramesh Kumar
                </Text>
                <Text style={{ fontFamily: "Poppins", fontSize: 13, color: tokens.color.text.muted }}>
                  +91 9000000001
                </Text>
                <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
                  <StatusPill label="Verified" tone="success" />
                  <StatusPill label="Customer" tone="info" />
                </View>
              </View>
            </View>
          </Card>

          {MENU_GROUPS.map((group) => (
            <View key={group.label}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 12,
                  color: tokens.color.text.muted,
                  marginBottom: 8,
                  marginLeft: 4,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {group.label}
              </Text>
              <Card padded={false}>
                {group.items.map((item, idx) => (
                  <Pressable
                    key={item.label}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      gap: 12,
                      borderBottomWidth: idx < group.items.length - 1 ? 1 : 0,
                      borderBottomColor: tokens.color.border.divider,
                    }}
                  >
                    <item.icon size={20} color={tokens.color.customer.primary} />
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "Poppins",
                        fontSize: 14,
                        color: tokens.color.text.dark,
                      }}
                    >
                      {item.label}
                    </Text>
                    <ChevronRight size={18} color={tokens.color.text.muted} />
                  </Pressable>
                ))}
              </Card>
            </View>
          ))}

          <Pressable
            onPress={() => router.replace("/")}
            style={{
              marginTop: 8,
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 12,
              borderWidth: 1.5,
              borderColor: tokens.color.state.danger,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 14,
                color: tokens.color.state.danger,
              }}
            >
              Logout
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
