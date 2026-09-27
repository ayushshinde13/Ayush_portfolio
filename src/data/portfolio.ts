import { Project, ProjectCategory } from '@/types/project';
import { SkillCategory, SkillItem } from '@/types/skill';
import { ExperienceItem, Testimonial } from '@/types/testimonial';
import { ExperienceEntry } from '@/types/experience';

export const personalInfo = {
  name: 'Ayush Kumar Shinde',
  firstName: 'Ayush',
  lastName: 'Shinde',
  initials: 'AKS',
  title: 'Frontend Developer & MERN Stack Developer',
  tagline: 'Frontend Developer crafting responsive, production-ready React applications — from SaaS dashboards to real-time MERN stack projects.',
  shortBio: "I'm a Frontend Developer & MERN Stack Developer with hands-on experience building responsive, production-ready React & Next.js applications. Currently building live products at Hindustan Innovation Pvt. Ltd.",
  detailedBio: [
    'I am a Frontend Developer currently working at Hindustan Innovation Pvt. Ltd., where I build and maintain user-facing features across the company products — including a real-time chat application with live messaging and an internal Project OS platform for tracking work and project milestones.',
    'Outside of my professional role, I independently design and ship MERN stack projects end-to-end: secure JWT authentication systems, Razorpay payment integrations, booking engines, and RESTful APIs with MongoDB. I obsess over clean UI, solid engineering fundamentals, and shipping software that works seamlessly in production.'
  ],
  location: 'Raipur, Chhattisgarh, India (Open to Remote Globally)',
  timezone: 'Asia/Kolkata (GMT+5:30)',
  email: 'ayushshinde225@gmail.com',
  phone: '+91 74705 25135',
  availableForHire: true,
  availabilityText: 'Available for frontend & MERN stack roles',
  resumeUrl: '/resume.pdf',
  siteUrl: 'https://ayush-portfolio.dev',
  socials: {
    github: 'https://github.com/ayushshinde13',
    linkedin: 'https://www.linkedin.com/in/ayush-shinde--/',
    twitter: 'https://x.com/ayushcodes',
    email: 'mailto:ayushshinde225@gmail.com',
  },
  stats: [
    { label: 'Live Projects Shipped', value: '6+', numeric: 6 },
    { label: 'B.Tech CSE CGPA', value: '7.3', numeric: 7.3 },
    { label: 'Frontend Technologies', value: '12+', numeric: 12 },
    { label: 'Lighthouse Performance', value: '98/100', numeric: 98 },
  ],
  principles: [
    {
      number: '01',
      title: 'Responsive & Intentional UI',
      description: 'Crafting pixel-perfect, accessible component hierarchies with React, TypeScript, and Tailwind that feel lightning fast.'
    },
    {
      number: '02',
      title: 'End-to-End Reliability',
      description: 'Building secure RESTful backends, JWT token lifecycle management, and database schemas that scale gracefully.'
    },
    {
      number: '03',
      title: 'Production-First Mindset',
      description: 'Zero layout shift, real-world deployment on Vercel, automated API validation, and rigorous testing across viewports.'
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Shri Shankaracharya Institute Of Professional Management and Technology Raipur',
      period: '2022 — 2026',
      grade: 'CGPA: 7.3 / 10',
      description: 'Focused on MERN stack development, RESTful API architecture, MongoDB database modeling, and building high-performance modern React & Node.js applications.'
    },
    {
      degree: 'Higher Secondary & High School',
      institution: 'Bharat Mata Higher Secondary School, Tatibandh, Raipur',
      period: '2020 — 2022',
      grade: 'First Division',
      description: 'Completed Higher Secondary with PCM (Physics, Chemistry, Mathematics).'
    }
  ]
};

