'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { projects } from '@/data/portfolio';
import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, ArrowLeft, X } from 'lucide-react';

type FilterType = 'all' | 'frontend' | 'fullstack';

export function ProjectsExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category check
      const matchesCategory =
        activeFilter === 'all' || project.category === activeFilter;

      // Search keyword check across title, summary, techStack
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        (project.summary && project.summary.toLowerCase().includes(query)) ||
        (project.stack || project.techStack).some((tech) =>
          tech.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const frontendCount = projects.filter((p) => p.category === 'frontend').length;
  const fullstackCount = projects.filter((p) => p.category === 'fullstack').length;

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
          <span>PORTFOLIO / SELECTED WORKS</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
          Production Systems &amp;{' '}
          <span className="text-indigo-400">
            Frontend Craft.
          </span>
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-slate-700 dark:text-[var(--text-secondary)] mt-4 leading-relaxed">
          A curated collection of production-grade web applications, real-time socket architectures, and responsive digital experiences built for performance and scale.
        </p>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full mt-8">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">6+</span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">Live Deployed Apps</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">100%</span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">TypeScript Strict</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">60fps</span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">GSAP Motion</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-subtle)] shadow-xs flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-cyan-700 dark:text-cyan-400">REST + JWT</span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">MERN Stack Auth</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-[var(--border-subtle)]">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Projects', count: projects.length },
            { id: 'frontend', label: 'Frontend Craft', count: frontendCount },
            { id: 'fullstack', label: 'MERN Stack Projects', count: fullstackCount },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterType)}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer select-none ${
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

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by tech or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-[var(--border-subtle)] text-xs text-slate-900 dark:text-[var(--text-primary)] placeholder-slate-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-base text-slate-600 dark:text-slate-400 mb-4">
            No projects matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onQuickView={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
