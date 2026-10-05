# Tirelo — Service Passport prototype

A mobile-first prototype of the **Tirelo Service Passport**: a worker's professional identity,
reputation and verified work history, which travels with them from workplace to workplace.
It follows the approved Service Passport design.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests
npm run build      # typecheck + production build
```

## Structure (top to bottom, as in the approved design)

1. **App bar**: back, "Service Passport", settings.
2. **Identity**: round photo, Public/Private pill, name, profession, "Member since".
3. **Reputation**: average rating (with how many ratings), review count, % positive.
4. **About**: a short plain-language summary.
5. **Details**: role and location.
6. **Experience**: one row per workplace with an icon, employer, role, dates and the rating earned
   there. A green tick marks jobs the employer has verified.
7. **Powered by tirelo**.

The background is the design's mint → white → pink gradient, and content sits directly on it,
with no boxed cards. On wider screens the same phone-width column is centred.

### Small additions to the reference

- **Verified tick** beside each employer (labelled "Verified by employer" for screen readers),
  so "verified work history" is visible, not just implied.
- A small star before each job's rating, so "· 4.8" reads as a rating.
- The **Public** pill is a button that switches the passport between Public and Private.
- If no `photoUrl` is set, the photo slot shows a monogram.

The back arrow calls `history.back()`. The settings button has no behaviour yet.

## Technical approach

- **Vite + React 19 + TypeScript**, no UI libraries; plain CSS with tokens; Lexend from Google
  Fonts with system fallbacks. Inline SVG icons and a redrawn Tirelo mark (`TireloLogo.tsx`).
- **Typed model** (`src/types.ts`): `Worker` with `ratings` (counts per star) and `experience[]`.
  The average, review count and % positive (4–5 stars) are calculated from the counts
  (`src/lib/metrics.ts`), not hard-coded.
- **Sample data** (`src/data/sampleWorker.ts`) mirrors the approved design: 162 ratings,
  4.8 average, 96% positive, 7+ years across two salons.

```
src/
  types.ts, data/sampleWorker.ts
  lib/format.ts, lib/metrics.ts (+ metrics.test.ts)
  components/  AppBar, ProfileHeader, RatingRow, Details, ExperienceList, TireloLogo, Icons
  App.tsx      page order
```
