import React, { useState } from 'react';
import { X, Copy, Check, Share2, ExternalLink, Globe } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl = 'https://geoversed-playground-ai-solution-opc.netlify.app/',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const title = 'GEOVERSED Playground AI Solution (OPC) Pvt. Ltd. | Geoscience Intelligence & GIS';
  const description =
    'Where Field Expertise Meets Smart Technology. GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED — Enterprise AI, GIS, SaaS and Geoscience Intelligence.';
  const previewImage = '/og-image.png';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share dismissed
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title}\n${description}\n${shareUrl}`
  )}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-base sm:text-lg font-bold text-slate-900 font-['Poppins']">
                Share Website Link
              </h3>
              <p className="text-xs text-slate-500">Social preview card &amp; direct sharing links</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Visual Link Preview Popup Card */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider font-['Poppins']">
                Link Preview Popup Card
              </span>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                WhatsApp / LinkedIn / X Card
              </span>
            </div>

            {/* Simulated Social Unfurl Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden shadow-xs hover:border-slate-300 transition-colors">
              {/* Logo / Company Graphic Image */}
              <div className="relative w-full h-48 bg-white flex items-center justify-center p-4 border-b border-slate-200/70">
                <img
                  src={previewImage}
                  alt="GEOVERSED Playground AI Solution OPC Pvt Ltd"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Unfurl Meta Details */}
              <div className="p-4 bg-white">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span className="truncate">geoversed-playground-ai-solution-opc.netlify.app</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Poppins'] leading-snug line-clamp-2">
                  GEOVERSED Playground AI Solution (OPC) Pvt. Ltd.
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  Where Field Expertise Meets Smart Technology. Enterprise AI, GIS, SaaS and Geoscience Intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Share URL Input & Copy Button */}
          <div>
            <label htmlFor="share-url-input" className="block text-xs font-semibold text-slate-700 mb-1.5 font-['Poppins']">
              Website URL
            </label>
            <div className="flex items-center gap-2">
              <input
                id="share-url-input"
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 select-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer shrink-0 font-['Poppins']"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2 font-['Poppins']">
              Share directly to:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-800 text-xs font-semibold transition-colors font-['Poppins']"
              >
                <span className="text-sm">💬</span>
                <span>WhatsApp</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100/70 text-sky-800 text-xs font-semibold transition-colors font-['Poppins']"
              >
                <span className="text-sm">💼</span>
                <span>LinkedIn</span>
              </a>

              {/* X / Twitter */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors font-['Poppins']"
              >
                <span className="text-sm">𝕏</span>
                <span>X (Twitter)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Social crawler tags configured for automatic link expansion</span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
