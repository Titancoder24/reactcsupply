import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Avatar, Card, Header, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import {
  User,
  Tag,
  Bell,
  Settings,
  Lock,
  Shield,
  Headphones,
  Package,
} from "@/components/ui/Icon";

const MENU_GROUPS = [
  {
    label: "Account",
    items: [
      { icon: User, label: "Personal information", subtitle: "Name, phone, email" },
      { icon: Tag, label: "Saved addresses", subtitle: "2 addresses" },
      { icon: Tag, label: "GST details", subtitle: "33ABCDE1234F1Z5" },
    ],
  },
  {
    label: "Activity",
    items: [
      { icon: Package, label: "Order history" },
      { icon: Bell, label: "Notifications", subtitle: "Email, push, SMS" },
    ],
  },
  {
    label: "Security",
    items: [
      { icon: Lock, label: "Change passcode" },
      { icon: Shield, label: "Privacy & data" },
    ],
  },
  {
    label: "Support",
    items: [
      { icon: Headphones, label: "Help & support" },
      { icon: Settings, label: "App settings" },
    ],
  },
];

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header title="Account" showBack={false} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 32 }}>
          {/* Profile card */}
          <Card padded={20}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <Avatar name="Ramesh Kumar" size={56} tone="primary" showStatus />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "700",
                    fontSize: 18,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                  }}
                >
                  Ramesh Kumar
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    fontFamily: tokens.font.family.mono,
                    fontSize: 12,
                    color: tokens.color.ink[500],
                  }}
                >
                  +91 9000000001
                </Text>
                <View style={{ flexDirection: "row", gap: 6, marginTop: 8 }}>
                  <StatusPill label="Verified" tone="success" size="xs" />
                  <StatusPill label="Customer" tone="info" size="xs" />
                </View>
              </View>
            </View>
          </Card>

          {MENU_GROUPS.map((group) => (
            <View key={group.label} style={{ gap: 8 }}>
              <SectionLabel label={group.label} caps size="sm" />
              <Card padded={false}>
                {group.items.map((item, idx) => (
                  <ListItem
                    key={item.label}
                    icon={<item.icon size={18} color={tokens.color.customer.primary} />}
                    title={item.label}
                    subtitle={(item as any).subtitle}
                    divider={idx > 0}
                  />
                ))}
              </Card>
            </View>
          ))}

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

          <View style={{ alignItems: "center", paddingTop: 8 }}>
            <Text
              style={{
                fontFamily: tokens.font.family.mono,
                fontSize: 11,
                color: tokens.color.ink[400],
              }}
            >
              C-Supply v1.0.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
