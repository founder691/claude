import { describe, expect, it } from 'vitest';
import type { Experience } from '../types';
import { sampleWorker } from '../data/sampleWorker';
import { ratingSummary, sortExperience } from './metrics';
import { formatMonthYear, formatRange } from './format';

const exp = (id: string, start: string, end: string | null): Experience => ({
  id, employer: id, role: 'r', start, end, rating: 5, verified: true, icon: 'lotus', tone: 'soft',
});

describe('ratingSummary', () => {
  it('computes average, count and positive share', () => {
    const s = ratingSummary({ 5: 6, 4: 2, 3: 1, 2: 0, 1: 1 });
    expect(s.total).toBe(10);
    expect(s.average).toBeCloseTo(4.2);
    expect(s.positiveShare).toBeCloseTo(0.8);
  });
  it('handles no ratings', () => {
    expect(ratingSummary({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })).toEqual({ total: 0, average: 0, positiveShare: 0 });
  });
  it('matches the approved design for the sample worker', () => {
    const s = ratingSummary(sampleWorker.ratings);
    expect(s.total).toBe(162);
    expect(s.average.toFixed(1)).toBe('4.8');
    expect(Math.round(s.positiveShare * 100)).toBe(96);
  });
});

describe('sortExperience', () => {
  it('puts the current job first, then newest', () => {
    const sorted = sortExperience([exp('old', '2015-01', '2017-01'), exp('mid', '2018-01', '2020-01'), exp('now', '2021-01', null)]);
    expect(sorted.map((e) => e.id)).toEqual(['now', 'mid', 'old']);
  });
});

describe('format', () => {
  it('formats months and ranges', () => {
    expect(formatMonthYear('2025-03')).toBe('Mar 2025');
    expect(formatRange('2023-01', null)).toBe('Jan 2023 – Present');
    expect(formatRange('2019-06', '2022-12')).toBe('Jun 2019 – Dec 2022');
  });
});
