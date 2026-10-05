import type { Engagement, EarningsMonth, Review, VerificationSource, Worker } from '../types';
import { parseISODate } from './format';

/** Elapsed months between a start date and an end date, rounded to the nearest month (min 1). */
export const monthsBetween = (startISO: string, end: Date) => {
  const days = (end.getTime() - parseISODate(startISO).getTime()) / 86_400_000;
  return Math.max(1, Math.round(days / 30.44));
};

export const engagementMonths = (e: Pick<Engagement, 'start' | 'end'>, now: Date) =>
  monthsBetween(e.start, e.end ? parseISODate(e.end) : now);

export const currentEngagement = (engagements: Engagement[]) => engagements.find((e) => e.end === null);

/**
 * Total experience in months. Overlapping engagements are not double-counted:
 * months are merged on a calendar basis.
 */
export const totalExperienceMonths = (engagements: Engagement[], now: Date) => {
  const covered = new Set<string>();
  for (const e of engagements) {
    const start = parseISODate(e.start);
    const end = e.end ? parseISODate(e.end) : now;
    const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
    while (cursor <= end) {
      covered.add(`${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}`);
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
  }
  return covered.size;
};

export const isVerified = (source: VerificationSource) => source !== 'self';

export const allVerified = (engagements: Engagement[]) =>
  engagements.length > 0 && engagements.every((e) => isVerified(e.verification));

export interface Workplace {
  employer: string;
  location: string;
  start: string;
  end: string | null;
  /** Roles held here, newest first. */
  roles: Engagement[];
  verification: VerificationSource;
  verifiedBy: string;
  verifiedHow: string;
}

const STRENGTH: Record<VerificationSource, number> = { payroll: 3, employer: 2, peer: 1, self: 0 };

/** Groups roles by employer so a promotion reads as one story, newest workplace first. */
export const groupByWorkplace = (engagements: Engagement[]): Workplace[] => {
  const byEmployer = new Map<string, Engagement[]>();
  for (const e of [...engagements].sort((a, b) => b.start.localeCompare(a.start))) {
    byEmployer.set(e.employer, [...(byEmployer.get(e.employer) ?? []), e]);
  }
  return [...byEmployer.values()].map((roles) => {
    // A workplace is only as verified as its least-verified role.
    const weakest = roles.reduce((w, r) => (STRENGTH[r.verification] < STRENGTH[w.verification] ? r : w));
    const ongoing = roles.some((r) => r.end === null);
    return {
      employer: roles[0].employer,
      location: roles[0].location,
      start: roles[roles.length - 1].start,
      end: ongoing ? null : roles.map((r) => r.end!).sort().at(-1)!,
      roles,
      verification: weakest.verification,
      verifiedBy: weakest.verifiedBy,
      verifiedHow: weakest.verifiedHow,
    };
  });
};

export const ratingStats = (counts: Worker['ratings']) => {
  const stars = [5, 4, 3, 2, 1] as const;
  const total = stars.reduce((n, s) => n + counts[s], 0);
  const sum = stars.reduce((n, s) => n + s * counts[s], 0);
  return { total, average: total ? sum / total : 0 };
};

/** Most frequent review tags, most frequent first. */
export const topTags = (reviews: Review[], limit = 3) => {
  const counts = new Map<string, number>();
  for (const t of reviews.flatMap((r) => r.tags)) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
};

/**
 * The two reviews shown upfront: the latest from someone who managed the worker
 * and the latest from a customer. Everything else is behind "Read all".
 */
export const splitReviews = (reviews: Review[]) => {
  const sorted = [...reviews].sort((a, b) => b.date.localeCompare(a.date));
  const featured = (['manager', 'customer'] as const)
    .map((type) => sorted.find((r) => r.authorType === type))
    .filter((r): r is Review => Boolean(r));
  return { featured, rest: sorted.filter((r) => !featured.includes(r)) };
};

export const incomeSummary = (months: EarningsMonth[]) => {
  const n = months.length || 1;
  const totalBase = months.reduce((s, m) => s + m.base, 0);
  const totalTips = months.reduce((s, m) => s + m.tips, 0);
  return {
    avgMonthly: Math.round((totalBase + totalTips) / n),
    avgTips: Math.round(totalTips / n),
  };
};
