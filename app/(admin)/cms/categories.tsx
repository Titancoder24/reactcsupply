import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Button, Card, Header, Input, SectionLabel, StatusPill } from "@/components/ui";
import { Plus, Check, Trash, Search } from "@/components/ui/Icon";
import {
  useCategoriesAdmin,
  useDeleteCategory,
  useMediaLibrary,
  useUpsertCategory,
  type CategoryAdmin,
  type CmsMedia,
} from "@/hooks/use-cms";
import { slugify } from "@/lib/utils";

export default function CategoriesAdminScreen() {
  const { data: categories = [] } = useCategoriesAdmin();
  const upsert = useUpsertCategory();
  const del = useDeleteCategory();

  const [editing, setEditing] = useState<CategoryAdmin | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <Header
          title="Categories"
          subtitle={`${categories.length} categories`}
          rightActions={
            <Pressable
              onPress={() => {
                setShowCreate(true);
                setEditing(null);
              }}
              hitSlop={6}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: tokens.color.customer.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={18} color="#fff" />
            </Pressable>
          }
        />

        <ScrollView contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 32 }}>
          {(showCreate || editing) && (
            <CategoryEditor
              key={editing?.id ?? "new"}
              initial={editing}
              onCancel={() => {
                setEditing(null);
                setShowCreate(false);
              }}
              onSave={async (input) => {
                await upsert.mutateAsync(input);
                setEditing(null);
                setShowCreate(false);
              }}
              saving={upsert.isPending}
            />
          )}

          {categories.map((c) => (
            <Card key={c.id} padded={12}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: tokens.color.ink[100],
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: tokens.color.border.hairline,
                  }}
                >
                  {c.image_url ? (
                    <Image
                      source={{ uri: c.image_url }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.display,
                      fontWeight: "600",
                      fontSize: 14,
                      color: tokens.color.ink[900],
                      letterSpacing: -0.2,
                    }}
                  >
                    {c.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: tokens.font.family.mono,
                      fontSize: 11,
                      color: tokens.color.ink[500],
                    }}
                  >
                    {c.slug}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: tokens.font.family.mono,
                    fontSize: 11,
                    color: tokens.color.ink[500],
                    minWidth: 40,
                    textAlign: "right",
                  }}
                >
                  #{c.priority}
                </Text>
                <Pressable
                  onPress={() => {
                    setEditing(c);
                    setShowCreate(false);
                  }}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: tokens.color.ink[100],
                  }}
                >
                  <Text
                    style={{
                      fontFamily: tokens.font.family.body,
                      fontSize: 12,
                      fontWeight: "600",
                      color: tokens.color.ink[800],
                    }}
                  >
                    Edit
                  </Text>
                </Pressable>
                <Pressable onPress={() => del.mutate(c.id)} hitSlop={6}>
                  <Trash size={14} color={tokens.color.ink[400]} />
                </Pressable>
              </View>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

interface EditorProps {
  initial: CategoryAdmin | null;
  onCancel: () => void;
  onSave: (input: Partial<CategoryAdmin> & { name: string; slug: string }) => Promise<void>;
  saving: boolean;
}

const CategoryEditor: React.FC<EditorProps> = ({ initial, onCancel, onSave, saving }) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [priority, setPriority] = useState(String(initial?.priority ?? 50));
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");
  const { data: media = [] } = useMediaLibrary(search);

  const onNameChange = (n: string) => {
    setName(n);
    if (!initial) setSlug(slugify(n));
  };

  return (
    <Card padded={18}>
      <SectionLabel label={initial ? "Edit category" : "New category"} caps size="sm" />
      <View style={{ height: 14 }} />
      <View style={{ gap: 12 }}>
        <Input label="Name" value={name} onChangeText={onNameChange} placeholder="Cement" />
        <Input
          label="Slug"
          value={slug}
          onChangeText={(t) => setSlug(slugify(t))}
          placeholder="cement"
          autoCapitalize="none"
        />
        <Input
          label="Priority (0-100)"
          value={priority}
          onChangeText={(t) => setPriority(t.replace(/\D/g, "").slice(0, 3))}
          placeholder="50"
          keyboardType="number-pad"
        />

        {/* Image */}
        <View>
          <Text
            style={{
              fontFamily: tokens.font.family.body,
              fontSize: 11,
              fontWeight: "600",
              color: tokens.color.ink[600],
              letterSpacing: 0.4,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Category image
          </Text>
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
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            ) : null}
          </View>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
            <View style={{ flex: 1 }}>
              <Input label="" value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />
            </View>
            <Pressable
              onPress={() => setShowPicker((v) => !v)}
              style={{
                paddingHorizontal: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: tokens.color.border.input,
                backgroundColor: showPicker ? tokens.color.ink[100] : "#fff",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: tokens.font.family.body,
                  fontSize: 13,
                  fontWeight: "600",
                  color: tokens.color.ink[800],
                }}
              >
                {showPicker ? "Hide library" : "Pick from library"}
              </Text>
            </Pressable>
          </View>

          {showPicker && (
            <View style={{ marginTop: 12, gap: 8 }}>
              <Input
                label=""
                value={search}
                onChangeText={setSearch}
                placeholder="Search media"
                size="md"
              />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {media.slice(0, 18).map((m: CmsMedia) => {
                  const sel = imageUrl === m.url;
                  return (
                    <Pressable
                      key={m.id}
                      onPress={() => setImageUrl(m.url)}
                      style={{
                        width: "31.5%",
                        aspectRatio: 1,
                        borderRadius: 10,
                        overflow: "hidden",
                        borderWidth: sel ? 2 : 1,
                        borderColor: sel ? tokens.color.brand.green : tokens.color.border.hairline,
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
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            backgroundColor: tokens.color.brand.green,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Check size={12} color="#fff" strokeWidth={3} />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
          <View style={{ flex: 1 }}>
            <Button label="Cancel" variant="secondary" onPress={onCancel} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              label={initial ? "Save" : "Create"}
              onPress={() =>
                onSave({
                  id: initial?.id,
                  name,
                  slug,
                  image_url: imageUrl || null,
                  priority: Number(priority) || 0,
                  is_active: true,
                })
              }
              loading={saving}
              disabled={!name.trim() || !slug.trim()}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
