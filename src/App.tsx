import { useState } from 'react';
import type { Visibility, Worker } from './types';
import { AppBar } from './components/AppBar';
import { ProfileHeader } from './components/ProfileHeader';
import { RatingRow } from './components/RatingRow';
import { Details } from './components/Details';
import { ExperienceList } from './components/ExperienceList';
import { TireloLogo } from './components/TireloLogo';

export function App({ worker }: { worker: Worker }) {
  const [visibility, setVisibility] = useState<Visibility>(worker.visibility);

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
    </div>
  );
}
