import React, { useRef, useState } from 'react';
import { Layers, ArrowUpRight, CheckCircle, Github, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { FeaturedWorkItem } from '../../types';

interface FeaturedWorkCardProps {
  item: FeaturedWorkItem;
  index: number;
}

export const FeaturedWorkCard: React.FC<FeaturedWorkCardProps> = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  const primaryUrl = item.demoUrl || item.linkUrl;

  return (
    <div
      className="group relative flex flex-col justify-between w-[275px] xs:w-[320px] sm:w-[380px] md:w-[430px] max-w-[85vw] min-h-[460px] flex-shrink-0 bg-[#23153c]/95 hover:bg-[#23153c] backdrop-blur-xl border border-[#3b2361]/70 hover:border-fuchsia-500/50 rounded-3xl p-5 sm:p-7 transition-colors duration-200 shadow-xl hover:shadow-2xl hover:shadow-fuchsia-500/15 overflow-hidden select-none"
    >
      {/* Cyan Top Edge Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content Header */}
      <div>
        {/* Category Pill, Period & Metrics Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.category && item.category.trim() !== '' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-['Poppins'] shadow-xs">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.category}</span>
              </span>
            )}

            {item.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-[11px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {item.metrics && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-mono shadow-xs">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{item.metrics}</span>
            </span>
          )}
        </div>

        {/* Period if available */}
        {item.period && (
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-2.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400/80" />
            <span className="font-mono text-[11px]">{item.period}</span>
          </div>
        )}

        {/* Project Thumbnail Image if provided */}
        {item.image && !imgError && (
          <div className="relative w-full h-44 sm:h-48 mb-3.5 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-md group/img">
            <img
              src={item.image.startsWith('src/') ? '/' + item.image.replace(/^src\//, '') : item.image}
              alt={item.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Subtle glass reflection gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
              Live Preview
            </div>
          </div>
        )}

        {/* Title */}
        <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Poppins'] mb-2.5 leading-snug">
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Content Footer */}
      <div className="mt-6 pt-4 border-t border-[#3b2361]/70">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 max-h-16 overflow-hidden">
          {item.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 group-hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-mono"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 6 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/50 text-slate-400 border border-slate-700/50 font-mono">
              +{item.tags.length - 6}
            </span>
          )}
        </div>

        {/* Link / CTA buttons */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {primaryUrl && (
            <a
              href={primaryUrl}
              target={primaryUrl.startsWith('http') ? '_blank' : '_self'}
              rel={primaryUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (primaryUrl.startsWith('#')) {
                  e.preventDefault();
                  const target = document.querySelector(primaryUrl);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', primaryUrl);
                  }
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all cursor-pointer font-['Poppins']"
              aria-label={`Explore live portal of ${item.title}`}
            >
              <span>{item.demoUrl ? 'Live Portal' : 'Explore Impact'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              title="View GitHub Repository"
              aria-label="View GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
