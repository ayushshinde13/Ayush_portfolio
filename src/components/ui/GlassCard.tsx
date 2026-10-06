'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  spotlightColor?: string;
  glowOnHover?: boolean;
}

export function GlassCard({
  className,
  spotlight = true,
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
  glowOnHover = true,
  children,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 backdrop-blur-xl transition-all duration-300 overflow-hidden',
        glowOnHover && 'hover:border-indigo-500/30',
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
