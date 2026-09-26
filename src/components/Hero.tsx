import React, { useState } from 'react';
import { ChevronRight, Layers } from 'lucide-react';
import heroBgWebp from '../assets/images/himalayan_peaks_sharp_1789732575223.webp';
import heroBgJpg from '../assets/images/himalayan_peaks_sharp_1789732575223.jpg';

interface HeroProps {
  onExploreServices: () => void;
  onViewProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onViewProjects }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[560px] md:min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0F2042]"
    >
      {/* Background Image: Snow-capped Himalayan Mountain Peaks with Pine Trees */}
      <div className="absolute inset-0 z-0 bg-[#0F2042]">
        <picture>
          <source srcSet={heroBgWebp} type="image/webp" />
          <source srcSet={heroBgJpg} type="image/jpeg" />
          <img
            src={heroBgWebp}
            alt="Snow-capped Himalayan mountain peaks with pine trees"
            className={`w-full h-full object-cover object-center transition-opacity duration-700 filter-none ${
              isLoaded ? 'opacity-55' : 'opacity-20'
            }`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            referrerPolicy="no-referrer"
          />
        </picture>
        {/* Transparent dark gradient layer without any blur to maintain text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2042]/40 via-transparent to-[#0F2042]/60 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 tracking-wide shadow-sm">
          <Layers className="w-3.5 h-3.5 text-white/80" />
          <span>Geospatial Excellence &amp; Field Geosciences</span>
        </div>

        {/* Main Heading (H1) */}
        <h1
          id="hero-main-heading"
          className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] tracking-tight leading-[1.25] sm:leading-[1.3] max-w-6xl mb-8 font-['Poppins'] drop-shadow-md text-center"
        >
          <span className="block md:whitespace-nowrap">
            Where Field Expertise Meets Smart Technology and
          </span>
          <span className="block md:whitespace-nowrap">
            Geoscience Intelligence for Sustainable Solutions
          </span>
        </h1>

        {/* CTA Buttons: Center-aligned flex container featuring two buttons side-by-side */}
        <div
          id="hero-cta-group"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none"
        >
          {/* Primary Button */}
          <button
            id="hero-explore-services-btn"
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0F2042] font-semibold text-base px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Our Services</span>
            <ChevronRight className="w-4 h-4 text-[#0F2042]" />
          </button>

          {/* Secondary Button */}
          <button
            id="hero-view-projects-btn"
            onClick={onViewProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/15 text-white font-medium text-base px-7 py-3.5 rounded-full border border-white/90 transition-all duration-300 hover:border-white hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View Projects</span>
          </button>
        </div>
      </div>

      {/* Decorative Bottom Wave / Transition Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  );
};
