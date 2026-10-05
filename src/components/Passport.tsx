import { forwardRef } from 'react';
import type { Worker } from '../types';
import { formatYears } from '../lib/format';
import { allVerified, currentEngagement, ratingStats, totalExperienceMonths } from '../lib/metrics';
import { CheckBadge, Share, Star } from './Icons';

/** The top of the page: who this person is, where they work now, and why to trust them. */
export const Passport = forwardRef<HTMLButtonElement, { worker: Worker; now: Date; onShare: () => void }>(
  function Passport({ worker, now, onShare }, shareRef) {
    const current = currentEngagement(worker.engagements);
    const years = formatYears(totalExperienceMonths(worker.engagements, now));
    const { average, total } = ratingStats(worker.ratings);

    return (
      <header className="passport">
        <div className="passport__brand">
          <span className="wordmark">Tirelo</span>
          <span className="passport__kind">Work passport</span>
        </div>

        <div className="passport__photo" aria-hidden="true">
          {worker.initials}
          {worker.identityVerified && <CheckBadge size={26} className="passport__photo-check" />}
        </div>

        <h1 className="passport__name">{worker.name}</h1>
        {current && (
          <p className="passport__role">
            {current.role} at {current.employer}
          </p>
        )}
        <p className="passport__meta">{worker.city}</p>
        <p className="passport__meta">Speaks {worker.languages.join(', ')}</p>
        {worker.identityVerified && <p className="passport__id">Identity checked with government ID</p>}

        <ul className="passport__facts">
          <li>
            <CheckBadge size={18} className="passport__fact-icon" />
            <span>
              <strong>{years} of work</strong>
              {allVerified(worker.engagements) ? ', every job confirmed' : ''}
            </span>
          </li>
          <li>
            <Star size={18} className="passport__fact-icon passport__fact-icon--star" />
            <span>
              <strong>{average.toFixed(1)} stars</strong> from {total.toLocaleString('en-IN')} customers
            </span>
          </li>
        </ul>

        <button ref={shareRef} type="button" className="share-button" onClick={onShare}>
          <Share size={20} />
          Share profile
        </button>
      </header>
    );
  },
);
