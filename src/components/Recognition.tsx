import type { Recognition as R } from '../types';
import { formatMonthYear } from '../lib/format';
import { Certificate, Medal } from './Icons';
import { Section } from './Section';

export function Recognition({ items }: { items: R[] }) {
  return (
    <Section id="recognition" title="Awards & certificates">
      <ul className="awards">
        {items.map((r) => (
          <li key={r.id} className="award">
            <span className={`award__icon award__icon--${r.kind}`}>
              {r.kind === 'award' ? <Medal /> : <Certificate />}
            </span>
            <span>
              <span className="award__title">{r.title}</span>
              <span className="award__issuer">
                {r.issuer} · {formatMonthYear(r.date)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
