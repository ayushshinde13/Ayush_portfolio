'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code2, Layers, FileDown, Eye } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AnimatedTagline } from './AnimatedTagline';
import { ProtectorOrbit } from './ProtectorOrbit';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';
import { useLenis } from '@/providers/lenis-provider';
import { useResume } from '@/context/ResumeContext';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useLenis();
  const { openResume } = useResume();

  // Interactive mouse parallax on background
  useEffect(() => {
    if (prefersReducedMotion) return;
    const heroEl = containerRef.current;
    if (!heroEl) return;

    const xSetter = gsap.quickTo('.hero-bg-interactive', 'x', { duration: 0.6, ease: 'power2.out' });
    const ySetter = gsap.quickTo('.hero-bg-interactive', 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      xSetter(xPercent * -20);
      ySetter(yPercent * -16);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  useGsapContext(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Stagger badge
      tl.fromTo(
        '.hero-pill',
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.2 }
      );

      // Stagger words in the title
      tl.fromTo(
        '.hero-word',
        { y: 60, opacity: 0, rotateX: 30 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.9 },
        '-=0.4'
      );

      // Advanced kinetic subtitle token reveal with spring & blur-to-focus
      tl.fromTo(
        '.subtitle-token',
        { y: 22, opacity: 0, filter: 'blur(6px)', scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'back.out(1.5)',
        },
        '-=0.45'
      );

      // CTAs reveal
      tl.fromTo(
        '.hero-cta-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        '-=0.5'
      );

      // Floating metric cards
      tl.fromTo(
        '.hero-metric-card',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.4'
      );

      // Right-side visual artwork entrance
      tl.fromTo(
        '.hero-visual-card',
        { opacity: 0, scale: 0.92, x: 35 },
        { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      );

      // Smooth scroll parallax on Background.png
      gsap.to('.hero-bg-parallax', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Parallax effect on floating orbs
      gsap.to('.hero-glow-orb-1', {
        yPercent: -40,
        xPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-glow-orb-2', {
        yPercent: -60,
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    },
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[auto] lg:min-h-screen w-full flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 xl:px-16 overflow-hidden bg-[#08090d]"
      aria-label="Introduction"
    >
      {/* Background Parallax Ambient Glow Orbs */}
      <div className="hero-glow-orb-1 absolute top-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />
      <div className="hero-glow-orb-2 absolute bottom-1/4 right-10 w-[28rem] h-[28rem] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

      {/* Dynamic Ambient Light Sweep Flare */}
      <div className="hero-light-sweep absolute -inset-1/2 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/8 to-transparent blur-3xl pointer-events-none" />

      {/* Top & Bottom seamless edge fades */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#08090d] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#08090d] to-transparent pointer-events-none z-10" />

      {/* Main Hero 2-Column Grid: Left (Text & CTAs) | Right (Workspace PNG Artwork) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
        {/* LEFT COLUMN: Text, Tagline, CTAs, and Badges */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Availability Pill */}
          <div className="hero-pill mb-3 sm:mb-4">
            <Badge variant="pulse" pulseColor="bg-emerald-400" className="px-3.5 py-1 text-xs sm:text-sm">
              <span>{personalInfo.availabilityText}</span>
            </Badge>
          </div>

          {/* Large Split-style Headline */}
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12] mb-3.5 sm:mb-4 text-left"
          >
            <span className="block overflow-hidden pb-1.5 pt-1">
              <span className="hero-word inline-block text-[var(--text-primary)] drop-shadow-md pb-1">Engineering</span>{' '}
              <span className="hero-word inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-md pb-1">
                Fluid
              </span>
            </span>
            <span className="block overflow-hidden pb-1.5 pt-1">
              <span className="hero-word inline-block text-[var(--text-primary)] drop-shadow-md pb-1">Digital</span>{' '}
              <span className="hero-word inline-block text-[var(--text-secondary)] drop-shadow-md pb-1">Realities.</span>
            </span>
          </h1>

          {/* Subtitle in Crisp Pure White Color */}
          <p
            ref={subtitleRef}
            className="max-w-2xl text-sm sm:text-base md:text-[17px] text-white mb-3 sm:mb-4 leading-relaxed font-normal text-left bg-transparent"
          >
            <span className="subtitle-token inline-block text-white font-medium">I am</span>{' '}
            <strong className="subtitle-token inline-block font-extrabold text-white">
              {personalInfo.name}
            </strong>
            <span className="subtitle-token inline-block text-white font-medium">, a</span>{' '}
            <span className="subtitle-token inline-block font-extrabold text-white">
              Frontend Developer &amp; MERN Stack Developer
            </span>
            <span className="subtitle-token inline-block text-white font-medium">.</span>{' '}
            <span className="subtitle-token inline-block text-white font-medium">
              Specializing in building
            </span>{' '}
            <span className="subtitle-token inline-block font-bold text-white">
              lightning-fast web architectures,
            </span>{' '}
            <span className="subtitle-token inline-block font-bold text-white">
              living motion design,
            </span>{' '}
            <span className="subtitle-token inline-block text-white font-medium">and</span>{' '}
            <span className="subtitle-token inline-block font-bold text-white">
              high-throughput systems
            </span>
            <span className="subtitle-token inline-block text-white font-medium">.</span>
          </p>

          {/* Animated Philosophical Tagline: IMPOSSIBLE -> I'M POSSIBLE */}
          <AnimatedTagline align="left" className="my-2 sm:my-3" />

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="hero-cta-btn">
              <Button
                size="md"
                variant="glow"
                onClick={() => scrollTo('#projects')}
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base"
              >
                Explore Selected Work
              </Button>
            </div>
            <div className="hero-cta-btn flex items-center gap-2">
              <Button
                size="md"
                variant="secondary"
                onClick={openResume}
                rightIcon={<Eye className="w-4 h-4 text-indigo-400" />}
                className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base cursor-pointer"
              >
                View Resume
              </Button>
              <a
                href="/resume.pdf"
                download="Ayush_Kumar_Shinde_Resume.pdf"
                title="Download Official Resume (PDF)"
                aria-label="Download Official Resume (PDF)"
                className="p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              >
                <FileDown className="w-4.5 h-4.5 text-indigo-400" />
              </a>
            </div>
          </div>

          {/* Interactive Floating Metric Badges */}
          <div
            ref={badgesRef}
            className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full max-w-md"
          >
            {personalInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="hero-metric-card p-2.5 sm:p-3.5 rounded-2xl bg-[#0d121f]/80 border border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40 flex flex-col items-center justify-center text-center"
              >
                <span className="text-lg sm:text-2xl font-extrabold text-white tracking-tight font-mono">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Protractor (प्रोटेक्टर) Tech Orbit Animation */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full mt-6 lg:mt-0">
          <div className="hero-visual-card relative w-full flex items-center justify-center">
            {/* Ambient Backlight Glow behind the visual */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/25 to-purple-600/20 rounded-full blur-[80px] -z-10 pointer-events-none transform scale-90" />

            {/* Subtle decorative glow ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent blur-xl pointer-events-none" />

            {/* Artwork Container with interactive mouse parallax & scroll parallax */}
            <div className="hero-bg-parallax relative flex items-center justify-center">
              <div className="hero-bg-interactive relative flex items-center justify-center">
                <ProtectorOrbit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
