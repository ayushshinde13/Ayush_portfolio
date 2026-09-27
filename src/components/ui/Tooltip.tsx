'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function Tooltip({
  text,
  children,
  position = 'top',
}: {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute left-1/2 -translate-x-1/2 z-50 px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-md shadow-lg backdrop-blur-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150',
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}
