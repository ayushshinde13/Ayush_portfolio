import React from 'react';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Skills } from '@/components/skills/Skills';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Experience } from '@/components/experience/Experience';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { Contact } from '@/components/contact/Contact';

export default function HomePage() {
  return (
    <main className="relative flex flex-col gap-4 sm:gap-8 md:gap-16 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-[15%] left-[5%] w-[35rem] h-[35rem] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[45%] right-[5%] w-[40rem] h-[40rem] rounded-full bg-cyan-500/8 blur-[160px] pointer-events-none" />
      <div className="absolute top-[75%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-purple-500/8 blur-[150px] pointer-events-none" />

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

      {/* 6. Testimonials Section */}
      <Testimonials />

      {/* 7. Contact Section */}
      <Contact />
    </main>
  );
}
