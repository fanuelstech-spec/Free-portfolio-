import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Layers, 
  Code, 
  Briefcase, 
  Globe, 
  ArrowRight, 
  ChevronDown, 
  ArrowUpRight,
  Send,
  UserCheck
} from 'lucide-react';
import { Profile } from '../types';

interface HeroSectionProps {
  profile: Profile;
  projectCount: number;
  postCount: number;
  onNavigateToAbout: () => void;
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  projectCount,
  postCount,
  onNavigateToAbout,
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const isAvailable = profile.availability === 'open_to_work';
  const joinedDate = profile.joined_at 
    ? new Date(profile.joined_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Apr 2026';

  return (
    <section 
      id="hero-section" 
      className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full mb-16 scroll-mt-24"
    >
      {/* Hero Outer Container with Cover Background */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl min-h-[540px] sm:min-h-[600px] md:min-h-[660px] flex flex-col justify-between p-6 sm:p-10 md:p-12">
        {/* Cover Picture as the Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
          {profile.cover_url ? (
            <img 
              id="hero-cover-background"
              src={profile.cover_url} 
              alt="Cover Backdrop" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 hover:scale-100"
            />
          ) : (
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/50 via-slate-900 to-[#030712]" />
          )}

          {/* Cinematic Liquid Glass Gradients over Cover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/75 to-[#030712]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(6,182,212,0.15),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(99,102,241,0.15),_transparent_60%)]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col justify-between h-full flex-1">
          {/* Top Bar inside Hero: Availability and Verification status */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl border shadow-lg ${
                isAvailable 
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                  : 'bg-slate-900/80 border-white/10 text-slate-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                <span>{isAvailable ? 'Available for Full-Stack Roles & Contracts' : 'Available for Collaboration'}</span>
              </div>

              {profile.verified && (
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 backdrop-blur-xl">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Engineer</span>
                </div>
              )}
            </div>

            {/* Quick Profile Handle & Location Pill */}
            <div className="hidden md:flex items-center gap-3 text-xs text-slate-300 bg-white/[0.05] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="font-mono text-cyan-400">@{profile.username}</span>
              {profile.location && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{profile.location}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Center Main Stage: Hero Typographic Showcase */}
          <div className="my-auto py-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Architect & Founder</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-5">
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 drop-shadow-sm">
                {profile.display_name || 'Fanuel DX'}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mb-8 drop-shadow">
              {profile.bio || 
                'Architecting high-performance digital experiences, scalable cloud backends, and intelligent automation systems.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-btn-projects"
                onClick={onNavigateToProjects}
                className="px-6 py-3 rounded-2xl glass-button-primary text-sm font-semibold text-white flex items-center gap-2 shadow-xl hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-btn-about"
                onClick={onNavigateToAbout}
                className="px-5 py-3 rounded-2xl glass-button text-sm font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Meet the Creator</span>
              </button>

              <button
                id="hero-btn-contact"
                onClick={onNavigateToContact}
                className="px-5 py-3 rounded-2xl glass-button text-sm font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Social Channels Strip in Hero */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2.5 flex-wrap">
              <span className="text-xs text-slate-400 mr-2 hidden sm:inline">Connect directly:</span>
              
              {profile.links?.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl glass-button text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              )}

              {profile.links?.twitter && (
                <a
                  href={profile.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl glass-button text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <span className="font-bold text-xs font-mono text-cyan-400">𝕏</span>
                  <span>Twitter</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              )}

              {profile.links?.website && (
                <a
                  href={profile.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl glass-button text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Website</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              )}

              {profile.links?.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl glass-button text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              )}
            </div>
          </div>

          {/* Bottom Live Metrics Bar inside Hero */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-card rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-white tracking-tight">{projectCount}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">Projects</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-white tracking-tight">{postCount}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">Updates</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Code className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-white tracking-tight">{profile.skills?.length || 8}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">Core Skills</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-emerald-300 truncate">{isAvailable ? 'Open to Work' : 'Active'}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue to next section */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
          <button
            onClick={onNavigateToAbout}
            aria-label="Scroll to About section"
            className="text-slate-400 hover:text-cyan-300 transition-colors flex flex-col items-center gap-1"
          >
            <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
