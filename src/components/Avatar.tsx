import type { Worker } from '../types';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function Avatar({ worker, size }: { worker: Pick<Worker, 'name' | 'photoUrl'>; size: number }) {
  const style = { width: size, height: size, fontSize: size * 0.34 };
  return worker.photoUrl ? (
    <img className="avatar" style={style} src={worker.photoUrl} alt={worker.name} />
  ) : (
    <div className="avatar avatar--monogram" style={style} role="img" aria-label={worker.name}>
      {initials(worker.name)}
    </div>
  );
}
