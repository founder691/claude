import type { VerificationSource } from '../types';

const LABELS: Record<VerificationSource, { label: string; description: string }> = {
  payroll: { label: 'Payroll verified', description: 'Matched against salary and payout records' },
  employer: { label: 'Employer verified', description: 'Confirmed by an authorised employer account' },
  peer: { label: 'Peer verified', description: 'Confirmed by verified co-workers' },
  self: { label: 'Self-reported', description: 'Not yet verified' },
};

export function VerificationBadge({ source, detail }: { source: VerificationSource; detail?: string }) {
  const { label, description } = LABELS[source];
  return (
    <span className={`badge badge--${source}`} title={detail ?? description}>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12">
        {source === 'self' ? (
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        ) : (
          <path
            d="M8 1.5 9.6 3l2.1-.2.5 2 1.8 1.1-.8 2 .8 2-1.8 1.1-.5 2-2.1-.2L8 14.5 6.4 13l-2.1.2-.5-2L2 10.1l.8-2-.8-2 1.8-1.1.5-2L6.4 3zM5.3 8.2l1.9 1.9 3.6-3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        )}
      </svg>
      {label}
    </span>
  );
}
