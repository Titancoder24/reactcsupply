# C-Supply Compliance Package

This directory is the legal & store-submission control surface for C-Supply.

| File | Audience | Purpose |
|------|----------|---------|
| `APP_STORE.md` | iOS submission engineer | Everything App Store Connect and App Review will ask. Mirrors the Privacy Manifest in DB. |
| `PLAY_STORE.md` | Android submission engineer | Everything Play Console will ask. Mirrors `permissions_inventory` in DB. |
| `COMPLIANCE_CHECKLIST.md` | Compliance & Trust | Master checklist + standing process for keeping the app continuously fit. |
| `README.md` | Anyone | This file. |

**Source of truth for runtime behaviour** is the database (`legal_documents`, `privacy_manifest`, `permissions_inventory`, `feature_flags`, `crawler_permissions`). The Markdown files document the submission packages; the Super Admin → Compliance console edits the underlying records.

When law / store policy changes:

1. Edit the underlying record from Super Admin.
2. Update the relevant Markdown file in this directory.
3. Bump app version and resubmit if it affects user disclosures.
