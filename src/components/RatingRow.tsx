import type { Worker } from '../types';
import { ratingSummary } from '../lib/metrics';
import { ReviewBubble, Star, ThumbsUp } from './Icons';

export function RatingRow({ ratings }: { ratings: Worker['ratings'] }) {
  const { average, total, positiveShare } = ratingSummary(ratings);
  const count = total.toLocaleString('en-IN');
  return (
    <dl className="ratings">
      <div className="ratings__item">
        <Star className="ratings__icon ratings__icon--star" />
        <dd className="ratings__value">{average.toFixed(1)}</dd>
        <dt className="ratings__label">
          <span>Avg rating</span>
          <span>from {count} ratings</span>
        </dt>
      </div>
      <div className="ratings__item">
        <ReviewBubble className="ratings__icon" />
        <dd className="ratings__value">{count}</dd>
        <dt className="ratings__label">Reviews</dt>
      </div>
      <div className="ratings__item">
        <ThumbsUp className="ratings__icon ratings__icon--positive" />
        <dd className="ratings__value">{Math.round(positiveShare * 100)}%</dd>
        <dt className="ratings__label">Positive</dt>
      </div>
    </dl>
  );
}
