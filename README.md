# Agronomist

Smart Farming. Better Decisions. Fair Markets.

Agronomist is a Next.js application for farmer-managed land records and a direct produce marketplace. It does not ship demo users, fabricated crop advice, weather observations, mandi prices, fertilizer quantities, or marketplace listings.

## Setup

1. Copy `.env.example` to `.env.local` and provide values locally. Never commit keys.
2. Apply the ordered SQL files in `supabase/migrations/` to the intended Supabase project.
3. Run `npm install` and `npm run dev`.
4. Register a real account. New users are assigned their role through Supabase Auth metadata and receive a matching profile through the database trigger.

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
WEATHER_API_KEY=
AI_API_KEY=
VOICE_API_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, and provider keys are server-only. Do not use a service-role/secret key in client code or any `NEXT_PUBLIC_*` variable.

## Current provider behavior

OpenWeatherMap is used server-side for current conditions when `WEATHER_API_KEY` is set. Gemini is available server-side at `POST /api/ai/explain` for authenticated farmers: it explains supplied verified facts only and must not be used to generate agricultural prescriptions. Mandi, voice, soil-estimation, and crop/fertilizer provider adapters deliberately return an unavailable or empty state until an authorized provider integration is configured and tested.

## Verification

```bash
npx tsc --noEmit
npm run build
```

The current `npm run lint` script invokes an unconfigured interactive Next.js ESLint setup. Configure ESLint before using it in CI.
