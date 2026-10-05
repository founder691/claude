import { CheckBadge } from './Icons';

/** "Confirmed by Kaapi Collective" with a check — the plain-language proof line. */
export function Verified({ by, how }: { by: string; how?: string }) {
  return (
    <p className="verified">
      <CheckBadge size={16} className="verified__icon" />
      <span>
        Confirmed by {by}
        {how && <span className="verified__how"> · {how}</span>}
      </span>
    </p>
  );
}
