import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, Header, KpiCard, ListItem, SectionLabel } from "@/components/ui";
import {
  Package,
  Tag,
  Building,
  ArrowRight,
  Settings,
  Bell,
} from "@/components/ui/Icon";
import { supabase } from "@/services/supabase";

export default function CmsHub() {
  const router = useRouter();

  const { data: stats } = useQuery({
    queryKey: ["cms-stats"],
    queryFn: async () => {
      const [media, slots, slotsFilled, categories] = await Promise.all([
        supabase.from("cms_media").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("cms_image_slots").select("*", { count: "exact", head: true }),
        supabase.from("cms_image_slots").select("*", { count: "exact", head: true }).not("media_id", "is", null),
        supabase.from("categories").select("*", { count: "exact", head: true }).eq("is_active", true),
      ]);
      return {
        media: media.count ?? 0,
        slots: slots.count ?? 0,
        slotsFilled: slotsFilled.count ?? 0,
        categories: categories.count ?? 0,
      };
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header
          title="CMS"
          subtitle="Content for every surface"
          rightActions={
            <Pressable
              onPress={() => router.replace("/(admin)/super-dashboard")}
              hitSlop={6}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: tokens.color.ink[50],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Settings size={18} color={tokens.color.ink[800]} />
            </Pressable>
          }
        />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 22, paddingBottom: 32 }}>
          <Card padded={20}>
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                fontSize: 11,
                fontWeight: "600",
                color: tokens.color.customer.primary,
                letterSpacing: 0.6,
                textTransform: "uppercase",
              }}
            >
              Content Studio
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontFamily: tokens.font.family.display,
                fontWeight: "700",
                fontSize: 18,
                color: tokens.color.ink[900],
                letterSpacing: -0.3,
              }}
            >
              Edit imagery, illustrations, and categories live
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontFamily: tokens.font.family.body,
                fontSize: 13,
                color: tokens.color.ink[600],
                lineHeight: 19,
              }}
            >
              Every image you change here goes live on Customer, Vendor, and Transporter surfaces
              within seconds. No app update required.
            </Text>
          </Card>

          {/* Stats */}
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="Media items"
                value={String(stats?.media ?? "...")}
                tone="blue"
                fullWidth
              />
              <KpiCard
                label="Image slots"
                value={`${stats?.slotsFilled ?? 0} / ${stats?.slots ?? 0}`}
                tone="green"
                fullWidth
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="Live categories"
                value={String(stats?.categories ?? "...")}
                tone="purple"
                fullWidth
              />
              <KpiCard label="Active themes" value="3" tone="orange" fullWidth />
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <SectionLabel label="Manage" caps size="sm" />
            <Card padded={false}>
              <ListItem
                icon={<Package size={18} color={tokens.color.customer.primary} />}
                title="Media library"
                subtitle="Upload, browse, tag, and delete imagery"
                onPress={() => router.push("/(admin)/cms/media")}
              />
              <ListItem
                icon={<Tag size={18} color={tokens.color.customer.primary} />}
                title="Image slots"
                subtitle="Hero cards, illustrations, banners across every screen"
                onPress={() => router.push("/(admin)/cms/slots")}
                divider
              />
              <ListItem
                icon={<Building size={18} color={tokens.color.customer.primary} />}
                title="Categories"
                subtitle="Edit name, image, sort order, and visibility"
                onPress={() => router.push("/(admin)/cms/categories")}
                divider
              />
              <ListItem
                icon={<Bell size={18} color={tokens.color.customer.primary} />}
                title="Notification templates"
                subtitle="SMS / email / push / WhatsApp copy by locale"
                onPress={() => router.replace("/(admin)/super-dashboard")}
                divider
              />
              <ListItem
                icon={<Settings size={18} color={tokens.color.customer.primary} />}
                title="Theme & branding"
                subtitle="Colors, typography, logo"
                onPress={() => router.replace("/(admin)/super-dashboard")}
                divider
              />
            </Card>
          </View>

          <View style={{ gap: 8 }}>
            <SectionLabel label="By surface" caps size="sm" />
            <Card padded={false}>
              {[
                { label: "Customer surface", surface: "customer", desc: "Splash, home, banners, empty states" },
                { label: "Vendor surface", surface: "vendor", desc: "Onboarding hero, success, dashboard empty" },
                { label: "Transporter surface", surface: "transporter", desc: "Welcome, callout illustrations, delivery" },
                { label: "Brand assets", surface: "brand", desc: "Logo, app icon, OpenGraph defaults" },
                { label: "Shared assets", surface: "shared", desc: "Errors, offline, fallback illustrations" },
              ].map((s, idx) => (
                <ListItem
                  key={s.surface}
                  title={s.label}
                  subtitle={s.desc}
                  divider={idx > 0}
                  onPress={() => router.push({ pathname: "/(admin)/cms/slots", params: { surface: s.surface } })}
                />
              ))}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
