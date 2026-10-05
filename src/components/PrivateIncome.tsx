import { useState } from 'react';
import type { EarningsMonth } from '../types';
import { formatINR, formatMonthLong } from '../lib/format';
import { incomeSummary } from '../lib/metrics';
import { Eye, EyeOff, Lock } from './Icons';
import { More } from './Section';

/** Income is visible only to the worker, hidden by default, and never part of a shared profile. */
export function PrivateIncome({ months }: { months: EarningsMonth[] }) {
  const [shown, setShown] = useState(false);
  const { avgMonthly, avgTips } = incomeSummary(months);
  const amount = (n: number) => (shown ? formatINR(n) : '₹ ••,•••');

  return (
    <section className="private" aria-labelledby="income-title">
      <div className="private__head">
        <Lock className="private__lock" />
        <div>
          <h2 id="income-title" className="private__title">Your income</h2>
          <p className="private__note">Only you can see this. It is never shown when you share your profile.</p>
        </div>
      </div>

      <div className="private__figure">
        <p className="private__summary">
          <span className={shown ? 'private__amount' : 'private__amount private__amount--hidden'}>{amount(avgMonthly)}</span>
          <span className="private__unit">a month on average</span>
        </p>
        <button type="button" className="ghost-button" onClick={() => setShown((s) => !s)} aria-pressed={shown}>
          {shown ? <EyeOff /> : <Eye />}
          {shown ? 'Hide' : 'Show'}
        </button>
      </div>
      <p className="fine">
        Last {months.length} months, including {shown ? <>about {formatINR(avgTips)} a month</> : 'what you received'} in tips from customers.
      </p>

      {shown && (
        <More label="Month by month">
          <ul className="months">
            {[...months].reverse().map((m) => (
              <li key={m.month}>
                <span>{formatMonthLong(m.month)}</span>
                <span className="months__amount">
                  {formatINR(m.base + m.tips)}
                  <span className="fine"> incl. {formatINR(m.tips)} tips</span>
                </span>
              </li>
            ))}
          </ul>
        </More>
      )}
    </section>
  );
}
