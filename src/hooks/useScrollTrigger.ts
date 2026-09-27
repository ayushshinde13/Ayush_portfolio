'use client';

import { useEffect } from 'react';
import { ScrollTrigger, registerGsapPlugins } from '@/lib/gsap';

export function useScrollTriggerRefresh(dependencies: unknown[] = []) {
  useEffect(() => {
    registerGsapPlugins();

    // Small delay to ensure DOM and styles have settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timeout);
  }, dependencies);
}
