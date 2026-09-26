import React, { useState, Suspense, lazy } from 'react';
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

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

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
      <Footer />

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
    </div>
  );
}
