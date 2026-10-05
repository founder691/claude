import { useEffect, useRef, useState } from 'react';
import type { Visibility, Worker } from './types';
import { AppBar } from './components/AppBar';
import { ProfileHeader } from './components/ProfileHeader';
import { RatingRow } from './components/RatingRow';
import { Details } from './components/Details';
import { ExperienceList } from './components/ExperienceList';
import { ShareButton } from './components/ShareButton';
import { ShareSheet } from './components/ShareSheet';
import { TireloLogo } from './components/TireloLogo';

export function App({ worker }: { worker: Worker }) {
  const [visibility, setVisibility] = useState<Visibility>(worker.visibility);
  const [sharing, setSharing] = useState(false);
  const [pinned, setPinned] = useState(false);
  const shareRef = useRef<HTMLButtonElement>(null);

  // Once the main Share button scrolls away, keep one pinned within thumb reach.
  useEffect(() => {
    const el = shareRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const openShare = () => setSharing(true);

  return (
    <div className="screen">
      <AppBar />
      <main className="passport">
        <ProfileHeader
          worker={worker}
          visibility={visibility}
          onToggleVisibility={() => setVisibility((v) => (v === 'public' ? 'private' : 'public'))}
        />
        <RatingRow ratings={worker.ratings} />

        <div className="share-block">
          <ShareButton ref={shareRef} onClick={openShare} />
          <p className="share-block__hint">Your passport goes with you. Share it with any salon or customer.</p>
        </div>

        <section className="section" aria-labelledby="about-title">
          <h2 id="about-title" className="section__title">About</h2>
          <p className="about">{worker.about}</p>
        </section>

        <Details worker={worker} />
        <ExperienceList items={worker.experience} />
      </main>
      <footer className="powered">
        Powered by <TireloLogo height={30} />
      </footer>

      <div className={pinned ? 'share-pinned share-pinned--visible' : 'share-pinned'} aria-hidden={!pinned}>
        <ShareButton onClick={openShare} tabIndex={pinned ? 0 : -1} />
      </div>

      <ShareSheet
        worker={worker}
        isPublic={visibility === 'public'}
        open={sharing}
        onClose={() => setSharing(false)}
        onMakePublic={() => setVisibility('public')}
      />
    </div>
  );
}
