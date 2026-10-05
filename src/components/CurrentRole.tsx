import type { Engagement } from '../types';
import { formatDuration, formatMonthLong } from '../lib/format';
import { engagementMonths } from '../lib/metrics';
import { More, Section } from './Section';
import { Verified } from './Verified';

export function CurrentRole({ role, now }: { role: Engagement; now: Date }) {
  return (
    <Section id="now" title="Working now">
      <div className="now">
        <p className="now__role">{role.role}</p>
        <p className="now__employer">
          {role.employer} · {role.location}
        </p>
        <p className="now__since">
          Since {formatMonthLong(role.start)} · {formatDuration(engagementMonths(role, now))}
        </p>
        <p className="now__summary">{role.summary}</p>
        <Verified by={role.verifiedBy} />
      </div>
      {role.highlights.length > 0 && (
        <More label="More about this job">
          <ul className="list">
            {role.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p className="fine">{role.verifiedHow}.</p>
        </More>
      )}
    </Section>
  );
}
