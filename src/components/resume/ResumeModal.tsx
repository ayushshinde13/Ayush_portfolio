'use client';

import React, { useState } from 'react';
import { X, FileDown, ExternalLink, FileText, Check, Copy, Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'interactive'>('pdf');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ayush Kumar Shinde Resume Viewer"
      data-lenis-prevent
      className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
    >
      {/* Dimmed Blurred Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Main Modal Window */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl h-[92vh] sm:h-[90vh] bg-[#0c101b] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/10 flex flex-col overflow-hidden z-10"
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#090d16]/90 backdrop-blur-lg shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{personalInfo.name}</span>
                <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Official Resume
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Frontend Developer &amp; MERN Stack Developer
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PDF Document
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Summary View
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Ayush_Kumar_Shinde_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              title="Download Resume PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>New Tab</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Resume Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with explicit min-h-0 for reliable nested flex scrolling */}
        <div className="flex-1 min-h-0 w-full relative bg-[#07090e] overflow-hidden flex flex-col">
          {activeTab === 'pdf' ? (
            <div data-lenis-prevent className="flex-1 min-h-0 w-full h-full flex flex-col">
              {/* PDF Embed / Iframe */}
              <iframe
                src="/resume.pdf#view=FitH&toolbar=1"
                title="Ayush Kumar Shinde Resume PDF"
                className="w-full h-full border-0 bg-[#1e222d]"
              />

              {/* Mobile Fallback helper if browser restricts iframe PDF */}
              <div className="sm:hidden p-3 bg-[#0d121f] border-t border-white/10 text-center text-xs text-slate-300 flex items-center justify-between">
                <span>PDF not rendering on your phone?</span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-xs"
                >
                  Open Fullscreen
                </a>
              </div>
            </div>
          ) : (
            /* Interactive / Summary View: Guaranteed scrollable container */
            <div
              data-lenis-prevent
              tabIndex={0}
              className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain p-4 sm:p-8 space-y-8 max-w-4xl mx-auto text-slate-200 custom-scrollbar focus:outline-none"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#6366f1 rgba(255, 255, 255, 0.08)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Top Contact Strip */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    AYUSH KUMAR SHINDE
                  </h1>
                  <p className="text-sm text-indigo-400 font-mono mt-1">
                    Raipur, Chhattisgarh • +91 74705 25135
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    {personalInfo.email}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
                  </button>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/20 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Experience */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Work Experience</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-white">
                      Frontend Developer — Hindustaan Innovations Private Limited
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      Current
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                    <li>Working as a Frontend Developer Intern, building and maintaining user-facing features for the company&apos;s products.</li>
                    <li>Built a real-time chat application, implementing live messaging functionality on the frontend.</li>
                    <li>Currently developing a Project OS platform for monitoring work and tracking project progress.</li>
                    <li>Created the food delivery landing page (Bhukkadh) and rider app portfolio (Ghumakkadh).</li>
                  </ul>
                </div>
              </section>

              {/* Projects */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>Key Projects</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {/* Taste Pilot */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Taste Pilot | Full-Stack Food Ordering Platform
                      </h4>
                      <a
                        href="https://taste-pilot-blond.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs font-mono text-slate-400">
                      Stack: Next.js, TypeScript, React, Node.js, Express.js, MongoDB, Socket.IO, Razorpay
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
                      <li>Built a full-stack food ordering platform with JWT authentication, cart management, Razorpay integration, and real-time order tracking.</li>
                      <li>Designed and implemented a secure authentication system using JWT, bcrypt, and protected API routes.</li>
                    </ul>
                  </div>

                  {/* Car Rental */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Car Rental Web Application | Full-Stack MERN Project
                      </h4>
                      <a
                        href="https://github.com/ayushshinde13/car-rental-webapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs font-mono text-slate-400">
                      Stack: React.js, Node.js, Express.js, MongoDB, JWT, REST APIs
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
                      <li>Developed a full-stack Car Rental Web Application using MERN stack with secure JWT authentication.</li>
                      <li>Built features including car browsing, booking, wallet management, user dashboard, and booking history.</li>
                    </ul>
                  </div>

                  {/* Room Finder */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Room Finder Application
                      </h4>
                      <a
                        href="https://github.com/ayushshinde13/room-finder-mern"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs font-mono text-slate-400">
                      Stack: React.js, Node.js, Express.js, MongoDB, JWT, REST APIs, Tailwind CSS
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
                      <li>Multi-user MERN stack application with JWT-based authentication, RESTful APIs, and full booking management.</li>
                      <li>Responsive UI with Tailwind CSS for seamless room discovery and booking experience across user roles.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-white text-sm">B.Tech — CSE</h4>
                      <span className="text-xs font-mono text-indigo-400 font-semibold">CGPA: 7.3 / 10</span>
                    </div>
                    <p className="text-xs text-slate-400">SSIPMT, Raipur (CSVTU Affiliated, AICTE Approved)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                    <h4 className="font-bold text-white text-sm">Class XII &amp; Class X</h4>
                    <p className="text-xs text-slate-400">Bharat Mata Higher Secondary School, Tatibandh, Raipur</p>
                  </div>
                </div>
              </section>

              {/* Technical Skills */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Technical Skills</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs sm:text-sm">
                  <p><strong className="text-white">Languages:</strong> <span className="text-slate-300">JavaScript, Python, SQL, HTML5, CSS3</span></p>
                  <p><strong className="text-white">Frontend:</strong> <span className="text-slate-300">React.js, Next.js, TypeScript, Tailwind CSS, Vite, Redux (basics)</span></p>
                  <p><strong className="text-white">Backend:</strong> <span className="text-slate-300">Node.js, Express.js, REST APIs, JWT Authentication</span></p>
                  <p><strong className="text-white">Databases:</strong> <span className="text-slate-300">MongoDB, SQL</span></p>
                  <p><strong className="text-white">Tools:</strong> <span className="text-slate-300">Git, GitHub, VS Code, Postman</span></p>
                  <p><strong className="text-white">AI Tools:</strong> <span className="text-slate-300">Claude, Cursor, GitHub Copilot, ChatGPT / OpenAI Codex</span></p>
                </div>
              </section>

              {/* Achievements & Interests */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Achievements &amp; Interests</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs sm:text-sm text-slate-300">
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Graduated B.Tech CSE from SSIPMT Raipur with a 7.3 CGPA.</li>
                    <li>Independently explored multiple domains, including web development, through self-initiated projects.</li>
                    <li>Built and deployed Taste Pilot, a live Swiggy-inspired food ordering platform, on Vercel.</li>
                  </ul>
                  <p className="pt-2 border-t border-white/10 text-slate-400 font-mono text-xs">
                    <strong className="text-white">Interests:</strong> Continuous Learning &amp; Growth • Problem Solving • Full-Stack Development • AI-Powered Applications
                  </p>
                </div>
              </section>

              {/* Bottom Quick Download Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mb-8">
                <div>
                  <h4 className="font-bold text-white text-base">Want a copy for review?</h4>
                  <p className="text-xs text-slate-400">Download the official print-ready PDF resume file.</p>
                </div>
                <a
                  href="/resume.pdf"
                  download="Ayush_Kumar_Shinde_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
