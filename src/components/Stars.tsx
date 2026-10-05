export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const pct = Math.max(0, Math.min(5, value)) * 20;
  return (
    <span className="stars" style={{ fontSize: size }} role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <span className="stars__base" aria-hidden="true">★★★★★</span>
      <span className="stars__fill" aria-hidden="true" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  );
}
