import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { ServiceItem } from '../types';
import { CORE_SERVICES } from '../data/servicesData';
import { useLanguage } from '../i18n/LanguageContext';

interface CoreServicesProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
  onOpenDetails: (service: ServiceItem) => void;
}

// Distinct colorful badge, left-accent border, and soft gradient styling per service id
const SERVICE_THEMES: Record<
  string,
  { badgeBg: string; pillBg: string; borderHover: string; leftBorder: string; gradientTint: string }
> = {
  '01': {
    badgeBg: 'bg-cyan-600',
    pillBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    borderHover: 'hover:border-y-cyan-300 hover:border-r-cyan-300',
    leftBorder: 'border-l-cyan-600',
    gradientTint: 'from-cyan-50/50 via-white to-white',
  },
  '02': {
    badgeBg: 'bg-sky-600',
    pillBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
    borderHover: 'hover:border-y-sky-300 hover:border-r-sky-300',
    leftBorder: 'border-l-sky-600',
    gradientTint: 'from-sky-50/50 via-white to-white',
  },
  '03': {
    badgeBg: 'bg-indigo-600',
    pillBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    borderHover: 'hover:border-y-indigo-300 hover:border-r-indigo-300',
    leftBorder: 'border-l-indigo-600',
    gradientTint: 'from-indigo-50/50 via-white to-white',
  },
  '04': {
    badgeBg: 'bg-blue-600',
    pillBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    borderHover: 'hover:border-y-blue-300 hover:border-r-blue-300',
    leftBorder: 'border-l-blue-600',
    gradientTint: 'from-blue-50/50 via-white to-white',
  },
  '05': {
    badgeBg: 'bg-teal-600',
    pillBg: 'bg-teal-50 text-teal-700 border-teal-200/80',
    borderHover: 'hover:border-y-teal-300 hover:border-r-teal-300',
    leftBorder: 'border-l-teal-600',
    gradientTint: 'from-teal-50/50 via-white to-white',
  },
  '06': {
    badgeBg: 'bg-emerald-600',
    pillBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    borderHover: 'hover:border-y-emerald-300 hover:border-r-emerald-300',
    leftBorder: 'border-l-emerald-600',
    gradientTint: 'from-emerald-50/50 via-white to-white',
  },
  '07': {
    badgeBg: 'bg-amber-600',
    pillBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
    borderHover: 'hover:border-y-amber-300 hover:border-r-amber-300',
    leftBorder: 'border-l-amber-600',
    gradientTint: 'from-amber-50/50 via-white to-white',
  },
  '08': {
    badgeBg: 'bg-orange-600',
    pillBg: 'bg-orange-50 text-orange-700 border-orange-200/80',
    borderHover: 'hover:border-y-orange-300 hover:border-r-orange-300',
    leftBorder: 'border-l-orange-600',
    gradientTint: 'from-orange-50/50 via-white to-white',
  },
  '09': {
    badgeBg: 'bg-rose-600',
    pillBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
    borderHover: 'hover:border-y-rose-300 hover:border-r-rose-300',
    leftBorder: 'border-l-rose-600',
    gradientTint: 'from-rose-50/50 via-white to-white',
  },
  '10': {
    badgeBg: 'bg-purple-600',
    pillBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
    borderHover: 'hover:border-y-purple-300 hover:border-r-purple-300',
    leftBorder: 'border-l-purple-600',
    gradientTint: 'from-purple-50/50 via-white to-white',
  },
  '11': {
    badgeBg: 'bg-fuchsia-600',
    pillBg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80',
    borderHover: 'hover:border-y-fuchsia-300 hover:border-r-fuchsia-300',
    leftBorder: 'border-l-fuchsia-600',
    gradientTint: 'from-fuchsia-50/50 via-white to-white',
  },
  '12': {
    badgeBg: 'bg-blue-700',
    pillBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    borderHover: 'hover:border-y-blue-300 hover:border-r-blue-300',
    leftBorder: 'border-l-blue-700',
    gradientTint: 'from-blue-50/50 via-white to-white',
  },
};

