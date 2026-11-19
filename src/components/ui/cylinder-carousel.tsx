import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCw } from 'lucide-react';

export interface CylinderCarouselImage {
  src: string;
  alt: string;
  id?: string;
  title?: string;
  category?: string;
  badgeBg?: string;
}

export interface CylinderCarouselProps {
  images: CylinderCarouselImage[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  onSelectItem?: (item: CylinderCarouselImage, index: number) => void;
  autoRotate?: boolean;
  /** Degrees per second when auto-rotating */
  autoRotateSpeed?: number;
  className?: string;
}

export const CylinderCarousel: React.FC<CylinderCarouselProps> = ({
  images,
  activeIndex: controlledIndex,
  onActiveChange,
  onSelectItem,
  autoRotate = true,
  autoRotateSpeed = 7.5,
  className = '',
}) => {
  const count = images.length;
  const stepDeg = count > 0 ? 360 / count : 360;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const drumRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const [internalIndex, setInternalIndex] = useState<number>(controlledIndex ?? 0);
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );
  const [isLarge, setIsLarge] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(autoRotate);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  // Mutable animation refs (updated at 60fps without triggering React re-renders)
  const rotationRef = useRef<number>(-(activeIndex * stepDeg));
  const targetRotationRef = useRef<number | null>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotRef = useRef<number>(0);
  const dragLastXRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const suppressClickUntilRef = useRef<number>(0);
  const lastReportedIndexRef = useRef<number>(activeIndex);

  const cardWidth = isLarge ? 234 : 194;
  const cardHeight = isLarge ? 276 : 240;

  const radius = useMemo(() => {
    if (count <= 2) return 210;
    const faceWidth = cardWidth + (isLarge ? 24 : 18);
    return Math.max(240, Math.round(faceWidth / (2 * Math.tan(Math.PI / count))));
  }, [count, cardWidth, isLarge]);

