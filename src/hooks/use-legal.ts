import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/services/supabase";

export type LegalDocKind =
  | "privacy_policy"
  | "terms_of_service"
  | "refund_policy"
  | "cancellation_policy"
  | "cookie_policy"
  | "children_policy"
  | "data_retention_policy"
  | "accessibility_statement"
  | "grievance_redressal"
  | "community_guidelines"
  | "eula"
  | "shipping_policy";

export interface LegalDoc {
  id: string;
  kind: LegalDocKind;
  version: string;
  locale: string;
  title: string;
  body_md: string;
  effective_at: string;
  is_current: boolean;
}

export const useLegalDocument = (kind: LegalDocKind, locale = "en") =>
  useQuery({
    queryKey: ["legal", kind, locale],
    queryFn: async (): Promise<LegalDoc | null> => {
      const { data, error } = await supabase
        .from("legal_documents")
        .select("*")
        .eq("kind", kind)
        .eq("locale", locale)
        .eq("is_current", true)
        .maybeSingle();
      if (error) throw error;
      return data as LegalDoc | null;
    },
  });

export const useAllLegalDocuments = () =>
  useQuery({
    queryKey: ["legal", "all"],
    queryFn: async (): Promise<LegalDoc[]> => {
      const { data, error } = await supabase
        .from("legal_documents")
        .select("*")
        .eq("is_current", true)
        .order("kind", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LegalDoc[];
    },
  });
