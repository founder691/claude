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
2. **Identity**: round photo, Public/Private pill, name, profession, "Member since",
   "✓ Identity verified".
3. **Reputation**: average rating (with how many ratings), review count, % positive.
4. **Share my Passport**: a full-width button with one line on why ("Your passport goes with
   you…"). Once it scrolls away, the same button stays pinned to the bottom of the screen.
5. **About**: a short plain-language summary.
6. **Details**: role and location.
7. **Experience**: one row per workplace with an icon, employer, role, dates and the rating earned
   there, plus who verified it: "✓ Verified by Anjali Menon, Salon owner". A small
   **What does "Verified" mean?** link explains, in three lines, who confirms jobs, identity
   and ratings.
8. **Powered by tirelo**.

### Sharing

"Share my Passport" opens a bottom sheet with:

- a preview of what's being shared (name, profession, rating, "2 verified jobs · ID verified");
- **Send on WhatsApp** (opens WhatsApp with a ready-made message and the link);
- **Copy link**, showing the link itself;
- **Show QR code**, for showing someone in person;
- a reminder that people with the link can view the passport but not change it.

If the passport is set to Private, the sheet explains that the link won't open for others yet
and offers **Make public and share** instead.

The background is the design's mint → white → pink gradient, and content sits directly on it,
with no boxed cards. On wider screens the same phone-width column is centred.

### Additions to the reference

- **Share my Passport** button and share sheet (see above).
- **Plain-language verification**: "Identity verified" under the name, and who verified each
  job, instead of badges or technical labels.
- A small star before each job's rating, so "· 4.8" reads as a rating.
- The **Public** pill is a button that switches the passport between Public and Private.
- If no `photoUrl` is set, the photo slot shows a monogram.

The back arrow calls `history.back()`. The settings button has no behaviour yet.

## Technical approach

- **Vite + React 19 + TypeScript**, no UI libraries; plain CSS with tokens; Lexend from Google
  Fonts with system fallbacks. Inline SVG icons and a redrawn Tirelo mark (`TireloLogo.tsx`). The share sheet is a
  native `<dialog>`; QR codes come from the `qrcode` package.
- **Typed model** (`src/types.ts`): `Worker` with `ratings` (counts per star), `identityVerified`,
  `passportUrl` and `experience[]`; each job's optional `verifiedBy` names the person who confirmed it.
  The average, review count and % positive (4–5 stars) are calculated from the counts
  (`src/lib/metrics.ts`), not hard-coded.
- **Sample data** (`src/data/sampleWorker.ts`) mirrors the approved design: 162 ratings,
  4.8 average, 96% positive, 7+ years across two salons.

```
src/
  types.ts, data/sampleWorker.ts
  lib/format.ts, lib/metrics.ts (+ metrics.test.ts)
  components/  AppBar, ProfileHeader, Avatar, RatingRow, ShareButton, ShareSheet, Details,
               ExperienceList, TireloLogo, Icons
  App.tsx      page order
```
