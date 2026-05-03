import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/services/supabase";

export interface CmsMedia {
  id: string;
  url: string;
  filename: string | null;
  mime: string | null;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
  alt_text: string | null;
  tags: string[];
  source: string;
  is_active: boolean;
  created_at: string;
}

export interface ImageSlot {
  id: string;
  slot_key: string;
  surface: "customer" | "vendor" | "transporter" | "admin" | "shared" | "brand";
  group_name: string | null;
  display_name: string;
  description: string | null;
  recommended_width: number | null;
  recommended_height: number | null;
  aspect_ratio: string | null;
  required: boolean;
  media_id: string | null;
  fallback_url: string | null;
  resolved_url: string | null;
  resolved_alt: string | null;
  resolved_width: number | null;
  resolved_height: number | null;
  sort_order: number;
}

/** Read a single named image slot, returning the resolved URL + alt + dims. */
export const useImageSlot = (slotKey: string, fallback?: string) =>
  useQuery({
    queryKey: ["cms-slot", slotKey],
    queryFn: async (): Promise<ImageSlot | null> => {
      const { data, error } = await supabase
        .from("cms_image_slots_resolved")
        .select("*")
        .eq("slot_key", slotKey)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...(data as any),
        resolved_url: (data as any).resolved_url ?? fallback ?? null,
      };
    },
    staleTime: 60_000,
  });

/** Bulk fetch all slots — used by the Super Admin browser. */
export const useImageSlots = (surface?: string) =>
  useQuery({
    queryKey: ["cms-slots", surface ?? "all"],
    queryFn: async (): Promise<ImageSlot[]> => {
      let q = supabase.from("cms_image_slots_resolved").select("*").order("sort_order");
      if (surface) q = q.eq("surface", surface);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as ImageSlot[];
    },
    staleTime: 30_000,
  });

/** Media library list. */
export const useMediaLibrary = (search?: string) =>
  useQuery({
    queryKey: ["cms-media", search ?? ""],
    queryFn: async (): Promise<CmsMedia[]> => {
      let q = supabase
        .from("cms_media")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(200);
      if (search && search.trim()) {
        q = q.or(`filename.ilike.%${search}%,alt_text.ilike.%${search}%`);
      }
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as CmsMedia[];
    },
    staleTime: 15_000,
  });

/** Mutation: add a media record (URL-based for now, upload-aware later). */
export const useAddMedia = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      url: string;
      filename?: string;
      altText?: string;
      width?: number;
      height?: number;
      mime?: string;
      tags?: string[];
      source?: string;
    }) => {
      const { data, error } = await supabase
        .from("cms_media")
        .insert({
          url: input.url,
          filename: input.filename ?? deriveFilename(input.url),
          alt_text: input.altText,
          width: input.width,
          height: input.height,
          mime: input.mime ?? "image/jpeg",
          tags: input.tags ?? [],
          source: input.source ?? "url",
        })
        .select("*")
        .single();
      if (error) throw error;
      return data as CmsMedia;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-media"] });
    },
  });
};

export const useDeleteMedia = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cms_media").update({ is_active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-media"] });
      qc.invalidateQueries({ queryKey: ["cms-slots"] });
      qc.invalidateQueries({ queryKey: ["cms-slot"] });
    },
  });
};

/** Mutation: assign a media item to a slot (or clear it). */
export const useAssignSlot = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { slotId: string; mediaId: string | null }) => {
      const { error } = await supabase
        .from("cms_image_slots")
        .update({ media_id: input.mediaId })
        .eq("id", input.slotId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-slots"] });
      qc.invalidateQueries({ queryKey: ["cms-slot"] });
    },
  });
};

/** Categories admin (CRUD with image picker). */
export interface CategoryAdmin {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  icon_url: string | null;
  image_url: string | null;
  sort_order: number;
  priority: number;
  is_active: boolean;
}

export const useCategoriesAdmin = () =>
  useQuery({
    queryKey: ["categories-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("priority", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CategoryAdmin[];
    },
  });

export const useUpsertCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<CategoryAdmin> & { name: string; slug: string }) => {
      const { data, error } = await supabase
        .from("categories")
        .upsert(
          {
            id: input.id,
            name: input.name,
            slug: input.slug,
            image_url: input.image_url ?? null,
            icon_url: input.icon_url ?? null,
            sort_order: input.sort_order ?? 0,
            priority: input.priority ?? 0,
            is_active: input.is_active ?? true,
          },
          { onConflict: "id" },
        )
        .select("*")
        .single();
      if (error) throw error;
      return data as CategoryAdmin;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories-admin"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("categories")
        .update({ is_active: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories-admin"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const deriveFilename = (url: string) => {
  try {
    const u = new URL(url);
    const last = u.pathname.split("/").filter(Boolean).pop();
    return last ?? "image";
  } catch {
    return "image";
  }
};
