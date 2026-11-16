import React, { useState } from 'react';
import { DIRECTOR_CERTIFICATIONS } from '../data/directorData';
import { CertificationItem } from '../types';
import { CertificationMarquee } from './director/CertificationMarquee';
import { CertLightboxModal } from './director/CertLightboxModal';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-24 bg-white text-slate-900 overflow-hidden scroll-mt-20 border-t border-slate-200"
    >
      {/* Subtle geospatial grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CertificationMarquee
          certifications={DIRECTOR_CERTIFICATIONS}
          onSelectCert={(cert) => setSelectedCert(cert)}
        />
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <CertLightboxModal
          cert={selectedCert}
          isOpen={true}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
