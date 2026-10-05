import { forwardRef } from 'react';
import { Share } from './Icons';

export const ShareButton = forwardRef<HTMLButtonElement, { onClick: () => void; tabIndex?: number }>(
  function ShareButton({ onClick, tabIndex }, ref) {
    return (
      <button ref={ref} type="button" className="share-button" onClick={onClick} tabIndex={tabIndex}>
        <Share />
        Share my Passport
      </button>
    );
  },
);
