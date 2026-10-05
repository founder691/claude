import type { Worker } from '../types';
import { Briefcase, MapPin } from './Icons';

export function Details({ worker }: { worker: Worker }) {
  const rows = [
    { label: 'Role', value: worker.profession, icon: <Briefcase /> },
    { label: 'Location', value: worker.location, icon: <MapPin /> },
  ];
  return (
    <section className="section" aria-labelledby="details-title">
      <h2 id="details-title" className="section__title">Details</h2>
      <dl className="details">
        {rows.map((r) => (
          <div key={r.label} className="details__row">
            <span className="details__icon">{r.icon}</span>
            <div>
              <dt className="details__label">{r.label}</dt>
              <dd className="details__value">{r.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
