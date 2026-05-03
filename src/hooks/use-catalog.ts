import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/services/supabase";
import type { Category, Product, ProductVariant } from "@/lib/supabase-types";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Category[];
    },
  });

export const useProducts = (categorySlug?: string) =>
  useQuery({
    queryKey: ["products", categorySlug ?? "all"],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from("products")
        .select("*, categories!inner(slug)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (categorySlug) {
        query = query.eq("categories.slug", categorySlug);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });

export const useProductBySlug = (slug?: string) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;

      const { data: variants } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", product.id)
        .order("sort_order", { ascending: true });

      return { product: product as Product, variants: (variants ?? []) as ProductVariant[] };
    },
    enabled: Boolean(slug),
  });
