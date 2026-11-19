import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { LiquidMetalConfig } from './liquid-metal';

export interface NotchNavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  isDropdownOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  dropdownContent?: React.ReactNode;
}

export interface NotchNavbarProps {
  id?: string;
  items?: NotchNavItem[];
  activeHref?: string;
  onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  metalConfig?: LiquidMetalConfig;
  className?: string;
}

const DEFAULT_ITEMS: NotchNavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const NotchNavbar: React.FC<NotchNavbarProps> = ({
  id = 'desktop-navigation-menu',
  items = DEFAULT_ITEMS,
  activeHref: controlledActiveHref,
  onItemClick,
  metalConfig,
  className = '',
}) => {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [internalActiveHref, setInternalActiveHref] = useState<string>(
    controlledActiveHref || items[0]?.href || '#home'
  );
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const activeHref = controlledActiveHref ?? internalActiveHref;
  const colorBack = metalConfig?.colorBack ?? '#3b82f6';
  const colorTint = metalConfig?.colorTint ?? '#93c5fd';
  const speed = metalConfig?.speed ?? 1;

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.style.setProperty('--lm-back', colorBack);
    el.style.setProperty('--lm-tint', colorTint);
    el.style.setProperty('--lm-duration', `${Math.max(1.5, 4.2 / speed)}s`);
    el.style.setProperty('--lm-duration-alt', `${Math.max(2, 6.4 / speed)}s`);
  }, [colorBack, colorTint, speed]);

  // Automatically track active section on scroll when uncontrolled
  useEffect(() => {
    if (controlledActiveHref !== undefined || typeof window === 'undefined') return;

    const sectionIds = items
      .map((item) => (item.href.startsWith('#') ? item.href.slice(1) : null))
      .filter((s): s is string => Boolean(s));

    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = items[0]?.href || '#home';

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top) {
            current = `#${sectionId}`;
          }
        }
      }
      setInternalActiveHref(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledActiveHref, items]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (controlledActiveHref === undefined) {
      setInternalActiveHref(href);
    }
    onItemClick?.(e, href);
  };

  return (
    <nav
      id={id}
      aria-label="Main Navigation"
      onMouseLeave={() => setHoveredHref(null)}
      className={`items-center ${className}`}
    >
      {/* Liquid Metal Sculpted Notch Shell (no overflow-hidden here so mega-dropdowns render unclipped) */}
      <div
        ref={shellRef}
        className="liquid-metal-btn group relative rounded-full p-[2.5px] text-white transition-shadow duration-300"
      >
        {/* Clipped animated liquid-metal chromatic border ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
        >
          <span className="liquid-metal-layer liquid-metal-primary" />
          <span className="liquid-metal-layer liquid-metal-secondary" />
        </span>

        {/* Inner glossy metallic capsule */}
        <div className="relative z-10 flex items-center rounded-full px-2 py-1.5">
          {/* Clipped glossy core + hover specular sheen */}
          <span
            aria-hidden="true"
            className="liquid-metal-core pointer-events-none absolute inset-0 rounded-full overflow-hidden"
          >
            <span className="liquid-metal-sheen" />
            <span className="absolute -top-px left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-b-full bg-gradient-to-r from-transparent via-blue-300/90 to-transparent" />
          </span>

          <div className="relative z-10 flex items-center gap-0.5">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            const isHovered = hoveredHref === item.href;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => {
                  setHoveredHref(item.href);
                  item.onMouseEnter?.();
                }}
                onMouseLeave={() => {
                  item.onMouseLeave?.();
                }}
              >
                <a
                  id={`nav-link-${item.id}`}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative z-10 inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-1.5 rounded-full font-['Poppins'] font-medium text-[13px] 2xl:text-sm tracking-tight transition-colors duration-200 whitespace-nowrap select-none cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : isHovered
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {/* Sliding Hover Backdrop */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="notch-navbar-hover-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    />
                  )}

                  {/* Sliding Active Notch Pill + Glowing Bottom Notch Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="notch-navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-white/18 to-white/8 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_10px_rgba(56,189,248,0.2)]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.85)]"
                      />
                    </motion.span>
                  )}

                  <span>{item.label}</span>

                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        item.isDropdownOpen
                          ? 'rotate-180 text-sky-400'
                          : isActive
                          ? 'text-sky-300'
                          : 'text-slate-400'
                      }`}
                    />
                  )}
                </a>

                {item.dropdownContent}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </nav>
  );
};
