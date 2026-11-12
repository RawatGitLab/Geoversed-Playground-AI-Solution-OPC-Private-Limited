import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceItem, EventItem } from './types';
import { CORE_SERVICES } from './data/servicesData';
import { getEventById } from './data/events';

// Lazy-load below-the-fold sections to optimize initial bundle and mobile memory
const DirectorSection = lazy(() =>
  import('./components/DirectorSection').then((m) => ({ default: m.DirectorSection }))
);
const EventsSection = lazy(() =>
  import('./components/events/EventsSection').then((m) => ({ default: m.EventsSection }))
);
const CoreServices = lazy(() =>
  import('./components/CoreServices').then((m) => ({ default: m.CoreServices }))
);
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ProjectsSection = lazy(() =>
  import('./components/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const InsightsSection = lazy(() =>
  import('./components/InsightsSection').then((m) => ({ default: m.InsightsSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const WhatsAppFloatingButton = lazy(() =>
  import('./components/WhatsAppFloatingButton').then((m) => ({
    default: m.WhatsAppFloatingButton,
  }))
);

// Lazy load modals so heavy assets and videos don't block the initial page render
const QuoteModal = lazy(() =>
  import('./components/QuoteModal').then((m) => ({ default: m.QuoteModal }))
);
const ServiceDetailModal = lazy(() =>
  import('./components/ServiceDetailModal').then((m) => ({
    default: m.ServiceDetailModal,
  }))
);
const PrivacyPolicyModal = lazy(() =>
  import('./components/PrivacyPolicyModal').then((m) => ({
    default: m.PrivacyPolicyModal,
  }))
);
const TermsOfServiceModal = lazy(() =>
  import('./components/TermsOfServiceModal').then((m) => ({
    default: m.TermsOfServiceModal,
  }))
);
const SitemapModal = lazy(() =>
  import('./components/SitemapModal').then((m) => ({
    default: m.SitemapModal,
  }))
);
const EventDetailModal = lazy(() =>
  import('./components/events/EventDetailModal').then((m) => ({
    default: m.EventDetailModal,
  }))
);
const ShareModal = lazy(() =>
  import('./components/ShareModal').then((m) => ({ default: m.ShareModal }))
);

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Monitor hash changes for in-page smooth scrolling & modals
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '';

      if (hash === '#privacy') {
        setIsPrivacyOpen(true);
      } else if (hash === '#terms') {
        setIsTermsOpen(true);
      } else if (hash === '#sitemap') {
        setIsSitemapOpen(true);
      } else if (hash === '#share') {
        setIsShareOpen(true);
      } else if (hash.startsWith('#events/') || hash.startsWith('#event/')) {
        const slug = hash.replace(/^#(?:events|event)\//, '').trim();
        const found = getEventById(slug);
        if (found) {
          setSelectedEvent(found);
        }
      } else if (hash.startsWith('#')) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handlers
  const handleOpenQuote = (service?: ServiceItem) => {
    setSelectedService(service || null);
    setIsQuoteOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDetails = (service: ServiceItem) => {
    setDetailService(service);
  };

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    window.location.hash = `#events/${event.id}`;
  };

  const handleCloseEventModal = () => {
    setSelectedEvent(null);
    window.location.hash = '#events';
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
        {/* 1. Header / Navigation Bar */}
        <Header
          onOpenQuote={() => handleOpenQuote()}
          onOpenSitemap={() => setIsSitemapOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* Main Single Page Content Area - Fully Scrollable */}
        <main className="w-full flex-1 overflow-x-hidden">
          {/* 1. Hero Section (Above the fold - eager) */}
          <Hero
            onExploreServices={handleExploreServices}
            onViewProjects={handleViewProjects}
          />

          {/* Lazy-loaded below-the-fold sections */}
          <Suspense fallback={<div className="w-full min-h-[300px]" />}>
            {/* 2. Director Section (Second from top) */}
            <DirectorSection />

            {/* 3. Events Section */}
            <EventsSection
              onSelectEvent={handleSelectEvent}
            />

            {/* 4. Core Services Grid Section */}
            <CoreServices
              onSelectServiceForQuote={(srv) => handleOpenQuote(srv)}
              onOpenDetails={handleOpenDetails}
            />

            {/* 5. About Section */}
            <AboutSection />

            {/* 6. Projects Section */}
            <ProjectsSection
              onOpenQuote={() => handleOpenQuote()}
            />

            {/* 7. Insights Section */}
            <InsightsSection
              onOpenQuote={() => handleOpenQuote()}
              onReadInsight={() => {
                handleOpenDetails(CORE_SERVICES[0]);
              }}
            />

            {/* 8. Contact Section */}
            <ContactSection />
          </Suspense>
        </main>

        {/* 9. Footer Section */}
        <Suspense fallback={null}>
          <Footer
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenTerms={() => setIsTermsOpen(true)}
            onOpenSitemap={() => setIsSitemapOpen(true)}
          />
        </Suspense>

      {/* Event Detail Modal (Single-page modal with photos, videos, & lightbox) */}
      {selectedEvent && (
        <Suspense fallback={null}>
          <EventDetailModal
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={handleCloseEventModal}
            onSelectEvent={handleSelectEvent}
          />
        </Suspense>
      )}

      {/* Quote Request Modal */}
      {isQuoteOpen && (
        <Suspense fallback={null}>
          <QuoteModal
            isOpen={isQuoteOpen}
            onClose={() => setIsQuoteOpen(false)}
            preselectedService={selectedService}
          />
        </Suspense>
      )}

      {/* Service Detail Modal */}
      {detailService && (
        <Suspense fallback={null}>
          <ServiceDetailModal
            service={detailService}
            onClose={() => setDetailService(null)}
            onRequestQuote={(srv) => handleOpenQuote(srv)}
          />
        </Suspense>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <Suspense fallback={null}>
          <PrivacyPolicyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
        </Suspense>
      )}

      {/* Terms of Service Modal */}
      {isTermsOpen && (
        <Suspense fallback={null}>
          <TermsOfServiceModal
            isOpen={isTermsOpen}
            onClose={() => setIsTermsOpen(false)}
          />
        </Suspense>
      )}

      {/* Sitemap Directory Modal */}
      {isSitemapOpen && (
        <Suspense fallback={null}>
          <SitemapModal
            isOpen={isSitemapOpen}
            onClose={() => setIsSitemapOpen(false)}
            onSelectService={handleOpenDetails}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenTerms={() => setIsTermsOpen(true)}
            onOpenQuote={(srv) => handleOpenQuote(srv)}
          />
        </Suspense>
      )}

      {/* Share Website Modal with Social Preview Popup */}
      {isShareOpen && (
        <Suspense fallback={null}>
          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
          />
        </Suspense>
      )}

      {/* Floating WhatsApp Quick Contact & Preview Widget */}
      <Suspense fallback={null}>
        <WhatsAppFloatingButton onOpenShare={() => setIsShareOpen(true)} />
      </Suspense>
    </div>
  </MotionConfig>
);
}
