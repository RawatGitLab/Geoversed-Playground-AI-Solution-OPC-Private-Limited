import React from 'react';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

interface InsightsSectionProps {
  onReadInsight: (title: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onReadInsight }) => {
  const articles = [
    {
      id: 'dhargad-rejuvenation-report',
      title: 'Rejuvenation Strategy of Dying Springs and Naulas in Dhargad Watershed (Jaigan Valley, District Bageshwar)',
      date: 'January 2026',
      category: 'Report',
      readTime: 'Full Technical Report',
      excerpt: 'Phase-I Rejuvenation of Springs & Naulas of Jatha & Pass Villages — Official GIScience-based micro-plans for groundwater augmentation (Towards Aviral Ganga) by Prof. J.S. Rawat, Er. Varun Rawat, Dr. N.C. Pant.',
      buttonText: 'Report',
    },
    {
      id: 'urban-carrying-capacity',
      title: 'Urban Carrying Capacity Frameworks for Hill Settlements',
      date: 'August 2024',
      category: 'Whitepaper',
      readTime: '8 min read',
      excerpt: 'Methodological synthesis of slope factor of safety, foundation overburden, and municipal drinking water constraints in tourist-dense towns.',
      buttonText: 'Read Article',
    },
    {
      id: 'landslide-hazard-mapping',
      title: 'GIS and Remote Sensing in Post-Monsoon Landslide Hazard Mapping',
      date: 'July 2024',
      category: 'Technical Note',
      readTime: '5 min read',
      excerpt: 'Integrating high-resolution LiDAR with multi-temporal Sentinel-2 imagery for slope deformation tracking and early warning systems.',
      buttonText: 'Read Article',
    },
  ];

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B3864B] tracking-wider uppercase mb-2 font-['Poppins']">
              Knowledge Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2042] font-['Poppins'] tracking-tight">
              Geoscience Insights & Publications
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Scientific papers, field observations, and geospatial methodologies published by GEOVERSED researchers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="bg-[#F8F9FA] rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group hover:border-[#B3864B]/40"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-[#B3864B] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0F2042] font-['Poppins'] mb-3 group-hover:text-[#B3864B] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-xs text-slate-400">{item.readTime}</span>
                <button
                  onClick={() => onReadInsight(item.id || item.title)}
                  className={`text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-all group/link ${
                    idx === 0
                      ? 'px-3.5 py-1.5 rounded-lg bg-[#0F2042] text-white hover:bg-[#B3864B] shadow-xs hover:shadow-sm'
                      : 'text-[#0F2042] hover:text-[#B3864B]'
                  }`}
                >
                  {idx === 0 && <FileText className="w-3.5 h-3.5 text-[#E5B574]" />}
                  <span>{item.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
