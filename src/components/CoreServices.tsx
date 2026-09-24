import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Search } from 'lucide-react';
import { ServiceItem } from '../types';
import { CORE_SERVICES } from '../data/servicesData';

interface CoreServicesProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
  onOpenDetails: (service: ServiceItem) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({
  onSelectServiceForQuote,
  onOpenDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Digital Geospatial',
    'Planning & Governance',
    'Hydrology & Environment',
    'Climate & Settlements',
    'AI & Capacity Building',
  ];

  // Filter logic while keeping all cards readily accessible
  const filteredServices = CORE_SERVICES.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.id.includes(searchQuery);

    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Digital Geospatial') {
      return matchesSearch && ['01', '02', '03'].includes(service.id);
    }
    if (selectedCategory === 'Planning & Governance') {
      return matchesSearch && ['03', '04'].includes(service.id);
    }
    if (selectedCategory === 'Hydrology & Environment') {
      return matchesSearch && ['05', '06', '07'].includes(service.id);
    }
    if (selectedCategory === 'Climate & Settlements') {
      return matchesSearch && ['07', '08', '09'].includes(service.id);
    }
    if (selectedCategory === 'AI & Capacity Building') {
      return matchesSearch && ['10', '11', '12'].includes(service.id);
    }
    return matchesSearch;
  });

  return (
    <section id="services" className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="services-section-heading"
            className="text-[#0F2042] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight font-['Poppins'] mb-4"
          >
            Core Services
          </h2>
          <p
            id="services-section-subtext"
            className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal"
          >
            Advanced geoscience and GIS solutions engineered specifically for the intricate geological and developmental challenges of Himalayan regions and fragile ecological landscapes.
          </p>
        </div>

        {/* Optional quick search & filter toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F2042] text-white shadow-sm'
                    : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#F8F9FA] border border-slate-200 rounded-full focus:outline-none focus:border-[#B3864B] focus:ring-1 focus:ring-[#B3864B] transition-colors"
            />
          </div>
        </div>

        {/* Grid Layout: Responsive 3-column CSS Grid (collapsing to 1-column on mobile) */}
        <div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-white hover:bg-[#F8F9FA] border border-slate-100/90 hover:border-[#B3864B]/40 rounded-xl p-7 transition-all duration-300 shadow-[0_2px_12px_rgba(15,32,66,0.06)] hover:shadow-[0_12px_28px_rgba(15,32,66,0.12)] flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle accent corner glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B3864B]/5 rounded-bl-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

              <div>
                {/* Top Badge: Small distinctive bronze rectangular badge at top-left with two-digit ID number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    id={`badge-service-${service.id}`}
                    className="inline-flex items-center justify-center bg-[#B3864B] text-white font-bold text-xs tracking-wider px-2.5 py-1 rounded-[4px] shadow-sm font-['Poppins']"
                  >
                    {service.id}
                  </div>

                  {/* Category Tag */}
                  {service.category && (
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Bold Card Title */}
                <h3
                  id={`service-title-${service.id}`}
                  className="font-bold text-lg sm:text-xl text-[#0F2042] group-hover:text-[#0F2042] mb-3 leading-snug font-['Poppins']"
                >
                  {service.title}
                </h3>

                {/* Short Text Description Block */}
                <p
                  id={`service-desc-${service.id}`}
                  className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4"
                >
                  {service.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between mt-auto gap-2">
                <button
                  id={`service-about-btn-${service.id}`}
                  onClick={() => onOpenDetails(service)}
                  className="text-xs font-semibold text-[#0F2042] hover:text-[#B3864B] bg-slate-100/80 hover:bg-[#0F2042]/5 transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-200/80 hover:border-[#B3864B]/40 inline-flex items-center gap-1.5"
                >
                  <span>About Service</span>
                </button>

                <button
                  id={`service-quote-btn-${service.id}`}
                  onClick={() => onSelectServiceForQuote(service)}
                  className="text-xs font-semibold text-[#B3864B] hover:text-[#9c733d] inline-flex items-center gap-1 group/btn cursor-pointer py-1.5 px-2"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No services found matching "{searchQuery}".
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="ml-2 text-[#B3864B] font-semibold underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom Banner with Fast Call to Action */}
        <div className="mt-16 bg-[#F8F9FA] border border-slate-200/80 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B3864B] tracking-wider uppercase mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#B3864B]" />
              Tailored Himalayan Solutions
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#0F2042] font-['Poppins']">
              Need a customized geospatial or geological survey?
            </h4>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Our multidisciplinary team delivers precision mapping, field data acquisition, and spatial analytics for public agencies and research institutions.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForQuote(CORE_SERVICES[0])}
            className="shrink-0 bg-[#0F2042] hover:bg-[#162c5c] text-white text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Consult With Our Experts
          </button>
        </div>
      </div>
    </section>
  );
};
