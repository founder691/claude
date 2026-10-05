import type { Worker } from '../types';

// Sample worker matching the approved Service Passport design. Illustrative data.
export const sampleWorker: Worker = {
  name: 'Sarah Thomas',
  profession: 'Hair Stylist',
  memberSince: '2025-03',
  visibility: 'public',
  about:
    'Hair stylist with 7+ years of experience across cuts, colouring and bridal styling. Known for precision work and clients who come back asking for her by name, not just the salon.',
  location: 'Kochi, Kerala',
  // 162 ratings · 4.8 average · 96% positive (4–5 stars)
  ratings: { 5: 137, 4: 19, 3: 4, 2: 1, 1: 1 },
  experience: [
    {
      id: 'exp_stylin',
      employer: 'Stylin Glow Salon',
      role: 'Hair Stylist',
      start: '2023-01',
      end: null,
      rating: 4.8,
      verified: true,
      icon: 'scissors',
      tone: 'deep',
    },
    {
      id: 'exp_aure',
      employer: 'Aure Salon',
      role: 'Junior Stylist',
      start: '2019-06',
      end: '2022-12',
      rating: 4.5,
      verified: true,
      icon: 'lotus',
      tone: 'soft',
    },
  ],
};
