'use client';

import React from 'react';
import { personalInfo } from '@/data/portfolio';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { useLenis } from '@/providers/lenis-provider';

export function Footer() {
  const { scrollTo } = useLenis();

  const handleBackToTop = () => {
    scrollTo(0);
  };

  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Logo, Borderless Social Icons & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-black text-indigo-400 shadow-sm">
            {personalInfo.initials}
          </div>

          {/* Borderless Social Icons only */}
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-1.5 text-slate-400 hover:text-[#60a5fa] transition-all duration-200 cursor-pointer hover:scale-115"
            >
              <LinkedinIcon className="w-4.5 h-4.5" />
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-1.5 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer hover:scale-115"
            >
              <GithubIcon className="w-4.5 h-4.5" />
            </a>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-mono">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Right Side: Tech Stack credits & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-xs text-[var(--text-muted)] font-mono">
            Next.js &middot; GSAP &middot; Lenis &middot; Tailwind
          </span>

          <button
            type="button"
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-indigo-500/40 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer hover:-translate-y-0.5 shadow-xs"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
