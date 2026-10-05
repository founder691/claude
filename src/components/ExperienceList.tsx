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
                <h3 className="experience__employer">
                  {e.employer}
                  {e.verified && (
                    <span className="experience__verified" title="Verified by employer">
                      <VerifiedTick />
                      <span className="visually-hidden">Verified by employer</span>
                    </span>
                  )}
                </h3>
                <p className="experience__role">{e.role}</p>
                <p className="experience__meta">
                  {formatRange(e.start, e.end)} ·{' '}
                  <span className="experience__rating">
                    <Star size={13} />
                    <span className="visually-hidden">Rated </span>
                    {e.rating.toFixed(1)}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
