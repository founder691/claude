import type { Engagement } from '../types';
import { formatDuration, formatMonthYear } from '../lib/format';
import { engagementMonths } from '../lib/metrics';
import { Card } from './Card';
import { VerificationBadge } from './VerificationBadge';

const TYPE_LABEL: Record<Engagement['type'], string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  gig: 'Gig',
  contract: 'Contract',
};

export function CurrentRole({ engagement, now }: { engagement: Engagement; now: Date }) {
  return (
    <Card id="current-role" title="Current role" className="current-role">
      <div className="current-role__head">
        <div>
          <p className="current-role__title">{engagement.role}</p>
          <p className="current-role__employer">{engagement.employer}</p>
          <p className="muted">
            {TYPE_LABEL[engagement.type]} · Since {formatMonthYear(engagement.start)} ·{' '}
            {formatDuration(engagementMonths(engagement, now))}
          </p>
        </div>
        <span className="status-pill">
          <span className="status-pill__dot" aria-hidden="true" />
          Active
        </span>
      </div>
      <ul className="bullets">
        {engagement.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="current-role__foot">
        <VerificationBadge source={engagement.verification} detail={engagement.verifiedBy} />
        {engagement.verifiedBy && <span className="muted small">{engagement.verifiedBy}</span>}
      </div>
    </Card>
  );
}
