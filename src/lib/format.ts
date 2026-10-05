const parseYearMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1));
};

/** "2025-03" → "Mar 2025" */
export const formatMonthYear = (ym: string) =>
  parseYearMonth(ym).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "Jan 2023 – Present" */
export const formatRange = (start: string, end: string | null) =>
  `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'Present'}`;
