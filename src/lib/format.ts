const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** ₹1,23,456 — Indian digit grouping. */
export const formatINR = (amount: number) => inr.format(amount);

const trim = (n: number) => String(Number(n.toFixed(1)));

/** Short form for chart axes: ₹950, ₹41.5k, ₹1.2L, ₹3.4Cr. */
export const formatINRShort = (amount: number) => {
  const abs = Math.abs(amount);
  if (abs >= 1e7) return `₹${trim(amount / 1e7)}Cr`;
  if (abs >= 1e5) return `₹${trim(amount / 1e5)}L`;
  if (abs >= 1e3) return `₹${trim(amount / 1e3)}k`;
  return `₹${amount}`;
};

const parseISODate = (iso: string) => {
  const [y, m, d = 1] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

export const formatMonthYear = (iso: string) =>
  parseISODate(iso).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const formatMonthShort = (iso: string) =>
  parseISODate(iso).toLocaleDateString('en-IN', { month: 'short', timeZone: 'UTC' });

export const formatDate = (iso: string) =>
  parseISODate(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "2 yrs 3 mos", "8 mos", "1 yr". */
export const formatDuration = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m || !y) parts.push(`${m} mo${m === 1 ? '' : 's'}`);
  return parts.join(' ');
};

export const formatRelative = (iso: string, now: Date = new Date()) => {
  const days = Math.round((now.getTime() - parseISODate(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} wk${days < 14 ? '' : 's'} ago`;
  return formatDate(iso);
};

export { parseISODate };
