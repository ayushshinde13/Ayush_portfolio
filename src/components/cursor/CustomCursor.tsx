'use client';

import { useEffect } from 'react';

export function CustomCursor() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('custom-cursor-active');
    }
  }, []);

  return null;
}

