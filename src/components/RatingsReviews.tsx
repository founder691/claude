import { useMemo, useState } from 'react';
import type { Engagement, RatingSummary, Review, ReviewerType } from '../types';
import { formatRelative } from '../lib/format';
import { ratingStats, topTags } from '../lib/metrics';
import { Card } from './Card';
import { Stars } from './Stars';

type Filter = 'all' | ReviewerType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'customer', label: 'Customers' },
  { value: 'manager', label: 'Managers' },
  { value: 'coworker', label: 'Co-workers' },
];

const AUTHOR_LABEL: Record<ReviewerType, string> = {
  customer: 'Verified customer',
  manager: 'Manager',
  coworker: 'Co-worker',
};

export function RatingsReviews({
  ratings,
  reviews,
  engagements,
  now,
}: {
  ratings: RatingSummary;
  reviews: Review[];
  engagements: Engagement[];
  now: Date;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const { average, total, distribution } = ratingStats(ratings);
  const tags = useMemo(() => topTags(reviews.map((r) => r.tags)), [reviews]);
  const employerOf = (id: string) => engagements.find((e) => e.id === id)?.employer ?? '';

  const visible = reviews
    .filter((r) => filter === 'all' || r.authorType === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card id="reviews" title="Ratings & reviews">
      <div className="ratings">
        <div className="ratings__score">
          <p className="ratings__big">{average.toFixed(1)}</p>
          <Stars value={average} size={18} />
          <p className="muted small">{total.toLocaleString('en-IN')} ratings</p>
        </div>
        <ul className="ratings__dist" aria-label="Rating distribution">
          {distribution.map((d) => (
            <li key={d.star} className="dist-row" title={`${d.count} × ${d.star}-star`}>
              <span className="dist-row__label">{d.star}★</span>
              <span className="dist-row__track">
                <span className="dist-row__bar" style={{ width: `${d.share * 100}%` }} />
              </span>
              <span className="dist-row__count">{d.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tag-cloud">
        <span className="muted small">Most mentioned</span>
        <ul className="chips">
          {tags.map((t) => (
            <li key={t.tag} className="chip chip--accent">
              {t.tag} <span className="chip__count">{t.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tabs" role="tablist" aria-label="Filter reviews">
        {FILTERS.map((f) => {
          const count = f.value === 'all' ? reviews.length : reviews.filter((r) => r.authorType === f.value).length;
          return (
            <button
              key={f.value}
              role="tab"
              type="button"
              aria-selected={filter === f.value}
              className="tabs__tab"
              onClick={() => setFilter(f.value)}
            >
              {f.label} <span className="tabs__count">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="reviews" role="tabpanel">
        {visible.map((r) => (
          <li key={r.id} className="review">
            <div className="review__head">
              <Stars value={r.rating} />
              <span className="muted small">{formatRelative(r.date, now)}</span>
            </div>
            <blockquote className="review__text">{r.text}</blockquote>
            <p className="review__author">
              <strong>{r.author}</strong>
              <span className="muted"> · {AUTHOR_LABEL[r.authorType]} · {employerOf(r.engagementId)}</span>
            </p>
          </li>
        ))}
        {visible.length === 0 && <li className="muted">No reviews from this group yet.</li>}
      </ul>
    </Card>
  );
}
