import type { ReactNode } from 'react';

export function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section className="section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section__title">{title}</h2>
      {intro && <p className="section__intro">{intro}</p>}
      {children}
    </section>
  );
}

/** Native disclosure: works without JS, keyboard and screen-reader friendly. */
export function More({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <details className="more">
      <summary className="more__summary">{label}</summary>
      <div className="more__body">{children}</div>
    </details>
  );
}
