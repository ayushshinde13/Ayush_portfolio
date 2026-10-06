'use client';

import React from 'react';

type SkillIconType =
  | 'html5'
  | 'react'
  | 'typescript'
  | 'cpp'
  | 'tailwind'
  | 'vite'
  | 'motion'
  | 'nodejs'
  | 'mongodb'
  | 'jwt'
  | 'streamlit'
  | 'socketio'
  | 'sql'
  | 'python'
  | 'git'
  | 'postman'
  | 'ai'
  | 'cs'
  | 'default';

function getSkillIconType(rawName: string): SkillIconType {
  const name = rawName.trim().toLowerCase();

  // 1. Exact full-name matches for portfolio data
  if (name === 'html5 semantic & a11y') return 'html5';
  if (name === 'react.js & next.js') return 'react';
  if (name === 'typescript & javascript (es6+)') return 'typescript';
  if (name === 'c & c++') return 'cpp';
  if (name === 'tailwind css & modern css') return 'tailwind';
  if (name === 'vite & frontend tooling') return 'vite';
  if (name === 'framer motion & gsap') return 'motion';
  if (name === 'node.js & express.js') return 'nodejs';
  if (name === 'mongodb & mongoose') return 'mongodb';
  if (name === 'jwt & authentication') return 'jwt';
  if (name === 'streamlit & flask') return 'streamlit';
  if (name === 'socket.io & websockets') return 'socketio';
  if (name === 'sql & relational dbs') return 'sql';
  if (name === 'python') return 'python';
  if (name === 'git & github') return 'git';
  if (name === 'postman & api testing') return 'postman';
  if (name === 'ai engineering tools') return 'ai';
  if (name === 'cs fundamentals (dsa/oop)') return 'cs';

  // 2. Keyword fallbacks
  if (name.includes('html') || name.includes('a11y')) return 'html5';
  if (name.includes('react') || name.includes('next')) return 'react';
  if (name.includes('typescript') || name.includes('javascript') || name.includes('es6')) return 'typescript';
  if (name.includes('c++') || name.startsWith('c &') || name.includes('c / c++')) return 'cpp';
  if (name.includes('tailwind') || name.includes('css')) return 'tailwind';
  if (name.includes('vite') || name.includes('tooling')) return 'vite';
  if (name.includes('framer') || name.includes('gsap') || name.includes('motion')) return 'motion';
  if (name.includes('node') || name.includes('express')) return 'nodejs';
  if (name.includes('mongo') || name.includes('mongoose')) return 'mongodb';
  if (name.includes('jwt') || name.includes('auth')) return 'jwt';
  if (name.includes('streamlit') || name.includes('flask')) return 'streamlit';
  if (name.includes('socket') || name.includes('websocket')) return 'socketio';
  if (name.includes('sql') || name.includes('relational') || name.includes('database')) return 'sql';
  if (name.includes('python')) return 'python';
  if (name.includes('git') || name.includes('github')) return 'git';
  if (name.includes('postman') || name.includes('api testing')) return 'postman';
  if (name.includes('ai') || name.includes('claude') || name.includes('copilot') || name.includes('chatgpt')) return 'ai';
  if (name.includes('cs fundamentals') || name.includes('dsa') || name.includes('oop')) return 'cs';

  return 'default';
}

