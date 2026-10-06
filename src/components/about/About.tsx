'use client';

import React, { useRef } from 'react';
import { personalInfo } from '@/data/portfolio';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Award, Zap, Code, ShieldCheck, FileDown, Eye } from 'lucide-react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';
import { useResume } from '@/context/ResumeContext';

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { openResume } = useResume();

  useGsapContext(
    () => {
      // Reveal header
      gsap.fromTo(
        '.about-header',
        { y: 40, opacity: 0 },
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

      // Reveal bio paragraphs
      gsap.fromTo(
        '.about-bio-p',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about-bio-container',
            start: 'top 80%',
          },
        }
      );

      // Mask clip-path visual card reveal
      gsap.fromTo(
        visualRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 85%',
          },
        }
      );

      // Stagger principle cards
      gsap.fromTo(
        '.about-principle-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-principles-grid',
            start: 'top 85%',
          },
        }
      );
    },
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative pt-6 sm:pt-10 md:pt-20 pb-6 sm:pb-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="About Me"
    >
      {/* Section Header */}
      <div className="about-header mb-8 sm:mb-12 md:mb-16 flex flex-col items-center md:items-start text-center md:text-left">
        <Badge variant="glow" className="mb-4">
          <span>01 / ABOUT ME</span>
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Architecting systems with{' '}
          <span className="text-indigo-400">
            precision and soul.
          </span>
        </h2>
      </div>

      {/* Main Grid: Visual / Identity Card + Narrative Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
        {/* Left: Stylized Identity Terminal / Visual Card */}
        <div ref={visualRef} className="lg:col-span-5 w-full">
          <GlassCard className="relative overflow-hidden p-6 sm:p-8 border-[var(--border-subtle)]">
            {/* Profile Avatar / Monogram Frame */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#090b10] border border-indigo-500/40">
                <span className="font-mono font-black text-xl tracking-tight text-indigo-400">
                  {personalInfo.initials}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">{personalInfo.name}</h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">{personalInfo.title}</p>
              </div>
            </div>

            {/* Info Metrics Table */}
            <div className="space-y-3.5 pt-4 border-t border-[var(--border-subtle)] text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Location
                </span>
                <span className="text-[var(--text-primary)] font-semibold">Raipur, Chhattisgarh, IN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Education
                </span>
                <span className="text-[var(--text-primary)] font-semibold">B.Tech CSE (CGPA 7.3)</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5 shrink-0">
                  <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Current Role
                </span>
                <span className="text-[var(--text-primary)] font-semibold text-right">
                  Frontend Developer at Hindustaan Innovations Private Limited
                </span>
              </div>
            </div>

            {/* Interactive Terminal Snippet */}
            <div className="mt-6 p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-300">
              <div className="flex items-center gap-1.5 mb-2 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] text-slate-400">ayush.config.ts</span>
              </div>
              <p className="text-indigo-300">
                <span className="text-purple-400">const</span> status = &#123;
              </p>
              <p className="pl-4 text-slate-400">
                passion: <span className="text-emerald-400">&apos;60fps UI & Edge Computing&apos;</span>,
              </p>
              <p className="pl-4 text-slate-400">
                shippingSpeed: <span className="text-cyan-400">&apos;Extreme&apos;</span>,
              </p>
              <p className="pl-4 text-slate-400">
                openToCollaborate: <span className="text-amber-400">true</span>
              </p>
              <p className="text-indigo-300">&#125;;</p>
            </div>
          </GlassCard>
        </div>

        {/* Right: Detailed Storytelling */}
        <div className="about-bio-container lg:col-span-7 flex flex-col gap-6 justify-center">
          <p className="about-bio-p text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-medium">
            {personalInfo.shortBio}
          </p>

          {personalInfo.detailedBio.map((paragraph, idx) => (
            <p
              key={idx}
              className="about-bio-p text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 border border-white text-slate-950 font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-102 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-950" />
              <span>View Resume in Portfolio</span>
            </button>
            <a
              href="/resume.pdf"
              download="Ayush_Kumar_Shinde_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-102 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-slate-300" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Engineering Principles */}
      <div className="about-principles-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {personalInfo.principles.map((principle) => (
          <GlassCard
            key={principle.number}
            className="about-principle-card p-6 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 group"
          >
            <span className="font-mono text-xs font-extrabold text-indigo-400 group-hover:text-cyan-400 transition-colors">
              {principle.number}
            </span>
            <h4 className="text-base font-bold text-[var(--text-primary)] mt-3 mb-2">
              {principle.title}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {principle.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
