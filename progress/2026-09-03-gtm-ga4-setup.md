# GTM + GA4 measurement setup

**Date:** 2026-09-03
**Status:** deployed; GA4 realtime propagation confirmation pending

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

## Production deployment

- Hostinger SSH access was restored by removing and re-adding the existing public key in hPanel.
- Remote backup created: `~/backup_public_html_20260903_211132`.
- GTM Default Workspace published as container version 2.
- `rsync` deployed `dist/` without `--delete`; it excluded `admin/`, `panel/`, uploads, CMS
  snapshots, `send-form.php`, and email templates.
- Live checks passed: home and service-specific titles, 404 status, www-to-apex 301, 11 sitemap
  URLs, robots block for `/rediseno`, panel 200, API auth 401, and GTM ID in the served bundle.
- GTM loaded after accepting cookies in a clean test session. The public GTM JavaScript includes
  the GA4 measurement ID and all four event names.

## Remaining verification

GA4 realtime and same-day reporting did not show the first test session during the brief
post-deploy window. Recheck after propagation before reporting analytics as receiving data.
