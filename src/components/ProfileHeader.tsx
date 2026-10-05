import type { Visibility, Worker } from '../types';
import { formatMonthYear } from '../lib/format';
import { Avatar } from './Avatar';
import { Calendar, Globe, Lock, VerifiedTick } from './Icons';

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
        <Avatar worker={worker} size={116} />
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
      {worker.identityVerified && (
        <p className="verified-line">
          <VerifiedTick />
          Government ID verified
        </p>
      )}
    </section>
  );
}
