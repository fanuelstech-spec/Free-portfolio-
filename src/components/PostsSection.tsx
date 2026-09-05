import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  ExternalLink, 
  Share2, 
  Image as ImageIcon,
  MessageSquare,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Post } from '../types';

interface PostsSectionProps {
  posts: Post[];
  authorName: string;
  authorHandle: string;
  authorAvatar?: string | null;
  onOpenImageModal: (imageUrl: string, caption?: string) => void;
}

export const PostsSection: React.FC<PostsSectionProps> = ({
  posts,
  authorName,
  authorHandle,
  authorAvatar,
  onOpenImageModal,
}) => {
  return (
    <section id="activity-section" className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Updates & Thoughts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Activity Timeline</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              {posts.length} Posts
            </span>
          </h2>
        </div>
      </div>

      {/* Posts Timeline / Grid */}
      {posts.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-white/10">
          <MessageSquare className="w-10 h-10 text-indigo-400/60 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">No activity yet</h3>
          <p className="text-sm text-slate-400">Updates and posts will appear here dynamically.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post, idx) => {
            const dateObj = new Date(post.created_at);
            const dateStr = !isNaN(dateObj.getTime())
              ? dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Recent';

            const timeStr = !isNaN(dateObj.getTime())
              ? dateObj.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })
              : '';

            const allImages = [
              ...(post.images || []),
              ...(post.preview_image_url ? [post.preview_image_url] : []),
            ];

            return (
              <article
                key={post.id || idx}
                id={`post-card-${post.id || idx}`}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 relative transition-all duration-300 hover:border-indigo-500/30"
              >
                {/* Post Author / Header Meta */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {authorAvatar ? (
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-white/15"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-cyan-400 font-bold">
                        {authorName.charAt(0) || 'F'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white tracking-tight">{authorName}</span>
                        <span className="text-xs text-slate-400 font-mono">@{authorHandle}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{dateStr}</span>
                        {timeStr && <span>• {timeStr}</span>}
                      </div>
                    </div>
                  </div>

                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl glass-button text-slate-400 hover:text-white transition-colors"
                      title="Open original post"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Post Content */}
                {post.content && post.content.trim().length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                      {post.content}
                    </p>
                  </div>
                )}

                {/* Embedded Images Grid */}
                {allImages.length > 0 && (
                  <div className={`mb-4 rounded-xl overflow-hidden border border-white/10 ${
                    allImages.length === 1 
                      ? 'grid grid-cols-1' 
                      : allImages.length === 2 
                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' 
                      : 'grid grid-cols-2 sm:grid-cols-3 gap-2'
                  }`}>
                    {allImages.map((imgUrl, imgIdx) => (
                      <div
                        key={imgIdx}
                        onClick={() => onOpenImageModal(imgUrl, post.content || undefined)}
                        className="group/img relative overflow-hidden bg-slate-900 cursor-pointer aspect-video sm:aspect-auto sm:h-64"
                      >
                        <img
                          src={imgUrl}
                          alt={`Post attachment ${imgIdx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>View Full</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rich Link / Metadata Preview Card */}
                {post.preview_url && (
                  <a
                    href={post.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl p-3.5 glass-panel border border-white/10 hover:border-indigo-400/40 transition-all mb-2 group/preview"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-medium mb-1">
                          <ExternalLink className="w-3 h-3" />
                          <span className="truncate">{post.preview_title || 'External Reference'}</span>
                        </div>
                        {post.preview_description && (
                          <p className="text-xs text-slate-400 line-clamp-2 mb-1.5">
                            {post.preview_description}
                          </p>
                        )}
                        <span className="text-[11px] font-mono text-slate-500 truncate block">
                          {post.preview_url}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/preview:text-white transition-colors shrink-0 mt-0.5" />
                    </div>
                  </a>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
