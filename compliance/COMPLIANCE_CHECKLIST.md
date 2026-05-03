# C-Supply Master Compliance Checklist

This checklist is the operating procedure for keeping C-Supply continuously fit for both stores and applicable Indian law (DPDPA 2023, IT Rules 2021, Consumer Protection E-Commerce Rules 2020, GST). The Super Admin Compliance Console exposes most of these as actionable surfaces; this document explains what each control does and when it's run.

## A. Day-zero readiness (must ship in v1)

### A1. Legal documents — published and version-tracked
- [x] Privacy Policy
- [x] Terms of Service
- [x] Refund Policy
- [x] Cancellation Policy
- [x] Cookie Policy (web only)
- [x] Children's Privacy Policy
- [x] Grievance Redressal Procedure
- [x] Data Retention Policy
- [x] Accessibility Statement
- [x] Community Guidelines

All seeded into `public.legal_documents`. Each document has a version (`YYYY.MM.DD`), an effective date, and an `is_current` flag. When the current version flips, the next sign-in/launch prompts the user to accept the new version, and the acceptance is recorded in `public.legal_acceptances` with IP and user agent.

### A2. User rights (DPDPA Section 11 & GDPR Articles 15-22)
- [x] **Access** — user can view their data summary (Account → Privacy → My data).
- [x] **Export** — user can download a JSON export of their data.
- [x] **Rectification** — profile, address, GST and bank details are user-editable.
- [x] **Erasure (account deletion)** — Account → Privacy → Delete account. Also at `csupply.in/account/delete` for off-app deletion (Play 2024 requirement).
- [x] **Withdraw consent** — Account → Privacy → Consents.
- [x] **Grievance** — Account → Help → Raise a grievance.

Internally each request becomes a `dsr_requests` row with auto-assigned ticket number and a 30-day SLA.

### A3. Consents recorded with provenance
Granular consent per `consent_kind` enum (transactional, marketing, analytics, push, location, app tracking, third-party sharing, cookies). Each row stores the granted state, source (`in_app` / `web` / `signup`), IP, user agent, and the legal document version active at the time. Withdrawals are stamped with `withdrawn_at` and never delete the original record.

### A4. App store and Play store packages
- [x] `compliance/APP_STORE.md` complete and matches the Privacy Manifest in DB.
- [x] `compliance/PLAY_STORE.md` complete and matches `public.permissions_inventory`.
- [x] App config (`app.json`) carries the iOS Info.plist usage strings and Android permissions.
- [x] Account deletion URL works without authentication (`csupply.in/account/delete`).

### A5. Permissions hygiene
Every permission has a runtime trigger (no upfront prompts), a fallback behaviour, and a stored rationale string visible to the user when the OS prompt appears. We do not request:
- `READ_PHONE_STATE`, `READ_SMS`, `RECEIVE_SMS` (Play sensitive)
- `READ_CONTACTS` (deferred to v1.1 vendor "Invite teammate")
- Storage broad permissions (we use scoped media APIs only)

## B. Standing process — runs on every change

### B1. New feature / sprint compliance gate
Before merging any feature that touches user data or new permissions:

1. **Update `public.privacy_manifest`** if the data type is new or its purpose changes.
2. **Update `public.permissions_inventory`** if a new permission is needed.
3. **Update `compliance/APP_STORE.md` and `compliance/PLAY_STORE.md`** to mirror DB state.
4. **Bump `legal_documents.version`** if Privacy Policy / Terms wording shifts.
5. **Add the new consent kind** to `consent_kind` enum if needed.

### B2. Quarterly compliance review (run from Super Admin → Compliance)
- Review pending DSR queue → none should be > 25 days old.
- Review grievance backlog → none > 13 days old (gives 2-day buffer before the 15-day SLA).
- Re-read every legal document; update versions if the product reality has changed.
- Check the audit log for unusual privileged actions.
- Revoke any stale staff or admin access.
- Confirm crash-reporter sampling is on minimum-PII mode.

### B3. Annual security review
- Third-party penetration test.
- DPDPA-style Data Protection Impact Assessment (DPIA) for any new high-risk processing.
- Refresh staff DPA acknowledgements.
- Renew SOC 2 Type II readiness (target Year-2).
- Re-run the App Store / Play Store check-ins to confirm no policy drift.

## C. Indian-law specifics

