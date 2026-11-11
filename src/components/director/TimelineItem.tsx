import React from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { TimelineEntry } from '../../types';

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ entry, index }) => {
  const isExperience = entry.type === 'experience';
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center w-full my-4 sm:my-6 group">
      {/* Central Connector Spine (hidden on mobile, centered on desktop) */}
      <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-20">
        <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all">
          {isExperience ? (
            <Briefcase className="w-4 h-4 text-cyan-400" />
          ) : (
            <GraduationCap className="w-4 h-4 text-indigo-400" />
          )}
        </div>
      </div>

      {/* Mobile Icon Anchor (Left Aligned on mobile) */}
      <div className="flex md:hidden items-center gap-3 w-full mb-2 pl-2">
        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md">
          {isExperience ? (
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
          )}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-['Poppins']">
          {isExperience ? 'Professional Experience' : 'Academic Education'}
        </span>
      </div>

      {/* Content Card Layout (Desktop alternating left/right) */}
      <div
        className={`w-full md:w-[calc(50%-2.5rem)] ${
          isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
        }`}
      >
        <div className="bg-slate-900/80 hover:bg-slate-900/95 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-cyan-500/10 group-hover:-translate-y-1 text-left">
          {/* Header Row: Period Pill & Location */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-semibold font-mono">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{entry.period}</span>
            </span>

            {entry.location && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{entry.location}</span>
              </span>
            )}
          </div>

          {/* Role / Degree Title */}
          <h4 className="text-base sm:text-lg font-bold text-white font-['Poppins'] tracking-tight leading-snug">
            {entry.role}
          </h4>

          {/* Organization */}
          <div className="text-xs sm:text-sm font-semibold text-cyan-400 font-['Poppins'] mt-0.5 mb-3">
            {entry.organization}
          </div>

          {/* Bullet Points */}
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {entry.points.map((pt, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-1" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