export const CoreServices: React.FC<CoreServicesProps> = ({
  onSelectServiceForQuote,
  onOpenDetails,
}) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    {
      key: 'All',
      label: {
        en: 'All (12)',
        hi: 'सभी 12 सेवाएँ',
        te: 'అన్నీ (12)',
        mr: 'सर्व (12)',
        bn: 'সমস্ত (১২)',
      },
    },
    {
      key: 'Digital Geospatial',
      label: {
        en: 'Digital Geospatial',
        hi: 'डिजिटल भू-स्थानिक',
        te: 'డిజిటల్ జియోస్పేషియల్',
        mr: 'डिजिटल भू-स्थानिक',
        bn: 'ডিজিটাল ভূ-स्थानিক',
      },
    },
    {
      key: 'Planning & Governance',
      label: {
        en: 'Planning & Governance',
        hi: 'नियोजन व जी-गवर्नेंस',
        te: 'ప్లానింగ్ & పాలన',
        mr: 'नियोजन व प्रशासन',
        bn: 'পরিকল্পনা ও প্রশাসন',
      },
    },
    {
      key: 'Hydrology & Environment',
      label: {
        en: 'Hydrology & Environment',
        hi: 'जल विज्ञान व पर्यावरण',
        te: 'హైడ్రాలజీ & పర్యావరణం',
        mr: 'जलविज्ञान व पर्यावरण',
        bn: 'জলবিজ্ঞান ও পরিবেশ',
      },
    },
    {
      key: 'Climate & Settlements',
      label: {
        en: 'Climate & Settlements',
        hi: 'जलवायु व बस्तियाँ',
        te: 'వాతావరణం & నివాసాలు',
        mr: 'हवामान व वसाहती',
        bn: 'জলবায়ু ও জনবসতি',
      },
    },
    {
      key: 'AI & Capacity Building',
      label: {
        en: 'AI & Capacity Building',
        hi: 'एआई व क्षमता निर्माण',
        te: 'AI & సామర్థ్య పెంపు',
        mr: 'एआय व क्षमता बांधणी',
        bn: 'এআই ও সক্ষমতা বৃদ্ধি',
      },
    },
  ];

  // Filter logic based on category
  const filteredServices = CORE_SERVICES.filter((service) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Digital Geospatial') {
      return ['01', '02', '03'].includes(service.id);
    }
    if (selectedCategory === 'Planning & Governance') {
      return ['03', '04'].includes(service.id);
    }
    if (selectedCategory === 'Hydrology & Environment') {
      return ['05', '06', '07'].includes(service.id);
    }
    if (selectedCategory === 'Climate & Settlements') {
      return ['07', '08', '09'].includes(service.id);
    }
    if (selectedCategory === 'AI & Capacity Building') {
      return ['10', '11', '12'].includes(service.id);
    }
    return true;
  });

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#F5E4E4] border-t border-[#800000]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-600 text-xs font-semibold tracking-wider uppercase mb-3 font-['Poppins']">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('services.badge')}</span>
          </div>
          <h2
            id="services-section-heading"
            className="text-slate-900 font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight font-['Poppins'] mb-4"
          >
            {t('services.title')}
          </h2>
          <p
            id="services-section-subtext"
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal"
          >
            {t('services.subtitle')}
          </p>
        </div>

        {/* Category Badges Toolbar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto w-full py-1 mb-10 sm:mb-12 pb-2 px-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
              }`}
            >
              {cat.label[language] || cat.label.en}
            </button>
          ))}
        </div>

        {/* Single-Column Full-Width Vertical Banner Stack */}
        <div
          id="services-grid"
          className="flex flex-col gap-6"
        >
          {filteredServices.map((service, index) => {
            const theme = SERVICE_THEMES[service.id] || {
              badgeBg: 'bg-blue-600',
              pillBg: 'bg-blue-50 text-blue-700 border-blue-200',
              borderHover: 'hover:border-y-blue-300 hover:border-r-blue-300',
              leftBorder: 'border-l-blue-600',
              gradientTint: 'from-blue-50/50 via-white to-white',
            };

            return (
              <motion.article
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.18), ease: 'easeOut' }}
                className={`group w-full bg-gradient-to-r ${theme.gradientTint} rounded-2xl p-5 sm:p-6 lg:px-8 lg:py-6 border-y border-r border-slate-200/80 border-l-4 ${theme.leftBorder} ${theme.borderHover} shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8 relative overflow-hidden scroll-mt-28`}
              >
                {/* Left Side: Number Badge (01–12) & Category Tag */}
                <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-2.5 lg:w-52 shrink-0">
                  <div
                    id={`badge-service-${service.id}`}
                    className={`inline-flex items-center justify-center ${theme.badgeBg} text-white font-bold text-xs sm:text-sm tracking-wider px-3 py-1.5 rounded-lg shadow-2xs font-['Poppins']`}
                  >
                    {service.id}
                  </div>

                  {service.category && (
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${theme.pillBg} uppercase tracking-wider leading-tight`}
                    >
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Middle / Main: Title + Short Description */}
                <div className="flex-1 min-w-0">
                  <h3
                    id={`service-title-${service.id}`}
                    className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug font-['Poppins']"
                  >
                    {service.title}
                  </h3>

                  <p
                    id={`service-desc-${service.id}`}
                    className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl"
                  >
                    {service.description}
                  </p>
                </div>

                {/* Right Side (or Bottom on Mobile/Tablet): Action Buttons */}
                <div className="pt-4 border-t border-slate-200/70 lg:pt-0 lg:border-t-0 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    id={`service-about-btn-${service.id}`}
                    onClick={() => onOpenDetails(service)}
                    className="w-full sm:w-auto justify-center text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 transition-colors cursor-pointer py-2.5 px-4 rounded-xl border border-slate-200/90 shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>{t('services.viewSpecifications')}</span>
                  </button>

                  <button
                    type="button"
                    id={`service-quote-btn-${service.id}`}
                    onClick={() => onSelectServiceForQuote(service)}
                    className="w-full sm:w-auto justify-center text-xs sm:text-sm font-semibold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200/80 hover:border-blue-600 inline-flex items-center gap-1.5 group/btn cursor-pointer py-2.5 px-4 rounded-xl transition-all duration-200 whitespace-nowrap"
                  >
                    <span>{t('services.requestQuote')}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No services found in this category.
            <button
              onClick={() => setSelectedCategory('All')}
              className="ml-2 text-blue-600 font-semibold underline cursor-pointer"
            >
              Show all services
            </button>
          </div>
        )}

        {/* Bottom Banner: Royal Indigo CTA Banner matching reference */}
        <div className="mt-16 bg-[#1E1B4B] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              Tailored Himalayan Solutions
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-white">
              Need a customized geospatial, geomorphological or geographical survey?
            </h4>
            <p className="text-indigo-200 text-sm mt-2 leading-relaxed">
              Our multidisciplinary team delivers precision mapping, field data acquisition, and spatial analytics for public agencies and research institutions.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForQuote(CORE_SERVICES[0])}
            className="shrink-0 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 cursor-pointer font-['Poppins']"
          >
            Consult With Our Experts
          </button>
        </div>
      </div>
    </section>
  );
};
