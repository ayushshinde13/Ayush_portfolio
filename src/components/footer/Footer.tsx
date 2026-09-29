'use client';

import React from 'react';
import { personalInfo } from '@/data/portfolio';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        {/* Logo, Borderless Social Icons & Copyright */}
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
      </div>
    </footer>
  );
}
