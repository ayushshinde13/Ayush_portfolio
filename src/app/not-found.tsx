import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] text-center px-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl backdrop-blur-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <span className="text-5xl font-extrabold font-mono text-indigo-400 tracking-tight">404</span>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-2">
            Coordinate Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
            The page or project case study you were seeking has drifted out of orbit or doesn&apos;t exist.
          </p>
        </div>

        <Link href="/" className="inline-block w-full">
          <Button variant="primary" size="md" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Safety
          </Button>
        </Link>
      </div>
    </main>
  );
}
