import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileDown, ExternalLink } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export const metadata = {
  title: `Resume | ${personalInfo.name}`,
  description: `Official resume and credentials of ${personalInfo.name}, ${personalInfo.title}.`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-3.5 bg-[#0d121f]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Portfolio</span>
          </Link>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white">{personalInfo.name}</h1>
            <p className="text-xs text-slate-400 font-mono">Official Resume</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Tab</span>
          </a>

          <a
            href="/resume.pdf"
            download="Ayush_Kumar_Shinde_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white hover:bg-slate-200 border border-white text-slate-950 text-xs font-semibold transition-all cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* Main Full-Height PDF Frame */}
      <main className="flex-1 w-full h-[calc(100vh-60px)] p-2 sm:p-4 max-w-6xl mx-auto flex flex-col">
        <div className="flex-1 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#161a24] shadow-2xl">
          <iframe
            src="/resume.pdf#view=FitH&toolbar=1"
            title={`${personalInfo.name} Resume`}
            className="w-full h-full border-0"
          />
        </div>
      </main>
    </div>
  );
}
