'use client';

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { personalInfo } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Send, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field for bot spam protection
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const containerRef = useRef<HTMLElement>(null);

  // Live Local Timezone Clock
  useEffect(() => {
    const updateClock = () => {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());
      setCurrentTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useGsapContext(
    () => {
      gsap.fromTo(
        '.contact-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.contact-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    },
    containerRef
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });

      // Trigger celebratory confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#6366F1', '#A855F7', '#06B6D4', '#10B981'],
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.');
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative pt-6 sm:pt-12 md:pt-24 pb-12 sm:pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Contact & Collaboration"
    >
      {/* Header */}
      <div className="contact-header flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16">
        <Badge variant="glow" className="mb-4">
          <span>05 / GET IN TOUCH</span>
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Let&apos;s build something{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            extraordinary.
          </span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] mt-4">
          Have an ambitious project, design overhaul, or engineering challenge in mind? Drop a message and let&apos;s turn your vision into production reality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Timezone Card */}
        <div className="contact-card lg:col-span-5 space-y-6">
          <GlassCard className="p-6 sm:p-8 border-[var(--border-subtle)] space-y-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-mono">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{personalInfo.email}</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-[var(--text-secondary)]">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{personalInfo.location}</span>
              </div>

              {/* Live Time Widget */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 dark:text-[var(--text-muted)]">My Local Time (IST)</span>
                    <span className="font-bold text-slate-900 dark:text-[var(--text-primary)]">{currentTime || '12:00:00 PM'}</span>
                  </div>
                </div>
                <Badge variant="pulse" pulseColor="bg-emerald-400">
                  <span>Active</span>
                </Badge>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="block text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-[var(--text-muted)] mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-slate-200 dark:border-[var(--border-subtle)] bg-slate-50 dark:bg-[var(--bg-card)] hover:border-indigo-500/50 text-slate-800 dark:text-[var(--text-primary)] transition-all hover:scale-110 shadow-xs"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-slate-200 dark:border-[var(--border-subtle)] bg-slate-50 dark:bg-[var(--bg-card)] hover:border-indigo-500/50 text-slate-800 dark:text-[var(--text-primary)] transition-all hover:scale-110 shadow-xs"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-card lg:col-span-7 w-full">
          <GlassCard className="p-6 sm:p-8 border-[var(--border-subtle)]">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
              Send a Transmission
            </h3>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Received!</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Thank you for reaching out. I usually review and respond to inquiries within 24 hours.
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from real users to catch bot spam) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave blank</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder-slate-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder-slate-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Role Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder-slate-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent transition-colors text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project goals, scope, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder-slate-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent transition-colors text-sm resize-y"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="md"
                  variant="glow"
                  isLoading={status === 'loading'}
                  className="w-full"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Transmit Message
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
