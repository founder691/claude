/** Tirelo mark: an orange "c" with a green leaf, followed by the wordmark. */
export function TireloLogo({ height = 30 }: { height?: number }) {
  return (
    <span className="tirelo-logo" style={{ fontSize: height * 0.86 }}>
      <svg aria-hidden="true" viewBox="0 0 24 32" height={height} width={(height * 24) / 32}>
        <defs>
          <linearGradient id="tirelo-c" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#ff7a1a" />
            <stop offset="1" stopColor="#e8352b" />
          </linearGradient>
        </defs>
        <path d="M19 13.2a7.6 7.6 0 1 0 0 11.6" fill="none" stroke="url(#tirelo-c)" strokeWidth="6" strokeLinecap="round" />
        <path d="M9.5 9.6C8.9 6 10.6 3 14.4 1.6c.6 3.6-1.2 6.6-4.9 8z" fill="#2f9e44" />
      </svg>
      <span className="tirelo-logo__word">tirelo</span>
    </span>
  );
}
