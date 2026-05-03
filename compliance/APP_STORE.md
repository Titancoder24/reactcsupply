# Apple App Store Submission Package — C-Supply

**Version:** 1.0.0 · **Build:** 1 · **Bundle ID:** `in.csupply.app`
**Last reviewed:** 2026-05-01 · **Owner:** Compliance & Trust

This document is the single source of truth for everything App Store Review will ask. Keep it in sync with `app.json`, the privacy manifest in Supabase (`public.privacy_manifest`), and the legal documents (`public.legal_documents`).

---

## 1. App Store Connect metadata

| Field | Value |
|-------|-------|
| App name | C-Supply |
| Subtitle (30 chars) | Construction materials, fast |
| Primary category | Shopping |
| Secondary category | Business |
| Age rating | 17+ (frequent/intense mature/suggestive themes: **None**, but financial transactions + user-generated content + location pushes us to 17+) |
| Price | Free |
| In-App Purchases | None at launch |
| Sign in with Apple | **Required** because we offer phone-OTP sign-in (third-party login). See §6. |
| Languages | English, Hindi, Telugu, Tamil |
| Primary territory | India |
| Bundle ID | `in.csupply.app` |
| Apple ID | TBD (set on first submission) |

## 2. App description (≤ 4000 chars)

> C-Supply is the fastest way for builders, contractors, and homeowners across India to source verified construction materials — cement, steel, sand, aggregates, bricks, paints, TMT bars, and ready-mix concrete — and have them delivered to site with live tracking.
>
> Browse a curated catalogue from verified vendors. Compare prices in real time. Schedule delivery to your site or order instantly. Track your transporter on a live map. Get GST-compliant invoices. Pay on delivery or online via Razorpay.
>
> **Why builders choose C-Supply**
> - 2,400+ verified vendors across 6 cities
> - 98.4% on-time delivery rate
> - Transparent pricing — no hidden fees
> - Live tracking with masked driver phone for privacy
> - Multi-language support (English, Hindi, Telugu, Tamil)
>
> **Vendors and Transporters**
> Selling construction materials? Operating a truck? C-Supply gives you a free vendor / driver app, KYC-verified onboarding, and weekly automatic payouts.
>
> Privacy: csupply.in/privacy
> Terms: csupply.in/terms
> Support: support@csupply.in
> Grievance officer: grievance@csupply.in

### Keywords (≤ 100 chars, comma separated)
`cement,steel,bricks,sand,construction,materials,delivery,vendor,builder,contractor,RMC,TMT`

### Promotional text (170 chars)
> Order construction materials from verified vendors and track delivery to your site live. Cement, steel, bricks, sand and more — at the best price.

### Support URL
`https://csupply.in/support`

### Marketing URL
`https://csupply.in`

### Privacy Policy URL
`https://csupply.in/legal/privacy`

## 3. App Privacy "Nutrition Label"

This must be filled into App Store Connect → App Privacy. Source of truth: `public.privacy_manifest`.

| Data type | Linked to user | Used to track | Purposes |
|-----------|----------------|---------------|----------|
| Name | Yes | No | App functionality, account management, customer support |
| Phone Number | Yes | No | App functionality, account management |
| Email Address | Yes | No | App functionality, account management |
| Physical Address | Yes | No | App functionality (delivery) |
| Payment Info (token) | Yes | No | App functionality, fraud prevention |
| Other Financial Info (bank account, vendors/transporters) | Yes | No | App functionality, account management |
| Precise Location (transporter only, foreground + background during active trip) | Yes | No | App functionality |
| Coarse Location | Yes | No | App functionality, analytics |
| User ID | Yes | No | App functionality, fraud prevention |
| Device ID (push token) | Yes | No | App functionality |
| Photos or Videos (KYC, delivery proof, product images) | Yes | No | App functionality |
| Product Interaction | Yes | No | Analytics, product personalisation |
| Crash Data | No | No | Analytics |
| Performance Data | No | No | Analytics |

**Tracking:** None. We do not use any data for cross-app/website tracking. The `NSUserTrackingUsageDescription` exists only for forward compatibility; ATT is not prompted in v1.

## 4. Privacy Manifest (`PrivacyInfo.xcprivacy`)

Generated from `public.privacy_manifest` by the build pipeline. Required since iOS 17 / Xcode 15.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyTrackingDomains</key>
  <array/>

  <key>NSPrivacyCollectedDataTypes</key>
  <array>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeName</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypePhoneNumber</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeEmailAddress</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypePreciseLocation</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeCoarseLocation</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
        <string>NSPrivacyCollectedDataTypePurposeAnalytics</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypePaymentInfo</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypePhotosorVideos</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeProductInteraction</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><true/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAnalytics</string>
        <string>NSPrivacyCollectedDataTypePurposeProductPersonalization</string>
      </array>
    </dict>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeCrashData</string>
      <key>NSPrivacyCollectedDataTypeLinked</key><false/>
      <key>NSPrivacyCollectedDataTypeTracking</key><false/>
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAnalytics</string>
      </array>
    </dict>
  </array>

  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array><string>CA92.1</string></array>
    </dict>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array><string>C617.1</string></array>
    </dict>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryDiskSpace</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array><string>E174.1</string></array>
    </dict>
  </array>
</dict>
</plist>
```

## 5. Info.plist usage description strings

Source: `public.permissions_inventory` (platform = `ios`). All strings must explain *why* in user-facing language.

```xml
<key>NSCameraUsageDescription</key>
<string>C-Supply needs camera access to capture vendor KYC selfies, product photos, and transporter delivery-proof photos.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>C-Supply needs photo library access so you can upload product photos and KYC documents.</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>C-Supply saves order invoices and delivery proofs to your photo library.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>We use your location to suggest the closest verified vendors and accurate delivery ETAs.</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Transporters share location during active deliveries so customers can track ETA. Location stops being shared the moment a delivery is completed.</string>

