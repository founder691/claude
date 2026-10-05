import { useState } from 'react';
import type { EarningsMonth } from '../types';
import { formatINR, formatINRShort, formatMonthShort, formatMonthYear } from '../lib/format';

const W = 340;
const H = 190;
const PAD = { top: 22, right: 4, bottom: 24, left: 40 };
const GAP = 2; // surface gap between stacked segments
const R = 4; // rounded data-end radius

/** Rect with only the top corners rounded (the data end; the baseline stays square). */
const topRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
  const rr = Math.min(r, h, w / 2);
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
};

const niceMax = (v: number) => {
  const step = 10_000;
  return Math.ceil(v / step) * step;
};

export function EarningsChart({ months }: { months: EarningsMonth[] }) {
  const [active, setActive] = useState<number | null>(null);

  const max = niceMax(Math.max(...months.map((m) => m.base + m.tips)));
  const ticks = Array.from({ length: max / 10_000 + 1 }, (_, i) => i * 10_000);
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const slot = plotW / months.length;
  const barW = Math.min(30, slot * 0.56);
  const y = (v: number) => PAD.top + plotH - (v / max) * plotH;

  const activeMonth = active === null ? null : months[active];
  const lastIdx = months.length - 1;

  return (
    <div className="chart" onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart__svg" role="img" aria-label="Monthly earnings, base pay and tips, last 6 months">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className={t === 0 ? 'chart__baseline' : 'chart__grid'} />
            <text x={PAD.left - 6} y={y(t)} className="chart__tick" textAnchor="end" dominantBaseline="middle">
              {t === 0 ? '0' : formatINRShort(t)}
            </text>
          </g>
        ))}

        {months.map((m, i) => {
          const cx = PAD.left + slot * i + slot / 2;
          const x = cx - barW / 2;
          const baseTop = y(m.base);
          const tipsTop = y(m.base + m.tips);
          const dim = active !== null && active !== i;
          return (
            <g key={m.month} className={dim ? 'chart__bar chart__bar--dim' : 'chart__bar'}>
              <rect x={x} y={baseTop} width={barW} height={y(0) - baseTop} className="chart__base" />
              <path d={topRoundedRect(x, tipsTop, barW, baseTop - tipsTop - GAP, R)} className="chart__tips" />
              {i === lastIdx && (
                <text x={cx} y={tipsTop - 6} textAnchor="middle" className="chart__direct">
                  {formatINRShort(m.base + m.tips)}
                </text>
              )}
              <text x={cx} y={H - 6} textAnchor="middle" className="chart__tick">
                {formatMonthShort(m.month)}
              </text>
              {/* Hit target: the whole column, larger than the mark. */}
              <rect
                x={PAD.left + slot * i}
                y={PAD.top}
                width={slot}
                height={plotH}
                className="chart__hit"
                tabIndex={0}
                aria-label={`${formatMonthYear(m.month)}: base ${formatINR(m.base)}, tips ${formatINR(m.tips)}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              />
            </g>
          );
        })}
      </svg>

      {activeMonth && active !== null && (
        <div
          className="chart__tooltip"
          role="status"
          style={{
            left: `${((PAD.left + slot * active + slot / 2) / W) * 100}%`,
            top: `${(y(activeMonth.base + activeMonth.tips) / H) * 100}%`,
          }}
        >
          <p className="chart__tooltip-title">{formatMonthYear(activeMonth.month)}</p>
          <p><span className="swatch swatch--base" /> Base pay <strong>{formatINR(activeMonth.base)}</strong></p>
          <p><span className="swatch swatch--tips" /> Tips <strong>{formatINR(activeMonth.tips)}</strong></p>
          <p className="chart__tooltip-total">Total <strong>{formatINR(activeMonth.base + activeMonth.tips)}</strong></p>
        </div>
      )}
    </div>
  );
}
