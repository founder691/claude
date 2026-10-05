import type { Engagement } from '../types';
import { formatDuration, formatMonthYear, formatYear, formatYears } from '../lib/format';
import { allVerified, engagementMonths, groupByWorkplace, totalExperienceMonths } from '../lib/metrics';
import { Chevron } from './Icons';
import { Section } from './Section';
import { Verified } from './Verified';

export function WorkHistory({ engagements, now }: { engagements: Engagement[]; now: Date }) {
  const workplaces = groupByWorkplace(engagements);
  const years = formatYears(totalExperienceMonths(engagements, now));
  const intro = `${years} at ${workplaces.length} workplaces${allVerified(engagements) ? '. Every job here was confirmed by the employer or co-workers.' : '.'}`;

  return (
    <Section id="history" title="Work history" intro={intro}>
      <ol className="history">
        {workplaces.map((w) => (
          <li key={w.employer}>
            <details className="job">
              <summary className="job__summary">
                <span className="job__mark" aria-hidden="true">{w.employer.replace(/^The /, '')[0]}</span>
                <span className="job__text">
                  <span className="job__employer">{w.employer}</span>
                  <span className="job__roles">{[...w.roles].reverse().map((r) => r.role).join(' → ')}</span>
                  <span className="job__years">
                    {formatYear(w.start)} – {w.end ? formatYear(w.end) : 'now'}
                  </span>
                </span>
                <Chevron className="job__chevron" />
              </summary>
              <div className="job__body">
                {w.roles.map((r) => (
                  <div key={r.id} className="job__role">
                    <p className="job__role-title">{r.role}</p>
                    <p className="fine">
                      {formatMonthYear(r.start)} – {r.end ? formatMonthYear(r.end) : 'now'} · {formatDuration(engagementMonths(r, now))}
                    </p>
                    <p>{r.summary}</p>
                    {r.end !== null && r.highlights.length > 0 && (
                      <ul className="list">
                        {r.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                <Verified by={w.verifiedBy} how={w.verifiedHow} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </Section>
  );
}
