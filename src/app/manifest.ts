import { MetadataRoute } from 'next';
import { personalInfo } from '@/data/portfolio';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Er. Ayush Kumar Shinde portfolio',
    short_name: 'Ayush.dev',
    description: personalInfo.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#08090D',
    theme_color: '#6366F1',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
