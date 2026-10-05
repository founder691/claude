import type { Recognition, Tip, Viewer } from '../types';
import { formatDate, formatINR, formatRelative } from '../lib/format';
import { tipsSummary } from '../lib/metrics';
import { Card } from './Card';
import { VerificationBadge } from './VerificationBadge';

const KIND_ICON: Record<Recognition['kind'], string> = {
  award: '🏆',
  certification: '🎓',
  milestone: '✨',
};

export function TipsRecognition({
  tips,
  recognitions,
  viewer,
  now,
}: {
  tips: Tip[];
  recognitions: Recognition[];
  viewer: Viewer;
  now: Date;
}) {
  const showAmounts = viewer === 'owner';
  const recent = [...tips].sort((a, b) => b.date.localeCompare(a.date));
  const { total, count, withNotes } = tipsSummary(recent);

  return (
    <Card id="tips" title="Tips & recognition">
      <p className="tips__summary">
        {showAmounts ? (
          <>
            <strong>{formatINR(total)}</strong> from your {count} most recent tips
          </>
        ) : (
          <>
            <strong>{withNotes} of {count}</strong> recent tips came with a thank-you note
          </>
        )}
      </p>

      <ul className="tips">
        {recent.map((t) => (
          <li key={t.id} className="tip">
            <div className="tip__head">
              <span className="tip__from">{t.from}</span>
              {showAmounts && <span className="tip__amount">{formatINR(t.amount)}</span>}
            </div>
            {t.note && <p className="tip__note">“{t.note}”</p>}
            <p className="muted small">{formatRelative(t.date, now)}</p>
          </li>
        ))}
      </ul>

      <h3 className="subheading">Awards & certifications</h3>
      <ul className="recognitions">
        {recognitions.map((r) => (
          <li key={r.id} className="recognition">
            <span className="recognition__icon" aria-hidden="true">{KIND_ICON[r.kind]}</span>
            <div className="recognition__body">
              <p className="recognition__title">{r.title}</p>
              <p className="muted small">
                {r.issuer} · {formatDate(r.date)}
              </p>
            </div>
            <VerificationBadge source={r.verification} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
