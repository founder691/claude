import { describe, expect, it } from 'vitest';
import type { Engagement, Review } from '../types';
import { sampleWorker, SAMPLE_AS_OF } from '../data/sampleWorker';
import {
  allVerified,
  groupByWorkplace,
  incomeSummary,
  monthsBetween,
  ratingStats,
  splitReviews,
  topTags,
  totalExperienceMonths,
} from './metrics';
import { formatDuration, formatINR, formatYears } from './format';

const eng = (over: Partial<Engagement>): Engagement => ({
  id: over.start ?? 'x',
  role: 'Role',
  employer: 'Employer',
  location: 'City',
  start: '2024-01-01',
  end: null,
  summary: '',
  highlights: [],
  verification: 'employer',
  verifiedBy: 'Employer',
  verifiedHow: 'Confirmed',
  ...over,
});

const review = (over: Partial<Review>): Review => ({
  id: over.id ?? 'r',
  rating: 5,
  author: 'A',
  authorType: 'customer',
  workplace: 'W',
  date: '2026-01-01',
  text: '',
  tags: [],
  ...over,
});

describe('ratingStats', () => {
  it('computes weighted average', () => {
    const { average, total } = ratingStats({ 5: 3, 4: 1, 3: 0, 2: 0, 1: 0 });
    expect(total).toBe(4);
    expect(average).toBeCloseTo(4.75);
  });
  it('handles no ratings', () => {
    expect(ratingStats({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }).average).toBe(0);
  });
});

describe('experience', () => {
  it('rounds elapsed months', () => {
    expect(monthsBetween('2023-02-06', new Date(Date.UTC(2024, 6, 31)))).toBe(18);
  });
  it('does not double-count overlapping jobs', () => {
    const now = new Date(Date.UTC(2024, 11, 31));
    expect(totalExperienceMonths([eng({ end: '2024-06-30' }), eng({ start: '2024-04-01' })], now)).toBe(12);
  });
  it('treats self-reported jobs as unconfirmed', () => {
    expect(allVerified([eng({}), eng({ verification: 'self' })])).toBe(false);
    expect(allVerified([])).toBe(false);
  });
});

describe('groupByWorkplace', () => {
  it('merges a promotion into one workplace, newest first', () => {
    const groups = groupByWorkplace([
      eng({ id: 'a', employer: 'Cafe', role: 'Barista', start: '2022-01-01', end: '2023-01-01', verification: 'payroll' }),
      eng({ id: 'b', employer: 'Cafe', role: 'Lead', start: '2023-01-02', end: null, verification: 'payroll' }),
      eng({ id: 'c', employer: 'Hotel', role: 'Server', start: '2020-01-01', end: '2021-12-31', verification: 'peer', verifiedBy: '3 co-workers' }),
    ]);
    expect(groups.map((g) => g.employer)).toEqual(['Cafe', 'Hotel']);
    expect(groups[0].roles.map((r) => r.role)).toEqual(['Lead', 'Barista']);
    expect(groups[0]).toMatchObject({ start: '2022-01-01', end: null });
    expect(groups[1]).toMatchObject({ end: '2021-12-31', verifiedBy: '3 co-workers' });
  });
  it('reports the weakest verification for a workplace', () => {
    const [g] = groupByWorkplace([
      eng({ id: 'a', verification: 'payroll', start: '2023-01-01' }),
      eng({ id: 'b', verification: 'self', verifiedBy: 'Self', start: '2022-01-01', end: '2022-12-31' }),
    ]);
    expect(g.verification).toBe('self');
  });
});

describe('reviews', () => {
  it('features the latest manager and latest customer review', () => {
    const { featured, rest } = splitReviews([
      review({ id: 'c-old', date: '2025-01-01' }),
      review({ id: 'c-new', date: '2026-01-01' }),
      review({ id: 'm', authorType: 'manager', date: '2024-01-01' }),
      review({ id: 'w', authorType: 'coworker', date: '2026-02-01' }),
    ]);
    expect(featured.map((r) => r.id)).toEqual(['m', 'c-new']);
    expect(rest.map((r) => r.id)).toEqual(['w', 'c-old']);
  });
  it('orders tags by frequency then alphabetically', () => {
    expect(topTags([review({ tags: ['b', 'a'] }), review({ tags: ['a'] }), review({ tags: ['c'] })], 2)).toEqual(['a', 'b']);
  });
});

describe('incomeSummary', () => {
  it('averages pay and tips per month', () => {
    expect(
      incomeSummary([
        { month: '2026-01', base: 1000, tips: 100 },
        { month: '2026-02', base: 1000, tips: 300 },
      ]),
    ).toEqual({ avgMonthly: 1200, avgTips: 200 });
  });
});

describe('formatting', () => {
  it('uses Indian digit grouping', () => {
    expect(formatINR(123456)).toBe('₹1,23,456');
  });
  it('writes durations in plain words', () => {
    expect(formatDuration(27)).toBe('2 years, 3 months');
    expect(formatDuration(12)).toBe('1 year');
    expect(formatDuration(1)).toBe('1 month');
    expect(formatYears(77)).toBe('6 years');
  });
});

describe('sample data', () => {
  it('is internally consistent', () => {
    expect(sampleWorker.engagements.filter((e) => e.end === null)).toHaveLength(1);
    expect(allVerified(sampleWorker.engagements)).toBe(true);
    expect(formatYears(totalExperienceMonths(sampleWorker.engagements, SAMPLE_AS_OF))).toBe('6 years');
  });
});
