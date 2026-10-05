import type { Engagement } from '../types';
import { formatDuration, formatMonthYear } from '../lib/format';
import { engagementMonths } from '../lib/metrics';
import { Card } from './Card';
import { VerificationBadge } from './VerificationBadge';

export function WorkHistory({ engagements, now }: { engagements: Engagement[]; now: Date }) {
  const sorted = [...engagements].sort((a, b) => b.start.localeCompare(a.start));
  return (
    <Card id="work-history" title="Verified work history">
      <ol className="timeline">
        {sorted.map((e) => (
          <li key={e.id} className={`timeline__item${e.end ? '' : ' timeline__item--current'}`}>
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__row">
                <div>
                  <h3 className="timeline__role">{e.role}</h3>
                  <p className="timeline__employer">{e.employer}</p>
                </div>
                <VerificationBadge source={e.verification} detail={e.verifiedBy} />
              </div>
              <p className="muted small">
                {formatMonthYear(e.start)} – {e.end ? formatMonthYear(e.end) : 'Present'} ·{' '}
                {formatDuration(engagementMonths(e, now))} · {e.location}
              </p>
              {e.end && e.highlights.length > 0 && (
                <ul className="bullets bullets--compact">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              <ul className="chips" aria-label="Skills">
                {e.skills.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
