import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="h-44 sm:h-56 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-16 sm:-mt-20 px-4">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-800/80 border-2 border-white/10 shrink-0" />
          <div className="space-y-3 flex-1">
            <div className="h-7 w-48 bg-white/10 rounded-lg" />
            <div className="h-4 w-32 bg-white/5 rounded-md" />
          </div>
        </div>

        <div className="h-16 w-full bg-white/[0.02] rounded-xl border border-white/5" />

        <div className="flex gap-2 flex-wrap pt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-7 w-20 rounded-xl bg-white/5" />
          ))}
        </div>
      </div>

      {/* Projects Grid Skeleton */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-44 bg-white/10 rounded-xl" />
          <div className="h-8 w-32 bg-white/5 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl glass-card overflow-hidden h-96 flex flex-col justify-between p-5">
              <div className="h-44 w-full bg-white/5 rounded-xl mb-4" />
              <div className="space-y-2.5">
                <div className="h-5 w-3/4 bg-white/10 rounded-lg" />
                <div className="h-3 w-full bg-white/5 rounded-md" />
                <div className="h-3 w-5/6 bg-white/5 rounded-md" />
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <div className="h-7 w-20 bg-white/10 rounded-lg" />
                <div className="h-7 w-20 bg-white/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
