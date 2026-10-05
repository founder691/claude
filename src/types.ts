// Domain model for a Tirelo worker profile.
// A profile is owned by the worker and travels with them between employers;
// every claim on it says who confirmed it.

/** How a claim was confirmed, strongest first. */
export type VerificationSource =
  | 'payroll' // matched against salary / UPI payout records
  | 'employer' // confirmed by an authorised employer account
  | 'peer' // confirmed by verified co-workers
  | 'self'; // added by the worker, not yet confirmed

export interface Engagement {
  id: string;
  role: string;
  employer: string;
  location: string;
  /** ISO date (YYYY-MM-DD). */
  start: string;
  /** ISO date, or null when this is the current role. */
  end: string | null;
  /** One plain sentence describing the work. */
  summary: string;
  highlights: string[];
  verification: VerificationSource;
  /** Who confirmed it, in plain words — "Kaapi Collective", "3 co-workers". */
  verifiedBy: string;
  /** How it was confirmed, in plain words. */
  verifiedHow: string;
}

export type ReviewerType = 'customer' | 'manager' | 'coworker';

export interface Review {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author: string;
  authorType: ReviewerType;
  /** Where the reviewer met the worker. */
  workplace: string;
  date: string;
  text: string;
  tags: string[];
}

export interface Recognition {
  id: string;
  title: string;
  issuer: string;
  date: string;
  kind: 'award' | 'certificate';
}

export interface EarningsMonth {
  /** YYYY-MM */
  month: string;
  /** Base pay credited, whole rupees. */
  base: number;
  /** Tips received through Tirelo, whole rupees. */
  tips: number;
}

export interface Worker {
  name: string;
  firstName: string;
  initials: string;
  city: string;
  languages: string[];
  identityVerified: boolean;
  profileUrl: string;
  engagements: Engagement[];
  /** Star ratings from customers, keyed by star. */
  ratings: Record<1 | 2 | 3 | 4 | 5, number>;
  reviews: Review[];
  recognitions: Recognition[];
  earnings: EarningsMonth[];
}
