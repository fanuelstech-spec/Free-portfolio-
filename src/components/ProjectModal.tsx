import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Code2, 
  Calendar, 
  Layers, 
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const formattedDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop blur */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-elevated border border-white/20 shadow-2xl overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white hover:bg-black/90 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cover Image */}
        {project.cover_url && (
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={project.cover_url}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        )}

        {/* Details Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            {formattedDate && (
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published on {formattedDate}</span>
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Overview</span>
            </h4>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {project.description ||
                'Modern high-performance implementation focusing on fluid animations, responsive layouts, and robust software architecture.'}
            </p>
          </div>

          {/* Tech Stack */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl text-xs font-mono bg-white/[0.06] border border-white/10 text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 shadow-lg"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Source Repository</span>
                </a>
              )}

              {project.url && !project.live_url && !project.repo_url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2"
                >
                  <span>View Project on Web</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl glass-button text-xs font-medium text-slate-400 hover:text-white ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
