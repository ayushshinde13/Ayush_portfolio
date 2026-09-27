'use client';

import React from 'react';
import { LenisProvider } from './lenis-provider';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
