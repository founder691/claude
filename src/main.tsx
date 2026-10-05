import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { SAMPLE_AS_OF, sampleWorker } from './data/sampleWorker';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App worker={sampleWorker} now={SAMPLE_AS_OF} />
  </StrictMode>,
);
