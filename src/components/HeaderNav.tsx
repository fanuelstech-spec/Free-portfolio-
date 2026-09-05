import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  SlidersHorizontal,
  ExternalLink,
  Code2
} from 'lucide-react';
import { Profile } from '../types';

interface HeaderNavProps {
  profile?: Profile;
  isLive: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenConfig: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  profile,
  isLive,
  isLoading,
  onRefresh,
  onOpenConfig,
  activeSection,
  onSelectSection,
}) => {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'activity', label: 'Activity' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-6 w-full mb-8">
      <div className="glass-panel-elevated rounded-2xl px-4 py-3 flex items-center justify-between gap-4 transition-all">
        {/* Brand / Logo */}
        <button 
          onClick={() => onSelectSection('hero')}
          className="flex items-center gap-3 min-w-0 text-left group"
        >
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/30 border border-white/20 flex items-center justify-center text-cyan-400 font-bold group-hover:border-cyan-400/50 transition-colors shadow-sm">
              <span className="font-mono text-sm tracking-tighter">FD</span>
            </div>
            <span 
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-950 ${
                profile?.availability === 'open_to_work' 
                  ? 'bg-emerald-400 animate-pulse' 
                  : 'bg-cyan-400'
              }`}
              title={profile?.availability === 'open_to_work' ? 'Available for Work' : 'Online'}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base text-slate-100 truncate tracking-tight group-hover:text-cyan-300 transition-colors">
                {profile?.display_name || 'Fanuel DX'}
              </span>
              {profile?.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" title="Verified" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 truncate hidden sm:block font-mono">
              @{profile?.username || 'fanueldx25'}
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/15 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right utility buttons: live status, refresh, config */}
        <div className="flex items-center gap-2 shrink-0">
          <div 
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
              isLive 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
            title={isLive ? 'Connected to live Supabase Portfolio API' : 'Using verified cached portfolio snapshot'}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="hidden sm:inline font-mono tracking-tight text-[11px]">
              {isLive ? 'API Live' : 'Snapshot'}
            </span>
          </div>

          <button
            id="btn-refresh-portfolio"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh portfolio data"
            className="p-2 rounded-xl glass-button text-slate-300 hover:text-cyan-300 disabled:opacity-50 transition-transform active:scale-95"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          <button
            id="btn-settings-portfolio"
            onClick={onOpenConfig}
            aria-label="API & Profile settings"
            className="p-2 rounded-xl glass-button text-slate-300 hover:text-cyan-300 transition-transform active:scale-95"
            title="Configure API Key & User"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {profile?.links?.website && (
            <a
              id="btn-external-website"
              href={profile.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-button-primary text-xs font-semibold text-white tracking-wide shadow-md"
            >
              <span>devfanuel.online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="flex md:hidden items-center justify-around gap-1 mt-2.5 p-1 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-lg">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
