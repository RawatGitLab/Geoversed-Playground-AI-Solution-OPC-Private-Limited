import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { DirectorStat } from '../../types';

interface StatsStripProps {
  stats: DirectorStat[];
}

const StatCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums font-extrabold font-['Poppins']">
      {count}
      <span className="text-cyan-400 font-semibold">{suffix}</span>
    </span>
  );
};

export const StatsStrip: React.FC<StatsStripProps> = ({ stats }) => {
  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative group bg-[#23153c]/95 hover:bg-[#23153c] md:backdrop-blur-md border border-[#3b2361]/70 hover:border-fuchsia-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-md hover:shadow-fuchsia-500/15 text-center overflow-hidden"
        >
          {/* Subtle top corner ambient glow */}
          <div className="hidden md:block absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

          <div className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-1">
            <StatCounter value={stat.value} suffix={stat.suffix} />
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-200 font-['Poppins'] tracking-normal">
            {stat.label}
          </h4>

          {stat.description && (
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              {stat.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
