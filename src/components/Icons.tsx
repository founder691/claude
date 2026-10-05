import type { ReactNode } from 'react';

// Icons are decorative; meaning is always carried by adjacent text or an aria-label on the control.
type P = { size?: number; className?: string };
const stroke = (size: number, className: string | undefined, children: ReactNode, width = 1.9) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="none"
    stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const ArrowLeft = ({ size = 26, className }: P) => stroke(size, className, <path d="M20 12H4.5M10.5 5.5 4 12l6.5 6.5" />, 2);

export const Gear = ({ size = 28, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path fillRule="evenodd" d="M10.3 2h3.4l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.7 2.9-2 1.8c.1.6.1 1.2 0 1.8l2 1.8-1.7 2.9-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-3.4l-.5-2.6c-.6-.2-1.2-.5-1.7-.9l-2.5.9-1.7-2.9 2-1.8a5.6 5.6 0 0 1 0-1.8l-2-1.8 1.7-2.9 2.5.9c.5-.4 1.1-.7 1.7-.9zM12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" transform="translate(0 1)" />
  </svg>
);

export const Globe = ({ size = 22, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path fill="#fff" d="M7.2 6.3c1.2-.2 2.3.4 2.6 1.4.3 1-.6 1.4-.4 2.4.2 1 1.5 1.1 1.6 2.3.1 1-1 1.6-1.9 2-.7.4-.9 1.4-1.7 1.6-.8.1-1.6-1-2-2.3A7.8 7.8 0 0 1 7.2 6.3zm7.4-1.6a7.9 7.9 0 0 1 4.6 4.7c-.7.4-1.6.1-2.2.6-.7.6-.3 1.8-1 2.3-.8.5-1.9-.4-2.3-1.3-.4-.9.3-1.7.1-2.6-.2-.9-1.2-1.3-1-2.2.2-.8 1.1-1.2 1.8-1.5zm1.5 9.1c.8-.1 1.9.3 2.2 1.1a7.9 7.9 0 0 1-3.6 3.4c-.4-.6-.2-1.5 0-2.3.2-1 .5-2 1.4-2.2z" />
  </svg>
);

export const Lock = ({ size = 20, className }: P) =>
  stroke(size, className, <><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>, 2.2);

export const Calendar = ({ size = 22, className }: P) =>
  stroke(size, className, <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /><path d="M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 16.5h.01M12 16.5h.01M16.5 16.5h.01" strokeWidth="2.4" /></>, 1.6);

export const Star = ({ size = 26, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" />
  </svg>
);

export const ReviewBubble = ({ size = 26, className }: P) =>
  stroke(size, className, <><path d="M4 4.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-9.5L6 21v-3.5H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" /><path d="M7 14.5l3.2-3.2 2.3 2 4.2-4.6" /><path d="M14.5 8.5h2.4v2.4" /></>, 1.7);

export const ThumbsUp = ({ size = 26, className }: P) =>
  stroke(size, className, <><path d="M7.5 10.5v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" /><path d="M7.5 10.5 11.5 3a2.5 2.5 0 0 1 2.5 2.5v3.5h5.2a2 2 0 0 1 2 2.3l-1.3 7.5a2 2 0 0 1-2 1.7H7.5" /></>, 1.8);

export const Briefcase = ({ size = 26, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M9 3.5h6A1.5 1.5 0 0 1 16.5 5v2H20a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3.5V5A1.5 1.5 0 0 1 9 3.5zm.5 2V7h5V5.5z" />
  </svg>
);

export const MapPin = ({ size = 26, className }: P) =>
  stroke(size, className, <><path d="M12 21.5s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z" /><circle cx="12" cy="9.5" r="2.5" /></>, 2);

export const Scissors = ({ size = 40, className }: P) =>
  stroke(size, className, <><circle cx="7.5" cy="18" r="2.8" /><circle cx="16.5" cy="18" r="2.8" /><path d="M9.3 15.9 17.5 3M14.7 15.9 6.5 3" /></>, 1.4);

export const Lotus = ({ size = 46, className }: P) =>
  stroke(size, className, <>
    <path d="M12 18.5c-2-1.6-3-3.9-3-6.5s1-4.9 3-6.5c2 1.6 3 3.9 3 6.5s-1 4.9-3 6.5z" />
    <path d="M12 18.5c-3.2.4-6-.9-7.5-3.6.9-1.8 2.5-2.9 4.4-3.2" />
    <path d="M12 18.5c3.2.4 6-.9 7.5-3.6-.9-1.8-2.5-2.9-4.4-3.2" />
    <path d="M12 18.5c-4 1.2-7.7.2-9.5-2.4M12 18.5c4 1.2 7.7.2 9.5-2.4" />
  </>, 1.2);

export const VerifiedTick = ({ size = 18, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path fill="currentColor" d="M12 1.8l2.6 1.9 3.2-.2 1 3 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3-3.2-.2L12 22.2l-2.6-1.9-3.2.2-1-3-2.6-1.9 1-3.1-1-3.1 2.6-1.9 1-3 3.2.2z" />
    <path d="M8.3 12.2l2.5 2.5 4.9-5.1" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Share = ({ size = 22, className }: P) =>
  stroke(size, className, <><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8" /><path d="M5 12.5v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></>, 2);

export const LinkIcon = ({ size = 22, className }: P) =>
  stroke(size, className, <><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></>, 2);

export const QrIcon = ({ size = 22, className }: P) =>
  stroke(size, className, <><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" /><rect x="14" y="3.5" width="6.5" height="6.5" rx="1" /><rect x="3.5" y="14" width="6.5" height="6.5" rx="1" /><path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM14 19.5h1M20.5 14v1.5" /></>, 1.8);

export const WhatsApp = ({ size = 22, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3z" />
  </svg>
);