export const projects: Project[] = [
  // SECTION 1: FRONTEND CRAFT
  {
    id: 'ai-resume-analyzer',
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    tagline: 'Responsive SaaS-style UI with ATS score & job-match chart visualizations',
    category: 'frontend',
    categoryLabel: 'Frontend Craft',
    year: 2025,
    summary: 'A responsive SaaS-style UI for resume analysis with ATS score and job-match visualizations.',
    highlights: [
      'Designed authentication, resume upload, and analytics dashboard workflows in React + TypeScript',
      'Implemented chart-based visual breakdown of ATS score algorithms and keyword matching data',
      'Engineered with Vite and Tailwind CSS for instant load times and responsive glassmorphic cards'
    ],
    architectureHighlights: [
      'Interactive ATS gauge meter showing percentage compatibility',
      'Dynamic chart rendering for keyword extraction and skill-gap identification',
      'Clean modular component architecture with TypeScript strict type-checking'
    ],
    impact: 'Live on Vercel; enables instant candidate resume evaluations with zero UI stutter.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React'],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SaaS Dashboard'],
    featured: true,
    image: '/images/projects/ai-resume-analyzer.svg',
    accentColor: '#8B5CF6',
    liveUrl: 'https://ai-resume-analyzer-livid-nu.vercel.app',
    githubUrl: 'https://github.com/ayushshinde13/Ai-Resume-Analyzer',
    links: {
      live: 'https://ai-resume-analyzer-livid-nu.vercel.app',
      github: 'https://github.com/ayushshinde13/Ai-Resume-Analyzer'
    },
    metrics: [
      { label: 'ATS Score Match', value: '94%' },
      { label: 'Build Bundler', value: 'Vite' },
      { label: 'Lighthouse', value: '99/100' }
    ],
    description: 'A responsive SaaS-style UI for resume analysis, featuring ATS score and job-match visualizations through interactive charts and clean dashboard layouts.',
    overview: 'AI Resume Analyzer solves the frustration job-seekers face when applying through applicant tracking systems. Designed in React, TypeScript, and Tailwind CSS, it visualizes resume match scores and keyword densities with high visual polish.',
    challenge: 'Presenting multi-dimensional resume parsing metrics and ATS criteria without overwhelming the user with dense data tables.',
    solution: 'Designed an intuitive dashboard hierarchy featuring an animated radial gauge for the overall score, paired with categorical bar charts and actionable keyword recommendation pills.'
  },
  {
    id: 'saasflow-landing',
    slug: 'saasflow-landing',
    title: 'SaaSFlow – Modern SaaS Landing Page',
    tagline: 'Startup-grade marketing interface with dark/light themes and custom CSS animations',
    category: 'frontend',
    categoryLabel: 'Frontend Craft',
    year: 2026,
    summary: 'A premium SaaS landing page with dark/light themes, pricing, testimonials, and animations.',
    highlights: [
      'Startup-grade interface with custom CSS animations and Framer Motion micro-interactions',
      'Complete dark/light theme switching with smooth token transitions',
      'Interactive pricing tiers, testimonials slider, accordion FAQ, and animated contact form'
    ],
    architectureHighlights: [
      'Fluid responsiveness tested across mobile, tablet, and ultra-wide displays',
      'Zero layout shifts with pre-calculated skeleton and layout containment',
      'Clean accessible accordion navigation with full keyboard focus support'
    ],
    impact: 'Production-ready showcase template achieving a 99 Lighthouse performance rating.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'UI Design'],
    featured: true,
    image: '/images/projects/saasflow.svg',
    accentColor: '#EC4899',
    liveUrl: 'https://saas-landing-page-chi-dun.vercel.app/',
    githubUrl: 'https://github.com/ayushshinde13/saas_landing_page',
    links: {
      live: 'https://saas-landing-page-chi-dun.vercel.app/',
      github: 'https://github.com/ayushshinde13/saas_landing_page'
    },
    metrics: [
      { label: 'Theme Modes', value: 'Dark & Light' },
      { label: 'Animation Speed', value: '60 FPS' },
      { label: 'Performance', value: '99/100' }
    ],
    description: 'A premium SaaS landing page with dark/light themes, pricing plans, testimonials, an accordion FAQ, and an animated contact form.',
    overview: 'SaaSFlow is a modern conversion-focused SaaS storefront designed to showcase state-of-the-art landing page aesthetics, dark/light theme versatility, and smooth spring micro-interactions.',
    challenge: 'Achieving silky 60fps scroll transitions and theme shifts without flickering or heavy bundle dependencies.',
    solution: 'Engineered lightweight CSS custom properties combined with Framer Motion triggers for smooth spring physics and instant theme transitions.'
  },
  {
    id: 'maison-store',
    slug: 'maison-store',
    title: 'Maison Store – Premium E-Commerce Frontend',
    tagline: 'Fully responsive e-commerce platform with 48 products, filtering, wishlist, and cart',
    category: 'frontend',
    categoryLabel: 'Frontend Craft',
    year: 2026,
    summary: 'A fully responsive e-commerce platform with 48 products, filtering, wishlist, and cart.',
    highlights: [
      'Global state management via React Context API for frictionless cart and wishlist operations',
      'Cart and wishlist persistence across sessions using localStorage synchronization',
      'Instant live product search, multi-attribute filtering, and animated product detail pages'
    ],
    architectureHighlights: [
      '48-product rich catalog with real-time category filtering and price sliders',
      'Client-side cart drawer with quantity toggles and subtotal calculations',
      'Wishlist heart animations with persistent storage state'
    ],
    impact: 'Demonstrates enterprise-grade frontend architecture for high-volume modern shopping experiences.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Router v6', 'Context API', 'Framer Motion'],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'React Router v6', 'Context API', 'Framer Motion'],
    tags: ['React', 'Vite', 'E-Commerce', 'Context API', 'Tailwind CSS'],
    featured: true,
    image: '/images/projects/maison-store.svg',
    accentColor: '#F43F5E',
    liveUrl: 'https://e-commerce-frontend-olive-psi.vercel.app/',
    githubUrl: 'https://github.com/ayushshinde13/E-Commerce-frontend',
    links: {
      live: 'https://e-commerce-frontend-olive-psi.vercel.app/',
      github: 'https://github.com/ayushshinde13/E-Commerce-frontend'
    },
    metrics: [
      { label: 'Products Catalog', value: '48 Items' },
      { label: 'Search Latency', value: '<10ms' },
      { label: 'Persistence', value: 'LocalStorage' }
    ],
    description: 'A fully responsive e-commerce platform with 48 products, advanced filtering, live search, wishlist, cart management, and product detail pages.',
    overview: 'Maison Store was crafted to deliver a luxury shopping experience on the web. It features a complete shopping funnel: catalog filtering, instant search, product detail transitions, cart checkout, and wishlist management.',
    challenge: 'Managing interconnected cart, wishlist, and search filter states without external heavy state libraries.',
    solution: 'Architected modular React Context providers with automatic localStorage hydration and optimistic UI updates.'
  },

  // SECTION 2: MERN STACK PROJECTS
  {
    id: 'taste-pilot',
    slug: 'taste-pilot',
    title: 'Taste Pilot',
    tagline: 'Swiggy-inspired food ordering platform with JWT auth, live order tracking, and Razorpay',
    category: 'fullstack',
    categoryLabel: 'MERN Stack Projects',
    year: 2025,
    summary: 'A MERN stack food ordering platform with JWT auth, cart, live order tracking, and payments.',
    highlights: [
      'Secure JWT + bcrypt authentication system with role-protected API routes',
      'Real-time order status tracking powered by bidirectional Socket.IO WebSockets',
      'Integrated Razorpay payment gateway handling secure checkout and order confirmation',
      'Live and deployed on Vercel with MongoDB cloud database connectivity'
    ],
    architectureHighlights: [
      'Event-driven order lifecycle updates broadcasting live kitchen-to-doorstep milestones',
      'MongoDB Mongoose schemas for users, restaurants, menu items, orders, and payment receipts',
      'Next.js and Express backend API architecture handling cart validation and webhook confirmations'
    ],
    impact: 'Deployed on Vercel; successfully processes end-to-end simulated ordering flows with live payment confirmation.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay'],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay', 'Tailwind CSS'],
    tags: ['Next.js', 'Socket.IO', 'Razorpay', 'MongoDB', 'Node.js', 'MERN Stack'],
    featured: true,
    image: '/images/projects/taste-pilot.svg',
    accentColor: '#F97316',
    liveUrl: 'https://taste-pilot-blond.vercel.app/',
    githubUrl: 'https://github.com/ayushshinde13/taste-pilot',
    links: {
      live: 'https://taste-pilot-blond.vercel.app/',
      github: 'https://github.com/ayushshinde13/taste-pilot'
    },
    metrics: [
      { label: 'Real-Time Sync', value: 'Socket.IO' },
      { label: 'Payment Gateway', value: 'Razorpay' },
      { label: 'Authentication', value: 'JWT + Bcrypt' }
    ],
    description: 'A Swiggy-inspired food ordering platform with JWT authentication, cart management, live order tracking via Socket.IO, and Razorpay payment integration.',
    overview: 'Taste Pilot simulates the full complexity of a modern food delivery ecosystem. From restaurant browsing and customizable carts to real-time driver/kitchen status updates and payment receipts.',
    challenge: 'Synchronizing real-time order state between multiple connected clients while maintaining transactional payment integrity.',
    solution: 'Integrated Socket.IO rooms per order ID coupled with transactional Razorpay webhook handlers and MongoDB status updates.'
  },
  {
    id: 'car-rental-webapp',
    slug: 'car-rental-webapp',
    title: 'Car Rental Web Application',
    tagline: 'MERN stack car rental platform with secure authentication, wallet, and booking dashboard',
    category: 'fullstack',
    categoryLabel: 'MERN Stack Projects',
    year: 2025,
    summary: 'A MERN stack car rental platform with booking, wallet, and dashboard features.',
    highlights: [
      'JWT-secured login, password encryption via bcrypt, and protected client/server routes',
      'Wallet balance management system, transaction logging, and real-time booking history',
      'RESTful APIs built, validated, and documented with Express.js, Node.js, and MongoDB'
    ],
    architectureHighlights: [
      'Comprehensive car inventory browsing with filtering by fuel type, transmission, and seating',
      'Atomic wallet balance deductions upon vehicle reservation with conflict resolution',
      'User dashboard displaying active rentals, completed trips, and invoice summaries'
    ],
    impact: 'Complete MERN showcase demonstrating commercial vehicle reservation workflows and user financial balance tracking.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    tags: ['React', 'MERN Stack', 'Node.js', 'MongoDB', 'JWT'],
    featured: false,
    image: '/images/projects/car-rental.svg',
    accentColor: '#0284C7',
    githubUrl: 'https://github.com/ayushshinde13/car-rental-webapp',
    links: {
      github: 'https://github.com/ayushshinde13/car-rental-webapp'
    },
    metrics: [
      { label: 'Stack', value: 'MERN' },
      { label: 'Security', value: 'JWT Protected' },
      { label: 'Features', value: 'Wallet & Booking' }
    ],
    description: 'A MERN stack car rental platform with secure authentication, car browsing, booking, wallet management, and a comprehensive user dashboard.',
    overview: 'Engineered as a complete fleet management and customer rental portal, this project covers the entire reservation lifecycle from vehicle search to wallet billing.',
    challenge: 'Preventing double-booking of rental vehicles across overlapping date ranges while ensuring accurate wallet ledger balances.',
    solution: 'Designed MongoDB compound indexes and date-overlap query validations in Express middleware before committing booking records.'
  },
  {
    id: 'room-finder',
    slug: 'room-finder',
    title: 'Room Finder Application',
    tagline: 'Multi-user MERN room discovery & reservation platform with role-based access',
    category: 'fullstack',
    categoryLabel: 'MERN Stack Projects',
    year: 2025,
    summary: 'A multi-user MERN room discovery and booking platform with full booking management.',
    highlights: [
      'Multi-role user system (admin, property owner, and tenant) with JWT-based authorization',
      'Responsive, modern UI built with Tailwind CSS and reusable component blocks',
      'End-to-end booking management functionality including status approvals and inquiry threads'
    ],
    architectureHighlights: [
      'Role-based middleware interceptors safeguarding administrative endpoints',
      'Multi-image property uploads and amenity tag filtering in MongoDB',
      'Responsive property showcase grid optimized for mobile and desktop screens'
    ],
    impact: 'Empowers property owners to list accommodations and prospective tenants to reserve rooms with verifiable status updates.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    tags: ['React', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS'],
    featured: false,
    image: '/images/projects/room-finder.svg',
    accentColor: '#10B981',
    githubUrl: 'https://github.com/ayushshinde13/room-finder-mern',
    links: {
      github: 'https://github.com/ayushshinde13/room-finder-mern'
    },
    metrics: [
      { label: 'Role System', value: 'Multi-User JWT' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'UI Styling', value: 'Tailwind CSS' }
    ],
    description: 'A multi-user room discovery and booking platform with JWT authentication, role management, and full booking lifecycle tracking.',
    overview: 'Room Finder simplifies accommodation discovery for students and professionals. The platform separates tenant search from owner listing management with role-based security.',
    challenge: 'Structuring flexible property amenity schemas and secure permissions so tenants cannot alter room pricing or owner listings.',
    solution: 'Created fine-grained JWT role payload tokens verified on both client router guards and server API controllers.'
  }
];

