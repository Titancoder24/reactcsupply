/**
 * Lightweight handcrafted types mirroring the public schema.
 * In a fully wired CI we would generate these via `supabase gen types typescript`.
 */
export type UserRole =
  | "customer"
  | "vendor"
  | "transporter"
  | "admin"
  | "super_admin"
  | "system";

export type KycStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

export type VehicleClass = "mini" | "medium" | "heavy" | "x_heavy";

export type ProductStatus = "draft" | "active" | "out_of_stock" | "inactive";

export type OrderStatus =
  | "placed"
  | "vendor_pending"
  | "vendor_accepted"
  | "transporter_pending"
  | "transporter_accepted"
  | "out_for_pickup"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "cod_pending"
  | "cod_received";

export interface Profile {
  id: string;
  user_id: string | null;
  phone: string | null;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  language: string;
  avatar_url: string | null;
  verified: boolean;
  blocked: boolean;
  is_demo: boolean;
}

export interface Address {
  id: string;
  profile_id: string;
  label: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  lat?: number | null;
  lng?: number | null;
  is_default: boolean;
}

export interface Category {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  icon_url: string | null;
  image_url: string | null;
  sort_order: number;
  priority: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  vendor_id: string;
  category_id: string;
  name: string;
  slug: string | null;
  brand: string | null;
  grade: string | null;
  description: string | null;
  images: string[];
  unit: string;
  base_price: number;
  currency: string;
  status: ProductStatus;
  stock_qty: number;
  rating: number;
  reviews_count: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  tier_name: string;
  moq: number;
  size_label: string;
  weight_per_unit_kg: number;
  price_per_unit: number;
  vehicle_class: VehicleClass | null;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  vendor_id: string;
  delivery_address_id: string | null;
  transporter_id: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  subtotal: number;
  delivery_charge: number;
  commission: number;
  gst_amount: number;
  total_amount: number;
  delivery_date: string | null;
  delivery_slot: string | null;
  created_at: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  is_active: boolean;
  surface: string;
  tokens: Record<string, any>;
}

export interface FeatureFlag {
  id: string;
  key: string;
  enabled: boolean;
  description: string;
}
