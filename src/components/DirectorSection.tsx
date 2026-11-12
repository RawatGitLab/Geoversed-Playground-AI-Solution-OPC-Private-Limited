import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Mail,
  GraduationCap,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  DIRECTOR_PROFILE,
  DIRECTOR_STATS,
  DIRECTOR_SKILLS,
  DIRECTOR_FEATURED_WORK,
  DIRECTOR_CERTIFICATIONS,
} from '../data/directorData';
import { CertificationItem } from '../types';
import { ProfileCard } from './director/ProfileCard';
import { StatsStrip } from './director/StatsStrip';
import { SkillGroup } from './director/SkillGroup';
import { FeaturedWorkCard } from './director/FeaturedWorkCard';
import { FeaturedWork3DShowcase } from './director/FeaturedWork3DShowcase';
import { CertificationMarquee } from './director/CertificationMarquee';
import { CertLightboxModal } from './director/CertLightboxModal';

interface VantaEffect {
  destroy: () => void;
}

export const DirectorSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const vantaEffectRef = useRef<VantaEffect | null>(null);

  // Initialize Vanta.Birds 3D simulation
  useEffect(() => {
    let isMounted = true;

    const initVanta = () => {
      if (!isMounted || !sectionRef.current || vantaEffectRef.current) return;
      if (typeof window !== 'undefined' && window.innerWidth < 768) return;
      const win = window as unknown as {
        VANTA?: {
          BIRDS: (options: Record<string, unknown>) => VantaEffect;
        };
      };

      if (win.VANTA && typeof win.VANTA.BIRDS === 'function') {
        try {
          vantaEffectRef.current = win.VANTA.BIRDS({
            el: sectionRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xffffff,
            color1: 0x0284c7,
            color2: 0x1e40af,
            colorMode: 'variance',
            birdSize: 1.2,
            wingSpan: 24.0,
            speedLimit: 4.5,
            separation: 35.0,
            alignment: 35.0,
            cohesion: 35.0,
            quantity: 3.5,
          });
        } catch (err) {
          console.warn('Vanta Birds initialization note:', err);
        }
      }
    };

    const win = window as unknown as { VANTA?: { BIRDS?: unknown } };
    if (win.VANTA?.BIRDS) {
      initVanta();
    } else {
      const interval = setInterval(() => {
        const currentWin = window as unknown as { VANTA?: { BIRDS?: unknown } };
        if (currentWin.VANTA?.BIRDS) {
          clearInterval(interval);
          initVanta();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 6000);

      return () => {
        isMounted = false;
        clearInterval(interval);
        clearTimeout(timeout);
        if (vantaEffectRef.current) {
          vantaEffectRef.current.destroy();
          vantaEffectRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="director"
      className="relative py-20 sm:py-28 bg-white text-slate-900 overflow-hidden scroll-mt-20 border-t border-slate-200"
    >
      {/* Ambient background glows matching design system */}
      <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-100/40 rounded-full blur-[140px] pointer-events-none z-[1]" />
      <div className="hidden md:block absolute top-2/3 right-[-100px] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none z-[1]" />
      <div className="hidden md:block absolute bottom-10 left-[-100px] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none z-[1]" />

      {/* Subtle geospatial grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* 1. SECTION HEADING */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider font-['Poppins'] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-['Poppins'] tracking-tight mb-4 leading-tight">
            About the Director
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Pioneering geospatial intelligence, sustainable hill planning, and AI-driven g-Governance across India.
          </p>
        </div>

        {/* 2. HERO / PROFILE BLOCK & GLASS STATS STRIP */}
        <div className="space-y-8">
          <ProfileCard profile={DIRECTOR_PROFILE} />
          <StatsStrip stats={DIRECTOR_STATS} />
        </div>

        {/* 3. SKILLS / TECH STACK */}
        <div>
          <SkillGroup categories={DIRECTOR_SKILLS} />
        </div>

        {/* 4. FEATURED WORK / HIGHLIGHTS (3D RIGHT TO LEFT CONVEYOR) */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2 font-['Poppins']">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Flagship Milestones</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Poppins'] tracking-tight">
              Notable Initiatives &amp; Deployments
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Selected projects delivering measurable ecological, economic, and administrative outcomes for public institutions.
            </p>
          </div>

          <FeaturedWork3DShowcase items={DIRECTOR_FEATURED_WORK} />
        </div>

        {/* 6. CERTIFICATIONS SHOWCASE (2 INFINITE MARQUEE ROWS) */}
        <div>
          <CertificationMarquee
            certifications={DIRECTOR_CERTIFICATIONS}
            onSelectCert={(cert) => setSelectedCert(cert)}
          />
        </div>

        {/* 7. CLOSING CALL-TO-ACTION */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-indigo-950/60 border border-cyan-500/30 p-8 sm:p-12 text-center md:backdrop-blur-xl shadow-2xl">
          {/* Subtle glow orb */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-['Poppins']">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Collaboration &amp; Consulting</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-['Poppins'] tracking-tight">
              Let&apos;s build something impactful together
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you need strategic advisory for regional GIS master planning, custom cloud spatial platforms, or AI-powered environmental monitoring, our leadership is ready to partner with you.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5 font-['Poppins']"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <CertLightboxModal
          cert={selectedCert}
          isOpen={true}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
