import React from 'react';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Skills } from '@/components/skills/Skills';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Experience } from '@/components/experience/Experience';

export default function HomePage() {
  return (
    <main className="relative flex flex-col gap-4 sm:gap-8 md:gap-16 overflow-hidden">

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Skills & Arsenal Section */}
      <Skills />

      {/* 4. Selected Projects Section */}
      <ProjectGrid />

      {/* 5. Experience Timeline Section */}
      <Experience />
    </main>
  );
}
