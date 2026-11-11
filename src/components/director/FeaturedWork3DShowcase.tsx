import React, { useState, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { FeaturedWorkItem } from '../../types';
import { FeaturedWorkCard } from './FeaturedWorkCard';

interface FeaturedWork3DShowcaseProps {
  items: FeaturedWorkItem[];
}

export const FeaturedWork3DShowcase: React.FC<FeaturedWork3DShowcaseProps> = ({ items }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [speed, setSpeed] = useState<number>(55); // seconds for one 50% cycle
  const [manualShift, setManualShift] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate the 10 items once (20 items total, 10 in each 50% cycle) for a seamless infinite loop
  const duplicatedItems = [...items, ...items];

  const handleStep = (direction: 'left' | 'right') => {
    // Measure dynamic step distance (card width + gap)
    let step = 460;
    if (trackRef.current && trackRef.current.children.length > 1) {
      const first = trackRef.current.children[0] as HTMLElement;
      const second = trackRef.current.children[1] as HTMLElement;
      if (first && second) {
        const delta = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
        if (delta > 100) step = delta;
      }
    }

    setManualShift((prev) => {
      // Left arrow: shift cards to the right (+step) to view previous
      // Right arrow: shift cards to the left (-step) to view next
      return direction === 'left' ? prev + step : prev - step;
    });
  };

  const isMotionPaused = isPaused || isHovered;

  return (
    <div className="w-full space-y-6">
      {/* 3D Showcase Header Controls & Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 sm:px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              isMotionPaused ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'
            }`}
          />
          <span className="font-['Poppins']">3D Spatial Stream</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-400 font-mono text-[11px]">
            {isMotionPaused ? 'Paused (Hover / Nav Active)' : 'Right → Left Flow (10 Projects)'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Use left &amp; right arrows or hover to pause
          </span>
        </div>

        {/* Play / Pause & Speed Adjuster */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setSpeed(75)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                speed === 75
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Slow 3D Flow"
            >
              0.75x
            </button>
            <button
              onClick={() => setSpeed(55)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                speed === 55
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Normal 3D Flow"
            >
              1x
            </button>
            <button
              onClick={() => setSpeed(32)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                speed === 32
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Fast 3D Flow"
            >
              1.75x
            </button>
          </div>

          {/* Pause / Play Toggle Button */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-xs transition-all cursor-pointer"
            title={isPaused ? 'Resume 3D Motion' : 'Pause 3D Motion'}
            aria-label={isPaused ? 'Resume 3D Motion' : 'Pause 3D Motion'}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                <span>Pause</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        className="relative w-full overflow-hidden perspective-1200 py-6 marquee-pause-hover group/stage"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >


        {/* Left Floating Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleStep('left');
          }}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white hover:text-cyan-400 border border-slate-700/80 hover:border-cyan-400 shadow-2xl shadow-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
          aria-label="Previous card (scroll right)"
          title="Previous Project (Left)"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Right Floating Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleStep('right');
          }}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white hover:text-cyan-400 border border-slate-700/80 hover:border-cyan-400 shadow-2xl shadow-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
          aria-label="Next card (scroll left)"
          title="Next Project (Right)"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* 3D Stage tilted subtly on X-axis for genuine spatial depth */}
        <div
          ref={scrollContainerRef}
          className="marquee-accessible-scroll overflow-x-hidden flex preserve-3d"
          style={{
            transform: 'rotateX(3deg)',
            transformStyle: 'preserve-3d',
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              handleStep('left');
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              handleStep('right');
            }
          }}
          aria-label="3D Moving Featured Projects (Right to Left)"
        >
          {/* Manual Shift Wrapper */}
          <div
            className="transition-transform duration-500 ease-out preserve-3d"
            style={{
              transform: `translate3d(${manualShift}px, 0, 0)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              ref={trackRef}
              className="animate-marquee-3d-left flex gap-6 sm:gap-8 pr-6 sm:pr-8"
              style={{
                animationDuration: `${speed}s`,
                animationPlayState: isMotionPaused ? 'paused' : 'running',
                transformStyle: 'preserve-3d',
              }}
            >
              {duplicatedItems.map((item, idx) => (
                <FeaturedWorkCard
                  key={`3d-${item.id}-${idx}`}
                  item={item}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
