import type { ReactNode } from 'react';

export function Card({
  id,
  title,
  action,
  children,
  className = '',
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`card ${className}`} aria-labelledby={`${id}-title`}>
      <header className="card__header">
        <h2 id={`${id}-title`} className="card__title">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
