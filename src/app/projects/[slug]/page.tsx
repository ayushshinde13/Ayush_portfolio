import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { projects, personalInfo } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { buildCreativeWorkJsonLd, generatePortfolioMetadata } from '@/lib/seo';
import { GithubIcon } from '@/components/ui/Icons';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return generatePortfolioMetadata({
    title: `${project.title} — Case Study`,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const jsonLd = buildCreativeWorkJsonLd(project);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Inject Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-indigo-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Hero Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={project.category === 'frontend' ? 'default' : 'pulse'}>
              <span>{project.categoryLabel || (project.category === 'frontend' ? 'Frontend Craft' : 'MERN Stack Projects')}</span>
            </Badge>
            <span className="text-xs font-mono text-[var(--text-muted)] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              Year {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 border border-white text-slate-950 font-semibold text-sm transition-all"
              >
                <span>Live Deployment</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/10 dark:bg-white/5 hover:bg-white/10 border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold text-sm transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Visual Banner Preview */}
        <div className="relative w-full h-64 sm:h-96 md:h-[28rem] rounded-3xl overflow-hidden border border-[var(--border-subtle)] mb-14 shadow-2xl bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {project.metrics.map((metric, idx) => (
            <GlassCard key={idx} className="p-6 text-center border-[var(--border-subtle)]">
              <span className="block text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1 block">
                {metric.label}
              </span>
            </GlassCard>
          ))}
        </div>

        {/* Deep Dive Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>The Vision &amp; Architecture</span>
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* The Challenge */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                The Engineering Challenge
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.challenge}
              </p>
            </section>

            {/* The Solution */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                The Implemented Solution
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.solution}
              </p>
            </section>

            {/* Architectural Highlights */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Key Architectural Decisions</span>
              </h2>
              <ul className="space-y-3">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-white/5 text-xs sm:text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Measurable Impact */}
            <section className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Production Impact &amp; Results</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium">
                {project.impact}
              </p>
            </section>
          </div>

          {/* Right Sidebar: Tech Stack & Specs */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-6 border-[var(--border-subtle)] space-y-6">
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Technologies</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-black/10 dark:bg-white/5 border border-white/10 text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Category:</span>
                  <span className="text-[var(--text-primary)] font-semibold">
                    {project.categoryLabel || (project.category === 'frontend' ? 'Frontend Craft' : 'MERN Stack Projects')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Timeline:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Author:</span>
                  <span className="text-[var(--text-primary)] font-semibold">{personalInfo.name}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="pt-12 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-indigo-500/40 transition-all group flex flex-col items-start"
          >
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1 mb-1">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Previous Project
            </span>
            <span className="font-bold text-base text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-indigo-500/40 transition-all group flex flex-col items-end text-right"
          >
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1 mb-1">
              Next Project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-bold text-base text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
