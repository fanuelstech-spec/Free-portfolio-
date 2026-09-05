import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string | null;
  caption?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, caption, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Dark overlay with strong blur */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Content wrapper */}
      <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center z-10">
        <div className="w-full flex items-center justify-between pb-3 text-slate-300">
          <span className="text-xs font-mono truncate max-w-md text-slate-400">
            {caption || 'Image preview'}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl glass-button text-slate-300 hover:text-white"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close image preview"
              className="p-2 rounded-xl glass-button text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden glass-panel-elevated border border-white/20 p-1">
          <img
            src={imageUrl}
            alt={caption || 'Preview'}
            referrerPolicy="no-referrer"
            className="max-h-[78vh] w-auto object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