export const skills: SkillItem[] = [
  // Frontend
  { name: 'React.js & Next.js', category: 'Frontend & Motion', proficiency: 94, experienceYears: '3+ yrs', featured: true, description: 'Component architecture, Hooks, App Router, Context API, and SSR' },
  { name: 'TypeScript & JavaScript (ES6+)', category: 'Languages & Runtimes', proficiency: 92, experienceYears: '3+ yrs', featured: true, description: 'Strong typing, async/await, closures, and modern ESNext features' },
  { name: 'C & C++', category: 'Languages & Runtimes', proficiency: 86, experienceYears: '2+ yrs', featured: true, description: 'Object-Oriented Programming (OOP), memory management, DSA problem solving, and STL' },
  { name: 'Tailwind CSS & Modern CSS', category: 'Frontend & Motion', proficiency: 95, experienceYears: '3+ yrs', featured: true, description: 'Responsive design, custom design tokens, glassmorphism, flexbox & grid' },
  { name: 'Vite & Frontend Tooling', category: 'Frontend & Motion', proficiency: 90, experienceYears: '2+ yrs', featured: true, description: 'Fast HMR, optimized bundle chunking, and environment configs' },
  { name: 'Framer Motion & GSAP', category: 'Frontend & Motion', proficiency: 88, experienceYears: '2+ yrs', featured: true, description: 'Scroll triggers, layout animations, spring transitions, and interactive physics' },
  { name: 'HTML5 Semantic & a11y', category: 'Frontend & Motion', proficiency: 95, experienceYears: '3+ yrs', featured: false, description: 'Semantic document outlines, accessible forms, and ARIA landmarks' },

  // Backend & Databases
  { name: 'Node.js & Express.js', category: 'Backend & Cloud', proficiency: 88, experienceYears: '2+ yrs', featured: true, description: 'RESTful API architecture, middleware pipelines, and error handling' },
  { name: 'MongoDB & Mongoose', category: 'Backend & Cloud', proficiency: 86, experienceYears: '2+ yrs', featured: true, description: 'Schema modeling, validation, aggregation pipelines, and indexing' },
  { name: 'JWT & Authentication', category: 'Backend & Cloud', proficiency: 90, experienceYears: '2+ yrs', featured: true, description: 'Token lifecycle, bcrypt password hashing, and role-protected routes' },
  { name: 'Streamlit & Flask', category: 'Backend & Cloud', proficiency: 86, experienceYears: '2+ yrs', featured: true, description: 'Interactive Python dashboards, lightweight RESTful microservices, and rapid web prototyping' },
  { name: 'Socket.IO & WebSockets', category: 'Backend & Cloud', proficiency: 84, experienceYears: '1.5+ yrs', featured: false, description: 'Bi-directional real-time chat, room broadcasting, and live tracking' },
  { name: 'SQL & Relational DBs', category: 'Languages & Runtimes', proficiency: 82, experienceYears: '2+ yrs', featured: false, description: 'Relational schema design, queries, joins, and integrity constraints' },
  { name: 'Python', category: 'Languages & Runtimes', proficiency: 80, experienceYears: '2+ yrs', featured: false, description: 'Data structures, scripting, and backend automation' },

  // Tools & AI
  { name: 'Git & GitHub', category: 'DevOps & Tooling', proficiency: 92, experienceYears: '3+ yrs', featured: true, description: 'Version control, branch workflows, pull requests, and collaboration' },
  { name: 'Postman & API Testing', category: 'DevOps & Tooling', proficiency: 88, experienceYears: '2+ yrs', featured: false, description: 'API endpoint validation, environment variables, and mock requests' },
  { name: 'AI Engineering Tools', category: 'DevOps & Tooling', proficiency: 94, experienceYears: '2+ yrs', featured: true, description: 'Cursor, Claude, GitHub Copilot, and ChatGPT for accelerated development' },
  { name: 'CS Fundamentals (DSA/OOP)', category: 'DevOps & Tooling', proficiency: 85, experienceYears: '3+ yrs', featured: false, description: 'Data Structures, Algorithms, OOP principles, DBMS, and OS concepts' }
];

