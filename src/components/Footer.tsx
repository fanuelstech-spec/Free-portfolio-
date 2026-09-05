import React from 'react';
import { Sparkles, ArrowUp, Code2, Globe, Heart } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile?: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/10 mt-20 pt-12 pb-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-tight">
              {profile?.display_name || 'Fanuel DX'} Portfolio
            </p>
            <p className="text-xs text-slate-400">
              Liquid Glass / Glassmorphism Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>@{profile?.username || 'fanueldx25'}</span>
          <span>•</span>
          <span>Powered by Supabase Unified Portfolio API</span>
        </div>

        <button
          onClick={scrollToTop}
          className="glass-button px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-transform active:scale-95"
          title="Return to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    </footer>
  );
};
