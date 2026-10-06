'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { testimonials } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Star, ChevronLeft, ChevronRight, Quote, FolderGit2, Cpu, ArrowRight } from 'lucide-react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useGsapContext(
    () => {
      gsap.fromTo(
        '.testimonials-header',
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
    },
    containerRef
  );

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative pt-6 sm:pt-12 md:pt-24 pb-8 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      aria-label="Testimonials & Endorsements"
    >
      {/* Header */}
      <div className="testimonials-header flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16">
        <Badge variant="glow" className="mb-4">
          <span>05 / TESTIMONIALS</span>
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Endorsements from{' '}
          <span className="text-indigo-400">
            Collaborators
          </span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] mt-4">
          Feedback from technical leaders, product founders, and creative directors I have had the privilege to build alongside.
        </p>
      </div>

      {/* Featured Testimonial Card */}
      <div className="relative">
        <GlassCard className="p-8 sm:p-12 border-[var(--border-subtle)] relative overflow-hidden shadow-2xl">
          {/* Decorative Giant Quote Mark */}
          <Quote className="absolute -bottom-6 -right-6 w-36 h-36 text-indigo-500/10 pointer-events-none" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1 text-amber-400 mb-6">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Highlight Hook */}
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4">
            &ldquo;{current.highlight}&rdquo;
          </h3>

          {/* Testimonial Body */}
          <p className="text-sm sm:text-lg text-[var(--text-secondary)] leading-relaxed italic mb-8">
            &ldquo;{current.content}&rdquo;
          </p>

          {/* Author Details */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)] flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40"
              />
              <div>
                <h4 className="font-bold text-base text-[var(--text-primary)]">{current.name}</h4>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {current.role} &middot; {current.company}
                </p>
              </div>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-indigo-500/50 text-[var(--text-primary)] transition-all cursor-pointer hover:scale-105 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-[var(--text-muted)] px-2">
                {activeIndex + 1} / {testimonials.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-indigo-500/50 text-[var(--text-primary)] transition-all cursor-pointer hover:scale-105 shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Discovery Bridge: Brief Intro for Dedicated Projects and Skills Pages */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects Intro Card */}
        <GlassCard className="p-6 sm:p-8 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-4 h-4" />
              <span>Dedicated Projects Gallery</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Selected Works &amp; Case Studies
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[var(--text-secondary)] leading-relaxed mb-6">
              Curious how the engineering praised in these testimonials looks in action? Explore my dedicated projects archive featuring live SaaS apps, socket-driven architectures, and interactive case studies.
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/cta"
          >
            <span>Explore All Projects &amp; Live Demos</span>
            <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </GlassCard>

        {/* Skills Intro Card */}
        <GlassCard className="p-6 sm:p-8 border-[var(--border-subtle)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md">
          <div>
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" />
              <span>Technical Arsenal Breakdown</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
              Skills &amp; Architecture Proficiencies
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[var(--text-secondary)] leading-relaxed mb-6">
              Behind every client milestone is a battle-tested stack. Review MERN stack API capabilities, React / Next.js internals, database schemas, and performance benchmarks.
            </p>
          </div>
          <a
            href="#skills"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors group/cta"
          >
            <span>View Comprehensive Technical Stack</span>
            <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </GlassCard>
      </div>
    </section>
  );
}
