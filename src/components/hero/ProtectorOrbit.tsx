'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OrbitIconData {
  id: string;
  name: string;
  category: string;
  color: string;
  glow: string;
  svg: React.ReactNode;
}

// Crisp SVGs replicating the exact tech logos in the user's screenshot with enlarged dimensions
const OUTER_ICONS: OrbitIconData[] = [
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'NoSQL Database',
    color: '#10AA50',
    glow: 'rgba(16, 170, 80, 0.65)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-current" style={{ color: '#10AA50' }}>
        <path d="M12 1.5C11.5 2.8 8.8 8.1 8.8 12.3c0 3.3 2.1 6.2 3.2 7.7 1.1-1.5 3.2-4.4 3.2-7.7 0-4.2-2.7-9.5-3.2-10.8zm0 18.2c-.2 0-.4 1.8-.4 2.8h.8c0-1-.2-2.8-.4-2.8z" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Framework',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.45)',
    svg: (
      <span className="font-mono font-black text-sm sm:text-base text-white tracking-tighter">ex</span>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'JavaScript Runtime',
    color: '#339933',
    glow: 'rgba(51, 153, 51, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="#5FA04E" strokeWidth="2.2">
        <path d="M12 2l8.5 4.9v9.8L12 21.5 3.5 16.7V6.9L12 2z" />
        <path d="M12 6.5v11M7 9.5l10 5.5M17 9.5l-10 5.5" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Version Control',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.55)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git',
    category: 'VCS Engine',
    color: '#F05032',
    glow: 'rgba(240, 80, 50, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-[#F05032]">
        <path d="M21.7 10.9L13.1 2.3c-.4-.4-1-.4-1.4 0L10.3 3.7l2.8 2.8c.4-.1.9 0 1.2.3.4.4.5 1 .3 1.5l2.7 2.7c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.5-2.5v5.4c.2.1.4.3.5.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.7-.5V9.4c-.3-.1-.5-.3-.7-.5-.4-.4-.5-1-.3-1.5L9 4.6 2.3 11.3c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l9.4-9.4c.4-.4.4-1 0-1.4z" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'UI Library',
    color: '#61DAFB',
    glow: 'rgba(97, 218, 251, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-none stroke-[#61DAFB] stroke-[1.6]">
        <circle cx="12" cy="12" r="2.4" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Fullstack Framework',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.55)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 14.5l-4.7-6.2v6.2H9.5V7.5h1.7l4.7 6.3V7.5h1.6v9z" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Styling Engine',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-[#06B6D4]">
        <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.9-2.3 4.7-1.7 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3.1 6.6 3.1 3.3 0 5.3-1.7 6-5-1.3 1.7-2.9 2.3-4.7 1.7-1.1-.3-1.8-1.1-2.7-2C17.2 7.7 15.6 6 12 6zM6 13c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.9-2.3 4.7-1.7 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3.1 6.6 3.1 3.3 0 5.3-1.7 6-5-1.3 1.7-2.9 2.3-4.7 1.7-1.1-.3-1.8-1.1-2.7-2C11.2 14.7 9.6 13 6 13z" />
      </svg>
    ),
  },
];

