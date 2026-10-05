const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** ₹1,23,456 — Indian digit grouping. */
export const formatINR = (amount: number) => inr.format(amount);

export const parseISODate = (iso: string) => {
  const [y, m, d = 1] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

export const formatMonthYear = (iso: string) =>
  parseISODate(iso).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const formatMonthLong = (iso: string) =>
  parseISODate(iso).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatYear = (iso: string) => String(parseISODate(iso).getUTCFullYear());

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** "2 years, 3 months", "8 months", "1 year". */
export const formatDuration = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return plural(m, 'month');
  return m ? `${plural(y, 'year')}, ${plural(m, 'month')}` : plural(y, 'year');
};

/** Whole years only, for headlines: "6 years", or "8 months" under a year. */
export const formatYears = (months: number) =>
  months < 12 ? plural(months, 'month') : plural(Math.floor(months / 12), 'year');
