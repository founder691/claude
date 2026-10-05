import { Star } from './Icons';

/** Five stars filled to `value`. Announced as text for screen readers. */
export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100;
  const row = [0, 1, 2, 3, 4].map((i) => <Star key={i} size={size} />);
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <span className="stars__empty">{row}</span>
      <span className="stars__fill" style={{ width: `${pct}%` }}>{row}</span>
    </span>
  );
}
