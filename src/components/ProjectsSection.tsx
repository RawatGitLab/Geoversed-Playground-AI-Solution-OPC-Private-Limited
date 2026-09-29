import React, { useState } from 'react';
import { Layers, Map, ExternalLink, FileText } from 'lucide-react';
import { PROJECTS_DATA } from '../data/servicesData';

interface ProjectsSectionProps {
  onOpenQuote: () => void;
  onOpenReport?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuote, onOpenReport }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B3864B] tracking-wider uppercase mb-2 font-['Poppins']">
              Featured Engagements
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2042] font-['Poppins'] tracking-tight">
              Selected Geo Spatial Science Projects
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Real-world implementations demonstrating the convergence of rigorous field science and cutting-edge GIS technology.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'Hydrology', 'Urban Planning', 'Web-GIS', 'Infrastructure', 'Environment'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#0F2042] text-white shadow-sm'
                    : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              id={`project-card-${item.id}`}
              className="bg-[#F8F9FA] rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group hover:border-[#B3864B]/40 scroll-mt-24"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#B3864B] font-semibold mb-3">
                  <span className="uppercase tracking-wider">{item.category}</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-normal">
                    {item.region}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2042] font-['Poppins'] mb-3 group-hover:text-[#B3864B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-medium">{item.tag}</span>
                <div className="flex items-center gap-2.5">
                  {item.id === 1 && onOpenReport && (
                    <button
                      type="button"
                      onClick={onOpenReport}
                      className="px-3 py-1.5 rounded-lg bg-[#0F2042] text-white hover:bg-[#B3864B] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs hover:shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#E5B574]" />
                      <span>Report</span>
                    </button>
                  )}
                  <button
                    onClick={onOpenQuote}
                    className="text-[#0F2042] font-semibold hover:text-[#B3864B] inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Inquire for Similar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
