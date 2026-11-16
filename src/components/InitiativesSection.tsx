import React from 'react';
import { Layers } from 'lucide-react';
import { DIRECTOR_FEATURED_WORK } from '../data/directorData';
import { FeaturedWork3DShowcase } from './director/FeaturedWork3DShowcase';

export const InitiativesSection: React.FC = () => {
  return (
    <section
      id="initiatives"
      className="relative py-20 sm:py-24 bg-[#F1F5F9] text-slate-900 overflow-hidden scroll-mt-20 border-t border-slate-200"
    >
      {/* Subtle geospatial grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3 font-['Poppins']">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Flagship Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Poppins'] tracking-tight">
            Notable Initiatives &amp; Deployments
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            Selected projects delivering measurable ecological, economic, and administrative outcomes for public institutions.
          </p>
        </div>

        {/* 3D Right-to-Left Conveyor Showcase */}
        <FeaturedWork3DShowcase items={DIRECTOR_FEATURED_WORK} />
      </div>
    </section>
  );
};
