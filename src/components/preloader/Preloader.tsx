'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { personalInfo } from '@/data/portfolio';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user already saw full preloader this session to keep dev & repeat visits fast
    const hasLoaded = sessionStorage.getItem('portfolio_preloader_seen');

    const duration = hasLoaded ? 0.8 : 1.8;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('portfolio_preloader_seen', 'true');
          // Exit curtain animation
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsDone(true);
              onComplete?.();
            },
          });
        },
      });

      // Stagger logo in
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.7)' }
      );

      // Counter animation
      tl.to(
        obj,
        {
          val: 100,
          duration: duration,
          ease: 'power2.inOut',
          onUpdate: () => {
            const current = Math.round(obj.val);
            setPercent(current);
            if (barRef.current) {
              barRef.current.style.width = `${current}%`;
            }
          },
        },
        '-=0.3'
      );

      // Fade out inner elements before sliding curtain up
      tl.to([logoRef.current, counterRef.current, barRef.current?.parentElement], {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: 'power2.in',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08090D] text-white select-none pointer-events-auto"
      aria-label="Loading portfolio"
    >
      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full px-8">
        {/* Glowing Monogram Logo */}
        <div ref={logoRef} className="relative flex items-center justify-center">
          <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-xl animate-pulse" />
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent border border-indigo-500/40 backdrop-blur-md shadow-2xl shadow-indigo-500/30">
            <span className="font-extrabold text-3xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              {personalInfo.initials}
            </span>
          </div>
        </div>

        {/* Counter Number */}
        <div ref={counterRef} className="flex flex-col items-center gap-1">
          <div className="text-4xl font-mono font-bold tracking-tight text-slate-100 tabular-nums">
            {percent.toString().padStart(2, '0')}%
          </div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
            Initializing Engine
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
