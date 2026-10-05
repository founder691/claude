import type { Experience, Worker } from '../types';

const STARS = [5, 4, 3, 2, 1] as const;

/** Average rating, count, and share of positive (4–5 star) ratings. */
export const ratingSummary = (ratings: Worker['ratings']) => {
  const total = STARS.reduce((n, s) => n + ratings[s], 0);
  const sum = STARS.reduce((n, s) => n + s * ratings[s], 0);
  return {
    total,
    average: total ? sum / total : 0,
    positiveShare: total ? (ratings[5] + ratings[4]) / total : 0,
  };
};

/** Current job first, then most recent. */
export const sortExperience = (items: Experience[]) =>
  [...items].sort((a, b) => (a.end === null ? -1 : b.end === null ? 1 : b.start.localeCompare(a.start)));

/** Number of jobs someone at the workplace has confirmed. */
export const verifiedJobCount = (items: Experience[]) => items.filter((e) => e.verifiedBy).length;
