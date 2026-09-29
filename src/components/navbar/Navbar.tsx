'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, FileDown, Eye } from 'lucide-react';
import { navLinks, personalInfo } from '@/data/portfolio';
import { useLenis } from '@/providers/lenis-provider';
import { useResume } from '@/context/ResumeContext';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo } = useLenis();
  const { openResume } = useResume();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 40);

      // Detect which section is currently active on the single page
      const sections = ['#about', '#skills', '#projects', '#experience'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(href);
    scrollTo(href);
  };


  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 max-w-6xl mx-auto`}
      >
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${isScrolled
              ? 'bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-xl shadow-black/10 backdrop-blur-xl'
              : 'bg-[var(--glass-bg)]/80 border-[var(--glass-border)]/60 backdrop-blur-lg'
            }`}
          aria-label="Main Navigation"
        >
          {/* Logo & Name with Availability Badge */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full"
              aria-label="Home"
            >
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/40 text-indigo-400 group-hover:scale-105 group-hover:border-indigo-400 transition-all duration-300 shadow-sm">
                <span className="font-black text-xs sm:text-sm tracking-tight bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                  {personalInfo.initials}
                </span>
              </div>
              <span className="font-bold text-xs sm:text-sm tracking-tight text-[var(--text-primary)] inline-block whitespace-nowrap">
                Er. {personalInfo.name}
              </span>
            </Link>

            {/* Availability status badge after name */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] sm:text-xs font-semibold select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>Available</span>
            </div>
          </div>

          {/* Desktop Nav Items Centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-all ${isActive
                      ? 'text-indigo-400 font-bold'
                      : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Area: View Resume & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={openResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all shadow-xs cursor-pointer group"
              title="View Resume in Portfolio"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-slate-300 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">{personalInfo.availabilityText}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openResume();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
