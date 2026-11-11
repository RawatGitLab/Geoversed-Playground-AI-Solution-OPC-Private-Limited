import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Linkedin,
  Github,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { DirectorProfile } from '../../types';

interface ProfileCardProps {
  profile: DirectorProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const vantaGlobeRef = useRef<{ destroy: () => void } | null>(null);

  // Cycling/typing role line
  useEffect(() => {
    if (!profile.roles || profile.roles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [profile.roles]);

  // Initialize Vanta.Globe 3D geospatial animation
  useEffect(() => {
    let isMounted = true;

    const initGlobe = () => {
      if (!isMounted || !cardRef.current || vantaGlobeRef.current) return;
      const win = window as unknown as {
        VANTA?: {
          GLOBE: (options: Record<string, unknown>) => { destroy: () => void };
        };
      };

      if (win.VANTA && typeof win.VANTA.GLOBE === 'function') {
        try {
          vantaGlobeRef.current = win.VANTA.GLOBE({
            el: cardRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff3f81,
            backgroundColor: 0x23153c,
            size: 1.07,
          });
        } catch (err) {
          console.warn('Vanta Globe initialization note:', err);
        }
      }
    };

    const win = window as unknown as { VANTA?: { GLOBE?: unknown } };
    if (win.VANTA?.GLOBE) {
      initGlobe();
    } else {
      const interval = setInterval(() => {
        const currentWin = window as unknown as { VANTA?: { GLOBE?: unknown } };
        if (currentWin.VANTA?.GLOBE) {
          clearInterval(interval);
          initGlobe();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 6000);

      return () => {
        isMounted = false;
        clearInterval(interval);
        clearTimeout(timeout);
        if (vantaGlobeRef.current) {
          vantaGlobeRef.current.destroy();
          vantaGlobeRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (vantaGlobeRef.current) {
        vantaGlobeRef.current.destroy();
        vantaGlobeRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full bg-[#051f15]/95 backdrop-blur-xl border border-emerald-950/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden group"
    >
      {/* Background ambient lighting blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none z-[1]" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
        {/* Left Column on Desktop: Content (Name, Designation, Roles, Bio, Location, Buttons) */}
        <div className="order-2 md:order-1 md:col-span-7 space-y-5 text-left md:pr-4">
          {/* Eyebrow / Organization Mandate */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-200 text-xs font-semibold uppercase tracking-wider font-['Poppins'] shadow-xs shadow-rose-950/40">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Executive Leadership</span>
            </span>

            <div className="inline-flex items-center gap-1 text-xs text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Name & Designation */}
          <div>
            <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Poppins'] tracking-tight break-words">
              {profile.name}
            </h3>
            <p className="text-xs sm:text-base text-emerald-300 font-medium font-['Poppins'] mt-1 break-words">
              {profile.designation} &bull; <span className="text-white font-medium">{profile.company}</span>
            </p>
          </div>

          {/* Rotating Role Line with dynamic typing effect */}
          <div className="h-7 flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px] font-['Poppins']">
              Focus:
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-emerald-500/20 text-emerald-200 font-mono text-xs sm:text-sm">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="transition-all duration-300">
                {profile.roles[currentRoleIndex]}
              </span>
            </div>
          </div>

          {/* Bio Paragraphs */}
          <div className="space-y-3 text-white text-sm sm:text-[15px] leading-relaxed">
            {profile.bio.map((para, idx) => (
              <p key={idx} className="font-normal text-white">
                {para}
              </p>
            ))}
          </div>

          {/* Action Buttons: LinkedIn, GitHub */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {/* LinkedIn */}
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              title="Connect on LinkedIn"
              aria-label="Director LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              title="Explore GitHub Repositories"
              aria-label="Director GitHub Profile"
            >
              <Github className="w-4 h-4 text-slate-200" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column on Desktop: Portrait with Gradient Ring & Floating Badge */}
        <div className="order-1 md:order-2 md:col-span-5 flex flex-col items-center md:items-center justify-center">
          <div className="relative group">
            {/* Gradient Glow Ring */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 opacity-80 blur-md group-hover:opacity-100 transition duration-500" />

            {/* Portrait Frame */}
            <div className="relative w-48 h-56 xs:w-56 xs:h-64 sm:w-64 sm:h-72 lg:w-72 lg:h-80 max-w-[calc(100vw-80px)] rounded-2xl bg-slate-950 overflow-hidden border-2 border-white/20 shadow-2xl flex items-center justify-center">
              {!imageFailed ? (
                <img
                  src={
                    profile.avatarUrl.startsWith('src/')
                      ? '/' + profile.avatarUrl.replace(/^src\//, '')
                      : profile.avatarUrl
                  }
                  alt={profile.name}
                  loading="eager"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                /* Fallback Initials Avatar with Stylized Tech Backdrop */
                <div className="w-full h-full bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0A0F1D] flex flex-col items-center justify-center text-center p-6 select-none">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-4xl shadow-xl shadow-cyan-500/20 font-['Poppins'] tracking-wider mb-3">
                    {profile.avatarFallbackInitials}
                  </div>
                  <span className="text-sm font-bold text-white font-['Poppins']">
                    {profile.name}
                  </span>
                  <span className="text-xs text-cyan-300/90 mt-1">
                    Geospatial Technologist
                  </span>
                </div>
              )}

              {/* Subtle glass reflection highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Glass Badge */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-950/90 backdrop-blur-md border border-emerald-400/40 px-4 py-1.5 rounded-full shadow-lg shadow-emerald-900/30 flex items-center gap-1.5 z-20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white font-['Poppins'] tracking-wide">
                Founder &amp; Director
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
