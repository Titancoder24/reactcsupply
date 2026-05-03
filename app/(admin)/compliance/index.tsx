import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Card, Header, KpiCard, ListItem, SectionLabel, StatusPill } from "@/components/ui";
import {
  Shield,
  Tag,
  Headphones,
  Lock,
  Package,
  Building,
  ChevronRight,
  ArrowRight,
  Settings,
  Bell,
} from "@/components/ui/Icon";
import { supabase } from "@/services/supabase";

export default function ComplianceDashboard() {
  const router = useRouter();

  const { data: stats } = useQuery({
    queryKey: ["compliance-stats"],
    queryFn: async () => {
      const [docs, dsr, grievances, manifest] = await Promise.all([
        supabase.from("legal_documents").select("*", { count: "exact", head: true }).eq("is_current", true),
        supabase.from("dsr_requests").select("*", { count: "exact", head: true }).in("status", ["received", "verifying_identity", "in_progress"]),
        supabase.from("grievance_tickets").select("*", { count: "exact", head: true }).in("status", ["open", "acknowledged", "in_progress"]),
        supabase.from("privacy_manifest").select("*", { count: "exact", head: true }),
      ]);
      return {
        docs: docs.count ?? 0,
        dsrOpen: dsr.count ?? 0,
        grievanceOpen: grievances.count ?? 0,
        manifest: manifest.count ?? 0,
      };
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header
          title="Compliance"
          subtitle="DPDPA · App Store · Play Store"
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
          {/* Compliance posture */}
          <Card padded={20} style={{ borderColor: "rgba(22,163,74,0.2)", backgroundColor: tokens.color.brand.green50 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: tokens.color.state.success,
                }}
              />
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontWeight: "700",
                  fontSize: 11,
                  color: tokens.color.brand.green600,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                Compliance posture
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
              Day-zero compliant
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
              All required legal documents published. Account deletion live. Privacy manifest in
              sync with App Store and Play Store packages.
            </Text>
          </Card>

          {/* KPIs */}
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="Live legal docs"
                value={String(stats?.docs ?? "...")}
                tone="green"
                fullWidth
              />
              <KpiCard
                label="Open DSR"
                value={String(stats?.dsrOpen ?? "...")}
                tone={stats && stats.dsrOpen > 0 ? "orange" : "default"}
                fullWidth
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <KpiCard
                label="Open grievances"
                value={String(stats?.grievanceOpen ?? "...")}
                tone={stats && stats.grievanceOpen > 0 ? "orange" : "default"}
                fullWidth
              />
              <KpiCard
                label="Privacy manifest"
                value={`${stats?.manifest ?? 0} entries`}
                tone="blue"
                fullWidth
              />
            </View>
          </View>

          {/* Sections */}
          <View style={{ gap: 8 }}>
            <SectionLabel label="Records" caps size="sm" />
            <Card padded={false}>
              <ListItem
                icon={<Tag size={18} color={tokens.color.customer.primary} />}
                title="Legal documents"
                subtitle="Privacy, Terms, Refund, Grievance, Cookies, Children"
                onPress={() => router.push("/(admin)/compliance/documents")}
              />
              <ListItem
                icon={<Shield size={18} color={tokens.color.customer.primary} />}
                title="Data subject requests"
                subtitle={`${stats?.dsrOpen ?? 0} open · 30-day SLA`}
                onPress={() => router.push("/(admin)/compliance/dsr")}
                divider
              />
              <ListItem
                icon={<Headphones size={18} color={tokens.color.customer.primary} />}
                title="Grievance queue"
                subtitle={`${stats?.grievanceOpen ?? 0} open · 15-day SLA`}
                onPress={() => router.push("/(admin)/compliance/grievance")}
                divider
              />
              <ListItem
                icon={<Lock size={18} color={tokens.color.customer.primary} />}
                title="User consents"
                subtitle="Granted, withdrawn, audit trail"
                onPress={() => router.push("/(admin)/compliance/consents")}
                divider
              />
            </Card>
          </View>

          <View style={{ gap: 8 }}>
            <SectionLabel label="App store packages" caps size="sm" />
            <Card padded={false}>
              <ListItem
                icon={<Package size={18} color={tokens.color.customer.primary} />}
                title="Privacy manifest"
                subtitle="Source of truth for App Privacy + Data Safety"
                onPress={() => router.push("/(admin)/compliance/manifest")}
              />
              <ListItem
                icon={<Building size={18} color={tokens.color.customer.primary} />}
                title="Permissions inventory"
                subtitle="iOS Info.plist + Android permissions"
                onPress={() => router.push("/(admin)/compliance/permissions")}
                divider
              />
              <ListItem
                icon={<Bell size={18} color={tokens.color.customer.primary} />}
                title="Crawler permissions"
                subtitle="Robots policy for AI and search bots"
                onPress={() => router.replace("/(admin)/super-dashboard")}
                divider
              />
            </Card>
          </View>

          <View style={{ gap: 8 }}>
            <SectionLabel label="Audit & integrity" caps size="sm" />
            <Card padded={false}>
              <ListItem
                icon={<Shield size={18} color={tokens.color.customer.primary} />}
                title="Audit log"
                subtitle="Immutable record of privileged actions"
                onPress={() => router.push("/(admin)/compliance/audit")}
              />
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
