import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "https://ingvijnueqcnjavwijjh.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZ3Zpam51ZXFjbmphdndpampoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Mzk3NjksImV4cCI6MjA5MzQxNTc2OX0.8omafwqgyr3yxaiT7xXNrPIBaZTipjjmHI280LzxZVs";

const isWeb = Platform.OS === "web";

const webStorage = {
  getItem: async (key: string) =>
    typeof localStorage !== "undefined" ? localStorage.getItem(key) : null,
  setItem: async (key: string, value: string) => {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (typeof localStorage !== "undefined") localStorage.removeItem(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: isWeb ? (webStorage as any) : (AsyncStorage as any),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
