import React, { useState } from 'react';
import { Layers, Map, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenQuote: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuote }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Spring Shed Revival & Hydrogeology Mapping',
      region: 'Kumaon & Garhwal Catchments',
      category: 'Hydrology',
      tag: 'Water Security',
      summary: 'Delineating recharge zones and creating participatory 3D GIS models for 150+ drying perennial springs in Almora and Pithoragarh districts.',
    },
    {
      id: 2,
      title: 'Hill Town Carrying Capacity Assessment',
      region: 'Upper Himalayan Settlements',
      category: 'Urban Planning',
      tag: 'Hazard Assessment',
      summary: 'Multi-criteria GIS spatial evaluation measuring slope stability, aquifer extraction rates, and foundation load limits for expanding tourist towns.',
    },
    {
      id: 3,
      title: 'State-Level Web-GIS Decision Support Portal',
      region: 'Uttarakhand Regional Planning',
      category: 'Web-GIS',
      tag: 'Digital Governance',
      summary: 'Interactive enterprise geospatial platform providing real-time spatial analytics, land-use zoning layers, and disaster mitigation dashboards.',
    },
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
              Selected Geoscience Projects
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Real-world implementations demonstrating the convergence of rigorous field science and cutting-edge GIS technology.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'Hydrology', 'Urban Planning', 'Web-GIS'].map((filter) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8F9FA] rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group hover:border-[#B3864B]/40"
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

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{item.tag}</span>
                <button
                  onClick={onOpenQuote}
                  className="text-[#0F2042] font-semibold hover:text-[#B3864B] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Inquire for Similar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
