import React from 'react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';
import { CertificationItem } from '../../types';
import { CertCard } from './CertCard';

interface CertificationMarqueeProps {
  certifications: CertificationItem[];
  onSelectCert: (cert: CertificationItem) => void;
}

export const CertificationMarquee: React.FC<CertificationMarqueeProps> = ({
  certifications,
  onSelectCert,
}) => {
  // Exactly split into two rows of 5 items
  const row1Items = certifications.slice(0, 5);
  const row2Items = certifications.slice(5, 10);

  // Duplicate each row once for seamless 0 -> -50% and -50% -> 0 infinite loop
  const row1Duplicated = [...row1Items, ...row1Items];
  const row2Duplicated = [...row2Items, ...row2Items];

  return (
    <div className="w-full space-y-6">
      {/* Section Sub-heading */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2 font-['Poppins']">
          <Award className="w-3.5 h-3.5 text-blue-600" />
          <span>Professional Accreditations</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Poppins'] tracking-tight">
          Certifications &amp; Achievements
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Recognized by leading international geospatial institutes, cloud providers, and premier national bodies. Hover to pause, click to inspect.
        </p>
      </div>

      {/* Marquee Wrapper with edge fade masks & pause-on-hover */}
      <div className="relative w-full overflow-hidden marquee-fade-mask marquee-pause-hover py-2 space-y-5">
        {/* ROW 1: Certifications 1-5 (Scrolls RIGHT -> LEFT) */}
        <div
          className="marquee-accessible-scroll overflow-x-hidden flex"
          tabIndex={0}
          aria-label="Certifications Row 1 (Right to Left)"
        >
          <div className="animate-marquee-left flex gap-4 sm:gap-6 pr-4 sm:pr-6">
            {row1Duplicated.map((cert, index) => (
              <CertCard
                key={`r1-${cert.id}-${index}`}
                cert={cert}
                onClick={() => onSelectCert(cert)}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: Certifications 6-10 (Scrolls LEFT -> RIGHT) */}
        <div
          className="marquee-accessible-scroll overflow-x-hidden flex"
          tabIndex={0}
          aria-label="Certifications Row 2 (Left to Right)"
        >
          <div className="animate-marquee-right flex gap-4 sm:gap-6 pr-4 sm:pr-6">
            {row2Duplicated.map((cert, index) => (
              <CertCard
                key={`r2-${cert.id}-${index}`}
                cert={cert}
                onClick={() => onSelectCert(cert)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
