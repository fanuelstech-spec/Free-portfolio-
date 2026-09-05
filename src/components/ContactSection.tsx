import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Globe, 
  Code, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Profile } from '../types';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sentStatus, setSentStatus] = useState<'idle' | 'success'>('idle');

  const contactEmail = 'fanueldx25@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`);
    const mailBody = encodeURIComponent(
      `Hello Fanuel,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${mailSubject}&body=${mailBody}`;
    setSentStatus('success');
    setTimeout(() => setSentStatus('idle'), 4000);
  };

  return (
    <section id="contact-section" className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-24 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Let&apos;s Build Together</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Open to Collabs
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Have a project, startup idea, or technical question? Reach out directly via email or social platforms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Channels Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Direct Channels</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fastest response via direct email or Twitter direct messages.
              </p>
            </div>

            {/* Email Box with 1-Click Copy */}
            <div className="glass-card rounded-2xl p-4 border border-cyan-500/20 bg-cyan-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-cyan-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Primary Email</span>
                </span>
                <span className="text-[10px] font-mono uppercase text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-white/10">
                <span className="font-mono text-xs sm:text-sm text-white truncate select-all">
                  {contactEmail}
                </span>
                <button
                  id="btn-copy-email"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg glass-button text-cyan-400 hover:text-white transition-all shrink-0"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copied to clipboard!</span>
                </p>
              )}
            </div>

            {/* Social Channels List */}
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Online Presence
              </h4>

              {profile.links?.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 rounded-xl flex items-center justify-between border-white/5 hover:border-cyan-500/30 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">GitHub</p>
                      <p className="text-[11px] text-slate-400">@fanueldx25-ux</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              )}

              {profile.links?.twitter && (
                <a
                  href={profile.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 rounded-xl flex items-center justify-between border-white/5 hover:border-cyan-500/30 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <span className="font-bold text-xs font-mono">𝕏</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Twitter / X</p>
                      <p className="text-[11px] text-slate-400">@fanuel_lily</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              )}

              {profile.links?.website && (
                <a
                  href={profile.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 rounded-xl flex items-center justify-between border-white/5 hover:border-cyan-500/30 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Agency Website</p>
                      <p className="text-[11px] text-slate-400">devfanuel.online</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              )}
            </div>

            {/* Quick turnaround badge */}
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Typical response time: within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Right Side: Message Draft Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in your inquiry below to trigger a pre-formatted message directly to Fanuel DX.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-slate-300">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-slate-300">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-medium text-slate-300">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="New project inquiry / Consultation"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Share details about what you are looking to build or discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Directs directly to <span className="font-mono text-cyan-300">{contactEmail}</span>
                </span>
                <button
                  type="submit"
                  id="btn-submit-contact"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl glass-button-primary text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sentStatus === 'success' ? 'Opening Mail Client...' : 'Dispatch Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
