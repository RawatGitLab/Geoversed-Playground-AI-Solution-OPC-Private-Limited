import React, { useEffect, useRef } from 'react';

export interface LiquidMetalConfig {
  colorBack?: string;
  colorTint?: string;
  speed?: number;
}

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  metalConfig?: LiquidMetalConfig;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-5 py-2 text-xs sm:text-sm gap-2',
  md: 'px-7 py-2.5 sm:py-3 text-sm sm:text-base gap-2.5',
  lg: 'px-9 py-3.5 text-base sm:text-lg gap-3',
};

export const LiquidMetalButton = React.forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(
  (
    {
      children,
      icon,
      metalConfig,
      size = 'md',
      className = '',
      type = 'button',
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const colorBack = metalConfig?.colorBack ?? '#3b82f6';
    const colorTint = metalConfig?.colorTint ?? '#93c5fd';
    const speed = metalConfig?.speed ?? 1;

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      el.style.setProperty('--lm-back', colorBack);
      el.style.setProperty('--lm-tint', colorTint);
      el.style.setProperty('--lm-duration', `${Math.max(1.5, 4.2 / speed)}s`);
      el.style.setProperty('--lm-duration-alt', `${Math.max(2, 6.4 / speed)}s`);
    }, [colorBack, colorTint, speed]);

    const assignRef = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <button
        ref={assignRef}
        type={type}
        className={`liquid-metal-btn group relative inline-flex items-center justify-center rounded-full p-[2.5px] overflow-hidden cursor-pointer select-none transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 font-['Poppins'] ${className}`}
        {...props}
      >
        {/* Primary animated liquid-metal chromatic ring */}
        <span aria-hidden="true" className="liquid-metal-layer liquid-metal-primary" />

        {/* Counter-rotating specular ripple layer for molten mercury feel */}
        <span aria-hidden="true" className="liquid-metal-layer liquid-metal-secondary" />

        {/* Inner glossy metallic capsule */}
        <span
          className={`liquid-metal-core relative z-10 w-full inline-flex items-center justify-center rounded-full font-semibold text-white tracking-wide transition-colors duration-300 ${SIZE_CLASSES[size]}`}
        >
          {/* Specular sheen sweep on hover */}
          <span aria-hidden="true" className="liquid-metal-sheen" />

          <span className="relative z-10">{children}</span>

          {icon && (
            <span className="relative z-10 inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

LiquidMetalButton.displayName = 'LiquidMetalButton';

export interface LiquidMetalSurfaceProps {
  id?: string;
  children: React.ReactNode;
  metalConfig?: LiquidMetalConfig;
  roundedClassName?: string;
  className?: string;
  innerClassName?: string;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const LiquidMetalSurface: React.FC<LiquidMetalSurfaceProps> = ({
  id,
  children,
  metalConfig,
  roundedClassName = 'rounded-2xl',
  className = '',
  innerClassName = '',
  href,
  target,
  rel,
  title,
  onClick,
}) => {
  const colorBack = metalConfig?.colorBack ?? '#3b82f6';
  const colorTint = metalConfig?.colorTint ?? '#93c5fd';
  const speed = metalConfig?.speed ?? 1;

  const cssVars = {
    '--lm-back': colorBack,
    '--lm-tint': colorTint,
    '--lm-duration': `${Math.max(1.5, 4.2 / speed)}s`,
    '--lm-duration-alt': `${Math.max(2, 6.4 / speed)}s`,
  } as React.CSSProperties;

  const innerContent = (
    <>
      <span aria-hidden="true" className="liquid-metal-layer liquid-metal-primary" />
      <span aria-hidden="true" className="liquid-metal-layer liquid-metal-secondary" />
      <div
        className={`liquid-metal-core relative z-10 w-full h-full ${roundedClassName} ${innerClassName}`}
      >
        <span aria-hidden="true" className="liquid-metal-sheen" />
        {children}
      </div>
    </>
  );

  const shellClassName = `liquid-metal-btn group relative overflow-hidden p-[2px] ${roundedClassName} ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        title={title}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        style={cssVars}
        className={`block ${shellClassName}`}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <div
      id={id}
      title={title}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      style={cssVars}
      className={shellClassName}
    >
      {innerContent}
    </div>
  );
};

