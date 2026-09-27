'use client';

import React, { useRef } from 'react';
import { experience, personalInfo } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Sparkles } from 'lucide-react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      // 1. Header entrance reveal
      gsap.fromTo(
        '.experience-header',
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

      // If user prefers reduced motion, skip scrub animations and use simple fades
      if (prefersReducedMotion) {
        entriesRef.current.forEach((entry) => {
          if (!entry) return;
          gsap.fromTo(
            entry,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: entry,
                start: 'top 85%',
              },
            }
          );
        });

        // Ensure progress bar is full in reduced motion mode
        if (progressBarRef.current) {
          progressBarRef.current.style.height = '100%';
        }
        return;
      }

      // 2. Glowing progress line animation tied to scroll scrub
      if (progressBarRef.current && timelineTrackRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 1,
            },
          }
        );
      }

      // 3. Independent side-slide and fade-in per timeline entry
      entriesRef.current.forEach((entry, index) => {
        if (!entry) return;

        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        const isEven = index % 2 === 0;
        // On desktop, alternate entry slide direction: even from left, odd from right
        // On mobile, all slide in from right (+35px)
        const initialX = isDesktop ? (isEven ? -60 : 60) : 40;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          entry,
          {
            x: initialX,
            opacity: 0,
            scale: 0.96,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );

        // Animate the timeline node glow pulse when reached
        const pinNode = entry.querySelector('.timeline-node-pin');
        if (pinNode) {
          tl.fromTo(
            pinNode,
            { scale: 0.5, boxShadow: '0 0 0px rgba(99, 102, 241, 0)' },
            {
              scale: 1.15,
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
              duration: 0.4,
              ease: 'back.out(2)',
            },
            '-=0.5'
          ).to(pinNode, {
            scale: 1,
            duration: 0.3,
          });
        }
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative pt-6 sm:pt-12 md:pt-24 pb-8 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Work Experience & Career Journey"
    >
      {/* Header */}
      <div className="experience-header flex flex-col items-center text-center mb-10 sm:mb-14 md:mb-20">
        <Badge variant="glow" className="mb-4">
          <span>04 / CAREER TIMELINE</span>
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Experience &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Engineering Milestones
          </span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] mt-4">
          Building production-grade web applications, real-time messaging architectures, and MERN stack projects.
        </p>
      </div>

      {/* Main Interactive Timeline Area */}
      <div
        ref={timelineTrackRef}
        className="relative w-full pb-8"
      >
        {/* Background Vertical Guide Track */}
        {/* On mobile: pinned to left-5. On desktop: pinned to center (50%) */}
        <div className="absolute left-5 sm:left-6 lg:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-[var(--border-subtle)] pointer-events-none" />

        {/* Animated Glowing Progress Line */}
        <div
          ref={progressBarRef}
          className="absolute left-5 sm:left-6 lg:left-1/2 top-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 pointer-events-none shadow-[0_0_12px_rgba(99,102,241,0.6)] z-0 rounded-full"
          style={{ height: '0%' }}
        />

        {/* Timeline Entries Stack */}
        <div className="space-y-12 lg:space-y-16">
          {experience.map((entry, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={entry.id}
                ref={(el) => {
                  entriesRef.current[index] = el;
                }}
                className={`relative flex items-center w-full will-change-transform ${
                  // On desktop: alternate left (even) and right (odd)
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* Timeline Center/Left Pin Node */}
                <div
                  className="timeline-node-pin absolute left-5 sm:left-6 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-indigo-500 shadow-md shadow-indigo-500/30 cursor-default"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                </div>

                {/* Content Card Layout */}
                {/* Mobile: padded on left to clear timeline track */}
                {/* Desktop: takes 50% width on left or right */}
                <div
                  className={`w-full lg:w-1/2 pl-12 sm:pl-16 lg:pl-0 ${
                    isEven ? 'lg:pr-12' : 'lg:pl-12'
                  }`}
                >
                  <GlassCard className="p-6 sm:p-8 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 shadow-xl group">
                    {/* Header Row: Company, Role, Status Badge, Period */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            {entry.company}
                          </span>
                          {entry.status && (
                            <Badge
                              variant={entry.current ? 'pulse' : 'outline'}
                              pulseColor="bg-emerald-400"
                              className="text-[11px] font-mono py-0.5"
                            >
                              <span>{entry.status}</span>
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                          {entry.role}
                        </h3>
                      </div>

                      {/* Period & Location Metadata */}
                      <div className="flex sm:flex-col items-start sm:items-end gap-1.5 text-xs font-mono text-slate-600 dark:text-[var(--text-muted)] shrink-0">
                        <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/5 font-semibold text-slate-700 dark:text-slate-300">
                          <Calendar className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          {entry.period}
                        </span>
                        {entry.location && (
                          <span className="flex items-center gap-1 text-[11px]">
                            <MapPin className="w-3 h-3 text-cyan-700 dark:text-cyan-400" />
                            {entry.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Brief Narrative */}
                    {entry.description && (
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                        {entry.description}
                      </p>
                    )}

                    {/* Bullet Points */}
                    <div className="space-y-2.5 mb-6">
                      {entry.bulletPoints.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    {entry.techTags && entry.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                        {entry.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[var(--text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Foundation (Education Credentials) */}
      {personalInfo.education && (
        <div id="education" className="mt-20 pt-16 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2 justify-center">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Credentials</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center mb-8">
            Education &amp; Background
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalInfo.education.map((edu, idx) => (
              <GlassCard key={idx} className="p-6 border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span>{edu.period}</span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold">
                    {edu.grade}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)]">
                  {edu.degree}
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {edu.institution}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
                  {edu.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
