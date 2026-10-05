import { useEffect, useRef, useState } from 'react';
import type { Worker } from '../types';
import { Copy, WhatsApp } from './Icons';

export function ShareSheet({ worker, open, onClose }: { worker: Worker; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const displayUrl = worker.profileUrl.replace(/^https?:\/\//, '');

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(worker.profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked (e.g. insecure context) — the link is still visible to copy by hand. */
    }
  };

  const message = `Here is my Tirelo work profile — my jobs, reviews and awards, all confirmed: ${worker.profileUrl}`;

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="share-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="sheet__inner">
        <span className="sheet__grip" aria-hidden="true" />
        <h2 id="share-title" className="sheet__title">Share your profile</h2>
        <p className="sheet__text">
          Send this link to an employer, or anyone who wants to know your work. They will see your jobs, reviews
          and awards — <strong>never your income</strong>.
        </p>

        <div className="sheet__link">
          <span>{displayUrl}</span>
          <button type="button" className="ghost-button" onClick={copy}>
            <Copy />
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <a
          className="whatsapp-button"
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsApp />
          Send on WhatsApp
        </a>
        <button type="button" className="sheet__close" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
