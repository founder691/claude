import { useEffect, useRef, useState } from 'react';
import type { Worker } from './types';
import { currentEngagement } from './lib/metrics';
import { Passport } from './components/Passport';
import { CurrentRole } from './components/CurrentRole';
import { WorkHistory } from './components/WorkHistory';
import { Reputation } from './components/Reputation';
import { Recognition } from './components/Recognition';
import { PrivateIncome } from './components/PrivateIncome';
import { ShareSheet } from './components/ShareSheet';
import { Share } from './components/Icons';

export function App({ worker, now }: { worker: Worker; now: Date }) {
  const [sharing, setSharing] = useState(false);
  const [showStickyShare, setShowStickyShare] = useState(false);
  const shareRef = useRef<HTMLButtonElement>(null);
  const current = currentEngagement(worker.engagements);

  // Once the passport's Share button scrolls away, keep a Share button within thumb reach.
  useEffect(() => {
    const el = shareRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setShowStickyShare(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <main className="page">
        <Passport ref={shareRef} worker={worker} now={now} onShare={() => setSharing(true)} />

        <p className="explainer">
          <strong>What is this?</strong> A Tirelo profile is {worker.firstName}’s own record of work. Each job is
          confirmed by the employer or co-workers, and the profile stays with {worker.firstName} from job to job.
        </p>

        {current && <CurrentRole role={current} now={now} />}
        <WorkHistory engagements={worker.engagements} now={now} />
        <Reputation ratings={worker.ratings} reviews={worker.reviews} />
        <Recognition items={worker.recognitions} />
        <PrivateIncome months={worker.earnings} />

        <footer className="footer">
          <span className="wordmark">Tirelo</span>
          <span>Your work, confirmed. Yours to keep.</span>
        </footer>
      </main>

      <div className={showStickyShare ? 'sticky-share sticky-share--visible' : 'sticky-share'} aria-hidden={!showStickyShare}>
        <button type="button" className="share-button" onClick={() => setSharing(true)} tabIndex={showStickyShare ? 0 : -1}>
          <Share size={20} />
          Share profile
        </button>
      </div>

      <ShareSheet worker={worker} open={sharing} onClose={() => setSharing(false)} />
    </>
  );
}
