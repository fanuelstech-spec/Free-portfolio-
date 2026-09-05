/**
 * Portfolio DOM Templates & Rendering Engine
 * Provides typed HTML string generators and direct DOM rendering utilities.
 */

import { PortfolioResponse, Profile, Project, Post } from './types';
import { fetchPortfolio } from './api';

/**
 * Escapes unsafe characters for HTML injection
 */
export function escapeHtml(str?: string | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renders the Hero / Header template
 */
export function renderHeroTemplate(profile: Profile, projectCount: number, postCount: number): string {
  const isAvailable = profile.availability === 'open_to_work';
  const skillsHtml = (profile.skills || [])
    .map(
      (skill) => `
      <span class="glass-pill px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300">
        ${escapeHtml(skill)}
      </span>`
    )
    .join('');

  return `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-12">
      <div class="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
        <div class="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
          ${
            profile.cover_url
              ? `<img src="${escapeHtml(profile.cover_url)}" alt="Cover" class="w-full h-full object-cover opacity-60" />`
              : ''
          }
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        <div class="relative px-6 sm:px-8 pb-8 pt-0 -mt-16 sm:-mt-20">
          <div class="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div class="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/20 shadow-2xl shrink-0">
              <img src="${escapeHtml(profile.avatar_url || '')}" alt="${escapeHtml(profile.display_name)}" class="w-full h-full object-cover" />
              <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${
                isAvailable ? 'bg-emerald-400' : 'bg-cyan-400'
              }"></span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">${escapeHtml(profile.display_name)}</h1>
                ${profile.verified ? '<span class="text-cyan-400 font-bold">✓</span>' : ''}
              </div>
              <p class="text-sm font-mono text-cyan-400">@${escapeHtml(profile.username)}</p>
              <p class="text-xs text-slate-400">${escapeHtml(profile.location || '')}</p>
            </div>
          </div>
          ${profile.bio ? `<p class="mt-5 text-sm sm:text-base text-slate-200">${escapeHtml(profile.bio)}</p>` : ''}
          <div class="mt-6 flex flex-wrap gap-2">${skillsHtml}</div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Renders the Projects Grid template
 */
export function renderProjectsTemplate(projects: Project[]): string {
  const cardsHtml = projects
    .map((p) => {
      const techHtml = (p.tech_stack || [])
        .map((t) => `<span class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-cyan-200">${escapeHtml(t)}</span>`)
        .join('');

      return `
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between">
          <div>
            ${
              p.cover_url
                ? `<div class="h-44 w-full rounded-xl overflow-hidden mb-4 bg-slate-900"><img src="${escapeHtml(p.cover_url)}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover" /></div>`
                : ''
            }
            <h3 class="text-lg font-bold text-white mb-2">${escapeHtml(p.title)}</h3>
            <p class="text-xs text-slate-300 line-clamp-3 mb-4">${escapeHtml(p.description || '')}</p>
            <div class="flex flex-wrap gap-1.5 mb-4">${techHtml}</div>
          </div>
          <div class="pt-4 border-t border-white/5 flex gap-2">
            ${p.live_url ? `<a href="${escapeHtml(p.live_url)}" target="_blank" class="glass-button text-xs px-3 py-1.5 rounded-xl text-cyan-300">Live Demo</a>` : ''}
            ${p.repo_url ? `<a href="${escapeHtml(p.repo_url)}" target="_blank" class="glass-button text-xs px-3 py-1.5 rounded-xl text-slate-300">Code</a>` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-16">
      <h2 class="text-2xl font-bold text-white mb-6">Projects Showcase</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHtml}
      </div>
    </section>
  `;
}

/**
 * Renders the Posts / Activity Feed template
 */
export function renderPostsTemplate(posts: Post[], authorName: string): string {
  const postsHtml = posts
    .map((post) => {
      const dateStr = new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const imgHtml = (post.images || [])
        .map((img) => `<img src="${escapeHtml(img)}" alt="attachment" class="rounded-xl object-cover h-48 w-full border border-white/10" />`)
        .join('');

      return `
        <div class="glass-card rounded-2xl p-6 border border-white/10 mb-4">
          <div class="flex justify-between items-center mb-3 text-xs text-slate-400">
            <span class="font-semibold text-white">${escapeHtml(authorName)}</span>
            <span>${dateStr}</span>
          </div>
          ${post.content ? `<p class="text-sm text-slate-200 mb-4">${escapeHtml(post.content)}</p>` : ''}
          ${imgHtml ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">${imgHtml}</div>` : ''}
        </div>
      `;
    })
    .join('');

  return `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-16">
      <h2 class="text-2xl font-bold text-white mb-6">Activity Feed</h2>
      <div class="space-y-4">${postsHtml}</div>
    </section>
  `;
}

/**
 * Direct DOM injection helper
 */
export async function renderPortfolioToDOM(containerId: string = 'root') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const result = await fetchPortfolio();
  const { profile, projects, posts } = result.data;

  const heroHtml = renderHeroTemplate(profile, projects.length, posts.length);
  const projectsHtml = renderProjectsTemplate(projects);
  const postsHtml = renderPostsTemplate(posts, profile.display_name);

  container.innerHTML = `
    <div class="min-h-screen bg-slate-950 text-slate-100 py-8">
      ${heroHtml}
      ${projectsHtml}
      ${postsHtml}
    </div>
  `;
}
