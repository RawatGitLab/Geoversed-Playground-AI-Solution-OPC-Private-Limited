import React from 'react';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

interface InsightsSectionProps {
  onReadInsight: (title: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onReadInsight }) => {
  const articles = [
    {
      title: 'Springshed Hydrogeology in Lesser Himalayas: Recharge Zone Dynamics',
      date: 'September 2024',
      category: 'Research Bulletin',
      readTime: '6 min read',
      excerpt: 'Analyzing isotope signatures and rainfall infiltration patterns to delineate critical recharge zones for natural mountain Naulas in Almora.',
    },
    {
      title: 'Urban Carrying Capacity Frameworks for Hill Settlements',
      date: 'August 2024',
      category: 'Whitepaper',
      readTime: '8 min read',
      excerpt: 'Methodological synthesis of slope factor of safety, foundation overburden, and municipal drinking water constraints in tourist-dense towns.',
    },
    {
      title: 'GIS and Remote Sensing in Post-Monsoon Landslide Hazard Mapping',
      date: 'July 2024',
      category: 'Technical Note',
      readTime: '5 min read',
      excerpt: 'Integrating high-resolution LiDAR with multi-temporal Sentinel-2 imagery for slope deformation tracking and early warning systems.',
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
                  onClick={() => onReadInsight(item.title)}
                  className="text-xs font-semibold text-[#0F2042] hover:text-[#B3864B] inline-flex items-center gap-1 cursor-pointer transition-colors group/link"
                >
                  <span>Read Article</span>
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
