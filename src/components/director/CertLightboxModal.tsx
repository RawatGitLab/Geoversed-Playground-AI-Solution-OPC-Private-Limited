import React, { useEffect } from 'react';
import { X, Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, Building2, Hash } from 'lucide-react';
import { CertificationItem } from '../../types';

interface CertLightboxModalProps {
  cert: CertificationItem | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const CertLightboxModal: React.FC<CertLightboxModalProps> = ({
  cert,
  isOpen = true,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !cert) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 md:backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto text-white transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="hidden md:block absolute -top-20 -right-20 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden md:block absolute -bottom-20 -left-20 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="relative z-10 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 font-['Poppins']">
                Verified Credential
              </span>
              <div className="text-xs text-slate-400">
                {cert.issuer} &bull; {cert.year}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate modal"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Area (Stylized Digital Certificate Canvas) */}
        <div className="p-6 space-y-6">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-500/30 p-6 sm:p-8 text-center shadow-inner overflow-hidden">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50" />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Certificate of Completion &amp; Proficiency
            </div>

            <h3
              id="cert-lightbox-title"
              className="text-xl sm:text-2xl font-extrabold font-['Poppins'] text-white max-w-lg mx-auto leading-tight"
            >
              {cert.title}
            </h3>

            <p className="text-sm text-slate-300 mt-2">
              Conferred upon <strong className="text-white font-semibold">Mr. Varun Rawat</strong> in recognition of demonstrated expertise and rigorous assessment.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Issuer: <strong className="text-slate-200">{cert.issuer}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Issued: <strong className="text-slate-200">{cert.year}</strong></span>
              </div>
              {cert.credentialId && (
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Hash className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{cert.credentialId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {cert.description && (
            <div className="text-sm text-slate-300 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-4">
              <p>{cert.description}</p>
            </div>
          )}

          {/* Validated Skills */}
          {cert.skillsValidated && cert.skillsValidated.length > 0 && (
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-['Poppins']">
                Validated Skills &amp; Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {cert.skillsValidated.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-cyan-500/25 cursor-pointer font-['Poppins']"
              >
                <span>Verify Credential on Official Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-xs text-slate-500 italic">
                Direct verification maintained on corporate register
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
