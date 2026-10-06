'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useMagnetic } from '@/hooks/useMagneticCursor';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      magnetic = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const magneticRef = useMagnetic<HTMLButtonElement>(0.25);
    const combinedRef = (node: HTMLButtonElement | null) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;

      if (magnetic && magneticRef) {
        (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    const sizeStyles = {
      sm: 'px-3.5 py-1.5 text-xs font-medium rounded-lg gap-1.5',
      md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2',
      lg: 'px-7 py-3.5 text-base font-semibold rounded-2xl gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-white hover:bg-slate-200 text-slate-950 font-semibold border border-white active:scale-[0.98]',
      secondary:
        'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10 active:scale-[0.98]',
      outline:
        'bg-transparent hover:bg-white/10 text-slate-200 border border-white/20 hover:border-white/40 active:scale-[0.98]',
      ghost:
        'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
      glow:
        'bg-white hover:bg-slate-200 text-slate-950 font-semibold border border-white active:scale-[0.98]',
    };

    return (
      <button
        ref={combinedRef}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer',
          sizeStyles[size],
          variantStyles[variant],
          (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
