'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';
import { Sparkles, RefreshCw } from 'lucide-react';

interface AnimatedTaglineProps {
  align?: 'left' | 'center';
  className?: string;
}

export function AnimatedTagline({ align = 'left', className = '' }: AnimatedTaglineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apostropheRef = useRef<HTMLSpanElement>(null);
  const spacerRef = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [animationCycle, setAnimationCycle] = useState(0);

  const runMetamorphosis = useCallback(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Reset state for metamorphosis sequence
      gsap.set(spacerRef.current, { width: 0 });
      gsap.set(apostropheRef.current, { width: 0, opacity: 0, scale: 0 });
      gsap.set('.tagline-char', { y: 25, opacity: 0, scale: 0.95 });
      gsap.set('.tagline-subhead-line', { opacity: 0, y: 15 });

      // Step 1: Stagger in characters as "IMPOSSIBLE"
      tl.to('.tagline-char', {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        duration: 0.6,
        ease: 'back.out(1.4)',
      });

      // Step 2: Dramatic pause holding "IMPOSSIBLE"
      tl.to({}, { duration: 0.7 });

      // Step 3: Reveal "I'M POSSIBLE" with elastic spacing expansion
      tl.to(
        spacerRef.current,
        {
          width: 'clamp(10px, 2.5vw, 24px)',
          duration: 0.65,
          ease: 'elastic.out(1, 0.75)',
        },
        'reveal'
      );

      // Pop in the glowing apostrophe
      tl.to(
        apostropheRef.current,
        {
          width: 'auto',
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2.2)',
        },
        'reveal+=0.08'
      );

      // Stagger in the philosophical subhead lines
      tl.to(
        '.tagline-subhead-line',
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useGsapContext(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.tagline-char', { opacity: 1, y: 0, scale: 1 });
        gsap.set(apostropheRef.current, { opacity: 1, scale: 1, width: 'auto' });
        gsap.set(spacerRef.current, { width: 'clamp(10px, 2vw, 24px)' });
        gsap.set('.tagline-subhead-line', { opacity: 1, y: 0 });
        return;
      }

      // Initial kickoff with slight delay to sync cleanly after preloader
      const timer = setTimeout(() => {
        runMetamorphosis();
      }, 1000);

      return () => clearTimeout(timer);
    },
    containerRef,
    [prefersReducedMotion, runMetamorphosis, animationCycle]
  );

  // Auto-replay every 14 seconds so the hero remains dynamic and captivating
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setAnimationCycle((prev) => prev + 1);
    }, 14000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleManualReplay = () => {
    setAnimationCycle((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleManualReplay}
      className={`relative my-5 sm:my-7 flex flex-col ${
        align === 'left' ? 'items-start text-left' : 'items-center text-center mx-auto'
      } max-w-2xl select-none cursor-pointer group ${className}`}
      aria-label="Philosophical Motto: I'M POSSIBLE"
      title="Click to replay animation"
    >
      {/* Main Tagline Container */}
      <div
        className={`relative z-10 flex items-center ${
          align === 'left' ? 'justify-start' : 'justify-center'
        } flex-wrap font-black tracking-tight leading-[1.1] text-[clamp(2.2rem,4.5vw,3.6rem)]`}
      >
        {/* "IM" group with solid indigo color */}
        <span className="tagline-im-group inline-flex items-center text-[#818cf8]">
          <span className="tagline-char inline-block will-change-transform">I</span>
          <span
            ref={apostropheRef}
            className="inline-block overflow-hidden text-cyan-300 will-change-transform"
            style={{
              width: prefersReducedMotion ? 'auto' : 0,
              opacity: prefersReducedMotion ? 1 : 0,
            }}
          >
            &apos;
          </span>
          <span className="tagline-char inline-block will-change-transform">M</span>
        </span>

        {/* Dynamic spacer that animates between IM and POSSIBLE */}
        <span
          ref={spacerRef}
          className="inline-block transition-all"
          style={{ width: prefersReducedMotion ? 'clamp(10px, 2vw, 24px)' : 0 }}
          aria-hidden="true"
        />

        {/* "POSSIBLE" group with vivid cyan color */}
        <span className="tagline-possible-group inline-flex items-center text-[#22d3ee]">
          {'POSSIBLE'.split('').map((char, index) => (
            <span
              key={index}
              className="tagline-char inline-block will-change-transform group-hover:text-cyan-300 transition-colors"
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* Two-Line Subhead with living motion and breathing floating animation */}
      <div
        ref={subheadRef}
        className={`relative z-10 mt-3 sm:mt-4 max-w-xl space-y-1 font-medium text-[clamp(0.85rem,1.8vw,1.05rem)] leading-relaxed gentle-breathe ${
          align === 'left' ? 'text-left' : 'text-center'
        }`}
      >
        <p className="tagline-subhead-line text-slate-100 font-semibold">
          Every &lsquo;<span className="text-indigo-400">impossible</span>&rsquo; is hiding a &lsquo;
          <span className="text-cyan-400 font-bold">possible</span>
          &rsquo; &mdash; waiting on belief.
        </p>
        <p className="tagline-subhead-line text-slate-300 font-normal">
          Believe in yourself first, and let the world follow.
        </p>
      </div>

      {/* Subtle Hint on Hover */}
      <div
        className={`relative z-10 mt-2 flex items-center gap-1.5 text-[10px] font-mono text-indigo-400/60 group-hover:text-cyan-400/90 transition-colors opacity-0 group-hover:opacity-100 ${
          align === 'left' ? 'justify-start' : 'justify-center'
        }`}
      >
        <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
        <span>Click to replay metamorphosis</span>
      </div>
    </div>
  );
}
