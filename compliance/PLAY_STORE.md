# Google Play Store Submission Package — C-Supply

**Version:** 1.0.0 (versionCode 1) · **Application ID:** `in.csupply.app`
**Last reviewed:** 2026-05-01 · **Owner:** Compliance & Trust

This document is the single source of truth for the Play Console submission. Keep it in sync with `app.json`, `public.privacy_manifest`, `public.permissions_inventory`, and the legal documents.

---

## 1. Play Console metadata

| Field | Value |
|-------|-------|
| App name | C-Supply |
| Short description (80 chars) | Order construction materials from verified vendors with live tracking |
| Default language | English (India) — `en-IN` |
| Application ID | `in.csupply.app` |
| Category | Shopping |
| Tags | Shopping, Business, Logistics |
| Content rating | IARC: PEGI 12 / ESRB Everyone 10+ / **India: U/A 12+** |
| Target audience | 18+ |
| Contains ads | **No** |
| In-app purchases | **No** at launch |
| Pricing | Free |
| Countries | India (rollout); regional rollout to follow |
| Target API level | 34 (Android 14) — refreshed annually with Play deadlines |
| Min SDK | 24 (Android 7.0) |
| App bundle | AAB only (no APK) |

## 2. Store listing

### Short description (80 chars)
> Order construction materials from verified vendors with live tracking.

### Full description (≤ 4000 chars)
> C-Supply is the fastest way for builders, contractors, and homeowners across India to source verified construction materials — cement, steel, sand, aggregates, bricks, paints, TMT bars, and ready-mix concrete — and have them delivered to site with live tracking.
>
> **Why builders choose C-Supply**
> - 2,400+ verified vendors across 6 cities
> - 98.4% on-time delivery rate
> - Transparent pricing — no hidden fees
> - Live tracking with masked driver phone for privacy
> - Multi-language support (English, Hindi, Telugu, Tamil)
>
> **Three apps in one platform**
> - **Customer:** browse, compare, schedule delivery, pay COD or online.
> - **Vendor:** list materials, manage stock, accept orders, get weekly payouts.
> - **Transporter:** receive nearby job offers, navigate, submit photo + OTP proof.
>
> **Privacy-first**
> - Phone-OTP login only — we never store your password.
> - Live location is collected only during an active delivery and stops the moment it ends.
> - Vendor and transporter phone numbers are masked through call masking.
> - Granular consent controls in Account → Privacy.
>
> **Account deletion** is available from Account → Privacy → Delete account, and at https://csupply.in/account/delete .
>
> Privacy: https://csupply.in/legal/privacy
> Terms: https://csupply.in/legal/terms
> Support: support@csupply.in
> Grievance: grievance@csupply.in

## 3. Data Safety form

This must be completed in Play Console → App content → Data safety. Source: `public.privacy_manifest`.

### Data collected and shared

| Type | Purpose | Shared? | Optional? | Tracking? |
|------|---------|---------|-----------|-----------|
| Personal info → Name | App functionality, account management | No | No | No |
| Personal info → Email | App functionality, account management | No | Yes | No |
| Personal info → Phone | App functionality, account management | No | No | No |
| Personal info → Address | App functionality (delivery) | No | No | No |
| Financial info → User payment info | App functionality | No | Yes | No |
| Financial info → Other (bank for payouts; vendors/transporters only) | Account management | No | Yes | No |
| Location → Approximate | App functionality, analytics | No | Yes | No |
| Location → Precise (transporters only, foreground service during trip) | App functionality | No | Yes | No |
| Photos and videos → Photos | App functionality (KYC, product photos, delivery proof) | No | Yes | No |
| App info and performance → Crash logs | Analytics | No | Yes | No |
| App info and performance → Diagnostics | Analytics | No | Yes | No |
| App activity → App interactions | Analytics, product personalisation | No | Yes | No |
| App activity → In-app search history | App functionality, analytics | No | Yes | No |

**Encryption in transit:** Yes, HTTPS / TLS 1.3.
**Encryption at rest:** Yes, AES-256 in Supabase Storage and Postgres.
**Users can request data be deleted:** Yes — in-app and web.

### Independent security review
We perform third-party penetration tests yearly; the most recent report is available to Play under NDA on request to security@csupply.in.

