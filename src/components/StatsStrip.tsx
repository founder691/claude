import type { Worker } from '../types';
import { formatDuration } from '../lib/format';
import { ratingStats, totalExperienceMonths, verifiedShare } from '../lib/metrics';

export function StatsStrip({ worker, now }: { worker: Worker; now: Date }) {
  const { average, total } = ratingStats(worker.ratings);
  const experience = totalExperienceMonths(worker.engagements, now);
  const verified = verifiedShare(worker.engagements);
  const employers = new Set(worker.engagements.map((e) => e.employer)).size;

  const stats = [
    { label: 'Experience', value: formatDuration(experience), sub: `${employers} employers` },
    { label: 'Rating', value: average.toFixed(1), sub: `${total.toLocaleString('en-IN')} ratings` },
    { label: 'Verified history', value: `${Math.round(verified * 100)}%`, sub: `${worker.engagements.length} roles` },
    { label: 'Recognitions', value: String(worker.recognitions.length), sub: 'awards & certs' },
  ];

  return (
    <dl className="stats">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <dt className="stat__label">{s.label}</dt>
          <dd className="stat__value">{s.value}</dd>
          <dd className="stat__sub">{s.sub}</dd>
        </div>
      ))}
    </dl>
  );
}