const INNER_ICONS: OrbitIconData[] = [
  {
    id: 'c',
    name: 'C Language',
    category: 'Core Language',
    color: '#00599C',
    glow: 'rgba(0, 89, 156, 0.7)',
    svg: (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#00599C] flex items-center justify-center text-white font-black text-xs sm:text-sm">
        C
      </div>
    ),
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'OOP & DSA',
    color: '#004482',
    glow: 'rgba(0, 68, 130, 0.7)',
    svg: (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#004482] flex items-center justify-center text-white font-black text-[10px] sm:text-xs">
        C++
      </div>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & Data',
    color: '#3776AB',
    glow: 'rgba(55, 118, 171, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M11.9 2c-3.2 0-3 .7-3 2.1v2.1h6.2v.7H6.6C5.2 6.9 4 8 4 10.1c0 2.2 1.2 3.1 2.6 3.1h1.5v-2.1c0-1.4 1.2-2.6 2.6-2.6h4.3c1.2 0 2.1-.9 2.1-2.1V4.2c0-1.4-1.3-2.2-5.2-2.2zm-1.7 1.5c.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7.1-.4.4-.7.7-.7z" fill="#3776AB" />
        <path d="M12.1 22c3.2 0 3-.7 3-2.1v-2.1H8.9v-.7h8.5c1.4 0 2.6-1.1 2.6-3.2 0-2.2-1.2-3.1-2.6-3.1h-1.5v2.1c0 1.4-1.2 2.6-2.6 2.6H9c-1.2 0-2.1.9-2.1 2.1v2.3c0 1.4 1.3 2.2 5.2 2.2zm1.7-1.5c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Semantic Markup',
    color: '#E34F26',
    glow: 'rgba(227, 79, 38, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#E34F26]">
        <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 5.2H8.3l.2 2.4h8.5l-.6 6.5-4.4 1.2-4.4-1.2-.3-3.2h2.2l.2 1.6 2.3.6 2.3-.6.2-2.7H6l-.6-6.8h12.2l-.2 2.2z" />
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Responsive Styling',
    color: '#1572B6',
    glow: 'rgba(21, 114, 182, 0.7)',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1572B6]">
        <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 5.2l-.2 2.4H8.5l.2 2.4h8.3l-.6 6.5-4.4 1.2-4.4-1.2-.3-3.2h2.2l.2 1.6 2.3.6 2.3-.6.2-2.7H6.3L5.7 4.8h12.2l-.5 2.4z" />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'ES6+ Logic',
    color: '#F7DF1E',
    glow: 'rgba(247, 223, 30, 0.7)',
    svg: (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#F7DF1E] flex items-center justify-center text-black font-extrabold text-[10px] sm:text-xs leading-none">
        JS
      </div>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Typed Systems',
    color: '#3178C6',
    glow: 'rgba(49, 120, 198, 0.7)',
    svg: (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#3178C6] flex items-center justify-center text-white font-extrabold text-[10px] sm:text-xs leading-none">
        TS
      </div>
    ),
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'API Testing',
    color: '#FF6C37',
    glow: 'rgba(255, 108, 55, 0.7)',
    svg: (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF6C37] flex items-center justify-center text-white font-black text-[9px] sm:text-[10px]">
        POST
      </div>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design & Visuals',
    color: '#00C4CC',
    glow: 'rgba(0, 196, 204, 0.75)',
    svg: (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#00C4CC] via-[#00b4d8] to-[#7D2AE8] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.89 13.91c-1.28 1.4-3.15 1.76-4.91 1.41-1.74-.35-3.08-1.71-3.61-3.37-.58-1.81-.31-3.83.69-5.41.97-1.53 2.59-2.52 4.41-2.57 1.44-.04 2.87.52 3.84 1.57.38.41.34 1.05-.07 1.43-.4.37-1.02.35-1.41-.07-.64-.69-1.58-1.05-2.53-1.02-1.26.04-2.38.74-3.04 1.82-.71 1.15-.89 2.62-.48 3.92.38 1.19 1.34 2.15 2.56 2.39 1.25.25 2.58-.02 3.52-1.05.38-.41 1.02-.45 1.43-.07.41.39.44 1.03.07 1.44z" />
        </svg>
      </div>
    ),
  },
];

export function ProtectorOrbit() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Geometric radii in pixels for outer and inner orbit tracks (scaled for larger badges)
  const CENTER = 260;
  const OUTER_RADIUS = 212;
  const INNER_RADIUS = 132;

  return (
    <div
      className="relative w-[390px] h-[390px] sm:w-[470px] sm:h-[470px] xl:w-[520px] xl:h-[520px] flex items-center justify-center select-none"
      aria-label="Interactive Protractor Tech Radar"
    >
      {/* Background Ambient Radiance */}
      <div className="absolute inset-0 bg-radial from-cyan-500/18 via-indigo-600/12 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* SVG Protractor (प्रोटेक्टर) Geometry: Degree ticks, angle rays, concentric rings */}
      <svg
        viewBox="0 0 520 520"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <radialGradient id="protractorAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r="255" fill="url(#protractorAura)" />

        {/* Outer protractor boundary track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.4"
          strokeDasharray="5 7"
          strokeOpacity="0.4"
        />

        {/* Inner protractor boundary track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          fill="none"
          stroke="#818cf8"
          strokeWidth="1.4"
          strokeDasharray="4 6"
          strokeOpacity="0.35"
        />

        {/* Innermost core boundary track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="70"
          fill="none"
          stroke="#c084fc"
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />

        {/* Protractor Radial Angle Ticks (0° to 360° every 15 degrees) */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const isMajor = i % 3 === 0;
          const rInner = isMajor ? OUTER_RADIUS - 14 : OUTER_RADIUS - 7;
          const rOuter = OUTER_RADIUS + 5;
          const x1 = Number((CENTER + rInner * Math.cos(angle)).toFixed(2));
          const y1 = Number((CENTER + rInner * Math.sin(angle)).toFixed(2));
          const x2 = Number((CENTER + rOuter * Math.cos(angle)).toFixed(2));
          const y2 = Number((CENTER + rOuter * Math.sin(angle)).toFixed(2));

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isMajor ? '#38bdf8' : '#818cf8'}
              strokeWidth={isMajor ? 1.6 : 0.9}
              strokeOpacity={isMajor ? 0.55 : 0.28}
            />
          );
        })}

        {/* Protractor Crosshairs */}
        <line x1={CENTER} y1="36" x2={CENTER} y2="484" stroke="#818cf8" strokeWidth="0.9" strokeDasharray="4 8" strokeOpacity="0.22" />
        <line x1="36" y1={CENTER} x2="484" y2={CENTER} stroke="#38bdf8" strokeWidth="0.9" strokeDasharray="4 8" strokeOpacity="0.22" />
      </svg>

      {/* Central Hub: Crisp Developer Workspace / Laptop with glowing aura */}
      <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 xl:w-34 xl:h-34 rounded-full p-1.5 bg-gradient-to-tr from-cyan-500/40 via-indigo-500/35 to-purple-500/40 border border-white/25 shadow-[0_0_35px_rgba(56,189,248,0.4)] flex items-center justify-center overflow-hidden backdrop-blur-md">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0a0d16] flex items-center justify-center">
          <Image
            src="/images/projects/Background.png"
            alt="Ayush Workspace Core"
            fill
            sizes="160px"
            className="object-cover object-center filter brightness-110 contrast-110 scale-125"
          />
          {/* Subtle neon core overlay badge */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#08090d]/30 to-[#08090d]/80 pointer-events-none" />
          <div className="absolute bottom-1 px-2.5 py-0.5 rounded-full bg-black/80 border border-cyan-400/50 text-[9px] font-mono font-bold text-cyan-300 tracking-wider">
            AKS.CORE
          </div>
        </div>
      </div>

      {/* OUTER ORBIT RING (Clockwise continuous rotation with ENLARGED ICONS) */}
      <div className="animate-orbit-outer absolute inset-0 flex items-center justify-center pointer-events-none">
        {OUTER_ICONS.map((icon, index) => {
          const total = OUTER_ICONS.length;
          const angle = (index / total) * 2 * Math.PI;
          const x = Number((OUTER_RADIUS * Math.cos(angle)).toFixed(2));
          const y = Number((OUTER_RADIUS * Math.sin(angle)).toFixed(2));

          return (
            <div
              key={icon.id}
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onMouseEnter={() => setActiveTooltip(icon.name)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Counter-rotation to keep icon upright */}
              <div className="animate-orbit-outer-icon relative group">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 xl:w-[60px] xl:h-[60px] rounded-full bg-gradient-to-b from-[#13192b]/95 to-[#090d18]/95 border-2 border-white/20 backdrop-blur-2xl flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-125 hover:border-cyan-400 cursor-pointer"
                  style={{
                    boxShadow: `0 0 20px ${icon.glow}`,
                  }}
                >
                  {icon.svg}
                </div>

                {/* Floating Tooltip */}
                {activeTooltip === icon.name && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-[#0a0f1d] border border-cyan-400/60 text-xs font-mono text-cyan-200 whitespace-nowrap shadow-2xl shadow-black z-50 animate-in fade-in zoom-in-95 duration-150">
                    <span className="font-bold">{icon.name}</span>
                    <span className="text-[10px] text-slate-400 block">{icon.category}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* INNER ORBIT RING (Counter-Clockwise continuous rotation with ENLARGED ICONS) */}
      <div className="animate-orbit-inner absolute inset-0 flex items-center justify-center pointer-events-none">
        {INNER_ICONS.map((icon, index) => {
          const total = INNER_ICONS.length;
          const angle = (index / total) * 2 * Math.PI;
          const x = Number((INNER_RADIUS * Math.cos(angle)).toFixed(2));
          const y = Number((INNER_RADIUS * Math.sin(angle)).toFixed(2));

          return (
            <div
              key={icon.id}
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onMouseEnter={() => setActiveTooltip(icon.name)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Counter-rotation to keep icon upright */}
              <div className="animate-orbit-inner-icon relative group">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-gradient-to-b from-[#13192b]/95 to-[#090d18]/95 border-2 border-white/20 backdrop-blur-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 hover:border-indigo-400 cursor-pointer"
                  style={{
                    boxShadow: `0 0 16px ${icon.glow}`,
                  }}
                >
                  {icon.svg}
                </div>

                {/* Floating Tooltip */}
                {activeTooltip === icon.name && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-[#0a0f1d] border border-indigo-400/60 text-xs font-mono text-indigo-200 whitespace-nowrap shadow-2xl shadow-black z-50 animate-in fade-in zoom-in-95 duration-150">
                    <span className="font-bold">{icon.name}</span>
                    <span className="text-[10px] text-slate-400 block">{icon.category}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
