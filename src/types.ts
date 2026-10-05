// Domain model for a Tirelo Service Passport: a worker-owned professional identity
// that travels with them from workplace to workplace.

export type Visibility = 'public' | 'private';

/** Icon shown in an experience entry's circle. */
export type WorkplaceIcon = 'scissors' | 'lotus';

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
  /** Whether the employer has confirmed this job on Tirelo. */
  verified: boolean;
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
  about: string;
  location: string;
  /** Customer ratings, keyed by star. Every rating on Tirelo comes with a review. */
  ratings: Record<1 | 2 | 3 | 4 | 5, number>;
  experience: Experience[];
}
