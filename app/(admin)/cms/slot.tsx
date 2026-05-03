import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, SectionLabel, StatusPill } from "@/components/ui";
import { Check, Search, Plus } from "@/components/ui/Icon";
import { supabase } from "@/services/supabase";
import {
  useAssignSlot,
  useMediaLibrary,
  useAddMedia,
  type CmsMedia,
} from "@/hooks/use-cms";

export default function SlotEditor() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; key?: string }>();
  const slotId = params.id;

  const { data: slot } = useQuery({
    queryKey: ["cms-slot-detail", slotId],
    queryFn: async () => {
      if (!slotId) return null;
      const { data, error } = await supabase
        .from("cms_image_slots_resolved")
        .select("*")
        .eq("id", slotId)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
    enabled: Boolean(slotId),
  });

  const [search, setSearch] = useState("");
  const { data: media = [] } = useMediaLibrary(search);
  const assign = useAssignSlot();
  const addMedia = useAddMedia();

  const [pasteUrl, setPasteUrl] = useState("");
  const [pasteAlt, setPasteAlt] = useState("");

  const onAssign = async (mediaId: string | null) => {
    if (!slotId) return;
    await assign.mutateAsync({ slotId, mediaId });
  };

  const onAddAndAssign = async () => {
    if (!slotId || !pasteUrl.trim()) return;
    const m = await addMedia.mutateAsync({
      url: pasteUrl.trim(),
      altText: pasteAlt.trim() || undefined,
      width: slot?.recommended_width ?? undefined,
      height: slot?.recommended_height ?? undefined,
    });
    await assign.mutateAsync({ slotId, mediaId: m.id });
    setPasteUrl("");
    setPasteAlt("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header title={slot?.display_name ?? "Slot"} subtitle={slot?.slot_key} />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 32 }}>
          {/* Slot meta */}
          <Card padded={16}>
            <View style={{ flexDirection: "row", gap: 14 }}>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 12,
                  backgroundColor: tokens.color.ink[100],
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: tokens.color.border.hairline,
                }}
              >
                {slot?.resolved_url ? (
                  <Image
                    source={{ uri: slot.resolved_url }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : null}
              </View>
              <View style={{ flex: 1, gap: 4 }}>
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
                  {slot?.surface ?? "—"} · {slot?.group_name ?? "—"}
                </Text>
                <Text
                  style={{
                    fontFamily: tokens.font.family.display,
                    fontWeight: "600",
                    fontSize: 16,
                    color: tokens.color.ink[900],
                    letterSpacing: -0.3,
                  }}
                >
                  {slot?.display_name}
                </Text>
                {slot?.description ? (
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      color: tokens.color.ink[600],
                      lineHeight: 17,
                    }}
                  >
                    {slot.description}
                  </Text>
                ) : null}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {slot?.recommended_width && slot?.recommended_height && (
                    <StatusPill
                      label={`${slot.recommended_width}×${slot.recommended_height}`}
                      tone="neutral"
                      size="xs"
                      dot={false}
                    />
                  )}
                  {slot?.aspect_ratio && (
                    <StatusPill label={slot.aspect_ratio} tone="neutral" size="xs" dot={false} />
                  )}
                  {slot?.media_id ? (
                    <StatusPill label="Set" tone="success" size="xs" />
                  ) : slot?.fallback_url ? (
                    <StatusPill label="Using fallback" tone="info" size="xs" />
                  ) : (
                    <StatusPill label="Empty" tone="warning" size="xs" />
                  )}
                </View>
              </View>
            </View>

            {slot?.media_id && (
              <View style={{ marginTop: 12 }}>
                <Button
                  label="Clear assigned image"
                  variant="secondary"
                  size="md"
                  onPress={() => onAssign(null)}
                  loading={assign.isPending}
                />
              </View>
            )}
          </Card>

          {/* Quick paste-and-assign */}
          <Card padded={18}>
            <SectionLabel label="Add new image to this slot" caps size="sm" />
            <View style={{ height: 12 }} />
            <View style={{ gap: 12 }}>
              <Input
                label="Image URL"
                value={pasteUrl}
                onChangeText={setPasteUrl}
                placeholder="https://..."
                autoCapitalize="none"
              />
              <Input
                label="Alt text"
                value={pasteAlt}
                onChangeText={setPasteAlt}
                placeholder={`Describes the ${slot?.display_name?.toLowerCase() ?? "image"}`}
              />
              {pasteUrl ? (
                <View
                  style={{
                    height: 140,
                    borderRadius: 12,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: tokens.color.border.hairline,
                    backgroundColor: tokens.color.ink[100],
                  }}
                >
                  <Image
                    source={{ uri: pasteUrl }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
              <Button
                label="Add and assign to this slot"
                onPress={onAddAndAssign}
                loading={addMedia.isPending || assign.isPending}
                disabled={!pasteUrl.trim()}
                iconLeft={<Plus size={16} color="#fff" />}
              />
            </View>
          </Card>

          {/* Pick from existing library */}
          <View style={{ gap: 12 }}>
            <SectionLabel label="Pick from media library" caps size="sm" />
            <Card
              padded={false}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Search size={16} color={tokens.color.ink[400]} />
              <Input
                label=""
                value={search}
                onChangeText={setSearch}
                placeholder="Search filename or alt text"
                size="md"
              />
            </Card>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {media.map((m: CmsMedia) => {
                const sel = slot?.media_id === m.id;
                return (
                  <Pressable
                    key={m.id}
                    onPress={() => onAssign(m.id)}
                    style={({ pressed }) => ({
                      width: "31.5%",
                      borderRadius: 12,
                      overflow: "hidden",
                      borderWidth: sel ? 2 : 1,
                      borderColor: sel ? tokens.color.brand.green : tokens.color.border.hairline,
                      opacity: pressed ? 0.7 : 1,
                      backgroundColor: tokens.color.surface.white,
                    })}
                  >
                    <View
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        backgroundColor: tokens.color.ink[100],
                        position: "relative",
                      }}
                    >
                      <Image
                        source={{ uri: m.url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                      {sel && (
                        <View
                          style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            backgroundColor: tokens.color.brand.green,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Check size={14} color="#fff" strokeWidth={3} />
                        </View>
                      )}
                    </View>
                    <View style={{ padding: 8 }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: tokens.font.family.body,
                          fontSize: 11,
                          fontWeight: "600",
                          color: tokens.color.ink[800],
                        }}
                      >
                        {m.filename ?? "Untitled"}
                      </Text>
                      {m.width && m.height && (
                        <Text
                          style={{
                            fontFamily: tokens.font.family.mono,
                            fontSize: 9,
                            color: tokens.color.ink[500],
                          }}
                        >
                          {m.width}×{m.height}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
