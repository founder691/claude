import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import type { Worker } from '../types';
import { ratingSummary, verifiedJobCount } from '../lib/metrics';
import { Avatar } from './Avatar';
import { LinkIcon, QrIcon, Share, Star, VerifiedTick, WhatsApp } from './Icons';

export function ShareSheet({
  worker,
  isPublic,
  open,
  onClose,
  onMakePublic,
}: {
  worker: Worker;
  isPublic: boolean;
  open: boolean;
  onClose: () => void;
  onMakePublic: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const { average } = ratingSummary(worker.ratings);
  const jobs = verifiedJobCount(worker.experience);
  const shortUrl = worker.passportUrl.replace(/^https?:\/\//, '');

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (!open) setShowQr(false);
  }, [open]);

  useEffect(() => {
    if (!showQr || qr) return;
    QRCode.toString(worker.passportUrl, { type: 'svg', margin: 1, color: { dark: '#0e1a3c', light: '#ffffff' } })
      .then((svg) => setQr(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`))
      .catch(() => setQr(null));
  }, [showQr, qr, worker.passportUrl]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(worker.passportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked (e.g. insecure context) — the link stays visible to copy by hand. */
    }
  };

  const message = `Here is my Tirelo Service Passport — my ratings and verified work history: ${worker.passportUrl}`;

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
        <h2 id="share-title" className="sheet__title">Share my Passport</h2>

        <div className="sheet__preview">
          <Avatar worker={worker} size={52} />
          <div>
            <p className="sheet__name">{worker.name}</p>
            <p className="sheet__sub">
              {worker.profession} · <Star size={13} className="sheet__star" /> {average.toFixed(1)}
            </p>
            <p className="sheet__verified">
              <VerifiedTick size={14} />
              {jobs} verified {jobs === 1 ? 'job' : 'jobs'}
              {worker.identityVerified ? ' · ID verified' : ''}
            </p>
          </div>
        </div>

        {isPublic ? (
          <>
            <a
              className="sheet__action sheet__action--whatsapp"
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsApp />
              Send on WhatsApp
            </a>
            <button type="button" className="sheet__action" onClick={copy}>
              <LinkIcon />
              <span className="sheet__action-text">
                <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
                <span className="sheet__url">{shortUrl}</span>
              </span>
            </button>
            <button type="button" className="sheet__action" onClick={() => setShowQr((s) => !s)} aria-expanded={showQr}>
              <QrIcon />
              {showQr ? 'Hide QR code' : 'Show QR code'}
            </button>
            {showQr && (
              <div className="sheet__qr">
                {qr && <img src={qr} width={184} height={184} alt={`QR code for ${shortUrl}`} />}
                <p>Ask them to scan this with their phone camera.</p>
              </div>
            )}
            <p className="sheet__note">
              Anyone with the link can see your passport. They can’t change anything on it.
            </p>
          </>
        ) : (
          <div className="sheet__private">
            <p>Your passport is set to private, so others can’t open the link yet.</p>
            <button type="button" className="share-button" onClick={onMakePublic}>
              <Share size={20} />
              Make public and share
            </button>
          </div>
        )}

        <button type="button" className="sheet__close" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
