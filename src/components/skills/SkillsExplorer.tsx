'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { skills, skillCategories, personalInfo } from '@/data/portfolio';
import { SkillCategory } from '@/types/skill';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
  Database,
  Terminal,
  Zap,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export function SkillsExplorer() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        (skill.description && skill.description.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <Badge variant="glow" className="mb-4">
          <span>TECHNICAL ARCHITECTURE / ARSENAL</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
          Technical Stack &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Proficiencies.
          </span>
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-slate-700 dark:text-[var(--text-secondary)] mt-4 leading-relaxed">
          A granular overview of frameworks, system architectures, state machines, and protocols I deploy to build high-performance software.
        </p>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full mt-8">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs text-left">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">Performant UI Engineering</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              React 19 &amp; Next.js 16 App Router architectures tuned for 98+ Lighthouse scores and sub-second TTFB.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-700 dark:text-cyan-400 mb-2">
              <Database className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">MERN Stack &amp; Reliability</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              RESTful APIs with Express &amp; MongoDB, secure JWT authentication, and transactional payment pipelines.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-2">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">Kinetic Motion Design</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Silky smooth 60fps ScrollTrigger timelines, Lenis inertia scrolling, and interactive micro-animations.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-[var(--border-subtle)]">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
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

        {/* Live Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search skills & technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-[var(--border-subtle)] text-xs text-slate-900 dark:text-[var(--text-primary)] placeholder-slate-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent transition-all"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        {filteredSkills.map((skill) => (
          <GlassCard
            key={skill.name}
            className="p-6 border-[var(--border-subtle)] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)]">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 capitalize">
                      {skill.category}
                    </span>
                  </div>
                </div>
              </div>

              {skill.description && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {skill.description}
                </p>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Cross-Link Bridge to Projects */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 border border-indigo-500/20 text-center max-w-3xl mx-auto shadow-xl backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-3">
          See These Skills in Production
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-[var(--text-secondary)] max-w-xl mx-auto mb-6 leading-relaxed">
          From live WebSocket chat systems at Hindustan Innovation to MERN stack e-commerce with payment processing, explore the live deployed products.
        </p>
        <Link href="/projects">
          <Button size="lg" variant="glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore All Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
