import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartLine {
  productId: string;
  variantId?: string;
  name: string;
  brand?: string;
  unit: string;
  unitPrice: number;
  qty: number;
  weightPerUnitKg?: number;
  image?: string;
  vendorId?: string;
}

interface CartState {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
  subtotal: () => number;
  totalWeightKg: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (line) =>
        set((state) => {
          const existing = state.lines.find((l) => l.productId === line.productId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === line.productId ? { ...l, qty: l.qty + line.qty } : l,
              ),
            };
          }
          return { lines: [...state.lines, line] };
        }),
      remove: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId ? { ...l, qty: Math.max(1, qty) } : l,
          ),
        })),
      clear: () => set({ lines: [] }),
      totalQty: () => get().lines.reduce((s, l) => s + l.qty, 0),
      subtotal: () => get().lines.reduce((s, l) => s + l.qty * l.unitPrice, 0),
      totalWeightKg: () =>
        get().lines.reduce(
          (s, l) => s + l.qty * (l.weightPerUnitKg ?? 0),
          0,
        ),
    }),
    {
      name: "csupply-cart",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
