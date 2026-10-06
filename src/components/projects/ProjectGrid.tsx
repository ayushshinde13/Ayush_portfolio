'use client';

import React, { useState, useRef } from 'react';
import { projects } from '@/data/portfolio';
import { Project, ProjectCategory } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Badge } from '@/components/ui/Badge';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';
import { Code2, Database, Sparkles } from 'lucide-react';

type FilterType = 'all' | 'frontend' | 'fullstack';

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const frontendSectionRef = useRef<HTMLDivElement>(null);
  const fullstackSectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const frontendProjects = projects.filter((p) => p.category === 'frontend');
  const fullstackProjects = projects.filter((p) => p.category === 'fullstack');

  // GSAP ScrollTrigger for independent sub-section reveals and crossfade on filter change
  useGsapContext(
    () => {
      // Header reveal
      gsap.fromTo(
        '.projects-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Frontend sub-section ScrollTrigger
      if (frontendSectionRef.current) {
        gsap.fromTo(
          frontendSectionRef.current.querySelectorAll('.project-card-wrapper'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frontendSectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // MERN Stack sub-section ScrollTrigger
      if (fullstackSectionRef.current) {
        gsap.fromTo(
          fullstackSectionRef.current.querySelectorAll('.project-card-wrapper'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fullstackSectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    },
    containerRef,
    [activeFilter]
  );

  const handleTabChange = (newFilter: FilterType) => {
    if (newFilter === activeFilter) return;

    if (prefersReducedMotion) {
      setActiveFilter(newFilter);
      return;
    }

    // Crossfade grid transition
    gsap.to('.projects-container-wrapper', {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveFilter(newFilter);
        gsap.fromTo(
          '.projects-container-wrapper',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });
  };

  const showFrontend = activeFilter === 'all' || activeFilter === 'frontend';
  const showFullstack = activeFilter === 'all' || activeFilter === 'fullstack';

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative pt-6 sm:pt-12 md:pt-24 pb-8 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Selected Projects"
    >
      {/* Header */}
      <div className="projects-header flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-12">
        <Badge variant="glow" className="mb-4">
          <span>03 / SELECTED WORKS</span>
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Crafted with care, engineered for{' '}
          <span className="text-indigo-400">
            production.
          </span>
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] mt-4">
          Explore production-ready frontend interfaces and MERN stack projects with real-time socket channels, JWT authentication, and live payments.
        </p>
      </div>

      {/* Filter Tabs Toggle */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        {[
          { id: 'all', label: 'All Projects', count: projects.length },
          { id: 'frontend', label: 'Frontend Craft', count: frontendProjects.length },
          { id: 'fullstack', label: 'MERN Stack Projects', count: fullstackProjects.length },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as FilterType)}
              className={`flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-white text-slate-950 border-white font-semibold shadow-xs scale-102'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-black/10 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Container Wrapper */}
      <div className="projects-container-wrapper space-y-20">
        {/* SUB-SECTION 1: FRONTEND CRAFT */}
        {showFrontend && (
          <div ref={frontendSectionRef} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
                  <Code2 className="w-4 h-4" />
                  <span>Section 1</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Frontend Craft
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic max-w-md sm:text-right">
                &ldquo;UI-focused builds where I obsessed over interaction and polish.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onQuickView={(p) => setActiveModalProject(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* SUB-SECTION 2: MERN STACK PROJECTS */}
        {showFullstack && (
          <div ref={fullstackSectionRef} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
                  <Database className="w-4 h-4" />
                  <span>Section 2</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  MERN Stack Projects
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic max-w-md sm:text-right">
                &ldquo;End-to-end systems where I owned auth, data, and payments.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullstackProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onQuickView={(p) => setActiveModalProject(p)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Preview */}
      <ProjectModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
