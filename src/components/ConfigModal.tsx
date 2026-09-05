import React, { useState } from 'react';
import { 
  X, 
  Key, 
  User, 
  Terminal, 
  Check, 
  RefreshCw, 
  SlidersHorizontal,
  ExternalLink,
  Info
} from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  currentApiKey: string;
  onApply: (username: string, apiKey: string) => void;
  isLive: boolean;
  lastError?: string | null;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  currentUsername,
  currentApiKey,
  onApply,
  isLive,
  lastError,
}) => {
  const [username, setUsername] = useState(currentUsername);
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(username.trim(), apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const currentApiUrl = `https://pmhfhyuqhndjfbzbzclx.supabase.co/functions/v1/public-api/v1/portfolio?username=${encodeURIComponent(
    username || 'fanueldx25'
  )}&limit=10&offset=0`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-3xl glass-panel-elevated border border-white/20 shadow-2xl p-6 sm:p-7 z-10 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">API & Profile Configuration</h3>
              <p className="text-xs text-slate-400">Manage portfolio endpoint parameters</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close settings modal"
            className="p-2 rounded-xl glass-button text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username parameter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Username (Query Param: username)</span>
            </label>
            <input
              id="config-input-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. fanueldx25"
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 font-mono transition-all"
            />
          </div>

          {/* API Key header */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-400" />
              <span>API Key (Header: x-api-key)</span>
            </label>
            <input
              id="config-input-api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Optional: Enter x-api-key header value"
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/30 font-mono transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              If left empty, requests still work via the public endpoint configuration.
            </p>
          </div>

          {/* Endpoint URL Preview */}
          <div className="rounded-xl p-3 bg-black/40 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>Endpoint Query:</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                isLive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isLive ? 'Online Sync' : 'Cached Fallback'}
              </span>
            </div>
            <code className="block text-[11px] font-mono text-cyan-300/80 break-all leading-tight">
              {currentApiUrl}
            </code>
          </div>

          {lastError && (
            <div className="rounded-xl p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>{lastError}</span>
            </div>
          )}

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl glass-button text-xs font-medium text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              id="config-btn-save"
              type="submit"
              className="glass-button-primary px-5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Applied!</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Fetch Portfolio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