### Play Families policy
Not applicable — C-Supply is not directed to children.

## 4. Permissions justification

Source: `public.permissions_inventory` (platform = `android`).

### Sensitive permissions Play will scrutinise

| Permission | Required? | Purpose | Runtime trigger | Fallback |
|------------|-----------|---------|-----------------|----------|
| `ACCESS_FINE_LOCATION` | No | Vendor pickup pin, transporter live tracking, customer "find nearest vendor" | Tapped first only when needed | User can enter pincode manually |
| `ACCESS_BACKGROUND_LOCATION` | No | **Transporters only**, only during an active trip, stops at trip completion | After transporter taps Start Trip | Live tracking falls back to last known position |
| `FOREGROUND_SERVICE` | Conditional | Persistent notification while trip is in progress | Trip start | None |
| `FOREGROUND_SERVICE_LOCATION` | Conditional | Required by Android 14 for foreground location | Trip start | None |
| `POST_NOTIFICATIONS` | No | Order updates, job offers, delivery alerts | First relevant in-app action | In-app inbox still works |
| `CAMERA` | No | KYC selfies, product photos, delivery-proof photos | Photo capture flows | Pick from photos |
| `READ_MEDIA_IMAGES` | No | Attach existing photos | Photo picker | Capture new photo |
| `RECORD_AUDIO` | No | Voice-help during vendor onboarding | Tap voice-help | Text guidance shown |
| `INTERNET` | Yes | All networking | Always | None |
| `ACCESS_NETWORK_STATE` | Yes | Connectivity detection / queue uploads | Always | None |

We do **not** request: `READ_PHONE_STATE`, `READ_SMS`, `RECEIVE_SMS`, `READ_CONTACTS` (we have a contacts permission listed under iOS but the Android Vendor "Invite teammate" feature ships in v1.1).

### Background-location declaration form
We will fill out the "Background location" declaration in Play Console with this exact rationale:

> C-Supply uses background location **exclusively for transporter (delivery driver) accounts during an active delivery**. The session begins when a driver taps "Start Trip" on an accepted job and ends automatically when the driver marks the delivery complete. The live position is broadcast to the customer who placed the order, so they can track ETA. The app posts a persistent foreground-service notification ("C-Supply: Active delivery in progress") for the entire duration. Customers and vendors of C-Supply are never asked for background location.

## 5. Sensitive permission policy compliance

| Policy | How we comply |
|--------|---------------|
| Permissions and APIs that Access Sensitive Information | All optional, runtime-prompted, with fallback. |
| Background Location | Foreground-service implementation; transporter role only; ON only during active trip; clearly labelled in onboarding; declared in Play. |
| Foreground Services | Used only for `LOCATION` while trip is in progress. The notification is non-dismissible and tappable to open the live trip screen. |
| Health Connect | Not used. |
| Photo and Video Permissions | We declare `READ_MEDIA_IMAGES` only; no broad storage access. |
| Personal and Sensitive Info | KYC documents stored encrypted; access logged in `audit_events`. |
| User Data Disclosure | Privacy Policy is up-to-date and version-tracked in `legal_documents`. |
| Account Deletion | In-app at Account → Privacy → Delete account; web at csupply.in/account/delete. |

## 6. Account deletion (mandatory)

Per Play's 2024 update, account deletion must be:

- **In-app:** Account → Privacy → Delete account.
- **Web (off-app):** `https://csupply.in/account/delete` — accessible without sign-in for users who lost device access.
- **Identity verified** via OTP to the registered phone before deletion proceeds.
- **Hard delete within 30 days**, with statutory exceptions (GST records, KYC) clearly disclosed.

The Play Console field requires the web URL — provide `https://csupply.in/account/delete`.

## 7. Content rating

Run the IARC questionnaire in Play Console with these answers:

| Question | Answer |
|----------|--------|
| Violence | None |
| Sexual content | None |
| Profanity | None |
| Controlled substances | None |
| Gambling | None |
| User-generated content | Yes — product reviews, user photos. Moderated. |
| Shares user location with other users | Yes — transporter live location with the specific customer who placed the order, only during active delivery. |
| Allows users to interact | Limited — order-related messaging only, masked phone via call-masking. |
| Digital purchases | No |

Expected outcome: **U/A 12+ (India)** / **PEGI 12** / **ESRB Everyone 10+**.

