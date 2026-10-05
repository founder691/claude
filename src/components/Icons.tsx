import type { ReactNode } from 'react';

// Small stroke icons. All decorative — meaning is always carried by adjacent text.
type P = { size?: number; className?: string };
const svg = (size: number, className: string | undefined, children: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const CheckBadge = ({ size = 16, className }: P) =>
  svg(size, className, <>
    <path d="M12 2.5l2.4 1.8 3-.2.9 2.8 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.8-3-.2L12 21.5l-2.4-1.8-3 .2-.9-2.8-2.4-1.8 1-2.8-1-2.8 2.4-1.8.9-2.8 3 .2z" fill="currentColor" stroke="none" />
    <path d="M8.5 12.2l2.4 2.4 4.6-4.9" stroke="var(--on-verified)" strokeWidth="2" />
  </>);

export const Star = ({ size = 16, className }: P) =>
  svg(size, className, <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" fill="currentColor" stroke="none" />);

export const Lock = ({ size = 18, className }: P) =>
  svg(size, className, <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>);

export const Share = ({ size = 18, className }: P) =>
  svg(size, className, <><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8" /><path d="M5 12.5v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></>);

export const Chevron = ({ size = 18, className }: P) => svg(size, className, <path d="M6 9l6 6 6-6" />);

export const Eye = ({ size = 18, className }: P) =>
  svg(size, className, <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>);

export const EyeOff = ({ size = 18, className }: P) =>
  svg(size, className, <><path d="M3 3l18 18M10.6 5.6A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 3.9M6.6 6.7A16.5 16.5 0 0 0 2.5 12S6 18.5 12 18.5a9.6 9.6 0 0 0 4.4-1.1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>);

export const Medal = ({ size = 20, className }: P) =>
  svg(size, className, <><circle cx="12" cy="14.5" r="5.5" /><path d="M8.5 10 6 3h4l2 4.5L14 3h4l-2.5 7" /><path d="M12 12.3l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2z" fill="currentColor" stroke="none" /></>);

export const Certificate = ({ size = 20, className }: P) =>
  svg(size, className, <><rect x="3.5" y="4.5" width="17" height="12" rx="2" /><path d="M7.5 9h9M7.5 12h5" /><path d="M15.5 14.5v6l1.5-1 1.5 1v-6" /></>);

export const Copy = ({ size = 18, className }: P) =>
  svg(size, className, <><rect x="8.5" y="8.5" width="12" height="12" rx="2.5" /><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" /></>);

export const WhatsApp = ({ size = 20, className }: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3z" />
  </svg>
);