export const skillCategories: { id: SkillCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'All Disciplines' },
  { id: 'Frontend & Motion', label: 'Frontend' },
  { id: 'Backend & Cloud', label: 'Backend & Databases' },
  { id: 'Languages & Runtimes', label: 'Languages' },
  { id: 'DevOps & Tooling', label: 'Tools & Practices' },
];

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-1',
    role: 'Frontend Developer',
    company: 'Hindustan Innovation Pvt. Ltd.',
    status: 'Current',
    current: true,
    location: 'Raipur, India',
    period: '2024 — Present',
    description: 'Building and maintaining responsive user-facing features across multiple company products and client platforms.',
    bulletPoints: [
      'Building and maintaining user-facing features across core company products with React, Next.js, and TypeScript',
      'Built a real-time chat application with live messaging functionality, room presence, and WebSocket connectivity',
      'Actively developing "Project OS" — an internal web platform for monitoring developer work, task allocation, and project velocity',
      'Designed and shipped the food delivery landing page and rider app portfolio showcase'
    ],
    techTags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.IO', 'REST APIs', 'Vite']
  },
  {
    id: 'exp-2',
    role: 'MERN Stack Developer (Independent Projects)',
    company: 'Self-Initiated & Open Source',
    status: 'Production Releases',
    current: false,
    location: 'Raipur, India',
    period: '2023 — Present',
    description: 'Architecting and deploying end-to-end MERN stack projects with modern frontend frameworks and secure backends.',
    bulletPoints: [
      'Built and deployed Taste Pilot, a production MERN stack food delivery platform with Razorpay and Socket.IO on Vercel',
      'Developed AI Resume Analyzer with interactive ATS score chart visualizations in React & TypeScript',
      'Shipped Maison Store, an e-commerce platform featuring 48 products with localStorage cart and wishlist persistence'
    ],
    techTags: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'MongoDB', 'Razorpay', 'Socket.IO', 'Vercel']
  }
];

export const experiences = experience;

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Engineering Lead',
    role: 'Product Division',
    company: 'Hindustan Innovation',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    highlight: 'Tremendous ownership and eye for UI polish.',
    content: 'Ayush consistently delivers clean, responsive frontend code. From our real-time chat feature to the internal Project OS, he has shown great technical maturity, fast turnaround times, and attention to detail.',
    rating: 5,
    linkedIn: 'https://linkedin.com'
  },
  {
    id: 'test-2',
    name: 'Senior MERN Stack Colleague',
    role: 'Core Systems',
    company: 'Tech Community',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    highlight: 'Ships real production apps that actually work.',
    content: 'What sets Ayush apart is that he doesn’t just build toy demos — his projects have working auth, live payment flows, and clean responsive layouts that look great on any device.',
    rating: 5,
    linkedIn: 'https://linkedin.com'
  }
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
