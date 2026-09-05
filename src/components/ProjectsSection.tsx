import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Code2, 
  Search, 
  Sparkles, 
  Filter, 
  X,
  Layers,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  selectedSkill: string | null;
  onClearFilter: () => void;
  onOpenProjectModal: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  selectedSkill,
  onClearFilter,
  onOpenProjectModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on search query and selected skill
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Skill match
      let matchesSkill = true;
      if (selectedSkill) {
        const skillLower = selectedSkill.toLowerCase();
        const techMatch = project.tech_stack?.some((t) => t.toLowerCase().includes(skillLower));
        const titleMatch = project.title.toLowerCase().includes(skillLower);
        const descMatch = project.description?.toLowerCase().includes(skillLower);
        matchesSkill = Boolean(techMatch || titleMatch || descMatch);
      }

      // Search match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(q);
        const inDesc = project.description?.toLowerCase().includes(q);
        const inTech = project.tech_stack?.some((t) => t.toLowerCase().includes(q));
        matchesSearch = Boolean(inTitle || inDesc || inTech);
      }

      return matchesSkill && matchesSearch;
    });
  }, [projects, selectedSkill, searchQuery]);

  return (
    <section id="projects-section" className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Featured Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Engineering & Projects</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              {filteredProjects.length} / {projects.length}
            </span>
          </h2>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {selectedSkill && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-xs text-cyan-200">
              <Filter className="w-3.5 h-3.5" />
              <span>Skill: {selectedSkill}</span>
              <button 
                onClick={onClearFilter}
                className="ml-1 hover:text-white transition-colors"
                title="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="input-search-projects"
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">No matching projects found</h3>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            Try adjusting your search criteria or clearing the current skill filter to view all developments.
          </p>
          {(searchQuery || selectedSkill) && (
            <button
              onClick={() => {
                setSearchQuery('');
                onClearFilter();
              }}
              className="px-4 py-2 rounded-xl glass-button text-xs font-medium text-cyan-300 hover:text-white"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const hasLinks = Boolean(project.live_url || project.repo_url || project.url);
            const formattedDate = project.created_at
              ? new Date(project.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
              : null;

            return (
              <article
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative rounded-2xl glass-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Top Cover Image / Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  {project.cover_url ? (
                    <img
                      src={project.cover_url}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 p-6 text-center">
                      <Code2 className="w-8 h-8 text-cyan-400/60 mb-2" />
                      <span className="text-xs text-slate-400 font-mono">Development Build</span>
                    </div>
                  )}

                  {/* Gradient Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Quick Expand Button */}
                  <button
                    onClick={() => onOpenProjectModal(project)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="View details"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Date badge */}
                  {formattedDate && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
                      {formattedDate}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onOpenProjectModal(project)}
                      className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between gap-2"
                    >
                      <span className="truncate">{project.title}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-4 line-clamp-3">
                      {project.description || 'Full-stack application architecture and high performance interface implementation.'}
                    </p>

                    {/* Tech stack badges */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-cyan-500/20 group-hover:text-cyan-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button px-3 py-1.5 rounded-xl text-xs font-medium text-cyan-300 hover:text-white flex items-center gap-1.5 transition-all"
                          title="Open Live Application"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                          title="View Repository"
                        >
                          <Code2 className="w-3 h-3 text-slate-400" />
                          <span>Code</span>
                        </a>
                      )}

                      {!project.live_url && !project.repo_url && project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                        >
                          <span>Explore</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => onOpenProjectModal(project)}
                      className="text-xs text-slate-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      Details &rarr;
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
