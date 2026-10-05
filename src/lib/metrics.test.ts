import { describe, expect, it } from 'vitest';
import type { Engagement } from '../types';
import { sampleWorker, SAMPLE_AS_OF } from '../data/sampleWorker';
import { earningsSummary, monthsBetween, ratingStats, topTags, totalExperienceMonths, verifiedShare } from './metrics';
import { formatDuration, formatINR, formatINRShort } from './format';

const eng = (start: string, end: string | null, verification: Engagement['verification'] = 'employer'): Engagement => ({
  id: start,
  role: 'r',
  employer: 'e',
  location: 'l',
  type: 'full-time',
  start,
  end,
  verification,
  highlights: [],
  skills: [],
});

describe('ratingStats', () => {
  it('computes weighted average and shares', () => {
    const { average, total, distribution } = ratingStats({ counts: { 5: 3, 4: 1, 3: 0, 2: 0, 1: 0 } });
    expect(total).toBe(4);
    expect(average).toBeCloseTo(4.75);
    expect(distribution[0]).toEqual({ star: 5, count: 3, share: 0.75 });
  });

  it('handles no ratings', () => {
    expect(ratingStats({ counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }).average).toBe(0);
  });
});

describe('experience', () => {
  it('rounds elapsed months', () => {
    expect(monthsBetween('2023-02-06', new Date(Date.UTC(2024, 6, 31)))).toBe(18);
  });

  it('does not double-count overlapping engagements', () => {
    const now = new Date(Date.UTC(2024, 11, 31));
    const months = totalExperienceMonths([eng('2024-01-01', '2024-06-30'), eng('2024-04-01', null)], now);
    expect(months).toBe(12);
  });

  it('counts verified share excluding self-reported', () => {
    expect(verifiedShare([eng('2024-01-01', null, 'payroll'), eng('2023-01-01', '2023-06-01', 'self')])).toBe(0.5);
  });
});

describe('earningsSummary', () => {
  it('totals base and tips and month-over-month change', () => {
    const s = earningsSummary([
      { month: '2026-01', base: 1000, tips: 0 },
      { month: '2026-02', base: 1000, tips: 100 },
    ]);
    expect(s.total).toBe(2100);
    expect(s.totalTips).toBe(100);
    expect(s.changePct).toBeCloseTo(0.1);
  });

  it('returns null change with a single month', () => {
    expect(earningsSummary([{ month: '2026-01', base: 1, tips: 1 }]).changePct).toBeNull();
  });
});

describe('topTags', () => {
  it('orders by frequency then alphabetically', () => {
    expect(topTags([['b', 'a'], ['a'], ['c']], 2)).toEqual([
      { tag: 'a', count: 2 },
      { tag: 'b', count: 1 },
    ]);
  });
});

describe('formatting', () => {
  it('uses Indian digit grouping', () => {
    expect(formatINR(123456)).toBe('₹1,23,456');
  });
  it('formats durations', () => {
    expect(formatDuration(27)).toBe('2 yrs 3 mos');
    expect(formatDuration(12)).toBe('1 yr');
    expect(formatDuration(1)).toBe('1 mo');
  });
});

describe('sample data', () => {
  it('has exactly one current role and a sensible headline', () => {
    expect(sampleWorker.engagements.filter((e) => e.end === null)).toHaveLength(1);
    expect(ratingStats(sampleWorker.ratings).average).toBeGreaterThan(4.5);
    expect(totalExperienceMonths(sampleWorker.engagements, SAMPLE_AS_OF)).toBeGreaterThan(60);
  });
});

describe('formatINRShort', () => {
  it('uses k / L / Cr suffixes', () => {
    expect(formatINRShort(950)).toBe('₹950');
    expect(formatINRShort(41540)).toBe('₹41.5k');
    expect(formatINRShort(40000)).toBe('₹40k');
    expect(formatINRShort(235170)).toBe('₹2.4L');
  });
});
