'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, ExternalLink, Eye } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { gsap } from '@/lib/gsap';

export interface ProjectCardProps {
  project: Project;
  onQuickView: (project: Project) => void;
}

export function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const liveUrl = project.liveUrl || project.links.live;
  const githubUrl = project.githubUrl || project.links.github;

  // 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Only apply tilt on fine pointer (desktop) devices
    if (window.matchMedia('(pointer: fine)').matches) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(cardRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor="project"
      className="project-card-wrapper relative rounded-2xl sm:rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col group will-change-transform h-full"
    >
      {/* Dynamic Mouse Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Visual Image Preview */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-950/60 border-b border-[var(--border-subtle)]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />

        {/* Floating Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <Badge
            variant={project.category === 'frontend' ? 'glow' : 'pulse'}
            pulseColor={project.category === 'frontend' ? 'bg-indigo-400' : 'bg-emerald-400'}
          >
            <span>{project.categoryLabel}</span>
          </Badge>
        </div>

        {/* Quick View Button on Image */}
        <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition-transform hover:scale-105"
            aria-label={`Quick view ${project.title}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Year Label */}
        <div className="absolute bottom-3 right-3 z-10 font-mono text-xs text-[var(--text-muted)] bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">
          {project.year}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <Link
            href={`/projects/${project.slug}`}
            className="block group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 transition-colors flex items-center justify-between gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-2">
            {project.summary || project.tagline}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {(project.stack || project.techStack).slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-[var(--border-subtle)] text-slate-700 dark:text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Live & GitHub Links + Case Study CTA */}
        <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
          {/* External Links */}
          <div className="flex items-center gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-400 dark:border-transparent font-semibold transition-colors"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="w-3 h-3" />
                <span>Live</span>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-[var(--text-secondary)] dark:border-transparent hover:text-[var(--text-primary)] font-semibold transition-colors"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <GithubIcon className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )}
          </div>

          {/* Dedicated Case Study Link */}
          <Link
            href={`/projects/${project.slug}`}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            Case Study &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
