import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA } from '../data/servicesData';

interface InsightsSectionProps {
  onReadInsight?: (title: string) => void;
  onOpenQuote?: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onOpenQuote }) => {
  // First three project research reports moved from section#projects into section#insights
  const researchReports = PROJECTS_DATA.slice(0, 3);

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B3864B] tracking-wider uppercase mb-2 font-['Poppins']">
              Knowledge Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2042] font-['Poppins'] tracking-tight">
              Geoscience Insights &amp; Publications
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Official technical research reports, ground-truthed hydrological micro-plans, and geospatial methodologies published by GEOVERSED researchers.
            </p>
          </div>
        </div>

        {/* 📄 The Official Research DPRs & Technical Reports */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B3864B] uppercase tracking-wider font-['Poppins']">
                <FileText className="w-3.5 h-3.5 text-[#B3864B]" />
                <span>Official Technical Reports &amp; DPRs</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F2042] font-['Poppins'] mt-1">
                Published Watershed Rejuvenation Technical Reports
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#B3864B] bg-[#B3864B]/10 px-3 py-1 rounded-full border border-[#B3864B]/20 self-start sm:self-auto font-['Poppins']">
              Full Technical PDFs Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {researchReports.map((item) => (
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

                  {item.reportUrl && (
                    <div className="mb-3">
                      <a
                        id={`project-report-btn-${item.id}`}
                        href={item.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#B3864B]/10 hover:bg-[#B3864B] text-[#B3864B] hover:text-white font-semibold text-xs transition-all duration-200 border border-[#B3864B]/25 hover:border-[#B3864B] shadow-xs cursor-pointer group/btn"
                        title="Open Technical Research Report (PDF)"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Report</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70 group-hover/btn:opacity-100" />
                      </a>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-[#0F2042] font-['Poppins'] mb-3 group-hover:text-[#B3864B] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                  <span className="text-slate-400 font-medium">{item.tag}</span>
                  {onOpenQuote && (
                    <button
                      onClick={onOpenQuote}
                      className="text-[#0F2042] font-semibold hover:text-[#B3864B] inline-flex items-center gap-1 cursor-pointer transition-colors ml-auto"
                    >
                      <span>Inquire for Similar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
