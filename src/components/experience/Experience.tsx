'use client';

import React, { useRef } from 'react';
import { experience, personalInfo } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Sparkles, Globe, ArrowUpRight, FileDown, Eye } from 'lucide-react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';
import { useResume } from '@/context/ResumeContext';

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const { openResume } = useResume();

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
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 1,
            },
          }
        );
      }

      // 3. Fluid upward reveal for each milestone entry
      entriesRef.current.forEach((entry) => {
        if (!entry) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          entry,
          {
            y: 40,
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );

        // Animate the timeline node pin when reached
        const pinNode = entry.querySelector('.timeline-node-pin');
        if (pinNode) {
          tl.fromTo(
            pinNode,
            { scale: 0.8 },
            {
              scale: 1.1,
              duration: 0.4,
              ease: 'back.out(2)',
            },
            '-=0.4'
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
          <span className="text-indigo-400">
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
        className="relative w-full pb-4"
      >
        {/* Background Vertical Guide Track on the Left */}
        <div className="absolute left-4 sm:left-6 md:left-8 top-3 bottom-6 w-[2px] -translate-x-1/2 bg-[var(--border-subtle)] pointer-events-none" />

        {/* Flat Progress Line */}
        <div
          ref={progressBarRef}
          className="absolute left-4 sm:left-6 md:left-8 top-3 w-[2px] -translate-x-1/2 bg-indigo-500 pointer-events-none z-0 rounded-full"
          style={{ height: '0%' }}
        />

        {/* Timeline Entries Stack */}
        <div className="space-y-10 sm:space-y-14">
          {experience.map((entry, index) => {
            return (
              <div
                key={entry.id}
                ref={(el) => {
                  entriesRef.current[index] = el;
                }}
                className="relative pl-10 sm:pl-16 md:pl-20 w-full will-change-transform"
              >
                {/* Timeline Pin Node on the vertical track */}
                <div
                  className="timeline-node-pin absolute left-4 sm:left-6 md:left-8 -translate-x-1/2 top-7 z-20 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--bg-primary)] border-2 border-indigo-500 cursor-default"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                </div>

                {/* Content Card Layout - Wide Split Grid */}
                <GlassCard className="p-6 sm:p-8 md:p-9 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 shadow-xl group relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
                    {/* Left Column (Metadata & Role Info): lg:col-span-5 */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:pr-6 lg:border-r border-[var(--border-subtle)]/70">
                      <div>
                        {/* Company Header with Icon & Current Status */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shadow-inner">
                              {entry.current ? <Briefcase className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                            </div>
                            <span className="text-xs font-mono font-semibold text-indigo-500 dark:text-indigo-400">
                              {entry.company}
                            </span>
                          </div>

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

                        {/* Role Title */}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                          {entry.role}
                        </h3>

                        {/* Period & Location Metadata Chips */}
                        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-mono">
                          <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/5 font-semibold text-slate-700 dark:text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                            {entry.period}
                          </span>
                          {entry.location && (
                            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400">
                              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                              {entry.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Domain Highlights Pill Box */}
                      <div className="p-3.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/15 text-xs text-[var(--text-secondary)]">
                        <span className="block font-mono text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
                          {entry.current ? 'Primary Scope & Environment' : 'Engineering Focus'}
                        </span>
                        <span className="leading-snug">
                          {entry.current
                            ? 'Production React/Next.js Apps, Live WebSockets & Project OS Platform'
                            : 'Full-Stack MERN Architecture, JWT Security & Cloud Deployments'}
                        </span>
                      </div>
                    </div>

                    {/* Right Column (Contributions & Stack): lg:col-span-7 */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                      {/* Description */}
                      {entry.description && (
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {entry.description}
                        </p>
                      )}

                      {/* Bullet Points with subtle row highlighting */}
                      <div className="space-y-2.5">
                        {entry.bulletPoints.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] p-2.5 rounded-lg hover:bg-slate-100/50 dark:hover:bg-white/[0.03] transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Live Production Platforms Shipped */}
                      {entry.liveProducts && entry.liveProducts.length > 0 && (
                        <div className="pt-4 border-t border-[var(--border-subtle)]">
                          <div className="text-[11px] font-mono text-[var(--text-muted)] mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-[10px]">
                              <Globe className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                              Shipped Platforms &amp; Live Portfolios:
                            </span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Live in Production
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {entry.liveProducts.map((prod, pIdx) => {
                              const isLastOdd =
                                entry.liveProducts &&
                                entry.liveProducts.length % 2 !== 0 &&
                                pIdx === entry.liveProducts.length - 1;

                              return (
                                <a
                                  key={prod.name}
                                  href={prod.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`group/prod flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                                    isLastOdd ? 'sm:col-span-2' : ''
                                  }`}
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/prod:text-indigo-600 dark:group-hover/prod:text-indigo-300 transition-colors truncate">
                                        {prod.name}
                                      </span>
                                    </div>
                                    {prod.category && (
                                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block truncate mt-0.5">
                                        {prod.category}
                                      </span>
                                    )}
                                  </div>
                                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/prod:bg-indigo-500 group-hover/prod:text-white transition-all">
                                    <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover/prod:text-white transition-colors" />
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Chips */}
                      {entry.techTags && entry.techTags.length > 0 && (
                        <div className="pt-4 border-t border-[var(--border-subtle)]">
                          <div className="text-[11px] font-mono text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                            <span>Key Technologies:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.techTags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[var(--text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
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
              <GlassCard
                key={idx}
                className="p-6 sm:p-7 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 shadow-lg space-y-3 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    {edu.period}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold font-mono">
                    {edu.grade}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {edu.degree}
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                  {edu.institution}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-3 border-t border-[var(--border-subtle)]">
                  {edu.description}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Resume View & Download Callout */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openResume}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white hover:bg-slate-200 border border-white text-slate-950 font-semibold text-sm transition-all duration-300 hover:scale-103 cursor-pointer group"
            >
              <Eye className="w-4.5 h-4.5 group-hover:scale-110 transition-transform text-slate-950" />
              <span>View Resume in Portfolio</span>
            </button>
            <a
              href="/resume.pdf"
              download="Ayush_Kumar_Shinde_Resume.pdf"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-300 hover:scale-103 cursor-pointer"
            >
              <FileDown className="w-4.5 h-4.5 text-slate-300" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
