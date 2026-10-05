import type { Engagement, EarningsMonth, RatingSummary, Tip } from '../types';
import { parseISODate } from './format';

const STARS = [5, 4, 3, 2, 1] as const;

/** Elapsed months between a start date and an end date, rounded to the nearest month (min 1). */
export const monthsBetween = (startISO: string, end: Date) => {
  const days = (end.getTime() - parseISODate(startISO).getTime()) / 86_400_000;
  return Math.max(1, Math.round(days / 30.44));
};

export const engagementMonths = (e: Engagement, now: Date) =>
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

/** Share of engagements backed by something stronger than self-report. */
export const verifiedShare = (engagements: Engagement[]) => {
  if (!engagements.length) return 0;
  const verified = engagements.filter((e) => e.verification !== 'self').length;
  return verified / engagements.length;
};

export const ratingStats = (summary: RatingSummary) => {
  const total = STARS.reduce((n, s) => n + summary.counts[s], 0);
  const sum = STARS.reduce((n, s) => n + s * summary.counts[s], 0);
  const average = total ? sum / total : 0;
  const distribution = STARS.map((star) => ({
    star,
    count: summary.counts[star],
    share: total ? summary.counts[star] / total : 0,
  }));
  return { total, average, distribution };
};

export const earningsSummary = (months: EarningsMonth[]) => {
  const totalBase = months.reduce((n, m) => n + m.base, 0);
  const totalTips = months.reduce((n, m) => n + m.tips, 0);
  const total = totalBase + totalTips;
  const avgMonthly = months.length ? total / months.length : 0;
  const last = months.at(-1);
  const prev = months.at(-2);
  const lastTotal = last ? last.base + last.tips : 0;
  const prevTotal = prev ? prev.base + prev.tips : 0;
  const changePct = prevTotal ? (lastTotal - prevTotal) / prevTotal : null;
  return {
    totalBase,
    totalTips,
    total,
    avgMonthly,
    tipsShare: total ? totalTips / total : 0,
    lastTotal,
    changePct,
  };
};

export const tipsSummary = (tips: Tip[]) => {
  const total = tips.reduce((n, t) => n + t.amount, 0);
  return { total, count: tips.length, withNotes: tips.filter((t) => t.note).length };
};

/** Tag → count across reviews, most frequent first. */
export const topTags = (tags: string[][], limit = 5) => {
  const counts = new Map<string, number>();
  for (const t of tags.flat()) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
};
