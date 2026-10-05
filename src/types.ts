// Domain model for a Tirelo worker profile.
// A profile is owned by the worker and travels with them between employers;
// every claim on it carries the source that vouches for it.

/** Who vouches for a claim, strongest first. */
export type VerificationSource =
  | 'payroll' // matched against salary / UPI payout records
  | 'employer' // confirmed by an authorised employer account
  | 'peer' // confirmed by 2+ verified co-workers
  | 'self'; // self-reported, not yet verified

export type EmploymentType = 'full-time' | 'part-time' | 'gig' | 'contract';

export interface Engagement {
  id: string;
  role: string;
  employer: string;
  location: string;
  type: EmploymentType;
  /** ISO date (YYYY-MM-DD). */
  start: string;
  /** ISO date, or null when this is the current role. */
  end: string | null;
  verification: VerificationSource;
  verifiedBy?: string;
  highlights: string[];
  skills: string[];
}

export type ReviewerType = 'customer' | 'manager' | 'coworker';

export interface Review {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author: string;
  authorType: ReviewerType;
  engagementId: string;
  date: string;
  text: string;
  tags: string[];
}

export interface Tip {
  id: string;
  date: string;
  /** Amount in whole rupees. */
  amount: number;
  from: string;
  engagementId: string;
  note?: string;
}

export interface Recognition {
  id: string;
  title: string;
  issuer: string;
  date: string;
  kind: 'award' | 'certification' | 'milestone';
  verification: VerificationSource;
}

export interface EarningsMonth {
  /** YYYY-MM */
  month: string;
  /** Base pay credited, whole rupees. */
  base: number;
  /** Tips credited via Tirelo, whole rupees. */
  tips: number;
}

/** Aggregate customer ratings (Tirelo collects many more ratings than written reviews). */
export interface RatingSummary {
  counts: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface Worker {
  id: string;
  name: string;
  pronouns?: string;
  headline: string;
  city: string;
  languages: string[];
  memberSince: string;
  profileHandle: string;
  identityVerified: boolean;
  initials: string;
  engagements: Engagement[];
  ratings: RatingSummary;
  reviews: Review[];
  tips: Tip[];
  recognitions: Recognition[];
  earnings: EarningsMonth[];
}

/** Who is looking at the profile — controls what private data is shown. */
export type Viewer = 'owner' | 'employer';
