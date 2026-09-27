# Ayush Kumar Shinde — Frontend Developer & Full-Stack Engineer Portfolio

A production-grade, motion-rich personal portfolio website built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP & ScrollTrigger**, and **Lenis** smooth scrolling.

---

## Key Features

- **Living Motion System**:
  - **GSAP & ScrollTrigger**: Scroll-linked reveals, text reveals, timeline progress bar, dynamic parallax backgrounds.
  - **Lenis Inertia Scrolling**: Silky smooth wheel scrolling seamlessly synchronized with GSAP tickers.
  - **Custom Magnetic Cursor**: Mouse-following fluid cursor with `gsap.quickTo` physics and responsive magnetic hover pulls (automatically disabled on touch devices).
  - **Interactive 3D Tilt**: Project cards with 3D perspective mouse tilt and dynamic spotlight gradient tracking.
- **Dedicated SEO Architecture**:
  - Semantic HTML5 structure with proper ARIA accessibility roles and skiplinks.
  - Dedicated SEO-indexable project case study pages (`/projects/[slug]`).
  - Dynamic OpenGraph image generation (`/projects/[slug]/opengraph-image.tsx`).
  - JSON-LD structured data (`Person` & `CreativeWork` schemas).
  - Dynamic `sitemap.ts` and `robots.ts`.
- **Preloader Sequence**:
  - Animated counter (00% &rarr; 100%) and glowing monogram reveal with smooth curtain exit transition.
- **Single Source of Truth**:
  - All content, projects, metrics, timeline, and skills are managed centrally in `src/data/portfolio.ts`.
- **Theme Switching**:
  - Dark / Light mode toggle powered by `next-themes` and CSS variables with smooth transitions.
- **Secure Contact Pipeline**:
  - `/api/contact` route with honeypot spam protection, validation, and celebratory confetti animation on submission.
- **Accessibility & Reduced Motion**:
  - Fully supports `prefers-reduced-motion` with non-blocking fallbacks.
  - Visible focus rings, keyboard navigable modals, and high contrast color tokens.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Modern React framework with Server Components & Streaming |
| **React 19 & TypeScript** | Component model and strict compile-time type safety |
| **GSAP & ScrollTrigger** | High-performance animation timelines and scroll triggers |
| **Lenis** | Smooth inertia scrolling |
| **Tailwind CSS v4** | Modern CSS utilities and design tokens |
| **Lucide React** | Feather-light modern iconography |
| **Canvas Confetti** | Interaction delight feedback |

---

## Directory Structure

```
ayush-portfolio/
├── public/
│   ├── favicon.svg             # Vector brand monogram
│   ├── manifest.json           # PWA metadata
│   ├── robots.txt              # Search crawler instructions
│   └── images/
│       └── projects/           # Architectural project SVGs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Providers, fonts, structured data, cursor, nav & footer
│   │   ├── page.tsx            # Main scrollytelling experience
│   │   ├── loading.tsx         # Route hydration skeleton
│   │   ├── error.tsx           # Runtime error boundary
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── globals.css         # Tailwind + custom CSS utilities
│   │   ├── sitemap.ts          # Dynamic XML sitemap
│   │   ├── robots.ts           # Dynamic robots configuration
│   │   ├── manifest.ts         # Dynamic manifest
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx    # Dedicated project case study
│   │   │       └── opengraph-image.tsx # Dynamic OG banner
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # Secure contact route with honeypot
│   ├── components/
│   │   ├── ui/                 # Button, Badge, GlassCard, Tooltip
│   │   ├── preloader/          # Loading screen & curtain transition
│   │   ├── cursor/             # Custom magnetic spring cursor
│   │   ├── navbar/             # Floating glass header & theme toggle
│   │   ├── hero/               # Split-text headline & metrics
│   │   ├── about/              # Mask reveal & philosophies
│   │   ├── skills/             # Filterable category grid
│   │   ├── projects/           # ProjectCard (3D tilt), Grid, Modal
│   │   ├── experience/         # Scroll-triggered glowing timeline
│   │   ├── testimonials/       # Endorsements carousel
│   │   ├── contact/            # Animated form & timezone clock
│   │   └── footer/             # Minimal footer with back-to-top
│   ├── data/
│   │   └── portfolio.ts        # Centralized source of truth
│   ├── hooks/
│   │   ├── useGsapContext.ts   # Safe GSAP context cleanup
│   │   ├── useReducedMotion.ts # Reduced motion detector
│   │   ├── useMediaQuery.ts    # Touch & screen query hook
│   │   └── useMagneticCursor.ts# Spring magnetic attraction
│   ├── lib/
│   │   ├── gsap.ts             # Plugin registration
│   │   ├── utils.ts            # Class merging & formatters
│   │   └── seo.ts              # JSON-LD & metadata builder
│   ├── providers/
│   │   ├── theme-provider.tsx  # Dark/light theme context
│   │   └── lenis-provider.tsx  # Smooth scrolling context
│   ├── styles/
│   │   └── theme.css           # CSS variables & glassmorphism
│   └── types/
│       ├── project.ts          # Project data schema
│       ├── skill.ts            # Skill data schema
│       └── testimonial.ts      # Testimonial & Experience schema
├── next.config.ts              # Security headers & image patterns
├── vercel.json                 # Caching & security headers
└── package.json
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## Customizing Your Information

All personal data, projects, skills, timeline, and social profiles are located in a single file:
**`src/data/portfolio.ts`**

Simply edit:
- `personalInfo`: Name, role, tagline, detailed bio, location, email, and social profiles.
- `projects`: Add, edit, or reorder your projects (includes metrics, architecture highlights, tech stack, and links).
- `skills`: Add or update your technical disciplines and proficiency percentages.
- `experiences`: Update your career milestones, companies, and achievements.
- `testimonials`: Update quotes from colleagues or clients.
