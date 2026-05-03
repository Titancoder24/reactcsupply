import { create } from "zustand";
import type { Profile } from "@/lib/supabase-types";

interface AuthState {
  profile: Profile | null;
  loading: boolean;
  setProfile: (p: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  loading: false,
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ profile: null }),
}));
