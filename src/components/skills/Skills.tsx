'use client';

import React, { useState, useRef } from 'react';
import { skills, skillCategories } from '@/data/portfolio';
import { SkillCategory } from '@/types/skill';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';
import { Cpu, CheckCircle2 } from 'lucide-react';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((item) => item.category === activeCategory);

  useGsapContext(
    () => {
      // Header reveal
      gsap.fromTo(
        '.skills-header',
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

      // Stagger skills items
      gsap.fromTo(
        '.skill-card-item',
        { y: 25, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    },
    containerRef,
    [activeCategory]
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative pt-6 sm:pt-12 md:pt-24 pb-8 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Skills & Expertise"
    >
      {/* Header */}
      <div className="skills-header flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-12">
        <Badge variant="glow" className="mb-4">
          <span>02 / EXPERTISE</span>
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Technical Arsenal &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Proficiencies
          </span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] mt-4">
          Battle-tested toolchains, frameworks, and low-level protocols honed across enterprise production systems and cutting-edge creative experiments.
        </p>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {skillCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-400/50 shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-[var(--bg-card)] text-slate-700 dark:text-[var(--text-secondary)] border-slate-200 dark:border-[var(--border-subtle)] hover:border-indigo-500/30 hover:text-[var(--text-primary)] shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {filteredSkills.map((skill) => (
          <GlassCard
            key={skill.name}
            className="skill-card-item p-5 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {skill.name}
                  </h3>
                </div>
              </div>

              {skill.description && (
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {skill.description}
                </p>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
