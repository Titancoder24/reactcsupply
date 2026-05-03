import { create } from "zustand";

interface BookingState {
  addressId: string | null;
  hasGst: boolean | null;
  gstNumber: string;
  businessName: string;
  deliveryMode: "instant" | "schedule";
  deliveryDate: string | null;
  deliverySlot: string | null;
  needVehicleEntry: boolean;
  vehicleNumber: string;
  entryTime: string;
  contactPerson: string;
  contactPhone: string;
  setField: <K extends keyof Omit<BookingState, "setField" | "reset">>(
    key: K,
    value: BookingState[K],
  ) => void;
  reset: () => void;
}

const initial = {
  addressId: null,
  hasGst: null,
  gstNumber: "",
  businessName: "",
  deliveryMode: "schedule" as const,
  deliveryDate: null,
  deliverySlot: null,
  needVehicleEntry: false,
  vehicleNumber: "",
  entryTime: "",
  contactPerson: "",
  contactPhone: "",
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initial,
  setField: (key, value) => set({ [key]: value } as any),
  reset: () => set(initial),
}));
