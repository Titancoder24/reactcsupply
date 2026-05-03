import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Card, FilterPill, Header, SectionLabel, StatusPill } from "@/components/ui";
import { ChevronRight } from "@/components/ui/Icon";
import { useImageSlots } from "@/hooks/use-cms";

const SURFACES = ["all", "customer", "vendor", "transporter", "brand", "shared"] as const;

export default function ImageSlotsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ surface?: string }>();
  const initial = (SURFACES as readonly string[]).includes(params.surface ?? "")
    ? (params.surface as string)
    : "all";
  const [filter, setFilter] = useState(initial);

  const { data: slots = [], isLoading } = useImageSlots(filter === "all" ? undefined : filter);

  const grouped = useMemo(() => {
    const m = new Map<string, typeof slots>();
    slots.forEach((s) => {
      const k = s.group_name ?? "Other";
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(s);
    });
    return Array.from(m.entries());
  }, [slots]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header
          title="Image slots"
          subtitle={`${slots.filter((s) => s.media_id || s.fallback_url).length} / ${slots.length} filled`}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}
        >
          {SURFACES.map((s) => (
            <FilterPill
              key={s}
              label={s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
              active={filter === s}
              onPress={() => setFilter(s)}
            />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 18, paddingBottom: 32 }}>
          {isLoading ? (
            <Text
              style={{
                textAlign: "center",
                fontFamily: tokens.font.family.body,
                color: tokens.color.ink[500],
              }}
            >
              Loading slots...
            </Text>
          ) : (
            grouped.map(([group, items]) => (
              <View key={group} style={{ gap: 8 }}>
                <SectionLabel label={group} caps size="sm" />
                <View style={{ gap: 10 }}>
                  {items.map((slot) => (
                    <Pressable
                      key={slot.id}
                      onPress={() =>
                        router.push({
                          pathname: "/(admin)/cms/slot",
                          params: { id: slot.id, key: slot.slot_key },
                        })
                      }
                    >
                      <Card padded={12}>
                        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                          <View
                            style={{
                              width: 64,
                              height: 64,
                              borderRadius: 10,
                              backgroundColor: tokens.color.ink[100],
                              overflow: "hidden",
                              borderWidth: 1,
                              borderColor: tokens.color.border.hairline,
                            }}
                          >
                            {slot.resolved_url ? (
                              <Image
                                source={{ uri: slot.resolved_url }}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                              />
                            ) : null}
                          </View>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  flex: 1,
                                  fontFamily: tokens.font.family.display,
                                  fontWeight: "600",
                                  fontSize: 14,
                                  color: tokens.color.ink[900],
                                  letterSpacing: -0.2,
                                }}
                              >
                                {slot.display_name}
                              </Text>
                              {slot.required && <StatusPill label="Required" tone="warning" size="xs" dot={false} />}
                            </View>
                            <Text
                              numberOfLines={1}
                              style={{
                                marginTop: 2,
                                fontFamily: tokens.font.family.mono,
                                fontSize: 11,
                                color: tokens.color.ink[500],
                              }}
                            >
                              {slot.slot_key}
                            </Text>
                            <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                              {slot.recommended_width && slot.recommended_height && (
                                <Text
                                  style={{
                                    fontFamily: tokens.font.family.mono,
                                    fontSize: 10,
                                    color: tokens.color.ink[500],
                                  }}
                                >
                                  {slot.recommended_width}×{slot.recommended_height}
                                </Text>
                              )}
                              {slot.aspect_ratio && (
                                <Text
                                  style={{
                                    fontFamily: tokens.font.family.body,
                                    fontSize: 10,
                                    color: tokens.color.ink[500],
                                  }}
                                >
                                  · {slot.aspect_ratio}
                                </Text>
                              )}
                            </View>
                          </View>
                          {slot.media_id ? (
                            <StatusPill label="Set" tone="success" size="xs" />
                          ) : slot.fallback_url ? (
                            <StatusPill label="Fallback" tone="info" size="xs" />
                          ) : (
                            <StatusPill label="Empty" tone="neutral" size="xs" />
                          )}
                          <ChevronRight size={14} color={tokens.color.ink[400]} />
                        </View>
                      </Card>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
