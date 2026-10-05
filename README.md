# Tirelo — worker profile prototype

A responsive prototype of a **Tirelo worker profile**: a professional identity that belongs to the
worker, not the employer, and travels with them from job to job. Every claim on the profile shows
who vouches for it.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests for metrics & formatting
npm run build      # typecheck + production build
```

## Product structure

The page answers three questions, in this order:

1. **Who is this, and can I trust it?** — Header with name, headline, city, languages, government-ID
   check, and a shareable profile link. A stats strip summarises experience, rating, share of
   history that is verified, and recognitions.
2. **What have they done?** — *Current role* card (highlights, tenure, how it's verified) followed by a
   *Verified work history* timeline. Each engagement carries a verification level:

   | Level | Meaning |
   |---|---|
   | Payroll verified | Matched against salary / UPI payout records (strongest) |
   | Employer verified | Confirmed by an authorised employer account |
   | Peer verified | Confirmed by 2+ verified co-workers (for gig / informal work) |
   | Self-reported | Not yet verified |

3. **What do people say?** — *Ratings & reviews* (score, distribution, most-mentioned traits,
   filter by customers / managers / co-workers) and *Tips & recognition* (recent tips with
   thank-you notes, awards, certifications, milestones).

Plus an **Earnings summary** (6-month total, monthly average, tip share, month-over-month change,
stacked base-pay/tips chart with a table view).

### Privacy model

The profile is worker-owned, so visibility is part of the product. The **My view / Employer view**
toggle previews what a shared link shows:

| Section | Worker | Employer (shared link) |
|---|---|---|
| Identity, history, reviews, recognitions | ✓ | ✓ |
| Tips — notes | ✓ | ✓ |
| Tips — amounts | ✓ | hidden |
| Earnings | ✓ | hidden (worker can share a verified statement separately) |

## Technical approach

- **Vite + React 19 + TypeScript**, no UI or chart libraries: plain CSS with design tokens and an
  inline-SVG chart keep the bundle small and the prototype easy to restyle.
- **Typed domain model** (`src/types.ts`) — `Worker`, `Engagement`, `Review`, `Tip`,
  `Recognition`, `EarningsMonth`, `VerificationSource`. The sample data
  (`src/data/sampleWorker.ts`) has the shape an API response would have, so swapping in a real
  backend means replacing one import.
- **Pure derivations** (`src/lib/metrics.ts`) — rating average/distribution, experience without
  double-counting overlapping jobs, verified share, earnings totals, top review tags. Unit tested
  with Vitest. Formatting (`src/lib/format.ts`) uses Indian digit grouping (₹2,35,170) and
  k / L / Cr short forms.
- **Responsive**: two columns at ≥ 960px (sticky sidebar for earnings and tips), one column below;
  stats go from 4 to 2 columns; checked at 390px with no horizontal scroll.
- **Accessible**: semantic sections and headings, verification shown as icon + text (not colour
  alone), keyboard-focusable chart columns with tooltips, a table view of the chart data, and light
  and dark themes (`prefers-color-scheme`, or `data-theme` on `<html>`).
- Sample data is anchored to a fixed date (`SAMPLE_AS_OF`) so "2 days ago" and tenure stay stable.

```
src/
  types.ts                 domain model
  data/sampleWorker.ts     realistic sample worker (fictional)
  lib/format.ts            ₹ / date / duration formatting
  lib/metrics.ts           pure derived metrics (+ metrics.test.ts)
  components/              ProfileHeader, StatsStrip, CurrentRole, WorkHistory,
                           RatingsReviews, TipsRecognition, EarningsSummary,
                           EarningsChart, VerificationBadge, Stars, Card
  App.tsx                  layout + viewer toggle
```

## Next steps

- API + auth: worker-owned profile, employer accounts that can attest engagements.
- Verification flows: payroll/UPI matching, employer attestations, peer confirmations.
- Granular share links (per-section consent, expiry) and a verified income statement export.
- Tie reviews to real tip/payment events to prevent fake reviews.
- Localisation (Hindi, Kannada, Tamil…) and a print/PDF version of the profile.
