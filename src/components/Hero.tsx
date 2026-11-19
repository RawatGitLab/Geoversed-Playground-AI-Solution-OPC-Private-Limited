import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, Layers, MapPin, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LiquidMetalButton, LiquidMetalSurface } from './ui/liquid-metal';
import heroBgWebp from '../assets/images/himalayan_peaks_sharp_1789732575223.webp';
import heroBgJpg from '../assets/images/himalayan_peaks_sharp_1789732575223.jpg';

interface HeroProps {
  onExploreServices: () => void;
  onViewProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onViewProjects }) => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const vantaCloudsRef = useRef<{ destroy: () => void } | null>(null);

  // Initialize Vanta.Clouds 3D atmospheric animation
  useEffect(() => {
    let isMounted = true;

    const initClouds = () => {
      if (!isMounted || !cloudsRef.current || vantaCloudsRef.current) return;
      if (typeof window !== 'undefined' && window.innerWidth < 768) return;
      const win = window as unknown as {
        VANTA?: {
          CLOUDS: (options: Record<string, unknown>) => { destroy: () => void };
        };
      };

      if (win.VANTA && typeof win.VANTA.CLOUDS === 'function') {
        try {
          vantaCloudsRef.current = win.VANTA.CLOUDS({
            el: cloudsRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            skyColor: 0x0e2238,
            cloudColor: 0xffffff,
            cloudShadowColor: 0x19324a,
            sunColor: 0xffa020,
            speed: 1.1,
          });
        } catch (err) {
          console.warn('Vanta Clouds initialization note:', err);
        }
      }
    };

    const win = window as unknown as { VANTA?: { CLOUDS?: unknown } };
    if (win.VANTA?.CLOUDS) {
      initClouds();
    } else {
      const interval = setInterval(() => {
        const currentWin = window as unknown as { VANTA?: { CLOUDS?: unknown } };
        if (currentWin.VANTA?.CLOUDS) {
          clearInterval(interval);
          initClouds();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 6000);

      return () => {
        isMounted = false;
        clearInterval(interval);
        clearTimeout(timeout);
        if (vantaCloudsRef.current) {
          vantaCloudsRef.current.destroy();
          vantaCloudsRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (vantaCloudsRef.current) {
        vantaCloudsRef.current.destroy();
        vantaCloudsRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[600px] md:min-h-[680px] lg:min-h-[740px] flex flex-col justify-between overflow-hidden"
    >
      {/* 3D Vanta Clouds Layered Over Himalayan Mountain Peaks Photo */}
      <div ref={cloudsRef} className="absolute inset-0 z-0 overflow-hidden">
        <picture className="absolute inset-0 z-0 block w-full h-full">
          <source srcSet={heroBgWebp} type="image/webp" />
          <source srcSet={heroBgJpg} type="image/jpeg" />
          <img
            src={heroBgWebp}
            alt="Snow-capped Himalayan mountain peaks with pine trees"
            className={`w-full h-full object-cover object-center brightness-[0.85] transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            referrerPolicy="no-referrer"
          />
        </picture>
        {/* Subtle Darkening Scrim */}
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none z-[2]" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 text-center flex flex-col items-center flex-1 justify-center">
        {/* Subtle Pill Badge (Liquid Metal) */}
        <div
          className="liquid-metal-btn group relative inline-flex items-center justify-center rounded-full p-[2px] overflow-hidden mb-5 select-none transition-transform duration-300 hover:-translate-y-0.5"
          style={
            {
              '--lm-back': '#3b82f6',
              '--lm-tint': '#93c5fd',
              '--lm-duration': '4.2s',
              '--lm-duration-alt': '6.4s',
            } as React.CSSProperties
          }
        >
          <span aria-hidden="true" className="liquid-metal-layer liquid-metal-primary" />
          <span aria-hidden="true" className="liquid-metal-layer liquid-metal-secondary" />
          <span className="liquid-metal-core relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-medium tracking-wide">
            <span aria-hidden="true" className="liquid-metal-sheen" />
            <span className="relative z-10 w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
            <span className="relative z-10">{t('hero.badge')}</span>
          </span>
        </div>

        {/* Main Heading (H1) with vibrant Cyan / Sky highlight */}
        <h1
          id="hero-main-heading"
          className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[42px] tracking-tight leading-[1.25] sm:leading-[1.28] w-full max-w-5xl mb-8 font-['Poppins'] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] break-words px-2"
        >
          <span className="block mb-1 whitespace-nowrap text-[clamp(0.65rem,2.95vw,2.25rem)]">
            {t('hero.heading1')}
          </span>
          <span className="block text-white font-extrabold whitespace-nowrap text-[clamp(0.63rem,2.85vw,2.2rem)]">
            {t('hero.heading2')}
          </span>
        </h1>

        {/* CTA Buttons: Side-by-side on tablet/desktop */}
        <div
          id="hero-cta-group"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none mb-10 sm:mb-12"
        >
          {/* Primary Action Button (Liquid Metal Button) */}
          <LiquidMetalButton
            id="hero-explore-services-btn"
            onClick={onExploreServices}
            icon={<ArrowRight className="w-5 h-5" />}
            metalConfig={{
              colorBack: '#3b82f6',
              colorTint: '#93c5fd',
            }}
            className="w-full sm:w-auto"
          >
            {t('hero.exploreServices')}
          </LiquidMetalButton>

          {/* Secondary Action Button (Liquid Metal Button) */}
          <LiquidMetalButton
            id="hero-view-projects-btn"
            onClick={onViewProjects}
            icon={<ArrowRight className="w-5 h-5" />}
            metalConfig={{
              colorBack: '#3b82f6',
              colorTint: '#93c5fd',
            }}
            className="w-full sm:w-auto"
          >
            {t('hero.viewProjects')}
          </LiquidMetalButton>
        </div>

        {/* Floating 3-Card Liquid Metal Stats Bar */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left">
          {/* Stat 1: Clickable link to Uttarakhand Geo Portal */}
          <LiquidMetalSurface
            href="https://uttarakhand-geo-portal.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Uttarakhand Geo Portal (External Link)"
            roundedClassName="rounded-2xl"
            className="transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            innerClassName="p-4 sm:p-4.5"
            metalConfig={{ colorBack: '#3b82f6', colorTint: '#93c5fd' }}
          >
            <div className="relative z-10 flex items-center justify-between mb-1">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-['Poppins']">13</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-sky-300 transition-colors" />
            </div>
            <div className="relative z-10 text-xs sm:text-sm font-semibold text-white group-hover:text-sky-200 transition-colors">Districts Covered</div>
            <div className="relative z-10 text-[11px] text-slate-200">Uttarakhand Himalayan Field Atlas ↗</div>
          </LiquidMetalSurface>

          {/* Stat 2: Clickable link to Core Capabilities / Services section */}
          <LiquidMetalSurface
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              onExploreServices();
            }}
            title="Explore 12 Core Capabilities & Services"
            roundedClassName="rounded-2xl"
            className="transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            innerClassName="p-4 sm:p-4.5"
            metalConfig={{ colorBack: '#3b82f6', colorTint: '#93c5fd' }}
          >
            <div className="relative z-10 flex items-center justify-between mb-1">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-['Poppins']">12</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/60 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="relative z-10 text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">Core Capabilities</div>
            <div className="relative z-10 text-[11px] text-slate-200">Geoscience, AI &amp; GIS Intelligence ↓</div>
          </LiquidMetalSurface>

          {/* Stat 3: Clickable link to MOA-INC-33 Document */}
          <LiquidMetalSurface
            href="/assets/aistudio/MOA-INC-33_GEOVERSED_d7b64cd7.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="View Official MCA Form INC-33 e-MOA Document (PDF)"
            roundedClassName="rounded-2xl"
            className="transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            innerClassName="p-4 sm:p-4.5"
            metalConfig={{ colorBack: '#3b82f6', colorTint: '#93c5fd' }}
          >
            <div className="relative z-10 flex items-center justify-between mb-1">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-['Poppins']">INC-33</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-emerald-300 transition-colors" />
            </div>
            <div className="relative z-10 text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-200 transition-colors">MCA Statutory Registered</div>
            <div className="relative z-10 text-[11px] text-slate-200 group-hover:text-white transition-colors">View Form INC-33 e-MOA ↗</div>
          </LiquidMetalSurface>
        </div>
      </div>

      {/* Decorative Wave Transition Divider into White Page Body */}
      <div className="relative z-10 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#EBF5FE]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
