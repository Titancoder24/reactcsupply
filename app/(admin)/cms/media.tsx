import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, SectionLabel, StatusPill } from "@/components/ui";
import { Plus, Search, Trash, Check, ChevronRight } from "@/components/ui/Icon";
import {
  useAddMedia,
  useDeleteMedia,
  useMediaLibrary,
  type CmsMedia,
} from "@/hooks/use-cms";

export default function MediaLibraryScreen() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const { data: media = [], isLoading } = useMediaLibrary(search);
  const add = useAddMedia();
  const del = useDeleteMedia();

  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [tags, setTags] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const submit = async () => {
    if (!url.trim()) return;
    await add.mutateAsync({
      url: url.trim(),
      altText: alt.trim() || undefined,
      width: Number(width) || undefined,
      height: Number(height) || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setUrl("");
    setAlt("");
    setTags("");
    setWidth("");
    setHeight("");
    setShowAdd(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header
          title="Media library"
          subtitle={`${media.length} item${media.length === 1 ? "" : "s"}`}
          rightActions={
            <Pressable
              onPress={() => setShowAdd((v) => !v)}
              hitSlop={6}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: showAdd ? tokens.color.ink[200] : tokens.color.customer.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus
                size={18}
                color={showAdd ? tokens.color.ink[800] : "#fff"}
              />
            </Pressable>
          }
        />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 32 }}>
          {/* Search */}
          <View
            style={{
              height: 46,
              borderRadius: 12,
              backgroundColor: tokens.color.surface.white,
              borderWidth: 1,
              borderColor: tokens.color.border.hairline,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              gap: 8,
            }}
          >
            <Search size={16} color={tokens.color.ink[400]} />
            <Input
              label=""
              value={search}
              onChangeText={setSearch}
              placeholder="Search by filename, alt text"
              size="md"
              prefix={undefined}
            />
          </View>

          {showAdd && (
            <Card padded={18}>
              <SectionLabel label="Add media by URL" caps size="sm" />
              <View style={{ height: 12 }} />
              <View style={{ gap: 12 }}>
                <Input
                  label="Image URL"
                  value={url}
                  onChangeText={setUrl}
                  placeholder="https://..."
                  autoCapitalize="none"
                />
                <Input
                  label="Alt text"
                  value={alt}
                  onChangeText={setAlt}
                  placeholder="Describe the image for accessibility"
                />
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Width (px)"
                      value={width}
                      onChangeText={(t) => setWidth(t.replace(/\D/g, ""))}
                      placeholder="1200"
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Height (px)"
                      value={height}
                      onChangeText={(t) => setHeight(t.replace(/\D/g, ""))}
                      placeholder="800"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
                <Input
                  label="Tags"
                  value={tags}
                  onChangeText={setTags}
                  placeholder="cement, hero, marketing"
                />

                {url ? (
                  <View
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      borderWidth: 1,
                      borderColor: tokens.color.border.hairline,
                      height: 160,
                      backgroundColor: tokens.color.ink[100],
                    }}
                  >
                    <Image
                      source={{ uri: url }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                ) : null}

                <Button
                  label="Add to library"
                  onPress={submit}
                  loading={add.isPending}
                  disabled={!url.trim()}
                  iconLeft={<Plus size={16} color="#fff" />}
                />
              </View>
            </Card>
          )}

          {/* Grid */}
          {isLoading && media.length === 0 ? (
            <Text
              style={{
                fontFamily: tokens.font.family.body,
                color: tokens.color.ink[500],
                textAlign: "center",
                padding: 24,
              }}
            >
              Loading...
            </Text>
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {media.map((m) => (
                <MediaCard key={m.id} media={m} onDelete={() => del.mutate(m.id)} />
              ))}
            </View>
          )}

          {!isLoading && media.length === 0 && (
            <Card padded={20}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: tokens.font.family.body,
                  color: tokens.color.ink[500],
                }}
              >
                No media yet. Tap{" "}
                <Text style={{ fontWeight: "600", color: tokens.color.ink[900] }}>+</Text> to add the
                first image.
              </Text>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const MediaCard: React.FC<{ media: CmsMedia; onDelete: () => void }> = ({ media, onDelete }) => {
  return (
    <Card padded={false} style={{ width: "31.5%", overflow: "hidden" }}>
      <View
        style={{
          width: "100%",
          aspectRatio: 1,
          backgroundColor: tokens.color.ink[100],
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: media.url }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      </View>
      <View style={{ padding: 8, gap: 4 }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: tokens.font.family.body,
            fontSize: 11,
            fontWeight: "600",
            color: tokens.color.ink[800],
          }}
        >
          {media.filename ?? "Untitled"}
        </Text>
        {media.width && media.height && (
          <Text
            style={{
              fontFamily: tokens.font.family.mono,
              fontSize: 10,
              color: tokens.color.ink[500],
            }}
          >
            {media.width} × {media.height}
          </Text>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
          <Text
            style={{
              fontFamily: tokens.font.family.body,
              fontSize: 10,
              color: tokens.color.ink[500],
            }}
          >
            {media.source}
          </Text>
          <Pressable onPress={onDelete} hitSlop={8}>
            <Trash size={14} color={tokens.color.ink[400]} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
};
