import React from 'react';
import { Map, Layout, Database, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import { SkillCategory } from '../../types';

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
          <div
            key={cat.id}
            className="group relative bg-[#23153c]/95 hover:bg-[#23153c] md:backdrop-blur-md border border-[#3b2361]/70 hover:border-fuchsia-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl hover:shadow-fuchsia-500/15 flex flex-col justify-between"
          >
            {/* Ambient hover glow */}
            <div className="hidden md:block absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

            <div>
              {/* Header: Icon & Category Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/40 transition-all shrink-0">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h4 className="text-base font-bold text-white font-['Poppins'] tracking-tight group-hover:text-cyan-300 transition-colors">
                  {cat.title}
                </h4>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-200 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono text-[10px] text-slate-400">
                {cat.skills.length} core proficiencies
              </span>
              <span className="text-cyan-400/80 text-[10px] uppercase font-semibold tracking-wider">
                Production-Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
