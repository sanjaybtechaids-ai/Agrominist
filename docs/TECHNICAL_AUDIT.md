# Agronomist technical audit — 19 November 2026

## Existing architecture

- Next.js 15 App Router, React 19, TypeScript and Tailwind CSS.
- Zustand persisted client store supplies authentication state, profiles, plots, products and notifications.
- Feature pages are present for farmer and customer flows; shared layout and multilingual string dictionaries already exist.
- No API routes, database client/configuration, migration, real authentication, server authorization or upload backend existed.

## Working UI features

- Responsive dashboard, land, recommendation, fertilizer, harvesting, analytics and marketplace screens.
- Onboarding and demo-role navigation; local data persists through the Zustand browser store.

## Broken or unsafe behaviour found

- Login accepts any non-empty identifier/password and only changes client state.
- The README describes mock weather, mandi and soil data as current/certified data.
- Agricultural, weather, mandi and voice services return hard-coded results with future-dated records.
- Client-side role and owner checks are bypassable; no data isolation is possible.
- No database, RLS, validation at trust boundary, migration, rate limiting, storage policy or environment template existed.

## Implementation delivered in this change

- Supabase SQL schema, indexes, authentication profile trigger and RLS foundation in `supabase/migrations`.
- Server API routes for registration, sign-in/out, current user, land plots/allocations, marketplace products/enquiries, crop planning and an explicit weather-unavailable response.
- Zod validation, server-derived identity, standardized errors and canonical-acre conversion helpers.
- Login now exchanges credentials with the backend and stores only the returned session token; it no longer treats arbitrary credentials as successful.

## Verification

- `npx tsc --noEmit --pretty false` passes.
- A clean Next production build was started after clearing the generated `.next` directory. In this Windows workspace the build runner did not return its completion status before the command window limit, so deployment verification remains a required local/CI step: `npm run build`.

## Deliberately awaiting configuration

- No weather, mandi, AI, voice or image provider is claimed as live. Weather is explicitly unavailable until an authorized provider is configured.
- Existing dashboards still show legacy prototype mock cards and should be migrated screen-by-screen to the routes above after Supabase is provisioned.
