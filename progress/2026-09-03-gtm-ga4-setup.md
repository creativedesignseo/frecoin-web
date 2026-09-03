# GTM + GA4 measurement setup

**Date:** 2026-09-03
**Status:** prepared and verified locally; production deploy blocked by SSH authentication

## Objective

Connect FRECOIN's existing GA4 property through its GTM container and prepare consent-aware
measurement for successful forms, phone clicks, WhatsApp clicks, and SPA navigation.

## Verified access and configuration

- GA4 account `frecoin`, property `frecoin.es` (`552199720`), web stream
  `G-YY2PPL6YP8`, URL `https://frecoin.es`, timezone `Europe/Madrid`, currency `EUR`.
- Search Console property `sc-domain:frecoin.es` with Full User access.
- GTM account `frecoin` (`6374291340`), web container `frecoin.es`
  (`GTM-TPX75G8N`), Default Workspace (`2`).
- The original GA4 property had no collected data at audit time. No Google Ads link exists.

## GTM workspace prepared (not published)

- `GA4 - Configuration` fires on All Pages and targets `G-YY2PPL6YP8`.
- Custom-event triggers and matching GA4 event tags exist for `form_submit`, `phone_click`,
  `whatsapp_click`, and virtual `page_view`.
- No previous GTM tags, triggers, or variables existed in the workspace.

## Code changed

- `src/lib/analytics.ts`: Consent Mode v2 defaults to denied; analytics storage is granted only
  after the visitor accepts optional analytics cookies. Advertising consent remains denied.
- `src/App.tsx`: tracks SPA route changes after the initial page view and captures all `tel:` and
  `wa.me` link clicks centrally, avoiding per-component duplication.
- `src/components/WhatsAppFloat.tsx` and `src/components/ServiceLayout.tsx`: removed duplicate
  WhatsApp event emissions now handled centrally.

## Verification

- `VITE_GTM_ID=GTM-TPX75G8N bash scripts/verify.sh` passed.
- Full prerender completed for all 11 public routes plus the real 404 page.
- The generated bundle contains `GTM-TPX75G8N` and does not contain the direct GA4 ID, avoiding
  duplicate measurement.

## Next step

Restore Hostinger SSH access: the local key `~/.ssh/frecoin_hostinger` was rejected by the
saved deployment connection candidates on 2026-09-03. No remote backup, upload, or GTM
publication was attempted after that failed read-only authentication check. Once the valid
Hostinger connection or an authorized public key is available, publish the GTM workspace, back
up `public_html`, deploy the complete prerendered `dist/` with
`VITE_GTM_ID=GTM-TPX75G8N`, then verify live SEO responses and GA4 realtime events after
accepting analytics cookies.
