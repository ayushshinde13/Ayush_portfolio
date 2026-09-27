import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'pulse' | 'glow';
  pulseColor?: string;
}

export function Badge({
  className,
  variant = 'default',
  pulseColor = 'bg-emerald-400',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20',
    outline: 'bg-transparent text-slate-700 border border-slate-300 dark:text-slate-400 dark:border-slate-700/80',
    pulse: 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    glow: 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm shadow-indigo-500/10 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/40 dark:shadow-indigo-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {variant === 'pulse' && (
        <span className="relative flex h-2 w-2">
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', pulseColor)} />
          <span className={cn('relative inline-flex rounded-full h-2 w-2', pulseColor)} />
        </span>
      )}
      {children}
    </span>
  );
}