  // Responsive breakpoint & reduced motion observers
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mdQuery = window.matchMedia('(min-width: 768px)');
    const lgQuery = window.matchMedia('(min-width: 1024px)');
    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsDesktop(mdQuery.matches);
      setIsLarge(lgQuery.matches);
      setPrefersReducedMotion(rmQuery.matches);
      if (rmQuery.matches) {
        setIsAutoPlaying(false);
      }
    };

    update();
    mdQuery.addEventListener('change', update);
    lgQuery.addEventListener('change', update);
    rmQuery.addEventListener('change', update);

    return () => {
      mdQuery.removeEventListener('change', update);
      lgQuery.removeEventListener('change', update);
      rmQuery.removeEventListener('change', update);
    };
  }, []);

  // Pause rAF loop when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reportIndex = useCallback(
    (idx: number) => {
      if (idx !== lastReportedIndexRef.current) {
        lastReportedIndexRef.current = idx;
        if (controlledIndex === undefined) {
          setInternalIndex(idx);
        }
        onActiveChange?.(idx);
      }
    },
    [controlledIndex, onActiveChange]
  );

  const rotateToIndex = useCallback(
    (targetIdx: number) => {
      if (count === 0) return;
      const normalizedIdx = ((targetIdx % count) + count) % count;

      if (!isDesktop) {
        reportIndex(normalizedIdx);
        const scroller = mobileScrollRef.current;
        if (scroller) {
          const child = scroller.children[normalizedIdx] as HTMLElement | undefined;
          child?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
        return;
      }

      const currentRot = rotationRef.current;
      const desiredMod = ((-normalizedIdx * stepDeg) % 360 + 360) % 360;
      const currentMod = ((currentRot % 360) + 360) % 360;
      let diff = desiredMod - currentMod;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      const nextTarget = currentRot + diff;
      if (prefersReducedMotion) {
        rotationRef.current = nextTarget;
        targetRotationRef.current = null;
        if (drumRef.current) {
          drumRef.current.style.transform = `translateZ(-${radius}px) rotateY(${nextTarget}deg)`;
        }
      } else {
        targetRotationRef.current = nextTarget;
      }

      reportIndex(normalizedIdx);
    },
    [count, isDesktop, prefersReducedMotion, radius, reportIndex, stepDeg]
  );

  // Sync when controlledIndex changes externally
  useEffect(() => {
    if (
      controlledIndex !== undefined &&
      controlledIndex !== lastReportedIndexRef.current
    ) {
      rotateToIndex(controlledIndex);
    }
  }, [controlledIndex, rotateToIndex]);

  // Apply initial transform when radius changes
  useEffect(() => {
    if (isDesktop && drumRef.current) {
      drumRef.current.style.transform = `translateZ(-${radius}px) rotateY(${rotationRef.current}deg)`;
    }
  }, [isDesktop, radius]);

  // Desktop 3D cylinder animation loop (paused on mobile, offscreen, or reduced-motion idle)
  useEffect(() => {
    if (!isDesktop || !isInView || count === 0) return;

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      let rot = rotationRef.current;

      if (!isDraggingRef.current) {
        if (targetRotationRef.current !== null) {
          const delta = targetRotationRef.current - rot;
          if (Math.abs(delta) < 0.08) {
            rot = targetRotationRef.current;
            targetRotationRef.current = null;
          } else {
            rot += delta * Math.min(1, dt * 10);
          }
        } else if (isAutoPlaying && !isHoveredRef.current && !prefersReducedMotion) {
          rot -= autoRotateSpeed * dt;
        }
      }

      rotationRef.current = rot;

      if (drumRef.current) {
        drumRef.current.style.transform = `translateZ(-${radius}px) rotateY(${rot}deg)`;
      }

      // Determine front-facing card index
      const frontIdx = (((-Math.round(rot / stepDeg)) % count) + count) % count;
      if (frontIdx !== lastReportedIndexRef.current) {
        reportIndex(frontIdx);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [
    isDesktop,
    isInView,
    count,
    isAutoPlaying,
    prefersReducedMotion,
    autoRotateSpeed,
    radius,
    stepDeg,
    reportIndex,
  ]);

  // Pointer drag handlers for desktop 3D cylinder
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    // Allow interactive buttons inside cards or controls to handle clicks directly
    if ((e.target as HTMLElement).closest('button')) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragLastXRef.current = e.clientX;
    dragStartRotRef.current = rotationRef.current;
    dragVelocityRef.current = 0;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const dxTotal = e.clientX - dragStartXRef.current;
    const dxStep = e.clientX - dragLastXRef.current;
    dragLastXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(dxStep);

    // Only engage drag & pointer capture after exceeding click slop threshold
    if (!isDraggingRef.current) {
      if (Math.abs(dxTotal) < 6) return;
      isDraggingRef.current = true;
      setIsGrabbing(true);
      targetRotationRef.current = null;
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    }

    dragVelocityRef.current = dxStep * 0.22;
    rotationRef.current = dragStartRotRef.current + dxTotal * 0.22;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    const wasDragging = isDraggingRef.current;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (wasDragging) {
      suppressClickUntilRef.current = performance.now() + 250;
      // Momentum throw + clean snap to nearest pillar face
      const projected = rotationRef.current + dragVelocityRef.current * 4.5;
      const snapped = Math.round(projected / stepDeg) * stepDeg;
      targetRotationRef.current = snapped;
    }
  };

  const handleCardClick = (item: CylinderCarouselImage, index: number) => {
    if (performance.now() < suppressClickUntilRef.current) return;
    if (index === activeIndex) {
      onSelectItem?.(item, index);
    } else {
      rotateToIndex(index);
    }
  };

  const handlePrev = () => rotateToIndex(activeIndex - 1);
  const handleNext = () => rotateToIndex(activeIndex + 1);

  // Sync mobile snap scroll to activeIndex
  const handleMobileScroll = () => {
    const scroller = mobileScrollRef.current;
    if (!scroller || count === 0) return;
    const cardSlot = scroller.scrollWidth / count;
    if (cardSlot <= 0) return;
    const idx = Math.max(0, Math.min(count - 1, Math.round(scroller.scrollLeft / cardSlot)));
    reportIndex(idx);
  };

  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* Desktop & Tablet True 3D Cylinder Stage */}
      {isDesktop ? (
        <div
          className={`relative w-full h-[350px] lg:h-[390px] flex items-center justify-center overflow-hidden ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ perspective: '1350px', perspectiveOrigin: '50% 48%' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="region"
          aria-roledescription="carousel"
          aria-label="12 Core Service Pillars 3D Cylinder Carousel"
        >
          {/* Subtle floor radial shadow under the 3D drum */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-[72%] max-w-[680px] h-10 rounded-full bg-[#800000]/12 blur-xl"
          />

          {/* 3D Rotating Cylinder Drum */}
          <div
            ref={drumRef}
            className="relative"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(${rotationRef.current}deg)`,
              willChange: 'transform',
            }}
          >
            {images.map((item, idx) => {
              const angle = idx * stepDeg;
              const isFront = idx === activeIndex;

              return (
                <div
                  key={item.id ?? `${item.src}-${idx}`}
                  onClick={() => handleCardClick(item, idx)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className={`group rounded-2xl overflow-hidden bg-white transition-shadow duration-300 cursor-pointer ${
                    isFront
                      ? 'ring-2 ring-[#800000] shadow-2xl shadow-[#800000]/25'
                      : 'ring-1 ring-slate-900/12 shadow-lg'
                  }`}
                >
                  {/* Pillar Visual Banner */}
                  <div className="relative w-full h-[58%] overflow-hidden bg-slate-900">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={320}
                      height={180}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />

                    {/* Pillar Number Badge */}
                    {item.id && (
                      <span
                        className={`absolute top-2.5 left-2.5 inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider text-white shadow-sm font-['Poppins'] ${
                          item.badgeBg || 'bg-[#800000]'
                        }`}
                      >
                        PILLAR {item.id}
                      </span>
                    )}
                  </div>

                  {/* Pillar Card Footer Content */}
                  <div className="h-[42%] p-3.5 flex flex-col justify-between bg-white">
                    <div>
                      {item.category && (
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#800000]/80 truncate mb-1">
                          {item.category}
                        </p>
                      )}
                      <h3 className="text-xs lg:text-[13px] font-bold text-slate-900 leading-snug line-clamp-2 font-['Poppins']">
                        {item.title || item.alt}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isFront) {
                            onSelectItem?.(item, idx);
                          } else {
                            rotateToIndex(idx);
                          }
                        }}
                        className={`text-[10px] font-semibold tracking-wide cursor-pointer transition-colors hover:underline ${
                          isFront
                            ? 'text-[#800000] hover:text-[#600000]'
                            : 'text-slate-500 hover:text-[#800000]'
                        }`}
                      >
                        {isFront ? 'Click for Specs →' : 'Click to Focus'}
                      </button>
                      <span className="text-[10px] font-mono font-semibold text-slate-400">
                        {String(idx + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous pillar"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#800000] text-slate-800 hover:text-white border border-slate-200 hover:border-[#800000] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next pillar"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#800000] text-slate-800 hover:text-white border border-slate-200 hover:border-[#800000] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Drag Hint + Auto-rotate Toggle */}
          <div className="absolute top-3 right-3 sm:right-5 z-20 flex items-center gap-2">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-2xs">
              <RotateCw className="w-3 h-3 text-[#800000]" />
              Drag to spin 360°
            </span>
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoPlaying((prev) => !prev);
                }}
                aria-label={isAutoPlaying ? 'Pause auto rotation' : 'Resume auto rotation'}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-[#800000] bg-white/95 border border-slate-200/90 px-2.5 py-1 rounded-full shadow-2xs transition-colors cursor-pointer"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Spin</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Mobile GPU-safe Snap Carousel (avoids iOS Safari preserve-3d memory spikes) */
        <div
          className="relative w-full pt-5 pb-2"
          role="region"
          aria-roledescription="carousel"
          aria-label="12 Core Service Pillars Carousel"
        >
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-3 scrollbar-none"
          >
            {images.map((item, idx) => {
              const isFront = idx === activeIndex;
              return (
                <div
                  key={item.id ?? `${item.src}-${idx}`}
                  onClick={() => onSelectItem?.(item, idx)}
                  className={`snap-center shrink-0 w-[260px] rounded-2xl overflow-hidden bg-white cursor-pointer transition-shadow ${
                    isFront
                      ? 'ring-2 ring-[#800000] shadow-xl'
                      : 'ring-1 ring-slate-900/10 shadow-md'
                  }`}
                >
                  <div className="relative w-full h-36 bg-slate-900 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={320}
                      height={180}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    {item.id && (
                      <span
                        className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold text-white font-['Poppins'] ${
                          item.badgeBg || 'bg-[#800000]'
                        }`}
                      >
                        PILLAR {item.id}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5">
                    {item.category && (
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#800000]/80 truncate mb-1">
                        {item.category}
                      </p>
                    )}
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 font-['Poppins']">
                      {item.title || item.alt}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 mt-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous pillar"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-700 font-['Poppins']">
              Pillar {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next pillar"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 01–12 Numbered Quick-Jump Pillar Selector */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto px-4 pb-4 pt-1 scrollbar-none">
        {images.map((item, idx) => {
          const isFront = idx === activeIndex;
          const label = item.id ?? String(idx + 1).padStart(2, '0');
          return (
            <button
              key={`pillar-dot-${label}-${idx}`}
              type="button"
              onClick={() => rotateToIndex(idx)}
              aria-label={`Jump to pillar ${label}: ${item.title || item.alt}`}
              aria-current={isFront ? 'true' : undefined}
              className={`shrink-0 h-8 min-w-8 px-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer font-['Poppins'] ${
                isFront
                  ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/25 scale-105'
                  : 'bg-white/90 text-slate-600 hover:text-[#800000] hover:bg-white border border-slate-200/80'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
