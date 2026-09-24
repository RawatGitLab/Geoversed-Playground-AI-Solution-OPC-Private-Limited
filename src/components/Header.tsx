import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_LINKS } from '../data/servicesData';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100'
          : 'bg-white py-4 border-b border-slate-100/80'
      }`}
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[52px]">
        {/* Left Section: Logo & Brand Name */}
        <a
          href="#home"
          id="nav-brand-link"
          className="relative z-10 flex items-center group transition-transform hover:opacity-95"
        >
          <Logo variant="dark" size="md" />
        </a>

        {/* Center Section: Horizontal Flex Navigation Menu (Centered in Header) */}
        <nav
          id="desktop-navigation-menu"
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-2 lg:space-x-6 px-6 lg:px-8 py-2 border border-[#4B5320] bg-white z-10 shadow-xs"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              id={`nav-link-${item.label.toLowerCase()}`}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[#0F2042] hover:text-[#B3864B] font-['Poppins'] font-medium text-sm lg:text-[15px] px-3 py-1.5 rounded-md transition-all duration-200 relative group tracking-normal cursor-pointer select-none"
            >
              {item.label}
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#B3864B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Section: CTA Button & Mobile Menu Toggle */}
        <div className="relative z-10 flex items-center space-x-3">
          <button
            id="header-get-quote-btn"
            onClick={onOpenQuote}
            className="hidden sm:inline-flex items-center justify-center bg-[#B3864B] hover:bg-[#9c733d] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            Get Quote
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#0F2042] hover:text-[#B3864B] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B3864B]"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      <div
        id="mobile-nav-drawer"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 bg-white ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-3 pb-5 space-y-2 max-w-[1200px] mx-auto">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              id={`mobile-nav-link-${item.label.toLowerCase()}`}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#0F2042] hover:text-[#B3864B] hover:bg-slate-50 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              id="mobile-menu-get-quote-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#B3864B] hover:bg-[#9c733d] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