## 8. Ads disclosure

We declare **No ads** in Play Console. The app does not show any third-party advertising, does not use AdMob, and does not display interstitials.

## 9. App access (review credentials)

```
Demo phone: 9000000001
Demo OTP: 123456 (hardcoded only for Play Review and TestFlight; production sends a real SMS)
```

Steps to reach core features:

1. Open the app, tap Get Started.
2. Enter phone `9000000001`.
3. Enter OTP `123456`.
4. You'll land on the Customer home. To check vendor/transporter, sign out and use `9000000002` (Vendor) or `9000000003` (Transporter) with the same OTP.

## 10. App bundle (AAB) requirements

- **Format:** Android App Bundle (`.aab`).
- **Built via:** `eas build --platform android --profile production`.
- **Signing:** Play App Signing enabled; upload key generated locally; `keystore.jks` stored in EAS Secrets.
- **Target SDK:** 34. Annual refresh with Play's API-level deadline.
- **64-bit support:** Yes (default in RN 0.76).
- **App size:** target < 50 MB to avoid the on-demand delivery prompt; lazy-load route bundles.

## 11. Play Console submission checklist

- [ ] Internal testing track configured with QA team
- [ ] Closed testing track configured with 20+ external testers (required for new developer accounts)
- [ ] Production rollout staged — 5%, 25%, 50%, 100%
- [ ] Privacy Policy URL live (`https://csupply.in/legal/privacy`)
- [ ] Account deletion web URL live (`https://csupply.in/account/delete`)
- [ ] Data Safety form submitted (matches §3)
- [ ] Permissions declarations submitted (matches §4)
- [ ] Background-location declaration submitted with screencast (≤ 30s) showing the trigger and disclosure
- [ ] Content rating obtained
- [ ] Target audience set (18+)
- [ ] News app declaration: No
- [ ] COVID-19 contact tracing declaration: No
- [ ] Government app declaration: No
- [ ] Financial features declaration: We allow payments via Razorpay (third-party) for marketplace orders. Not a banking/lending/insurance app.
- [ ] App pricing & distribution: Free, India only at launch
- [ ] Tags added (Shopping, Business, Logistics)
- [ ] Listing graphics: 512×512 icon, 1024×500 feature graphic, screenshots (phone + tablet)
- [ ] Promo video URL (YouTube, optional)
- [ ] App access section completed with demo credentials

## 12. Play Integrity & SafetyNet

Play Integrity API will be wired in a follow-up sprint to harden:
- **Account creation** (challenge before OTP send if device is rooted / emulator).
- **Refund-fraud prevention** (challenge before refund issuance on suspect devices).

This is not a Play submission requirement at v1.

## 13. Reviewer notes template

```
Hi Play team,

C-Supply is a B2B/B2C marketplace for construction materials in India,
serving customers, vendors (sellers), and transporters (delivery drivers)
from one app.

Test credentials:
- Phone: 9000000001 (India +91)
- OTP: 123456 (hardcoded for Play Review only — India OTP gateways
  rate-limit reviewers; real users receive a real SMS)

Sensitive permissions:
- ACCESS_BACKGROUND_LOCATION + FOREGROUND_SERVICE_LOCATION are used only
  for transporter accounts during an active delivery. To reach this flow,
  sign in as 9000000003 (transporter), set yourself online, tap
  "Simulate incoming job", accept, then Reached pickup. The persistent
  notification "Active delivery in progress" appears only after this.
  Live tracking ends automatically on Mark Delivered.

- POST_NOTIFICATIONS is requested on the first relevant action only,
  not at app start.

Account deletion: Account → Privacy → Delete account. Also accessible
without signing in at https://csupply.in/account/delete .

Privacy Policy: https://csupply.in/legal/privacy

Thank you!
— C-Supply team
```

## 14. Standing process — keeping compliance current

1. Every new feature must update `public.privacy_manifest` and `public.permissions_inventory` before merge to main.
2. Every new permission requires a new entry plus an updated Data Safety form.
3. Every change to the Privacy Policy bumps the version (`legal_documents.version`) and triggers re-acceptance from existing users on next launch.
4. Quarterly compliance audit run by the Super Admin from the Compliance Console.
5. Annual third-party penetration test; report stored under NDA for Play's request.
