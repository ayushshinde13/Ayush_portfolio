'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ResumeModal } from '@/components/resume/ResumeModal';
import { useLenis } from '@/providers/lenis-provider';

interface ResumeContextType {
  isOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const ResumeContext = createContext<ResumeContextType>({
  isOpen: false,
  openResume: () => {},
  closeResume: () => {},
});

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { lenis } = useLenis();

  const openResume = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeResume = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Pause Lenis when modal is open so wheel events inside modal work flawlessly
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeResume]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <ResumeContext.Provider value={{ isOpen, openResume, closeResume }}>
      {children}
      <ResumeModal isOpen={isOpen} onClose={closeResume} />
    </ResumeContext.Provider>
  );
}
