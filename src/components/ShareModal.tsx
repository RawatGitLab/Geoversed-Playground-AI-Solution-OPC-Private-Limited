import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Globe,
  Sparkles,
  Info,
  RefreshCw,
} from 'lucide-react';

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
  const [useFreshUrl, setUseFreshUrl] = useState(true);

  if (!isOpen) return null;

  const title = 'GEOVERSED Playground AI Solution (OPC) Pvt. Ltd. | Geoscience Intelligence & GIS';
  const description =
    'Where Field Expertise Meets Smart Technology. GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED — Enterprise AI, GIS, SaaS and Geoscience Intelligence in Almora, Uttarakhand.';
  
  // Cache-busting URL to force WhatsApp/Facebook/LinkedIn to bypass stale cached previews
  const activeShareUrl = useFreshUrl
    ? `${shareUrl.replace(/\/+$/, '')}/?v=logo`
    : shareUrl;

  const previewImage = '/og-image.png';

  const handleCopy = (textToCopy: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
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
          url: activeShareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy(activeShareUrl);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title}\n\n${description}\n\n${activeShareUrl}`
  )}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    activeShareUrl
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    activeShareUrl
  )}&text=${encodeURIComponent(title)}`;

  const fbDebuggerUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(
    shareUrl
  )}`;
  const linkedInInspectorUrl = `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-base sm:text-lg font-bold text-slate-900 font-['Poppins']">
                Share Website Link &amp; Preview
              </h3>
              <p className="text-xs text-slate-500">Official Social Share Card with Logo</p>
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
        <div className="p-5 sm:p-6 space-y-4">
          {/* Visual Link Preview Popup Card */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider font-['Poppins']">
                Social Link Preview Card
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                1200×630 Standard OG Image
              </span>
            </div>

            {/* Simulated Social Unfurl Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:border-slate-300 transition-colors">
              {/* Logo / Company Graphic Image */}
              <div className="relative w-full aspect-[1.91/1] bg-white flex items-center justify-center p-2 border-b border-slate-200/70">
                <img
                  src={previewImage}
                  alt="GEOVERSED Playground AI Solution OPC Pvt Ltd Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Unfurl Meta Details */}
              <div className="p-3.5 bg-white">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span className="truncate">geoversed-playground-ai-solution-opc.netlify.app</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-['Poppins'] leading-snug line-clamp-1">
                  GEOVERSED Playground AI Solution (OPC) Pvt. Ltd. | Geoscience Intelligence &amp; GIS
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                  Where Field Expertise Meets Smart Technology. Enterprise AI, GIS, SaaS and Geoscience Intelligence in Almora, Uttarakhand.
                </p>
              </div>
            </div>
          </div>

          {/* Social Cache Notice & Fresh Link Toggle */}
          <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3 text-left">
            <div className="flex items-start gap-2 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-950">
                  Why didn't the image appear right away on WhatsApp / LinkedIn?
                </p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Chat apps cache link previews on their servers. When a link was sent previously, WhatsApp and LinkedIn remember the old empty preview.
                  Using the <strong>Fresh Link</strong> bypasses the cache instantly.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-[11px] font-medium text-amber-950 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Cache-Bypass Mode (Recommended for WhatsApp):
              </span>
              <button
                type="button"
                onClick={() => setUseFreshUrl(!useFreshUrl)}
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  useFreshUrl
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                }`}
              >
                {useFreshUrl ? 'Enabled (?v=logo)' : 'Clean URL'}
              </button>
            </div>
          </div>

          {/* Share URL Input & Copy Button */}
          <div>
            <label htmlFor="share-url-input" className="block text-xs font-semibold text-slate-700 mb-1 font-['Poppins']">
              Link to Share:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="share-url-input"
                type="text"
                readOnly
                value={activeShareUrl}
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 select-all focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleCopy(activeShareUrl)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer shrink-0 font-['Poppins']"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2 font-['Poppins']">
              Send directly to:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-800 text-xs font-semibold transition-colors font-['Poppins'] cursor-pointer"
              >
                <span className="text-sm">💬</span>
                <span>WhatsApp</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100/70 text-sky-800 text-xs font-semibold transition-colors font-['Poppins'] cursor-pointer"
              >
                <span className="text-sm">💼</span>
                <span>LinkedIn</span>
              </a>

              {/* X / Twitter */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors font-['Poppins'] cursor-pointer"
              >
                <span className="text-sm">𝕏</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Debugger Links for Purging Cache */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
            <span>Force Re-scrape:</span>
            <div className="flex items-center gap-3">
              <a
                href={fbDebuggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
                title="Clears Facebook & WhatsApp OpenGraph cache"
              >
                <span>FB/WhatsApp Debugger</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a
                href={linkedInInspectorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
                title="Clears LinkedIn Post preview cache"
              >
                <span>LinkedIn Inspector</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Metadata configured with standard 1200×630 OpenGraph card</span>
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
