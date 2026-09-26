import React, { useState } from 'react';
import {
  X,
  Printer,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Droplet,
  Mountain,
  Trees,
  ShieldCheck,
  Users,
  Calendar,
  MapPin,
  BookOpen,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  LayoutGrid,
} from 'lucide-react';

interface ReportPageInfo {
  num: number;
  title: string;
  subtitle: string;
  imageWebp: string;
  imagePng: string;
}

const REPORT_PAGES: ReportPageInfo[] = [
  {
    num: 1,
    title: 'Cover & Title',
    subtitle: 'Rejuvenation Strategy of Naula, Springs & Streams',
    imageWebp: '/reports/page_01.webp',
    imagePng: '/reports/page_01.png',
  },
  {
    num: 2,
    title: 'Study Area Profile',
    subtitle: 'Geomorphology & Location Map of Dhargad Watershed',
    imageWebp: '/reports/page_02.webp',
    imagePng: '/reports/page_02.png',
  },
  {
    num: 3,
    title: 'Springs & Naulas Status',
    subtitle: 'Hydrogeological Assessment & Depletion Drivers',
    imageWebp: '/reports/page_03.webp',
    imagePng: '/reports/page_03.png',
  },
  {
    num: 4,
    title: 'Inventory & Metrics (Table 1)',
    subtitle: 'Coordinates, Summer Yield & Discharge Classification',
    imageWebp: '/reports/page_04.webp',
    imagePng: '/reports/page_04.png',
  },
  {
    num: 5,
    title: 'Hydrogeological Micro-Plans (Table 3)',
    subtitle: 'Trenches, Infiltration Holes & Recharge Measures',
    imageWebp: '/reports/page_05.webp',
    imagePng: '/reports/page_05.png',
  },
  {
    num: 6,
    title: 'Biological Interventions',
    subtitle: 'Broadleaf Species Plantation & Native Vegetation',
    imageWebp: '/reports/page_06.webp',
    imagePng: '/reports/page_06.png',
  },
  {
    num: 7,
    title: 'Community Resolutions',
    subtitle: 'Village Participation & Gram Panchayat Approvals',
    imageWebp: '/reports/page_07.webp',
    imagePng: '/reports/page_07.png',
  },
  {
    num: 8,
    title: 'References & Citations',
    subtitle: 'Hydrological Publications & Baseline Studies',
    imageWebp: '/reports/page_08.webp',
    imagePng: '/reports/page_08.png',
  },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'sections'>('pdf');
  const [activeTab, setActiveTab] = useState<
    'summary' | 'geography' | 'inventory' | 'microplan' | 'biological' | 'community' | 'references'
  >('summary');
  const [zoom, setZoom] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfLayout, setPdfLayout] = useState<'scroll' | 'single'>('scroll');
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          isExpanded ? 'max-w-[97vw] h-[96vh]' : 'max-w-6xl max-h-[92vh]'
        } bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto transition-all duration-300`}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0F2042] text-white p-5 sm:p-6 border-b border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-[#B3864B] shrink-0 mt-0.5">
              <FileText className="w-6 h-6 text-[#E5B574]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#B3864B]/20 text-[#E5B574] text-xs font-semibold uppercase tracking-wider mb-1 font-['Poppins']">
                Official Technical Research Report • Towards Aviral Ganga
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-['Poppins'] leading-tight text-white">
                Rejuvenation Strategy of Dying Springs and Naulas
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-normal">
                Dhargad Rainfed River Watershed, Jaigan Valley, District Bageshwar (Kumaun Himalaya)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/15 cursor-pointer"
              title={isExpanded ? 'Collapse size' : 'Expand full window'}
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-white/80" />
                  <span className="hidden sm:inline">Exit Full</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-white/80" />
                  <span className="hidden sm:inline">Expand</span>
                </>
              )}
            </button>
            <a
              href="/reports/Dhargad_Watershed_Rejuvenation_Report_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/15 cursor-pointer"
              title="Open in new window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              <span>Full Tab</span>
            </a>
            <a
              href="/reports/Dhargad_Watershed_Rejuvenation_Report_2026.pdf"
              download="Dhargad_Watershed_Rejuvenation_Report_2026.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B3864B] hover:bg-[#976e38] text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Download PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/15 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-white/80" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close report modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authors and Metadata Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-[#0F2042]">Principal Authors:</span>
            <span>Prof. J.S. Rawat</span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-[#0F2042]">Er. Varun Rawat</span>
            <span className="text-slate-300">•</span>
            <span>Dr. N.C. Pant</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              January, 2026
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Jatha &amp; Pass Villages, Bageshwar
            </span>
          </div>
        </div>

        {/* Primary View Mode Switcher */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('pdf')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'pdf'
                  ? 'bg-[#0F2042] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#0F2042] border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#E5B574]" />
              <span>Attached PDF Document</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-700 font-bold ml-1">
                PDF
              </span>
            </button>
            <button
              onClick={() => setViewMode('sections')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'sections'
                  ? 'bg-[#0F2042] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#0F2042] border border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#B3864B]" />
              <span>Document Summary &amp; Data Tables</span>
            </button>
          </div>
          <span className="text-slate-500 hidden sm:inline text-[11px]">
            Towards Aviral Ganga • Technical Report
          </span>
        </div>

        {/* VIEW MODE 1: ATTACHED PDF VIEWER (High-Performance Interactive Reader) */}
        {viewMode === 'pdf' ? (
          <div className="flex-1 flex flex-col min-h-[66vh] bg-slate-900 overflow-hidden">
            {/* Secondary Toolbar: Page Navigation, View Modes & Zoom */}
            <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-300 gap-2 shrink-0">
              {/* Left Controls: Thumbnails Toggle & Prev/Next Page */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    showThumbnails
                      ? 'bg-[#B3864B] text-white shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  title="Toggle Thumbnails Sidebar"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pages</span>
                  <span className="text-[10px] opacity-80">(8)</span>
                </button>

                <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

                {/* Page Prev / Current / Next */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const next = Math.max(1, currentPage - 1);
                      setCurrentPage(next);
                      if (pdfLayout === 'scroll') {
                        document.getElementById(`pdf-page-${next}`)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage <= 1}
                    className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center px-2 py-1 bg-slate-900 border border-slate-800 rounded-md text-slate-200 text-xs font-mono font-medium">
                    <span>Page {currentPage}</span>
                    <span className="text-slate-500 mx-1">/</span>
                    <span className="text-slate-400">8</span>
                  </div>
                  <button
                    onClick={() => {
                      const next = Math.min(8, currentPage + 1);
                      setCurrentPage(next);
                      if (pdfLayout === 'scroll') {
                        document.getElementById(`pdf-page-${next}`)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage >= 8}
                    className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Center: Scroll vs Single Page Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setPdfLayout('scroll')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    pdfLayout === 'scroll'
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Continuous Scroll
                </button>
                <button
                  onClick={() => setPdfLayout('single')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    pdfLayout === 'single'
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Single Page
                </button>
              </div>

              {/* Right: Zoom Level Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoom((z) => Math.max(60, z - 15))}
                  className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-mono transition-colors cursor-pointer"
                  title="Reset Zoom (100%)"
                >
                  {zoom}%
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(170, z + 15))}
                  className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Reading Surface with Sidebar */}
            <div className="flex-1 flex overflow-hidden relative">
              {/* Left Thumbnails Sidebar */}
              {showThumbnails && (
                <div className="w-44 sm:w-56 shrink-0 bg-slate-950 border-r border-slate-800 overflow-y-auto p-3 space-y-2.5">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Pages (8)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">Ready</span>
                  </div>
                  {REPORT_PAGES.map((page) => {
                    const isActive = currentPage === page.num;
                    return (
                      <button
                        key={page.num}
                        onClick={() => {
                          setCurrentPage(page.num);
                          if (pdfLayout === 'scroll') {
                            document.getElementById(`pdf-page-${page.num}`)?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`w-full text-left p-1.5 rounded-lg border transition-all cursor-pointer group ${
                          isActive
                            ? 'bg-slate-800/90 border-[#B3864B] shadow-md ring-1 ring-[#B3864B]/40'
                            : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850'
                        }`}
                      >
                        <div className="relative aspect-[3/4] bg-white rounded overflow-hidden shadow-inner mb-1.5 border border-slate-700/80">
                          <picture>
                            <source srcSet={page.imageWebp} type="image/webp" />
                            <img
                              src={page.imagePng}
                              alt={page.title}
                              className="w-full h-full object-cover object-top"
                              loading="lazy"
                            />
                          </picture>
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono font-bold">
                            {page.num}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-200 truncate group-hover:text-[#E5B574] transition-colors">
                          {page.num}. {page.title}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate">
                          {page.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Pages Scroll / Render Area */}
              <div
                className="flex-1 overflow-y-auto bg-slate-900 p-3 sm:p-6 flex flex-col items-center"
                onScroll={(e) => {
                  if (pdfLayout === 'scroll') {
                    const container = e.currentTarget;
                    const scrollTop = container.scrollTop;
                    const pageEls = container.querySelectorAll('[data-page-num]');
                    pageEls.forEach((el) => {
                      const top = (el as HTMLElement).offsetTop - 140;
                      const height = (el as HTMLElement).offsetHeight;
                      if (scrollTop >= top && scrollTop < top + height) {
                        const pNum = Number(el.getAttribute('data-page-num'));
                        if (pNum && pNum !== currentPage) {
                          setCurrentPage(pNum);
                        }
                      }
                    });
                  }
                }}
              >
                {pdfLayout === 'scroll' ? (
                  // Continuous Scroll: All 8 pages sequentially
                  <div
                    className="flex flex-col items-center gap-6 w-full transition-all duration-200 origin-top"
                    style={{
                      width: `${zoom}%`,
                      maxWidth: zoom <= 100 ? '900px' : `${(900 * zoom) / 100}px`,
                    }}
                  >
                    {REPORT_PAGES.map((page) => (
                      <div
                        key={page.num}
                        id={`pdf-page-${page.num}`}
                        data-page-num={page.num}
                        className="w-full bg-white rounded-md shadow-2xl border border-slate-700/60 overflow-hidden relative"
                      >
                        {/* Page Top Header Bar */}
                        <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span className="truncate">
                            <strong className="text-[#0F2042]">Page {page.num}</strong>: {page.title} • {page.subtitle}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] text-slate-400">
                            Towards Aviral Ganga (2026)
                          </span>
                        </div>

                        {/* Page Rendered High-Resolution Image */}
                        <div className="w-full bg-white flex items-center justify-center p-2 sm:p-4">
                          <picture className="w-full block">
                            <source srcSet={page.imageWebp} type="image/webp" />
                            <img
                              src={page.imagePng}
                              alt={`Page ${page.num} - ${page.title}`}
                              className="w-full h-auto object-contain mx-auto shadow-xs border border-slate-100"
                              loading={page.num <= 2 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </picture>
                        </div>

                        {/* Page Bottom Footer Bar */}
                        <div className="bg-slate-50 border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>GEOVERSED Technical Research Report</span>
                          <span>Page {page.num} of 8</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Single Page Mode: Only one page at a time
                  (() => {
                    const page = REPORT_PAGES[currentPage - 1];
                    return (
                      <div
                        className="flex flex-col items-center w-full transition-all duration-200 origin-top"
                        style={{
                          width: `${zoom}%`,
                          maxWidth: zoom <= 100 ? '900px' : `${(900 * zoom) / 100}px`,
                        }}
                      >
                        <div
                          id={`pdf-page-${page.num}`}
                          data-page-num={page.num}
                          className="w-full bg-white rounded-md shadow-2xl border border-slate-700/60 overflow-hidden relative"
                        >
                          <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                            <span className="truncate">
                              <strong className="text-[#0F2042]">Page {page.num}</strong>: {page.title} • {page.subtitle}
                            </span>
                            <span className="shrink-0 font-mono text-[10px] text-slate-400">
                              Dhargad Watershed Rejuvenation Report
                            </span>
                          </div>

                          <div className="w-full bg-white flex items-center justify-center p-2 sm:p-4">
                            <picture className="w-full block">
                              <source srcSet={page.imageWebp} type="image/webp" />
                              <img
                                src={page.imagePng}
                                alt={`Page ${page.num} - ${page.title}`}
                                className="w-full h-auto object-contain mx-auto shadow-xs border border-slate-100"
                                loading="eager"
                                decoding="async"
                              />
                            </picture>
                          </div>

                          <div className="bg-slate-50 border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-400">
                            <span>GEOVERSED Technical Research Report</span>
                            <span>Towards Aviral Ganga • Page {page.num} of 8</span>
                          </div>
                        </div>

                        {/* Navigation controls below page in single-page mode */}
                        <div className="flex items-center justify-between w-full mt-4 max-w-md">
                          <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage <= 1}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-medium cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous Page</span>
                          </button>
                          <span className="text-slate-300 text-xs font-mono font-medium">
                            Page {currentPage} of 8
                          </span>
                          <button
                            onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
                            disabled={currentPage >= 8}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-medium cursor-pointer"
                          >
                            <span>Next Page</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Navigation Tabs (Sections Mode) */}
            <div className="flex items-center gap-1 px-5 border-b border-slate-200 bg-white overflow-x-auto scrollbar-none py-2 text-xs font-medium">
              {[
                { id: 'summary', label: 'Executive Summary', icon: BookOpen },
                { id: 'geography', label: 'Watershed & Geology', icon: Mountain },
                { id: 'inventory', label: 'Springs & Naulas (Table 1)', icon: Droplet },
                { id: 'microplan', label: 'Micro-Plans (Table 3)', icon: Layers },
                { id: 'biological', label: 'Biological Treatment', icon: Trees },
                { id: 'community', label: 'Community (Annexure-I)', icon: Users },
                { id: 'references', label: 'References Cited', icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0F2042] text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-[#0F2042] hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5B574]' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-slate-700 leading-relaxed text-sm">
          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Highlight Stats Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl">
                  <div className="text-xl sm:text-2xl font-bold text-[#0F2042] font-['Poppins']">400,000</div>
                  <div className="text-xs text-slate-600 font-medium">Infiltration Holes Planned</div>
                </div>
                <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl">
                  <div className="text-xl sm:text-2xl font-bold text-[#0F2042] font-['Poppins']">2,341</div>
                  <div className="text-xs text-slate-600 font-medium">Infiltration Trenches</div>
                </div>
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                  <div className="text-xl sm:text-2xl font-bold text-[#0F2042] font-['Poppins']">7 Sources</div>
                  <div className="text-xs text-slate-600 font-medium">Springs &amp; Naulas Mapped</div>
                </div>
                <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl">
                  <div className="text-xl sm:text-2xl font-bold text-[#0F2042] font-['Poppins']">0.17 km²</div>
                  <div className="text-xs text-slate-600 font-medium">Phase-I Recharge Zone</div>
                </div>
              </div>

              {/* Executive Summary Narrative */}
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-base text-[#0F2042] font-['Poppins'] mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#B3864B]" />
                  Executive Summary: The Himalayan Water Tower Crisis
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                  The Himalayan region, often referred to as the <strong>"Water Tower of Asia"</strong>, is experiencing a severe crisis in both glacial-fed and non-glacial rainfed river watersheds. Rainfed rivers in Uttarakhand play a critical role, supporting agriculture, industry, and human consumption across <strong>353 significant rainfed streams/rivers of fourth order and above</strong> (spanning 5,796 km). Within their catchments reside over <strong>70% of villages and 80% of urban centers</strong> in the state.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                  Due to anthropogenic pressures and climate change, perennial springs and naulas are rapidly transforming into ephemeral water bodies, causing rivers like the Kosi, Gaula, Saryu, Western Ramganga, and Nayar to experience sharp declines in summer base flow.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  This report develops a <strong>scientific integrated model for groundwater augmentation and spring rejuvenation</strong> in the <strong>Dhargad River watershed</strong> (a tributary of the Jaigan River in Bageshwar district) serving as an empirical natural laboratory.
                </p>
              </div>

              {/* Fundamental Objectives */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-3">
                  Fundamental Objectives of the Dhargad Strategy:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {[
                    'Identify and prioritize dead and dying naulas, springs, and streams in the catchment.',
                    'Assess the status of springs/streams and demarcate hydro-geomorphic recharge zones using GIS & Remote Sensing.',
                    'Develop a GIScience-based Decision Support System (DSS) for site-specific micro-planning.',
                    'Implement and monitor mechanical & biological interventions in active collaboration with Gram Panchayats.',
                    'Mitigate climate change vulnerabilities, arrest land degradation, and improve local mountain livelihoods.',
                  ].map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Partners Acknowledgement */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B3864B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Collaborative Institutions &amp; Field Support:</span> Supported by{' '}
                  <strong>AMAN NGO (Almora)</strong> under the leadership of Jagdish Chandra and Neelima Bhatt, in partnership with the{' '}
                  <strong>Centre of Excellence for Natural Resources Data Management System (NRDMS) in Uttarakhand</strong> and the{' '}
                  <strong>Gram Panchayats of Jatha and Pass</strong>.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WATERSHED & GEOLOGY */}
          {activeTab === 'geography' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Physical Watershed Parameters */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B3864B]" />
                    Dhargad Watershed Spatial Coordinates
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Total Watershed Catchment:</span>
                      <span className="font-semibold text-slate-800">2.32 km²</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Phase-I Experimental Recharge Area:</span>
                      <span className="font-semibold text-slate-800">0.17 km² (17 Hectares)</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Latitude Extent:</span>
                      <span className="font-mono text-slate-700">29°43'38.117" N to 29°44'53.908" N</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Longitude Extent:</span>
                      <span className="font-mono text-slate-700">79°43'39.756" E to 79°44'47.547" E</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Catchment Elevation Range:</span>
                      <span className="font-semibold text-slate-800">1,295 m to 1,492 m (MSL)</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span className="font-medium text-slate-500">River System Linkage:</span>
                      <span className="font-semibold text-[#0F2042]">Dhargad ➔ Jaigan ➔ Saryu ➔ Kali ➔ Ganga</span>
                    </li>
                  </ul>
                </div>

                {/* Geology & Climate */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-3 flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[#B3864B]" />
                    Lithology &amp; Structural Setup
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Composed of the <strong>Raut Gara Formation of the Damta Group</strong>. Dominated by compact quartzites with feldspar and mica minerals, interbedded with fine-grained foliated metamorphic phyllite exhibiting silky sheen, and low-grade metamorphic slate rocks.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Subject to intense regional tectonism, shearing, thrust deformation, and high joint/fracture density that govern localized groundwater percolation pathways.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">Climatic Zone:</span> Cool temperate (1,300–2,000m). Annual rainfall 1,000–1,500 mm, concentrated during the SW monsoon (June–Sept).
                  </div>
                </div>
              </div>

              {/* Table 2: Relief Zones Distribution */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-[#0F2042] text-white px-4 py-2.5 text-xs font-semibold font-['Poppins'] flex items-center justify-between">
                  <span>Table-2: Distribution of Area Under Different Relief Zones (Phase-I Experimental Zone)</span>
                  <span className="text-[#E5B574]">Total: 0.17 km²</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2.5">Relief Zone (Meters MSL)</th>
                        <th className="px-4 py-2.5">Area (km²)</th>
                        <th className="px-4 py-2.5">Percentage (%)</th>
                        <th className="px-4 py-2.5">Hydrological Character</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium">&gt; 1,400 m</td>
                        <td className="px-4 py-2.5">0.03 km²</td>
                        <td className="px-4 py-2.5 font-semibold text-amber-700">17.65%</td>
                        <td className="px-4 py-2.5 text-slate-600">High relief; primary convex recharge ridge</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium">1,350 – 1,400 m</td>
                        <td className="px-4 py-2.5">0.05 km²</td>
                        <td className="px-4 py-2.5 font-semibold text-blue-700">29.41%</td>
                        <td className="px-4 py-2.5 text-slate-600">Medium relief; spring emergence &amp; stepped terraces</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium">&lt; 1,350 m</td>
                        <td className="px-4 py-2.5">0.09 km²</td>
                        <td className="px-4 py-2.5 font-semibold text-emerald-700">52.94%</td>
                        <td className="px-4 py-2.5 text-slate-600">Low relief; confluence valleys &amp; baseflow drainage</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold text-slate-800">
                        <td className="px-4 py-2.5">Total</td>
                        <td className="px-4 py-2.5">0.17 km²</td>
                        <td className="px-4 py-2.5">100.00%</td>
                        <td className="px-4 py-2.5">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Land Use Pattern */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-3">
                  Human Geography &amp; Land Use Pattern (0.17 km²)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="text-base font-bold text-amber-900">63.52%</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Agricultural Land (0.108 km²)</div>
                    <div className="text-[10px] text-amber-700 mt-1">Mostly Abandoned</div>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                    <div className="text-base font-bold text-slate-800">18.82%</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Barren Land (0.032 km²)</div>
                    <div className="text-[10px] text-slate-500 mt-1">Prime for Trenches</div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-base font-bold text-emerald-900">10.20%</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Forest / Vegetation (0.018 km²)</div>
                    <div className="text-[10px] text-emerald-700 mt-1">Oak / Broad-leaved</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-base font-bold text-blue-900">5.29%</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Settlements (0.004 km²)</div>
                    <div className="text-[10px] text-blue-700 mt-1">Village Jatha</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="text-base font-bold text-purple-900">2.94%</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Roads (0.005 km²)</div>
                    <div className="text-[10px] text-purple-700 mt-1">New Construction</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPRINGS & NAULAS INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-3">
                <Droplet className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Traditional Drinking Water Sources in Jatha &amp; Pass:</span> A total of{' '}
                  <strong>7 natural drinking water sources</strong> (2 perennial springs and 5 traditional masonry naulas) were hydro-geologically surveyed and cataloged with GPS coordinates. Four out of five Naulas are currently severely damaged or non-functional.
                </div>
              </div>

              {/* Table-1 Component */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-[#0F2042] text-white px-4 py-2.5 text-xs font-semibold font-['Poppins'] flex items-center justify-between">
                  <span>Table-1: Details of Springs and Naulas of the Study Area</span>
                  <span className="text-[#E5B574]">Source: Ground Field Survey by Jagdish Chandra &amp; Team</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">S.N.</th>
                        <th className="px-3 py-2.5">Water Source</th>
                        <th className="px-3 py-2.5">Type</th>
                        <th className="px-3 py-2.5">Elevation &amp; Coordinates</th>
                        <th className="px-3 py-2.5">Beneficiary Families (Pop.)</th>
                        <th className="px-3 py-2.5">Water Uses</th>
                        <th className="px-3 py-2.5">Condition (10 Yrs Ago)</th>
                        <th className="px-3 py-2.5">Present Condition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {/* Dhargad Spring */}
                      <tr className="hover:bg-slate-50">
                        <td className="px-3 py-3 font-semibold text-slate-800">1</td>
                        <td className="px-3 py-3 font-bold text-[#0F2042]">Dhargad Spring</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[11px]">Spring</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,324 m<br />29°44'33.419"N, 79°44'26.042"E
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800">
                          80 families (350 pop.)
                        </td>
                        <td className="px-3 py-3 text-slate-600">Drinking, domestic, animals, irrigation (0.34 L/sec)</td>
                        <td className="px-3 py-3 text-emerald-700 font-medium">Working</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3 h-3" /> Working
                          </span>
                        </td>
                      </tr>

                      {/* Bhaidyon Spring */}
                      <tr className="hover:bg-slate-50">
                        <td className="px-3 py-3 font-semibold text-slate-800">2</td>
                        <td className="px-3 py-3 font-bold text-[#0F2042]">Bhaidyon Spring</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[11px]">Spring</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,441 m<br />29°44'22.337"N, 79°44'16.526"E
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800">
                          60 families (150 pop.)
                        </td>
                        <td className="px-3 py-3 text-slate-600">Drinking, clothes washing, animals, irrigation</td>
                        <td className="px-3 py-3 text-emerald-700 font-medium">Working</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3 h-3" /> Working
                          </span>
                        </td>
                      </tr>

                      {/* Syari Naula */}
                      <tr className="hover:bg-slate-50">
                        <td className="px-3 py-3 font-semibold text-slate-800">3</td>
                        <td className="px-3 py-3 font-bold text-[#0F2042]">Syari Naula</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">Naula</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,362 m<br />29°44'27.844"N, 79°44'23.175"E
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800">
                          12 families (25 pop.)
                        </td>
                        <td className="px-3 py-3 text-slate-600">Drinking, animals, washing</td>
                        <td className="px-3 py-3 text-emerald-700 font-medium">Working</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3 h-3" /> Working
                          </span>
                        </td>
                      </tr>

                      {/* Mathi Naula */}
                      <tr className="hover:bg-slate-50 bg-red-50/20">
                        <td className="px-3 py-3 font-semibold text-slate-800">4</td>
                        <td className="px-3 py-3 font-bold text-red-900">Mathi Naula</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">Naula</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,397 m<br />29°44'21.801"N, 79°44'21.086"E
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800">
                          5 families (11 pop.)
                        </td>
                        <td className="px-3 py-3 text-slate-600">Drinking, animals, clothes</td>
                        <td className="px-3 py-3 text-emerald-700 font-medium">Working</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold text-[11px]">
                            <AlertTriangle className="w-3 h-3" /> Completely Damaged
                          </span>
                        </td>
                      </tr>

                      {/* Nikai Naula */}
                      <tr className="hover:bg-slate-50 bg-red-50/20">
                        <td className="px-3 py-3 font-semibold text-slate-800">5</td>
                        <td className="px-3 py-3 font-bold text-red-900">Nikai Naula</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">Naula</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,306 m<br />29°44'27.862"N, 79°44'17.775"E
                        </td>
                        <td className="px-3 py-3 text-slate-400">Nil (Defunct)</td>
                        <td className="px-3 py-3 text-slate-400">Nil (Dry / Abandoned)</td>
                        <td className="px-3 py-3 text-emerald-700 font-medium">Working</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold text-[11px]">
                            <AlertTriangle className="w-3 h-3" /> Completely Damaged
                          </span>
                        </td>
                      </tr>

                      {/* Bhairav Naula */}
                      <tr className="hover:bg-slate-50 bg-red-50/20">
                        <td className="px-3 py-3 font-semibold text-slate-800">6</td>
                        <td className="px-3 py-3 font-bold text-red-900">Bhairav Naula</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">Naula</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,397 m<br />29°44'23.703"N, 79°44'23.621"E
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800">
                          30 families (110 pop.)
                        </td>
                        <td className="px-3 py-3 text-slate-600">Animal drinking water</td>
                        <td className="px-3 py-3 text-red-600 font-medium">Damaged</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold text-[11px]">
                            <AlertTriangle className="w-3 h-3" /> Completely Damaged
                          </span>
                        </td>
                      </tr>

                      {/* Thaman Naula */}
                      <tr className="hover:bg-slate-50 bg-amber-50/20">
                        <td className="px-3 py-3 font-semibold text-slate-800">7</td>
                        <td className="px-3 py-3 font-bold text-amber-900">Thaman Naula</td>
                        <td className="px-3 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">Naula</span>
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] text-slate-600">
                          1,449 m<br />29°44'27.039"N, 79°44'12.802"E
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-800">
                          30 families (110 pop.)
                        </td>
                        <td className="px-3 py-3 text-slate-600">Animal drinking (summer only)</td>
                        <td className="px-3 py-3 text-emerald-700 font-medium">Working</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">
                            <AlertTriangle className="w-3 h-3" /> Damaged / Seasonal
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MICRO-PLANS (TABLE 3) */}
          {activeTab === 'microplan' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
                <Layers className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">GIScience-Engineered Mechanical Treatment Micro-Plan:</span> Tailored mechanical interventions designed to intercept high-intensity monsoon storm runoff, force rapid subsurface infiltration into fractured quartzitic bedrock, and augment mountain aquifers.
                </div>
              </div>

              {/* Table-3 Component */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-[#0F2042] text-white px-4 py-2.5 text-xs font-semibold font-['Poppins'] flex items-center justify-between">
                  <span>Table-3: Estimated Numbers of Mechanical Treatment Measures (Phase-I)</span>
                  <span className="text-[#E5B574]">Detailed Landuse Allocation</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2.5">Mechanical Intervention</th>
                        <th className="px-4 py-2.5">Forest Land</th>
                        <th className="px-4 py-2.5">Barren Land</th>
                        <th className="px-4 py-2.5">Abandoned Agri Land</th>
                        <th className="px-4 py-2.5">Active Agri Land</th>
                        <th className="px-4 py-2.5">Total Interventions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Infiltration Holes
                          <span className="block text-[11px] font-normal text-slate-500">10-15 cm deep, 5 cm dia, density 5/m²</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">90,000</td>
                        <td className="px-4 py-3 font-semibold text-slate-700">160,000</td>
                        <td className="px-4 py-3 font-semibold text-slate-700">150,000</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 font-bold text-emerald-700">400,000 Holes</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Infiltration Trenches
                          <span className="block text-[11px] font-normal text-slate-500">1.0m × 0.5m × 0.3m, 5-10m staggered spacing</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">291</td>
                        <td className="px-4 py-3 font-semibold text-slate-700">2,050</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 font-bold text-blue-700">2,341 Trenches</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Bio-Plugs
                          <span className="block text-[11px] font-normal text-slate-500">Vegetation, dead wood, pine needles &amp; soil</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-700" colSpan={2}>
                          20 across upper reaches of 2 ephemeral rills/gullies
                        </td>
                        <td className="px-4 py-3 font-bold text-amber-700">20 Plugs</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Rill / Gully Plugs
                          <span className="block text-[11px] font-normal text-slate-500">Stone masonry plugs across eroded rill courses</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-700" colSpan={2}>
                          5 across middle reaches of 3 ephemeral channels
                        </td>
                        <td className="px-4 py-3 font-bold text-amber-700">5 Plugs</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Terrace Ponds
                          <span className="block text-[11px] font-normal text-slate-500">10-20 m² area, 1-2m deep earthen retention tanks</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 font-semibold text-slate-700">10 Ponds</td>
                        <td className="px-4 py-3 font-semibold text-slate-700" colSpan={2}>
                          20 Ponds on Agricultural land
                        </td>
                        <td className="px-4 py-3 font-bold text-indigo-700">30 Ponds</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Contour Bunds
                          <span className="block text-[11px] font-normal text-slate-500">Earthen embankments along slope contours</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-700" colSpan={2}>
                          5,000 running meters along terrace edges
                        </td>
                        <td className="px-4 py-3 font-bold text-purple-700">5,000 Meters</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold text-[#0F2042]">
                          Check Dams
                          <span className="block text-[11px] font-normal text-slate-500">1.0–1.5m masonry structures across 2nd/3rd order streams</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-400">—</td>
                        <td className="px-4 py-3 text-slate-700" colSpan={2}>
                          2 check dams near stream mouths
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800">2 Check Dams</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rainwater Harvesting for Buildings */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-2">
                  Building Rooftop Rainwater Harvesting &amp; Aquifer Augmentation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  In addition to hill slope cuts, rooftop harvesting systems with 4 components (gutters/downspouts, filtration unit, storage tank, and gravel-sand recharge pits) are integrated to channel domestic roof runoff directly into underlying aquifer horizons.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: BIOLOGICAL MEASURES */}
          {activeTab === 'biological' && (
            <div className="space-y-6">
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-base text-[#0F2042] font-['Poppins'] mb-3 flex items-center gap-2">
                  <Trees className="w-5 h-5 text-emerald-600" />
                  Biological Treatment &amp; Eco-Restoration
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  While mechanical interventions offer immediate physical retention during cloudbursts, biological treatments ensure permanent hydrological healing of the springshed. Experience confirms that no biological work should proceed without complete protection from forest fire and grazing damage.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <h5 className="font-bold text-sm text-[#0F2042] mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      Afforestation of Native Broad-Leaved Species
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Deploying water-conserving broad-leaved mountain trees across <strong>0.032 km² (18.12%) of barren and degraded land</strong>. Prioritizing native species like <strong>Banj Oak (Quercus leucotrichophora)</strong>, <strong>Uthis / Alder (Alnus nepalensis)</strong>, <strong>Pipal</strong>, and <strong>Buransh (Rhododendron)</strong> whose deep root networks slowly release moisture into subsurface fissures.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <h5 className="font-bold text-sm text-[#0F2042] mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      Soil-Binding Grasses &amp; Vegetative Covers
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Extensive planting of high-tensile perennial grasses including <strong>Napier grass</strong> and <strong>Vetiver grass</strong> along contour trenches, bund crests, and gully banks to arrest topsoil erosion, enhance organic mulch, and increase percolation rates.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <h5 className="font-bold text-sm text-[#0F2042] mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B3864B]" />
                      Community &amp; Herbal Nurseries
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Establishment of local nurseries managed in partnership with women self-help groups and Gram Panchayats, producing native broad-leaved seedlings, fruit trees, and high-value medicinal herbs for hillside stabilization.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <h5 className="font-bold text-sm text-[#0F2042] mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B3864B]" />
                      Floriculture on Abandoned Terraces
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      Over <strong>0.132 km²</strong> of abandoned agricultural land will be rejuvenated through commercial floriculture and horticulture, reviving farm livelihoods and preventing destructive gully incision on uncultivated terrace walls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMMUNITY PARTICIPATION (ANNEXURE-I) */}
          {activeTab === 'community' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-base text-[#0F2042] font-['Poppins'] mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#B3864B]" />
                  Annexure-I: Village Orientation &amp; Community Resolutions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  On <strong>29 November 2025</strong>, a joint workshop and orientation on water conservation was convened in <strong>Village Jatha</strong> (30 participants) and <strong>Village Kafaligair / Dharalkhunga</strong> (35 participants) under the leadership of <strong>Prof. Jiwan Singh Rawat</strong>, Field Coordinator <strong>Jagdish Chandra</strong>, Executive Coordinator <strong>Neelima Bhatt (AMAN NGO)</strong>, and local village leaders.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <h6 className="font-bold text-slate-800 mb-1">Key Issues Articulated by Residents:</h6>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Acute drinking water scarcity during summer months lasting 2 to 3 consecutive months.</li>
                      <li>Traditional piped supply runs dry as local catchment recharge fails.</li>
                      <li>Decline in native broad-leaved species (Oak, Uthis, Pipal) leading to rapid runoff rather than slow absorption.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <h6 className="font-bold text-slate-800 mb-1">Unanimous Resolution:</h6>
                    <p className="text-slate-600">
                      The Gram Sabha resolved to immediately begin phase-wise water conservation measures prioritizing <strong>Ward No. 6 and Ward No. 7</strong> of village Jatha, with technical guidance from GEOVERSED and logistics support from AMAN NGO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REFERENCES CITED */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B3864B]" />
                Scientific References &amp; Foundational Literature
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                {[
                  'Rawat, J.S. et al. (2016): Perennial to ephemeral transformation of a Lesser Himalayan watershed, Current Science, Vol. 111, NO. 4, 25 August 2016.',
                  'Valdiya, K.S. (1979): An outline of the structural setup of the Kumaun Himalaya, Journal of Geological Society of India, Vol. 20, pp. 145-157.',
                  'Gansser, A. (1974): Himalaya: In A.M. Spencer (ed) Mesozoic Orogenic Belt, Geological Society of London, pp. 267-278.',
                  'Rawat, J.S. and R. Dobhal (2018): Uttarakhand State Geo-Portal for Decentralized Governance, Springer Nature Singapore.',
                  'Wilson, John P. (2007): The Handbook of Geographic Information Science, Wiley Blackwell, UK.',
                  'Rawat, P.K. et al. (2011): Climate change and its geo-hydrological impacts on mountainous terrain: a case study through remote sensing and GIS modeling, E-Int. Sci. Res. J., 3, 51-69.',
                  'Dr. Jiwan Singh Rawat (2009): Uttarakhand ke pey jalshroton ke vartman, bhoot evm bhavishy par ek drashti, Sanvad-2009, Almora.',
                  'Proceedings of the Meeting with Village Panchayat Members and villagers of village Jatha, November, 2025.',
                ].map((ref, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <span className="font-mono text-slate-400 font-semibold">{idx + 1}.</span>
                    <span>{ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    )}

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            Published under the academic &amp; field initiative: <strong className="text-slate-700">Towards Aviral Ganga</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-[#0F2042] font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#0F2042] hover:bg-[#1A365D] text-white font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
