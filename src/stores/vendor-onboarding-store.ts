import { create } from "zustand";

interface VendorProduct {
  name: string;
  price: number;
  unit: string;
}

interface VendorOnboardingState {
  // Step 2 — phone
  phone: string;
  otp: string;
  passcode: string;
  // Step 3 — type
  businessType: "GST Vendor" | "Non-GST Vendor" | "Individual Supplier" | null;
  // Step 4 — details
  shopName: string;
  ownerName: string;
  address: string;
  pickupLandmark: string;
  // Step 5 — verification (placeholder URLs)
  gstCertUploaded: boolean;
  idProofUploaded: boolean;
  selfieUploaded: boolean;
  bankAccount: string;
  ifscCode: string;
  // Step 6 — categories
  categories: string[];
  // Step 7 — products
  products: VendorProduct[];
  // Step 8 — stock
  totalStock: string;
  stockUnit: string;
  lowStockAlert: boolean;
  lowStockThreshold: string;
  autoHideOos: boolean;
  // Step 10 — slots
  slots: { morning: boolean; afternoon: boolean; night: boolean };
  // Step 11 — vehicles
  vehicles: string[];
  // Step 12 — delivery charges
  deliveryMode: "free" | "paid";
  // Step 13 — radius
  radiusKm: number;
  setField: <K extends keyof Omit<VendorOnboardingState, "setField" | "addProduct" | "toggleCategory" | "toggleVehicle">>(
    key: K,
    value: VendorOnboardingState[K],
  ) => void;
  addProduct: (p: VendorProduct) => void;
  toggleCategory: (slug: string) => void;
  toggleVehicle: (key: string) => void;
}

export const useVendorOnboarding = create<VendorOnboardingState>((set) => ({
  phone: "",
  otp: "",
  passcode: "",
  businessType: null,
  shopName: "",
  ownerName: "",
  address: "",
  pickupLandmark: "",
  gstCertUploaded: false,
  idProofUploaded: false,
  selfieUploaded: false,
  bankAccount: "",
  ifscCode: "",
  categories: [],
  products: [],
  totalStock: "500",
  stockUnit: "Bags",
  lowStockAlert: true,
  lowStockThreshold: "50",
  autoHideOos: true,
  slots: { morning: true, afternoon: true, night: false },
  vehicles: [],
  deliveryMode: "paid",
  radiusKm: 25,
  setField: (key, value) => set({ [key]: value } as any),
  addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
  toggleCategory: (slug) =>
    set((s) => ({
      categories: s.categories.includes(slug)
        ? s.categories.filter((c) => c !== slug)
        : [...s.categories, slug],
    })),
  toggleVehicle: (key) =>
    set((s) => ({
      vehicles: s.vehicles.includes(key) ? s.vehicles.filter((v) => v !== key) : [...s.vehicles, key],
    })),
}));
