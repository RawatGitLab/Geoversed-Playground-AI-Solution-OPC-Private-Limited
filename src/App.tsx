import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoreServices } from './components/CoreServices';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceItem } from './types';
import { CORE_SERVICES } from './data/servicesData';

// Lazy load modals so heavy assets and banners don't block the initial page render
const QuoteModal = lazy(() =>
  import('./components/QuoteModal').then((m) => ({ default: m.QuoteModal }))
);
const ServiceDetailModal = lazy(() =>
  import('./components/ServiceDetailModal').then((m) => ({
    default: m.ServiceDetailModal,
  }))
);
const ReportModal = lazy(() =>
  import('./components/ReportModal').then((m) => ({ default: m.ReportModal }))
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

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#privacy') {
        setIsPrivacyOpen(true);
      } else if (window.location.hash === '#terms') {
        setIsTermsOpen(true);
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F2042] font-sans selection:bg-[#B3864B] selection:text-white">
      {/* 1. Header / Navigation Bar */}
      <Header onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreServices={handleExploreServices}
          onViewProjects={handleViewProjects}
        />

        {/* 3. Core Services Grid Section */}
        <CoreServices
          onSelectServiceForQuote={(srv) => handleOpenQuote(srv)}
          onOpenDetails={handleOpenDetails}
        />

        {/* 4. About Section */}
        <AboutSection />

        {/* 5. Projects Section */}
        <ProjectsSection onOpenQuote={() => handleOpenQuote()} />

        {/* 6. Insights Section */}
        <InsightsSection
          onReadInsight={(insightIdOrTitle) => {
            if (
              insightIdOrTitle === 'dhargad-rejuvenation-report' ||
              insightIdOrTitle.toLowerCase().includes('dhargad') ||
              insightIdOrTitle.toLowerCase().includes('kolsar') ||
              insightIdOrTitle.toLowerCase().includes('rejuvenation')
            ) {
              setIsReportOpen(true);
            } else {
              handleOpenDetails(CORE_SERVICES[0]);
            }
          }}
        />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* 8. Footer Section */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

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

      {/* Technical Research Report Modal (Dhargad Watershed Rejuvenation) */}
      {isReportOpen && (
        <Suspense fallback={null}>
          <ReportModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
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
    </div>
  );
}
