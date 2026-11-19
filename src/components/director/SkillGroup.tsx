import React from 'react';
import { Map, Layout, Database, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import { SkillCategory } from '../../types';
import { LiquidMetalSurface } from '../ui/liquid-metal';

interface SkillGroupProps {
  categories: SkillCategory[];
}

export const SkillGroup: React.FC<SkillGroupProps> = ({ categories }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Map':
        return <Map className="w-5 h-5 text-cyan-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-blue-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      default:
        return <Compass className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Subheading */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2 font-['Poppins']">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Core Capabilities</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Poppins'] tracking-tight">
          Technical Stack &amp; Specializations
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          An interdisciplinary blend of spatial cartography, full-stack software architecture, spatial database optimization, and artificial intelligence.
        </p>
      </div>

      {/* 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {categories.map((cat) => (
          <LiquidMetalSurface
            key={cat.id}
            roundedClassName="rounded-2xl"
            className="transition-all duration-300 hover:-translate-y-1.5"
            innerClassName="p-5 sm:p-6 flex flex-col justify-between"
            metalConfig={{ colorBack: '#3b82f6', colorTint: '#93c5fd' }}
          >
            <div className="relative z-10">
              {/* Header: Icon & Category Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:scale-105 group-hover:border-sky-300/50 transition-all shrink-0">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h4 className="text-base font-bold text-white font-['Poppins'] tracking-tight group-hover:text-sky-200 transition-colors">
                  {cat.title}
                </h4>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/8 hover:bg-sky-500/20 border border-white/15 hover:border-sky-300/50 text-slate-200 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-mono text-[10px] text-slate-300">
                {cat.skills.length} core proficiencies
              </span>
              <span className="text-sky-300 text-[10px] uppercase font-semibold tracking-wider">
                Production-Ready
              </span>
            </div>
          </LiquidMetalSurface>
        ))}
      </div>
    </div>
  );
};
