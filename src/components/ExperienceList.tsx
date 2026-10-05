import type { Experience } from '../types';
import { formatRange } from '../lib/format';
import { sortExperience } from '../lib/metrics';
import { Lotus, Scissors, Star, VerifiedTick } from './Icons';

const ICONS = { scissors: Scissors, lotus: Lotus };

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <section className="section" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section__title">Experience</h2>
      <ol className="experience">
        {sortExperience(items).map((e) => {
          const Icon = ICONS[e.icon];
          return (
            <li key={e.id} className="experience__item">
              <span className={`experience__badge experience__badge--${e.tone}`}>
                <Icon />
              </span>
              <div className="experience__text">
                <h3 className="experience__employer">{e.employer}</h3>
                <p className="experience__role">{e.role}</p>
                <p className="experience__meta">
                  {formatRange(e.start, e.end)} ·{' '}
                  <span className="experience__rating">
                    <Star size={13} />
                    <span className="visually-hidden">Rated </span>
                    {e.rating.toFixed(1)}
                  </span>
                </p>
                {e.verifiedBy ? (
                  <p className="verified-line verified-line--small">
                    <VerifiedTick size={16} />
                    <span>
                      Verified by {e.verifiedBy.name}
                      <span className="verified-line__title">, {e.verifiedBy.title}</span>
                    </span>
                  </p>
                ) : (
                  <p className="unverified-line">Not verified yet</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <details className="explain">
        <summary className="explain__summary">What does “Verified” mean?</summary>
        <ul className="explain__list">
          <li>
            <strong>Jobs</strong> are confirmed by the owner or manager at each workplace.
          </li>
          <li>
            <strong>Identity</strong> is checked against a government ID.
          </li>
          <li>
            <strong>Ratings</strong> come only from customers after a real visit.
          </li>
        </ul>
      </details>
    </section>
  );
}
