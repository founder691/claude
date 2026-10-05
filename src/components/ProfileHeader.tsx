import { useState } from 'react';
import type { Viewer, Worker } from '../types';
import { formatMonthYear } from '../lib/format';

export function ProfileHeader({
  worker,
  viewer,
  onViewerChange,
}: {
  worker: Worker;
  viewer: Viewer;
  onViewerChange: (v: Viewer) => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${worker.profileHandle}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — ignore in prototype */
    }
  };

  return (
    <header className="profile">
      <div className="profile__identity">
        <div className="avatar" aria-hidden="true">{worker.initials}</div>
        <div className="profile__text">
          <h1 className="profile__name">
            {worker.name}
            {worker.pronouns && <span className="profile__pronouns">{worker.pronouns}</span>}
          </h1>
          <p className="profile__headline">{worker.headline}</p>
          <ul className="profile__meta">
            <li>{worker.city}</li>
            <li>{worker.languages.join(' · ')}</li>
            <li>On Tirelo since {formatMonthYear(worker.memberSince)}</li>
          </ul>
          {worker.identityVerified && (
            <p className="profile__id-check">
              <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                <path d="M8 1 2.5 3v4.5c0 3.2 2.3 6 5.5 7.5 3.2-1.5 5.5-4.3 5.5-7.5V3z" fill="currentColor" opacity=".18" />
                <path d="m5.3 8 1.9 1.9 3.6-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Government ID verified
            </p>
          )}
        </div>
      </div>

      <div className="profile__actions">
        <div className="segmented" role="radiogroup" aria-label="Preview profile as">
          {(['owner', 'employer'] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={viewer === v}
              className="segmented__option"
              onClick={() => onViewerChange(v)}
            >
              {v === 'owner' ? 'My view' : 'Employer view'}
            </button>
          ))}
        </div>
        <button type="button" className="button" onClick={copyLink}>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
            <path d="M6.5 9.5 9.5 6.5M7 4.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M9 11.5l-1 1a2.8 2.8 0 0 1-4-4l1-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span aria-live="polite">{copied ? 'Link copied' : worker.profileHandle}</span>
        </button>
      </div>
    </header>
  );
}
