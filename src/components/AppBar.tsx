import { ArrowLeft, Gear } from './Icons';

export function AppBar() {
  return (
    <header className="appbar">
      <button type="button" className="icon-button" aria-label="Back" onClick={() => history.back()}>
        <ArrowLeft />
      </button>
      <h1 className="appbar__title">Service Passport</h1>
      <button type="button" className="icon-button" aria-label="Passport settings">
        <Gear />
      </button>
    </header>
  );
}
