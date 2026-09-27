'use client';

import { useLayoutEffect, useEffect, useRef, RefObject } from 'react';
import { gsap, registerGsapPlugins } from '@/lib/gsap';

// Use useLayoutEffect in browser, useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGsapContext(
  animationCallback: (ctx: gsap.Context) => void,
  scope?: RefObject<HTMLElement | null>,
  dependencies: unknown[] = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsapPlugins();

    const targetScope = scope?.current || undefined;
    const ctx = gsap.context((self) => {
      animationCallback(self);
    }, targetScope);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return ctxRef;
}