### C1. DPDPA 2023
- **Notice (Section 5):** the consent screen at first launch shows the purposes in clear language.
- **Consent (Section 6):** `granted=true` recorded with provenance for every consent kind.
- **Children (Section 9):** platform is 18+ — no children's flow. Children's Privacy Policy clarifies.
- **Significant Data Fiduciary (Section 10):** if breached scale, register and appoint Data Protection Officer (slot reserved in `legal_documents.grievance_redressal`).
- **Data Principal Rights (Section 11):** DSR queue handles access, correction, erasure, grievance.
- **Cross-border (Section 16):** notify users; Privacy Policy lists processing in AP-NE region.
- **Breach notification (Section 8):** 72-hour notification process documented in incident-response runbook.

### C2. IT Rules 2021 (Intermediary Guidelines)
- **Rule 3(1)(b):** Community Guidelines published.
- **Rule 3(1)(c):** content takedown within 36 hours of court/government order.
- **Rule 3(1)(d):** Grievance Officer published with name, email, address, response SLA.
- **Rule 3(2):** monthly compliance report to MeitY (kicks in if we cross 50 lakh users — slot reserved).

### C3. Consumer Protection (E-Commerce) Rules, 2020
- Vendor identity disclosed on every product page.
- Country of origin shown.
- Total price including taxes shown before checkout.
- Return / refund / exchange policy linked from the order page.
- Mandatory disclosure of Grievance Officer.

### C4. GST and tax
- Vendor GSTIN captured at onboarding and validated.
- B2B invoices include vendor GSTIN, customer GSTIN if provided, HSN codes, GST split.
- E-invoicing kicks in automatically when a vendor's turnover crosses ₹5 crore (RBI threshold currently).

## D. Apple App Store specifics

### D1. Sign in with Apple
Required because we offer phone-OTP sign-in. Implemented in `auth/login` with `expo-apple-authentication`. Apple-private relay emails are stored as the user's email; account deletion path also revokes the Apple-issued refresh token via the `apple-revoke` Edge Function.

### D2. Account deletion (Guideline 5.1.1(v))
In-app deletion at Account → Privacy → Delete account. The account is **soft-flagged** for 30 days and **hard-deleted** thereafter, with statutory holds (KYC, GST records) clearly disclosed at the time of the request.

### D3. App Privacy "Nutrition Label"
Source of truth: `public.privacy_manifest`. Every release that changes the manifest must update App Store Connect → App Privacy before submission.

### D4. Privacy Manifest (`PrivacyInfo.xcprivacy`)
Bundled in the iOS build. The build pipeline reads `public.privacy_manifest` and emits the plist. Required since Xcode 15 / iOS 17.

### D5. Encryption export compliance
Standard HTTPS only → exempt under category 5D992.c. `ITSAppUsesNonExemptEncryption=false`.

## E. Google Play specifics

### E1. Data Safety form
Source: `public.privacy_manifest`. Must be re-checked before every release. Mismatches between the form and runtime behaviour are an automated rejection.

### E2. Background location
Foreground-service implementation, transporter-only, lifecycle-bound to active trip. Declaration form filled with 30-second screencast showing the Start Trip → notification → Mark Delivered loop.

### E3. Account deletion URL
`https://csupply.in/account/delete` is publicly accessible — phone-OTP verifies identity, then the deletion is issued. Must remain stable across Play submissions.

### E4. Target API level
Refreshed yearly to comply with Play's deadline (currently API 34 / Android 14 for new apps, API 35 from Aug 2025).

## F. Web / PWA specifics

### F1. Cookie consent banner
First visit shows consent banner with Reject All, Accept Selected, Accept All. Defaults: only strictly-necessary cookies. Choice persisted in `localStorage` and synced to `user_consents` once the user signs in.

### F2. Robots and AI crawlers
`/robots.txt` generated from `public.crawler_permissions`. Super Admin controls per-bot access (GPTBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot, etc.). Path allowlists supported.

### F3. WCAG 2.2 AA
Annual accessibility audit; remediation tracked as a sprint goal. Our self-assessment lives in `compliance/ACCESSIBILITY_AUDIT.md`.

## G. Security plumbing

- TLS 1.3 in transit; Postgres SSL enforced.
- Supabase RLS on every user-data table.
- Service-role key only inside Edge Functions, never exposed to client.
- Audit log of every privileged action in `public.audit_events`.
- KYC documents in private Supabase Storage with signed URLs scoped to the document owner.
- 2FA mandatory for Admin and Super Admin.
- Hardware-key support for Super Admin.

## H. How to change the law

If a new regulation lands, the change set is:
1. Author / amend the relevant document in `public.legal_documents` (new version).
2. Update `compliance/APP_STORE.md` and `compliance/PLAY_STORE.md`.
3. Add the new `consent_kind` if required.
4. Add the new `dsr_kind` or `data_category` if required.
5. Bump app `versionCode` / `buildNumber` and submit.

Owner: Compliance & Trust. Backup: CTO. Escalation: legal counsel on retainer.
