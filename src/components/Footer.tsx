import React from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_LINKS, COMPANY_INFO } from '../data/servicesData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-[#0F2042] text-white w-full border-t border-[#162c5c]">
      {/* Main Footer Row */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Column 1 (Brand): Company logo graphic, title text, and small tagline */}
          <div id="footer-brand-column" className="space-y-4">
            <a href="#home" className="inline-block transition-opacity hover:opacity-95">
              <Logo variant="light" size="md" textColor="text-white" />
            </a>
            <p
              id="footer-tagline"
              className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal"
            >
              {COMPANY_INFO.tagline}
            </p>
            <div className="text-xs text-slate-400 pt-1">
              Registered Geospatial & Geoscience Technical Consultancy
            </div>
          </div>

          {/* Column 2 (Quick Links): Clean list of text links mirroring main header menu */}
          <div id="footer-links-column" className="md:px-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#B3864B] mb-4 font-['Poppins']">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    id={`footer-link-${link.label.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-300 hover:text-white hover:underline transition-colors duration-200 inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (Contact Us): Aligned to the right with icon placeholders */}
          <div id="footer-contact-column" className="md:text-right space-y-3.5 flex flex-col md:items-end">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#B3864B] mb-1 font-['Poppins']">
              Contact Us
            </h4>

            {/* 📍 Location text: Almora, Uttarakhand, India */}
            <div className="flex items-start md:justify-end gap-2.5 text-sm text-slate-200">
              <MapPin className="w-4 h-4 text-[#B3864B] shrink-0 mt-0.5" />
              <span id="footer-location-text">{COMPANY_INFO.location}</span>
            </div>

            {/* 📞 Phone link text: Ph: 8273753398 */}
            <div className="flex items-center md:justify-end gap-2.5 text-sm text-slate-200">
              <Phone className="w-4 h-4 text-[#B3864B] shrink-0" />
              <a
                id="footer-phone-link"
                href={`tel:${COMPANY_INFO.phone}`}
                className="hover:text-white hover:underline transition-colors"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>

            {/* ✉️ Email link text: info@geoversed.com */}
            <div className="flex items-center md:justify-end gap-2.5 text-sm text-slate-200">
              <Mail className="w-4 h-4 text-[#B3864B] shrink-0" />
              <a
                id="footer-email-link"
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:text-white hover:underline transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 pt-8 border-t border-[#162c5c]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
