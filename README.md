# Tirelo — worker profile prototype

A prototype of a **Tirelo work passport**: a worker's professional reputation and confirmed work
history, owned by the worker and carried from job to job.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests for metrics & formatting
npm run build      # typecheck + production build
```

## Design

The page answers one question: **"Who is this person professionally, and why should I trust
their work?"** It is designed as a work *passport*, not a dashboard: one calm column,
mobile-first, plain language, and details only when you ask for them.

| # | Section | Shown upfront | Behind "show more" |
|---|---|---|---|
| 1 | **Passport** — who they are | Name, current job, city, languages, ID checked, two trust lines ("6 years of work, every job confirmed", "4.8 stars from 319 customers") | — |
| 2 | **Working now** | Role, workplace, how long, one sentence, who confirmed it | Highlights, how it was confirmed |
| 3 | **Work history** | One line per workplace (a promotion reads as "Barista → Shift Lead") | Each role's dates and description, who confirmed it and how |
| 4 | **What people say** | Rating, three words people use most, one manager quote + one customer quote | All reviews |
| 5 | **Awards & certificates** | Short list | — |
| 6 | **Your income** — private | Clearly marked "Only you can see this"; the amount is hidden until tapped | Month by month |
| 7 | **Share profile** | Large button in the passport; stays pinned to the bottom of the screen after scrolling | Share sheet: WhatsApp, copy link, and a reminder that income is never shared |

Directly under the passport, one sentence explains Tirelo to someone who has never heard of it.

Verification is written in plain words ("Confirmed by Kaapi Collective · Matched with salary
records") rather than labels or badges. Under the hood each job carries a source — payroll,
employer, co-workers, or self-reported — and a workplace shows its weakest one.

## Technical approach

- **Vite + React 19 + TypeScript**, no UI libraries. Plain CSS with design tokens; light and dark
  themes (`prefers-color-scheme`, or `data-theme` on `<html>`). Fraunces + Inter from Google Fonts,
  with system fallbacks.
- **Progressive disclosure with native `<details>`**, so expand/collapse is keyboard- and
  screen-reader-friendly with no extra code. The share sheet is a native `<dialog>`.
- **Typed domain model** (`src/types.ts`) and sample data shaped like an API response
  (`src/data/sampleWorker.ts`).
- **Pure helpers** (`src/lib/metrics.ts`, unit tested): experience without double-counting
  overlapping jobs, grouping roles by workplace, choosing which reviews to feature, rating
  average, income averages. `src/lib/format.ts` writes durations in words and money in Indian
  digit grouping (₹39,195).
- Sample data is anchored to a fixed date (`SAMPLE_AS_OF`) so durations stay stable.

```
src/
  types.ts                 domain model
  data/sampleWorker.ts     sample worker (fictional)
  lib/                     format.ts, metrics.ts (+ metrics.test.ts)
  components/              Passport, CurrentRole, WorkHistory, Reputation, Recognition,
                           PrivateIncome, ShareSheet, Section/More, Verified, Stars, Icons
  App.tsx                  page order + sticky share bar
```

## Next steps

- API + auth: worker-owned profile, employer accounts that can attest engagements.
- Verification flows: payroll/UPI matching, employer attestations, peer confirmations.
- A read-only public page for the shared link (same sections, income removed).
- Tie reviews to real tip/payment events to prevent fake reviews.
- Localisation (Hindi, Kannada, Tamil…) and a print/PDF version of the profile.