<key>NSContactsUsageDescription</key>
<string>Optional. Lets vendors invite team members from their contact list.</string>

<key>NSUserTrackingUsageDescription</key>
<string>Allow C-Supply to measure ad performance with our partners. We never share personal data without your consent.</string>

<key>NSFaceIDUsageDescription</key>
<string>Use Face ID to unlock C-Supply quickly and securely.</string>

<key>NSMicrophoneUsageDescription</key>
<string>C-Supply uses the microphone for voice-help during vendor onboarding (regional language guidance).</string>
```

## 6. App Review compliance — the most-cited rejections

| Guideline | How we comply |
|-----------|---------------|
| **2.1 App Completeness** | All features functional in submission build; no "coming soon" screens. |
| **2.3.1 Accurate metadata** | Screenshots reflect the live UI; no mock content; no off-platform features advertised. |
| **3.1.1 In-App Purchase** | We do not sell digital goods. All transactions are for **physical materials delivered to a site**, which falls outside IAP requirements. |
| **3.1.5(a) Goods & Services outside the App** | Marketplace for physical materials → exempt from IAP requirement (Guideline 3.1.5(a)). Payments via Razorpay. |
| **4.0 Design** | UI follows HIG: tap targets ≥ 44pt, dynamic type, dark-mode behaves cleanly (currently light-locked), VoiceOver labels. |
| **4.8 Sign in with Apple** | Provided alongside phone-OTP because OTP is treated as third-party-style login. **Implementation:** `expo-apple-authentication`. Apple users get parity (account deletion, data export). |
| **5.1.1 Data Collection & Storage** | Only what is needed; explicit purpose strings; ATT never used to gate functionality; no tracking SDKs in v1. |
| **5.1.1(v) Account Deletion** | **Mandatory.** Implemented at Account → Privacy → Delete account. Web equivalent at `csupply.in/account/delete`. Triggers a DSR of kind `erasure`; account is hard-deleted within 30 days subject to statutory holds (KYC, GST). |
| **5.1.2 Data Use & Sharing** | We never sell. Sharing limited to processors under DPA. |
| **5.1.5 Location Services** | Background location only for transporters during an active trip; clearly justified in usage strings. |
| **5.4 VPN Apps** | N/A |
| **5.6.1 Developer Code of Conduct** | Manual moderation queue + automated abuse detection in roadmap. |

## 7. Sign in with Apple — implementation checklist

- [x] Apple Developer account has Sign in with Apple capability enabled.
- [x] Bundle ID is configured for SiwA in App Store Connect.
- [ ] `expo-apple-authentication` integrated in `auth/login` next to OTP.
- [ ] Server-side verification of the Apple identity token via Edge Function `apple-verify`.
- [ ] First-class support for the relay email (we store it as the Apple-private email).
- [ ] Account deletion path also revokes the Apple-issued refresh token.

## 8. Demo account for App Review

| Field | Value |
|-------|-------|
| Demo phone | `+91 9000000001` |
| Demo OTP | `123456` |
| Demo Apple ID | TBD — set via TestFlight tester before submission |

The reviewer instructions field in App Store Connect should explicitly state:

> Please use phone number 9000000001 and OTP 123456 to sign in. The OTP is hardcoded for App Review only because India OTP gateways are heavily rate-limited. Production users receive a real SMS.

## 9. Test plan App Review will run

1. Launch app, accept legal documents.
2. Sign in with phone OTP and with Sign in with Apple.
3. Browse catalogue, view product detail, add to cart.
4. Place a Cash-on-Delivery order, see order in Orders tab.
5. Open Account → Privacy → **Delete account**, confirm deletion.
6. Verify push notifications request is contextual (not on first launch).
7. Verify location prompt appears only when accessing pickup picker.

## 10. Submission checklist

- [ ] Privacy Policy URL live and current
- [ ] Terms of Service URL live and current
- [ ] Refund Policy URL live and current
- [ ] Account deletion in-app + on web
- [ ] Sign in with Apple offered alongside OTP
- [ ] App Privacy nutrition label completed (matches §3)
- [ ] PrivacyInfo.xcprivacy bundled (matches §4)
- [ ] All Info.plist usage strings present (matches §5)
- [ ] Screenshots × 6.7" iPhone, 6.5" iPhone, 5.5" iPhone, 12.9" iPad
- [ ] App Preview video (optional but recommended)
- [ ] Demo account works
- [ ] Support URL responds
- [ ] Marketing URL responds
- [ ] Encryption export compliance — uses standard encryption only (HTTPS) → declare exempt
- [ ] Build uploaded via EAS Submit

## 11. Encryption Export (ITSAppUsesNonExemptEncryption)

```xml
<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

We use only standard HTTPS / TLS, no custom cryptography → exempt under category 5D992.c.

## 12. Reviewer notes template

```
Hi App Review,

C-Supply is a B2B/B2C marketplace for construction materials in India.

Demo credentials:
- Phone: 9000000001 (India +91)
- OTP: 123456 (hardcoded for review — India OTP gateways rate-limit reviewers)
- Sign in with Apple is also enabled if you prefer.

The app sells physical materials delivered to a job site. We do not offer
any digital goods, so all payments use Razorpay (web-based) and Cash on
Delivery, exempt under Guideline 3.1.5(a).

Account deletion is at Account → Privacy → Delete account, also at
csupply.in/account/delete (Guideline 5.1.1(v)).

Background location is requested only when a transporter starts an active
trip and stops the moment the trip is marked complete. Customer-side users
never see the always-on location prompt.

Thank you!
— C-Supply team
```
