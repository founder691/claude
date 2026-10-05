import { useState } from 'react';
import type { EarningsMonth, Viewer } from '../types';
import { formatINR, formatMonthYear } from '../lib/format';
import { earningsSummary } from '../lib/metrics';
import { Card } from './Card';
import { EarningsChart } from './EarningsChart';

export function EarningsSummary({ months, viewer }: { months: EarningsMonth[]; viewer: Viewer }) {
  const [asTable, setAsTable] = useState(false);

  if (viewer !== 'owner') {
    return (
      <Card id="earnings" title="Earnings">
        <div className="locked">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
            <rect x="5" y="10.5" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <p>
            <strong>Private.</strong> Earnings are only visible to the worker. They can share a
            verified income statement for loans or rentals when they choose.
          </p>
        </div>
      </Card>
    );
  }

  const s = earningsSummary(months);
  const range = `${formatMonthYear(months[0].month)} – ${formatMonthYear(months[months.length - 1].month)}`;
  const change = s.changePct;

  return (
    <Card
      id="earnings"
      title="Earnings summary"
      action={
        <button type="button" className="link-button" onClick={() => setAsTable((t) => !t)} aria-pressed={asTable}>
          {asTable ? 'Show chart' : 'Show table'}
        </button>
      }
    >
      <p className="muted small earnings__range">
        Last 6 months · {range} · <span className="private-tag">Only you can see this</span>
      </p>

      <div className="earnings__tiles">
        <div className="tile">
          <p className="tile__label">Total earned</p>
          <p className="tile__value">{formatINR(s.total)}</p>
        </div>
        <div className="tile">
          <p className="tile__label">Monthly average</p>
          <p className="tile__value">{formatINR(Math.round(s.avgMonthly))}</p>
        </div>
        <div className="tile">
          <p className="tile__label">From tips</p>
          <p className="tile__value">{formatINR(s.totalTips)}</p>
          <p className="tile__sub">{Math.round(s.tipsShare * 100)}% of income</p>
        </div>
        <div className="tile">
          <p className="tile__label">Last month</p>
          <p className="tile__value">{formatINR(s.lastTotal)}</p>
          {change !== null && (
            <p className={`tile__sub ${change >= 0 ? 'trend-up' : 'trend-down'}`}>
              {change >= 0 ? '▲' : '▼'} {Math.abs(change * 100).toFixed(1)}% vs prior month
            </p>
          )}
        </div>
      </div>

      <ul className="legend" aria-label="Legend">
        <li><span className="swatch swatch--base" /> Base pay</li>
        <li><span className="swatch swatch--tips" /> Tips</li>
      </ul>

      {asTable ? (
        <table className="data-table">
          <thead>
            <tr><th scope="col">Month</th><th scope="col">Base pay</th><th scope="col">Tips</th><th scope="col">Total</th></tr>
          </thead>
          <tbody>
            {months.map((m) => (
              <tr key={m.month}>
                <th scope="row">{formatMonthYear(m.month)}</th>
                <td>{formatINR(m.base)}</td>
                <td>{formatINR(m.tips)}</td>
                <td>{formatINR(m.base + m.tips)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EarningsChart months={months} />
      )}
    </Card>
  );
}
