import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Code2, 
  Layers, 
  Cpu, 
  Bot, 
  Database, 
  Globe, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Profile } from '../types';

interface AboutSectionProps {
  profile: Profile;
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  selectedSkill,
  onSelectSkill,
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const isAvailable = profile.availability === 'open_to_work';
  const joinedDate = profile.joined_at 
    ? new Date(profile.joined_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'April 2026';

  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      icon: Cpu,
      title: 'Full-Stack Architecture',
      desc: 'Building reactive, type-safe web applications with Next.js, React, TypeScript, and modern node microservices.',
      tag: 'Frontend & Backend'
    },
    {
      icon: Bot,
      title: 'Workflow Automation & Bots',
      desc: 'Engineering autonomous communication systems, WhatsApp bots, WebSockets pipelines, and real-time triggers.',
      tag: 'Automation'
    },
    {
      icon: Database,
      title: 'Databases & Cloud APIs',
      desc: 'Architecting scalable schemas, Supabase/PostgreSQL databases, serverless functions, and robust REST/GraphQL APIs.',
      tag: 'Data & Infra'
    },
    {
      icon: Layers,
      title: 'Glassmorphic UI / UX',
      desc: 'Crafting fluid, high-contrast dark interfaces with deliberate typography, liquid glass aesthetics, and accessibility.',
      tag: 'Design Systems'
    }
  ];

  return (
    <section id="about-section" className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-20 scroll-mt-24">
      {/* Section Tag */}
      <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
        <Sparkles className="w-4 h-4" />
        <span>About the Creator</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prominent Profile Picture with Glass Pedestal */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm">
            {/* Ambient liquid glow behind avatar */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-teal-500/20 blur-xl opacity-75" />

            {/* Glass frame container */}
            <div className="relative rounded-3xl p-4 glass-panel border border-white/15 shadow-2xl overflow-hidden">
              {/* Profile Image with liquid aspect ratio */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group">
                {profile.avatar_url ? (
                  <img
                    id="about-profile-picture"
                    src={profile.avatar_url}
                    alt={profile.display_name || 'Fanuel DX'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-cyan-400">
                    <Code2 className="w-16 h-16 mb-2 opacity-60" />
                    <span className="text-2xl font-bold font-mono">{profile.display_name?.charAt(0) || 'F'}</span>
                  </div>
                )}

                {/* Subtle gradient vignette on avatar */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Availability Pill on avatar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-200 flex items-center gap-1.5 shadow-lg">
                    <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                    <span>{isAvailable ? 'Open to Opportunities' : 'Available for Work'}</span>
                  </div>

                  {profile.verified && (
                    <div className="px-2 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-semibold text-cyan-300 flex items-center gap-1 shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Identity Snapshot Card below photo */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {profile.display_name || 'Fanuel DX'}
                  </h3>
                  <span className="font-mono text-xs text-cyan-400">@{profile.username}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {profile.location && (
                    <div className="glass-card px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{profile.location}</span>
                    </div>
                  )}

                  <div className="glass-card px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{joinedDate}</span>
                  </div>
                </div>

                {/* Direct quick action */}
                <button
                  id="btn-about-connect"
                  onClick={onNavigateToContact}
                  className="w-full mt-2 py-2 px-3 rounded-xl glass-button text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Send a Direct Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative, Pillars & Interactive Skills */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Architecting modern digital experiences from Cameroon to the global web.
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {profile.bio || 
                  'Founder & Full-Stack Architect building next-generation digital experiences, automated systems, and high-performance applications.'}
              </p>
              <p className="mt-2.5 text-slate-400 text-sm leading-relaxed">
                I specialize in bridging creative fluid design with robust backend automation. Whether crafting interactive glassmorphic web platforms, deploying intelligent communication bots, or optimizing cloud database queries, my focus is on reliability, speed, and craft.
              </p>
            </div>

            {/* Core Capability Pillars */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Core Engineering Capabilities</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isHovered = activePillar === idx;
                  return (
                    <div
                      key={pillar.title}
                      onMouseEnter={() => setActivePillar(idx)}
                      onMouseLeave={() => setActivePillar(null)}
                      className={`p-3.5 rounded-2xl glass-card transition-all duration-300 ${
                        isHovered ? 'border-cyan-500/40 bg-white/10 -translate-y-0.5' : 'border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                          {pillar.tag}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white">{pillar.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Skills Cloud */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Technologies & Tooling (Click to filter projects)</span>
                  </h4>
                  {selectedSkill && (
                    <button
                      onClick={() => onSelectSkill(null)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                    >
                      Reset filter
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => {
                    const isSelected = selectedSkill?.toLowerCase() === skill.toLowerCase();
                    return (
                      <button
                        key={skill}
                        id={`about-skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        onClick={() => {
                          const nextSkill = isSelected ? null : skill;
                          onSelectSkill(nextSkill);
                          if (nextSkill) {
                            onNavigateToProjects();
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? 'bg-cyan-500/25 border-cyan-400/60 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105'
                            : 'glass-pill text-slate-300 hover:text-white hover:border-white/25'
                        }`}
                        title={`Filter projects matching ${skill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-300 animate-ping' : 'bg-slate-500'}`} />
                        <span>{skill}</span>
                        <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Want to see these technologies in action?
              </span>
              <button
                id="btn-about-view-projects"
                onClick={onNavigateToProjects}
                className="px-4 py-2 rounded-xl glass-button-primary text-xs font-semibold text-white flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
