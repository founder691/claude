import type { Review, ReviewerType, Worker } from '../types';
import { formatMonthYear } from '../lib/format';
import { ratingStats, splitReviews, topTags } from '../lib/metrics';
import { More, Section } from './Section';
import { Stars } from './Stars';

const RELATION: Record<ReviewerType, string> = {
  manager: 'Manager',
  customer: 'Customer',
  coworker: 'Co-worker',
};

function Quote({ review, large = false }: { review: Review; large?: boolean }) {
  return (
    <figure className={large ? 'quote quote--large' : 'quote'}>
      <blockquote>“{review.text}”</blockquote>
      <figcaption>
        <strong>{review.author}</strong> · {RELATION[review.authorType]} at {review.workplace}
        <span className="quote__date"> · {formatMonthYear(review.date)}</span>
      </figcaption>
    </figure>
  );
}

export function Reputation({ ratings, reviews }: { ratings: Worker['ratings']; reviews: Review[] }) {
  const { average, total } = ratingStats(ratings);
  const { featured, rest } = splitReviews(reviews);
  const traits = topTags(reviews).map((t) => t.toLowerCase());

  return (
    <Section id="reputation" title="What people say">
      <div className="score">
        <span className="score__number">{average.toFixed(1)}</span>
        <span className="score__detail">
          <Stars value={average} size={20} />
          <span className="score__count">from {total.toLocaleString('en-IN')} customer ratings</span>
        </span>
      </div>

      {traits.length > 0 && (
        <p className="traits">
          Most often described as <strong>{traits.slice(0, -1).join(', ')}</strong>
          {traits.length > 1 && ' and '}
          <strong>{traits.at(-1)}</strong>.
        </p>
      )}

      <div className="quotes">
        {featured.map((r) => (
          <Quote key={r.id} review={r} large />
        ))}
      </div>

      {rest.length > 0 && (
        <More label={`Read all ${reviews.length} reviews`}>
          <div className="quotes">
            {rest.map((r) => (
              <Quote key={r.id} review={r} />
            ))}
          </div>
        </More>
      )}
    </Section>
  );
}
