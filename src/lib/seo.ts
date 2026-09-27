import { Metadata } from 'next';
import { personalInfo } from '@/data/portfolio';
import { Project } from '@/types/project';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || personalInfo.siteUrl;

export function generatePortfolioMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png',
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const pageTitle = title || 'Er. Ayush Kumar Shinde portfolio';
  const pageDesc = description || personalInfo.tagline;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title: pageTitle,
    description: pageDesc,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: personalInfo.name, url: siteUrl }],
    creator: personalInfo.name,
    keywords: [
      'Ayush Kumar Shinde',
      'Portfolio',
      'MERN Stack Developer',
      'Creative Technologist',
      'Frontend Architect',
      'Next.js Developer',
      'GSAP Animations',
      'WebGL Developer',
      'TypeScript',
      'Tailwind CSS',
      'React 19',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: pageTitle,
      description: pageDesc,
      siteName: `${personalInfo.name} Portfolio`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${personalInfo.name} - ${personalInfo.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [ogImageUrl],
      creator: '@ayushcodes',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/favicon.svg' }],
    },
    manifest: '/manifest.json',
  };
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    givenName: personalInfo.firstName,
    familyName: personalInfo.lastName,
    jobTitle: personalInfo.title,
    description: personalInfo.shortBio,
    url: siteUrl,
    image: `${siteUrl}/images/avatar.jpg`,
    sameAs: [
      personalInfo.socials.github,
      personalInfo.socials.linkedin,
      personalInfo.socials.twitter,
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'GSAP',
      'WebGL',
      'Distributed Systems',
      'Web Performance',
      'Motion Design',
    ],
  };
}

export function buildCreativeWorkJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.tagline,
    description: project.description,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: siteUrl,
    },
    datePublished: project.year,
    keywords: project.tags.join(', '),
    url: `${siteUrl}/projects/${project.slug}`,
    image: `${siteUrl}${project.image}`,
  };
}
