# C-Supply

Construction-materials marketplace for India — three-sided platform (Customer · Vendor · Transporter) plus Admin and Super Admin consoles.

## Stack

- **Client:** React Native 0.76 + Expo SDK 52 (Expo Router) — single codebase for iOS, Android, and Web (PWA via React Native Web)
- **Backend:** Supabase (Postgres + Auth + Storage + Realtime + Edge Functions)
- **Styling:** NativeWind (Tailwind for RN) + design tokens
- **State:** Zustand + TanStack Query
- **Forms:** react-hook-form + zod
- **Project ref:** `ingvijnueqcnjavwijjh` (csupplyreact)

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run start

# Run on platforms
npm run web      # Open in browser
npm run ios      # Open in iOS simulator
npm run android  # Open in Android emulator

# Typecheck
npm run typecheck

# Build for web (Vercel)
npm run build:web
```

## Project structure

```
app/                       # Expo Router file-based routes
├── _layout.tsx           # Root providers (QueryClient, SafeArea, NativeWind)
├── index.tsx             # Splash / Welcome
├── auth/                 # OTP login, verify
├── (customer)/           # Tabbed customer surface
│   ├── home.tsx
│   ├── orders.tsx
│   ├── cart.tsx
│   ├── account.tsx
│   └── book/             # 7-step booking wizard
├── (vendor)/             # Vendor surface
│   ├── signup/           # 15-step onboarding
│   └── dashboard.tsx
├── (transporter)/        # Transporter surface
│   ├── signup/           # 12-step onboarding
│   ├── dashboard.tsx
│   ├── job-request.tsx
│   ├── tracking.tsx
│   ├── proof.tsx
│   └── delivered.tsx
├── (admin)/              # Admin + Super Admin consoles
│   ├── login.tsx
│   ├── dashboard.tsx
│   └── super-dashboard.tsx
├── category/[slug].tsx   # Public SEO route
└── product/[slug].tsx    # Public SEO route

src/
├── components/ui/        # Button, Card, Input, OtpInput, StepperBar, Pill, Header, etc.
├── components/booking/   # Customer booking-wizard shell
├── components/vendor/    # Vendor onboarding shell
├── components/transporter/ # Transporter onboarding shell
├── services/supabase.ts  # Supabase client
├── stores/               # Zustand: auth, cart, booking, vendor onboarding
├── hooks/                # TanStack Query hooks
├── theme/tokens.ts       # Design tokens (colors, type, spacing, motion)
└── lib/                  # utils, supabase types
```

## Design tokens

The platform follows the spec from APPENDIX A of the PRD. Key tokens:

- **Customer surface:** Deep Blue `#0F4C81` primary + Orange `#F97316` accent
- **Vendor / Transporter:** Green `#22C55E` primary
- **Typography:** Poppins (400 / 500 / 600 / 700)
- **Radius:** 8 / 12 / 16 / pill
- **Tap target minimum:** 44pt
- **Currency:** INR with Indian-style number grouping (lakhs / crores)

## Demo accounts

| Role         | Phone           | OTP    | Email                          | Password   |
| ------------ | --------------- | ------ | ------------------------------ | ---------- |
| Customer     | +91 9000000001  | 123456 | —                              | —          |
| Vendor       | +91 9000000002  | 123456 | —                              | —          |
| Transporter  | +91 9000000003  | 123456 | —                              | —          |
| Admin        | —               | —      | admin@demo.csupply.in          | Demo@2026  |
| Super Admin  | —               | —      | superadmin@demo.csupply.in     | Demo@2026  |

Demo mode is gated by the `demo_mode_enabled` feature flag and turned on in this project.

## Database

The full schema is in Supabase. Tables include:

- `profiles`, `addresses`
- `vendor_profiles`, `transporter_profiles`, `vehicles`
- `categories`, `products`, `product_variants`, `product_specs`, `reviews`
- `cities`, `pincodes`, `zones`, `vehicle_time_rules`
- `pricing_rules`, `vehicle_pricing`
- `orders`, `order_items`, `order_events`, `order_proof`
- `payments`, `payouts`
- `theme_config`, `content_blocks`, `feature_flags`, `notification_templates`
- `seo_route_metadata`, `crawler_permissions`

Every table has Row Level Security enabled with role-aware policies.

## Notes

- All UI is emoji-free; iconography uses custom-built SVG icons via `react-native-svg` in `src/components/ui/Icon.tsx`.
- The codebase ships with mocked maps; the real OSM/Google MapProvider abstraction is described in §16 of the PRD.
- Background geolocation for transporter live tracking requires an EAS Development Build (Expo Go does not support background tasks). Foreground tracking is included for development demos.
