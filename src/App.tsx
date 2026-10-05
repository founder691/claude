import { useState } from 'react';
import type { Viewer, Worker } from './types';
import { currentEngagement } from './lib/metrics';
import { ProfileHeader } from './components/ProfileHeader';
import { StatsStrip } from './components/StatsStrip';
import { CurrentRole } from './components/CurrentRole';
import { WorkHistory } from './components/WorkHistory';
import { RatingsReviews } from './components/RatingsReviews';
import { TipsRecognition } from './components/TipsRecognition';
import { EarningsSummary } from './components/EarningsSummary';

export function App({ worker, now }: { worker: Worker; now: Date }) {
  const [viewer, setViewer] = useState<Viewer>('owner');
  const current = currentEngagement(worker.engagements);

  return (
    <>
      <nav className="topbar">
        <a href="#" className="brand" aria-label="Tirelo home">
          <span className="brand__mark" aria-hidden="true">t</span> Tirelo
        </a>
        <span className="topbar__note">Portable work profile</span>
      </nav>

      <main className="page">
        {viewer === 'employer' && (
          <p className="banner" role="status">
            You’re previewing what an employer sees from {worker.name.split(' ')[0]}’s shared link. Earnings and tip amounts are hidden.
          </p>
        )}

        <ProfileHeader worker={worker} viewer={viewer} onViewerChange={setViewer} />
        <StatsStrip worker={worker} now={now} />

        <div className="layout">
          <div className="layout__main">
            {current && <CurrentRole engagement={current} now={now} />}
            <WorkHistory engagements={worker.engagements} now={now} />
            <RatingsReviews ratings={worker.ratings} reviews={worker.reviews} engagements={worker.engagements} now={now} />
          </div>
          <aside className="layout__side">
            <EarningsSummary months={worker.earnings} viewer={viewer} />
            <TipsRecognition tips={worker.tips} recognitions={worker.recognitions} viewer={viewer} now={now} />
          </aside>
        </div>

        <footer className="footer muted small">
          This profile belongs to {worker.name}. Records are verified at the source and travel with the worker between employers.
        </footer>
      </main>
    </>
  );
}