interface SkillIconBadgeProps {
  name: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function SkillIconBadge({ name, size = 'sm', className = '' }: SkillIconBadgeProps) {
  const iconType = getSkillIconType(name);
  const containerSizes = size === 'sm' ? 'w-8 h-8 rounded-lg' : 'w-9 h-9 rounded-xl';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';

  switch (iconType) {
    case 'html5':
      return (
        <div className={`${containerSizes} bg-[#E34F26]/10 border border-[#E34F26]/30 flex items-center justify-center text-[#E34F26] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-[#E34F26]`}>
            <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 5.2H8.3l.2 2.4h8.5l-.6 6.5-4.4 1.2-4.4-1.2-.3-3.2h2.2l.2 1.6 2.3.6 2.3-.6.2-2.7H6l-.6-6.8h12.2l-.2 2.2z" />
          </svg>
        </div>
      );

    case 'react':
      return (
        <div className={`${containerSizes} bg-[#61DAFB]/10 border border-[#61DAFB]/30 flex items-center justify-center text-[#61DAFB] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-[#61DAFB] stroke-[1.8]`}>
            <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
            <ellipse cx="12" cy="12" rx="9" ry="3.6" />
            <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
          </svg>
        </div>
      );

    case 'typescript':
      return (
        <div className={`${containerSizes} bg-[#3178C6]/10 border border-[#3178C6]/30 flex items-center justify-center text-[#3178C6] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize}`}>
            <rect width="24" height="24" rx="4" fill="#3178C6" />
            <path d="M11.5 8.5H6.5V10.5H8V18.5H10V10.5H11.5V8.5Z" fill="white" />
            <path d="M14.5 15.5C15 16.2 15.8 16.7 16.8 16.7C17.7 16.7 18.3 16.3 18.3 15.6C18.3 14.8 17.5 14.4 16.3 13.9C14.7 13.2 13.4 12.3 13.4 10.6C13.4 9 14.7 7.8 16.6 7.8C18 7.8 19.1 8.4 19.8 9.5L18.2 10.7C17.7 10 17.2 9.7 16.5 9.7C15.8 9.7 15.3 10.1 15.3 10.6C15.3 11.2 15.9 11.5 17 12C18.8 12.7 20.2 13.6 20.2 15.4C20.2 17.2 18.7 18.5 16.6 18.5C15 18.5 13.6 17.7 12.8 16.5L14.5 15.5Z" fill="white" />
          </svg>
        </div>
      );

    case 'cpp':
      return (
        <div className={`${containerSizes} bg-[#00599C]/10 border border-[#00599C]/30 flex items-center justify-center text-[#00599C] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize}`}>
            <rect width="24" height="24" rx="4" fill="#00599C" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="900" fontFamily="sans-serif">C++</text>
          </svg>
        </div>
      );

    case 'tailwind':
      return (
        <div className={`${containerSizes} bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-[#06B6D4]`}>
            <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.9-2.3 4.7-1.7 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3.1 6.6 3.1 3.3 0 5.3-1.7 6-5-1.3 1.7-2.9 2.3-4.7 1.7-1.1-.3-1.8-1.1-2.7-2C17.2 7.7 15.6 6 12 6zM6 13c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.9-2.3 4.7-1.7 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3.1 6.6 3.1 3.3 0 5.3-1.7 6-5-1.3 1.7-2.9 2.3-4.7 1.7-1.1-.3-1.8-1.1-2.7-2C11.2 14.7 9.6 13 6 13z" />
          </svg>
        </div>
      );

    case 'vite':
      return (
        <div className={`${containerSizes} bg-[#BD34FE]/10 border border-[#BD34FE]/30 flex items-center justify-center text-[#BD34FE] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize}`}>
            <path d="M21.5 4.3L12.7 20.9c-.3.6-1.1.6-1.4 0L2.5 4.3c-.4-.7.1-1.5.9-1.5h17.2c.8 0 1.3.8.9 1.5z" fill="#BD34FE" />
            <path d="M14.6 3.5L9.1 13.9l2.8-.5-1.9 4.6 5.5-8.8-2.9.4 2-6.1z" fill="#FFD62E" />
          </svg>
        </div>
      );

    case 'motion':
      return (
        <div className={`${containerSizes} bg-[#0055FF]/10 dark:bg-[#00E699]/10 border border-[#0055FF]/30 dark:border-[#00E699]/30 flex items-center justify-center text-[#0055FF] dark:text-[#00E699] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-current`}>
            <path d="M4 2h16v8h-8zM4 10h8l8 8H4zM4 18h8v4L4 18z" />
          </svg>
        </div>
      );

    case 'nodejs':
      return (
        <div className={`${containerSizes} bg-[#339933]/10 border border-[#339933]/30 flex items-center justify-center text-[#339933] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize}`} fill="none" stroke="#339933" strokeWidth="2.2">
            <path d="M12 2l8.5 4.9v9.8L12 21.5 3.5 16.7V6.9L12 2z" />
            <path d="M12 6.5v11M7 9.5l10 5.5M17 9.5l-10 5.5" strokeWidth="1.8" />
          </svg>
        </div>
      );

    case 'mongodb':
      return (
        <div className={`${containerSizes} bg-[#10AA50]/10 border border-[#10AA50]/30 flex items-center justify-center text-[#10AA50] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-[#10AA50]`}>
            <path d="M12 1.5C11.5 2.8 8.8 8.1 8.8 12.3c0 3.3 2.1 6.2 3.2 7.7 1.1-1.5 3.2-4.4 3.2-7.7 0-4.2-2.7-9.5-3.2-10.8zm0 18.2c-.2 0-.4 1.8-.4 2.8h.8c0-1-.2-2.8-.4-2.8z" />
          </svg>
        </div>
      );

    case 'jwt':
      return (
        <div className={`${containerSizes} bg-[#FB015B]/10 border border-[#FB015B]/30 flex items-center justify-center text-[#FB015B] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-[#FB015B] stroke-2`}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <circle cx="12" cy="11" r="2.5" />
            <path d="M12 13.5v3.5" />
          </svg>
        </div>
      );

    case 'streamlit':
      return (
        <div className={`${containerSizes} bg-[#FF4B4B]/10 border border-[#FF4B4B]/30 flex items-center justify-center text-[#FF4B4B] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-[#FF4B4B]`}>
            <path d="M17.8 7.3L13.2 2.7c-.7-.7-1.8-.7-2.5 0L6.2 7.3c-.7.7-.7 1.8 0 2.5l4.5 4.5c.7.7 1.8.7 2.5 0l4.6-4.5c.7-.7.7-1.8 0-2.5zM3 15.5l3.5-3.5 3.5 3.5L6.5 19 3 15.5zm11 0l3.5-3.5 3.5 3.5-3.5 3.5-3.5-3.5z" />
          </svg>
        </div>
      );

    case 'socketio':
      return (
        <div className={`${containerSizes} bg-[#25C2A0]/10 border border-[#25C2A0]/30 flex items-center justify-center text-[#25C2A0] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-current`}>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5l-4-5h3V6.5l4 5h-3z" />
          </svg>
        </div>
      );

    case 'sql':
      return (
        <div className={`${containerSizes} bg-[#336791]/10 border border-[#336791]/30 flex items-center justify-center text-[#336791] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-[#336791] stroke-2`}>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        </div>
      );

    case 'python':
      return (
        <div className={`${containerSizes} bg-[#3776AB]/10 border border-[#3776AB]/30 flex items-center justify-center text-[#3776AB] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize}`}>
            <path d="M11.9 2c-3.2 0-3 .7-3 2.1v2.1h6.2v.7H6.6C5.2 6.9 4 8 4 10.1c0 2.2 1.2 3.1 2.6 3.1h1.5v-2.1c0-1.4 1.2-2.6 2.6-2.6h4.3c1.2 0 2.1-.9 2.1-2.1V4.2c0-1.4-1.3-2.2-5.2-2.2zm-1.7 1.5c.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7.1-.4.4-.7.7-.7z" fill="#3776AB" />
            <path d="M12.1 22c3.2 0 3-.7 3-2.1v-2.1H8.9v-.7h8.5c1.4 0 2.6-1.1 2.6-3.2 0-2.2-1.2-3.1-2.6-3.1h-1.5v2.1c0 1.4-1.2 2.6-2.6 2.6H9c-1.2 0-2.1.9-2.1 2.1v2.3c0 1.4 1.3 2.2 5.2 2.2zm1.7-1.5c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z" fill="#FFD43B" />
          </svg>
        </div>
      );

    case 'git':
      return (
        <div className={`${containerSizes} bg-[#F05032]/10 border border-[#F05032]/30 flex items-center justify-center text-[#F05032] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-[#F05032]`}>
            <path d="M21.7 10.9L13.1 2.3c-.4-.4-1-.4-1.4 0L10.3 3.7l2.8 2.8c.4-.1.9 0 1.2.3.4.4.5 1 .3 1.5l2.7 2.7c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.5-2.5v5.4c.2.1.4.3.5.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.7-.5V9.4c-.3-.1-.5-.3-.7-.5-.4-.4-.5-1-.3-1.5L9 4.6 2.3 11.3c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l9.4-9.4c.4-.4.4-1 0-1.4z" />
          </svg>
        </div>
      );

    case 'postman':
      return (
        <div className={`${containerSizes} bg-[#FF6C37]/10 border border-[#FF6C37]/30 flex items-center justify-center text-[#FF6C37] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-[#FF6C37]`}>
            <circle cx="12" cy="12" r="10" />
            <path d="M7.5 12l3.5-3.5v2.5h5.5v2h-5.5v2.5L7.5 12z" fill="white" />
          </svg>
        </div>
      );

    case 'ai':
      return (
        <div className={`${containerSizes} bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-[#A855F7] stroke-2`}>
            <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" fill="#A855F7" fillOpacity="0.25" />
            <path d="M19 17l1 2.5L22.5 20.5 20 21.5 19 24l-1-2.5-2.5-1 2.5-1 1-2.5z" />
          </svg>
        </div>
      );

    case 'cs':
      return (
        <div className={`${containerSizes} bg-[#6366F1]/10 border border-[#6366F1]/30 flex items-center justify-center text-[#6366F1] group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-[#6366F1] stroke-2`}>
            <rect x="2" y="3" width="6" height="6" rx="1.5" />
            <rect x="16" y="3" width="6" height="6" rx="1.5" />
            <rect x="9" y="15" width="6" height="6" rx="1.5" />
            <path d="M5 9v3a2 2 0 0 0 2 2h5m7-5v3a2 2 0 0 1-2 2h-5m0 0v1" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`${containerSizes} bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-currentColor stroke-2`}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
      );
  }
}
