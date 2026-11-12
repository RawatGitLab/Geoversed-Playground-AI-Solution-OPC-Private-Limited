import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CertificationItem } from '../../types';

interface CertCardProps {
  cert: CertificationItem;
  onClick: () => void;
}

export const CertCard: React.FC<CertCardProps> = ({ cert, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View certificate details for ${cert.title} issued by ${cert.issuer}`}
      className="w-[260px] xs:w-[280px] sm:w-[320px] max-w-[85vw] shrink-0 bg-slate-900/85 hover:bg-slate-900 md:backdrop-blur-md border border-slate-800 hover:border-cyan-400/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Badge, Issuer Pill, & Verify Link */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-cyan-400/20 border border-blue-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 group-hover:border-cyan-300/50 transition-all shrink-0">
              <Award className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-cyan-400 uppercase tracking-wider leading-none">
                {cert.issuer}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {cert.year} Verified
              </span>
            </div>
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors"
              title={`Verify ${cert.title} with ${cert.issuer}`}
              aria-label={`Verify ${cert.title} with ${cert.issuer}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Certificate Title */}
        <h4 className="text-sm sm:text-base font-bold text-white font-['Poppins'] line-clamp-2 leading-snug group-hover:text-cyan-200 transition-colors">
          {cert.title}
        </h4>

        {/* Skills Chip Tags (First 2) */}
        {cert.skillsValidated && cert.skillsValidated.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {cert.skillsValidated.slice(0, 2).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
              >
                {skill}
              </span>
            ))}
            {cert.skillsValidated.length > 2 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 text-slate-400">
                +{cert.skillsValidated.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Credential ID / Click to View */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[170px]">
          {cert.credentialId || 'ID: VERIFIED-GOVTECH'}
        </span>
        <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
          <span>View</span>
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </div>
  );
};
