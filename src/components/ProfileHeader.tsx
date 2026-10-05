import type { Visibility, Worker } from '../types';
import { formatMonthYear } from '../lib/format';
import { Calendar, Globe, Lock } from './Icons';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function ProfileHeader({
  worker,
  visibility,
  onToggleVisibility,
}: {
  worker: Worker;
  visibility: Visibility;
  onToggleVisibility: () => void;
}) {
  const isPublic = visibility === 'public';
  return (
    <section className="profile" aria-label="Profile">
      <div className="profile__top">
        {worker.photoUrl ? (
          <img className="avatar" src={worker.photoUrl} alt={worker.name} />
        ) : (
          <div className="avatar avatar--monogram" role="img" aria-label={worker.name}>
            {initials(worker.name)}
          </div>
        )}
        <div className="profile__status">
          <button
            type="button"
            className="status-pill"
            onClick={onToggleVisibility}
            aria-label={`Profile is ${visibility}. Tap to make it ${isPublic ? 'private' : 'public'}.`}
          >
            {isPublic ? <Globe /> : <Lock />}
            {isPublic ? 'Public' : 'Private'}
          </button>
          <span className="profile__rule" aria-hidden="true" />
        </div>
      </div>

      <h2 className="profile__name">{worker.name}</h2>
      <p className="profile__profession">{worker.profession}</p>
      <p className="profile__since">
        <Calendar />
        Member since {formatMonthYear(worker.memberSince)}
      </p>
    </section>
  );
}
