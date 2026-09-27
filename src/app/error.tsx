'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Portfolio Runtime Exception:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] text-center px-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--bg-card)] border border-red-500/30 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Execution Interrupted
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
            An unexpected error occurred during rendering. You can attempt to reset the component state.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          className="w-full"
          onClick={() => reset()}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Re-initialize View
        </Button>
      </div>
    </main>
  );
}
