import React, { useEffect, useMemo, useState } from 'react';

export interface PerspectiveGridProps {
  rows?: number;
  cols?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

export const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
  rows = 20,
  cols = 20,
  theme = 'light',
  className = '',
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Keep mobile DOM light for iOS Safari memory safety while rendering full rows x cols on desktop
  const effectiveRows = isDesktop ? Math.max(1, Math.min(rows, 40)) : Math.min(rows, 10);
  const effectiveCols = isDesktop ? Math.max(1, Math.min(cols, 40)) : Math.min(cols, 10);

  const cells = useMemo(
    () => Array.from({ length: effectiveRows * effectiveCols }, (_, i) => i),
    [effectiveRows, effectiveCols]
  );

  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden select-none ${className}`}
      style={{
        perspective: isDesktop ? '950px' : undefined,
        perspectiveOrigin: '50% 35%',
      }}
    >
      {/* Subtle Horizon Glow */}
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[85%] max-w-[1000px] h-80 rounded-full blur-3xl ${
          isDark ? 'bg-sky-500/15' : 'bg-blue-400/15'
        }`}
      />

      {/* Tilted 3D Perspective Grid Plane */}
      <div
        className="absolute inset-x-[-20%] -top-[15%] -bottom-[20%] grid"
        style={{
          gridTemplateColumns: `repeat(${effectiveCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${effectiveRows}, minmax(0, 1fr))`,
          transform: isDesktop
            ? 'rotateX(46deg) scale(1.18)'
            : 'none',
          transformOrigin: '50% 38%',
          maskImage:
            'radial-gradient(ellipse 85% 78% at 50% 48%, #000 52%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 78% at 50% 48%, #000 52%, transparent 100%)',
        }}
      >
        {cells.map((idx) => (
          <div
            key={idx}
            className={`border-r border-b transition-colors duration-700 hover:duration-75 ${
              isDark
                ? 'border-sky-400/18 hover:bg-sky-400/25'
                : 'border-blue-600/18 hover:bg-blue-500/20'
            }`}
          />
        ))}
      </div>

      {/* Top & Bottom Edge Fade into Section Background */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-[#060B18]/80 via-transparent to-[#060B18]/90'
            : 'bg-gradient-to-b from-[#F4F8FF]/75 via-transparent to-[#F4F8FF]/85'
        }`}
      />
    </div>
  );
};
