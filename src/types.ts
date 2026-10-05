// Domain model for a Tirelo Service Passport: a worker-owned professional identity
// that travels with them from workplace to workplace.

export type Visibility = 'public' | 'private';

/** Icon shown in an experience entry's circle. */
export type WorkplaceIcon = 'scissors' | 'lotus';

export interface Verifier {
  name: string;
  /** Their role at the workplace, in plain words: "Salon owner", "Manager". */
  title: string;
}

export interface Experience {
  id: string;
  employer: string;
  role: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null while this is the current job. */
  end: string | null;
  /** Average customer rating earned at this workplace. */
  rating: number;
  /** The person at the workplace who confirmed this job on Tirelo; absent if not yet confirmed. */
  verifiedBy?: Verifier;
  icon: WorkplaceIcon;
  /** 'deep' = filled maroon circle, 'soft' = light pink circle (as in the approved design). */
  tone: 'deep' | 'soft';
}

export interface Worker {
  name: string;
  profession: string;
  /** Optional photo; a monogram is shown when absent. */
  photoUrl?: string;
  /** YYYY-MM */
  memberSince: string;
  visibility: Visibility;
  /** Checked against a government ID. */
  identityVerified: boolean;
  /** Public link to this passport. */
  passportUrl: string;
  about: string;
  location: string;
  /** Customer ratings, keyed by star. Every rating on Tirelo comes with a review. */
  ratings: Record<1 | 2 | 3 | 4 | 5, number>;
  experience: Experience[];
}
