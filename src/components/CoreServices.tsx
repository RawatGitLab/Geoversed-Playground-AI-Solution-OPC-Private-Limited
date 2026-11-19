import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { ServiceItem } from '../types';
import { CORE_SERVICES } from '../data/servicesData';
import { useLanguage } from '../i18n/LanguageContext';
import { CylinderCarousel, CylinderCarouselImage } from './ui/cylinder-carousel';
import service1Banner from '../assets/images/service_1_banner_1789822361499.webp';
import service2Banner from '../assets/images/service_2_banner_1789920757626.webp';
import service3Banner from '../assets/images/service_3_banner_1789921059747.webp';
import service4Banner from '../assets/images/service_4_banner_1789921283127.webp';
import service5Banner from '../assets/images/service_5_banner_1789921414372.webp';
import service6Banner from '../assets/images/service_6_banner_1789921648768.webp';
import service7Banner from '../assets/images/service_7_banner_1789921828579.webp';
import service8Banner from '../assets/images/service_8_banner_1790052418156.webp';
import service9Banner from '../assets/images/service_9_banner_1790053167291.webp';
import service10Banner from '../assets/images/service_10_banner_1790053408029.webp';
import service11Banner from '../assets/images/service_11_banner_1790053697808.webp';
import service12Banner from '../assets/images/service_12_banner_1790054191491.webp';

interface CoreServicesProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
  onOpenDetails: (service: ServiceItem) => void;
}

const SERVICE_BANNERS: Record<string, string> = {
  '01': service1Banner,
  '02': service2Banner,
  '03': service3Banner,
  '04': service4Banner,
  '05': service5Banner,
  '06': service6Banner,
  '07': service7Banner,
  '08': service8Banner,
  '09': service9Banner,
  '10': service10Banner,
  '11': service11Banner,
  '12': service12Banner,
};

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
  const { t } = useLanguage();
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  // Sync header anchor links (#service-card-01..12) to the 12-pillar carousel
  useEffect(() => {
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#service-card-(\d{2})$/);
      if (!match) return;
      const idx = CORE_SERVICES.findIndex((s) => s.id === match[1]);
      if (idx !== -1) {
        setActivePillarIndex(idx);
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const pillarCarouselItems: CylinderCarouselImage[] = useMemo(
    () =>
      CORE_SERVICES.map((service) => ({
        src: SERVICE_BANNERS[service.id] || service1Banner,
        alt: service.title,
        id: service.id,
        title: service.title,
        category: service.category,
        badgeBg: SERVICE_THEMES[service.id]?.badgeBg || 'bg-[#800000]',
      })),
    []
  );

  const activePillarService = CORE_SERVICES[activePillarIndex] || CORE_SERVICES[0];
  const activePillarTheme = SERVICE_THEMES[activePillarService.id] || SERVICE_THEMES['01'];

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#F5E4E4] border-t border-[#800000]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
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

        {/* 12-Pillar 3D Cylinder Carousel Showcase */}
        <div
          id="services-pillar-carousel"
          className="w-full rounded-3xl bg-[#fff3ed] border border-[#800000]/15 shadow-lg overflow-hidden mb-12 sm:mb-14"
        >
          <CylinderCarousel
            images={pillarCarouselItems}
            activeIndex={activePillarIndex}
            onActiveChange={setActivePillarIndex}
            onSelectItem={(_, index) => {
              const target = CORE_SERVICES[index];
              if (target) onOpenDetails(target);
            }}
          />

          {/* Active Pillar Spotlight Panel */}
          <div className="bg-white/95 border-t border-[#800000]/10 px-5 sm:px-8 py-5 sm:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span
                  className={`inline-flex items-center justify-center ${activePillarTheme.badgeBg} text-white font-bold text-xs tracking-wider px-2.5 py-1 rounded-lg font-['Poppins']`}
                >
                  PILLAR {activePillarService.id}
                </span>
                {activePillarService.category && (
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${activePillarTheme.pillBg} uppercase tracking-wider`}
                  >
                    {activePillarService.category}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 leading-snug font-['Poppins'] mb-1.5">
                {activePillarService.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                {activePillarService.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => onOpenDetails(activePillarService)}
                className="w-full sm:w-auto justify-center text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 transition-colors cursor-pointer py-2.5 px-4 rounded-xl border border-slate-200/90 shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{t('services.viewSpecifications')}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectServiceForQuote(activePillarService)}
                className="w-full sm:w-auto justify-center text-xs sm:text-sm font-semibold text-white bg-[#800000] hover:bg-[#600000] border border-[#800000] inline-flex items-center gap-1.5 group/btn cursor-pointer py-2.5 px-4 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm"
              >
                <span>{t('services.requestQuote')}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Royal Indigo CTA Banner matching reference */}
        <div className="mt-12 bg-[#1E1B4B] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
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
