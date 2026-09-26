import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Cpu,
  Layers,
  Globe,
  Award,
  FileText,
  CheckCircle2,
  MapPin,
  UserCheck,
  Sparkles,
  Mountain,
  Briefcase,
  Database,
  Network,
  Scale,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Landmark,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'objects' | 'missions' | 'governance'>('profile');

  // National Flagship Programs from Clause 3(a)(10) of INC-33
  const nationalMissions = [
    {
      name: 'PM Gati-Shakti',
      tag: 'National Master Plan',
      desc: 'Multi-modal connectivity infrastructure mapping, digital corridor planning, and geospatial synchronization across central & state ministries.',
    },
    {
      name: 'Jal Jeevan Mission',
      tag: 'Water Security & Supply',
      desc: 'GIS-driven rural water supply tracking, Himalayan spring-shed rejuvenation, tap connection mapping, and village water safety plans.',
    },
    {
      name: 'Namami Gange',
      tag: 'River Basin Management',
      desc: 'Upper Ganga catchment mapping, floodplain zoning, sewage discharge tracking, and high-altitude river health monitoring.',
    },
    {
      name: 'SARRA',
      tag: 'Rural Resource Analytics',
      desc: 'Spatial Analytics & Rural Resource Applications for precision rural infrastructure, socio-economic surveys, and demographic planning.',
    },
    {
      name: 'CAMPA',
      tag: 'Forestry & Afforestation',
      desc: 'Compensatory Afforestation Management & Planning Authority monitoring, forest canopy density mapping, and carbon sequestration modeling.',
    },
    {
      name: 'MGNREGA',
      tag: 'Watershed & Asset Planning',
      desc: 'GIS-based watershed planning, natural resource management (NRM) spatial audits, and durable community asset geolocation.',
    },
    {
      name: 'Smart Cities Mission',
      tag: 'Urban Spatial Platforms',
      desc: 'Digital twin architectures, 3D municipal GIS modeling, utility mapping, and integrated command and control center (ICCC) data layers.',
    },
    {
      name: 'Disaster Management',
      tag: 'Himalayan Risk Reduction',
      desc: 'Landslide hazard zonation (LHZ), flash flood susceptibility modeling, seismic vulnerability maps, and real-time early warning GIS layers.',
    },
  ];

  // Core Objects from Clause 3(a) of e-MOA
  const coreObjects = [
    {
      number: '01',
      title: 'Enterprise AI & SaaS Innovation',
      icon: Cpu,
      clause: 'Clause 3(a)(1, 2, 3, 9)',
      headline: 'Designing, scaling, and commercializing AI-powered software & SaaS platforms',
      points: [
        'Enterprise-grade SaaS platforms automating complex spatial operations and digital transformations',
        'Artificial Intelligence & Machine Learning algorithms for automated satellite feature extraction',
        'Decision-support systems (DSS), predictive dashboards, and custom geospatial APIs',
      ],
    },
    {
      number: '02',
      title: 'Geospatial, Drone & LiDAR Surveys',
      icon: Layers,
      clause: 'Clause 3(a)(4, 5)',
      headline: 'High-precision terrestrial, aerial, and satellite mapping for rugged mountain topographies',
      points: [
        'Geographic Information Systems (GIS), Remote Sensing, and advanced multispectral satellite image processing',
        'UAV / Drone surveying, photogrammetry, RTK-GPS geodetic surveys, and high-density LiDAR data processing',
        '3D terrain modeling, digital elevation models (DEM), watershed delineation, and spatial geodatabase engineering',
      ],
    },
    {
      number: '03',
      title: 'Web-GIS, Cloud & Digital Platforms',
      icon: Network,
      clause: 'Clause 3(a)(6, 7)',
      headline: 'Cloud-native interactive mapping geoportals, mobile apps, and IT infrastructure',
      points: [
        'Custom Web-GIS and Mobile GIS applications with responsive spatial querying and real-time telemetry',
        'Enterprise IT consulting, system integration, automated DevOps pipelines, and robust cybersecurity protocols',
        'Scalable cloud databases (PostGIS, GeoServer) and open spatial data standard implementations',
      ],
    },
    {
      number: '04',
      title: 'DPRs & Natural Resource Engineering',
      icon: FileText,
      clause: 'Clause 3(a)(8)',
      headline: 'Detailed Project Reports and end-to-end multi-sectoral planning & monitoring',
      points: [
        'Detailed Project Reports (DPRs) and master plans in water resources, river rejuvenation, and agriculture',
        'Comprehensive environmental impact assessments, forestry conservation, and rural development frameworks',
        'Ground-truthed field monitoring, hydrogeological tracer studies, and hill town infrastructure roadmaps',
      ],
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-24 bg-[#F8F9FA] border-y border-slate-200/70">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3864B]/10 border border-[#B3864B]/30 text-[#B3864B] text-xs font-semibold uppercase tracking-wider font-['Poppins'] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Statutory Corporate Profile &amp; Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#0F2042] font-['Poppins'] tracking-tight mb-4 leading-tight">
            Pioneering Geoscience Intelligence &amp; Enterprise AI Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Incorporated under the <strong>Companies Act, 2013 (Ministry of Corporate Affairs, Government of India)</strong>, 
            GEOVERSED unites on-ground Himalayan field exploration with enterprise-grade Artificial Intelligence, 
            satellite remote sensing, and national infrastructure consulting.
          </p>
        </div>

        {/* Interactive Tabs Header */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 bg-white rounded-xl border border-slate-200/80 shadow-sm gap-1 text-xs font-['Poppins']">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'bg-[#0F2042] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0F2042] hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('objects')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'objects'
                  ? 'bg-[#0F2042] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0F2042] hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>e-MOA Objects &amp; SaaS</span>
            </button>

            <button
              onClick={() => setActiveTab('missions')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'missions'
                  ? 'bg-[#0F2042] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0F2042] hover:bg-slate-50'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>National Flagship Missions</span>
            </button>

            <button
              onClick={() => setActiveTab('governance')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'governance'
                  ? 'bg-[#0F2042] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0F2042] hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Statutory &amp; R&amp;D Mandate</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Corporate Overview & Identity */}
        {activeTab === 'profile' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top 2-Column Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B3864B] uppercase tracking-wider font-['Poppins']">
                  <Mountain className="w-4 h-4" />
                  <span>The GEOVERSED Story &amp; Vision</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0F2042] font-['Poppins'] leading-snug">
                  Transforming Geospatial science with Artificial Intelligence from the Central Himalayas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Headquartered in <strong>Almora, Uttarakhand</strong>, <strong>GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED</strong> was 
                  founded to close the crucial divide between empirical on-ground Geography and cutting-edge digital computing. 
                  We operate where the fragile Himalayan terrain demands highest accuracy and ethical environmental stewardship.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our multidisciplinary team unites geologists, GIS architects, AI software engineers, environmental scientists, 
                  and regional planners. Pursuant to our statutory Memorandum of Association, we develop scalable software products, 
                  AI models, and comprehensive Detailed Project Reports (DPRs) that empower government departments, private enterprises, 
                  and academic institutions to thrive.
                </p>

                {/* Key Metrics Ribbon */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="block text-2xl font-bold text-[#0F2042] font-['Poppins']">13</span>
                    <span className="text-xs text-slate-500">Districts Covered</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#B3864B] font-['Poppins']">53,483</span>
                    <span className="text-xs text-slate-500">km² Himalayan Atlas</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#0F2042] font-['Poppins']">100%</span>
                    <span className="text-xs text-slate-500">MCA Registered</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Official MCA Incorporation Card */}
              <div className="lg:col-span-5 bg-[#0F2042] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#B3864B]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-200 font-['Poppins']">
                      Official Incorporation Data
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold bg-[#B3864B]/20 text-[#B3864B] px-2 py-0.5 rounded border border-[#B3864B]/30">
                    Govt. of India
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Corporate Legal Entity</span>
                    <strong className="text-white text-sm font-['Poppins'] leading-tight block mt-0.5">
                      GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED
                    </strong>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[11px] font-medium">Company Structure</span>
                      <span className="text-slate-200 font-semibold">One Person Company (OPC)</span>
                      <span className="text-[10px] text-slate-400 block">Limited by Shares</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] font-medium">Statutory Forms</span>
                      <span className="text-slate-200 font-semibold">INC-33 (e-MOA)</span>
                      <span className="text-[10px] text-slate-400 block">INC-34 (e-AOA)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[11px] font-medium">State of Incorporation</span>
                      <span className="text-slate-200 font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B3864B]" /> Uttarakhand
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] font-medium">Authorized Capital</span>
                      <span className="text-slate-200 font-semibold">₹1,00,000 INR</span>
                      <span className="text-[10px] text-slate-400 block">10,000 Equity Shares</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-slate-400 block text-[11px] font-medium">Founder &amp; First Director</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-7 h-7 rounded-full bg-[#B3864B]/20 flex items-center justify-center text-[#B3864B]">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white text-xs font-['Poppins']">Varun Rawat</strong>
                        <span className="text-slate-400 text-[10px] block">Director &amp; Chief Geospatial Architect</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-slate-400 block text-[11px] font-medium">Registered Office Address</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                      Khatyari, Manoj Vihar, Almora, Uttarakhand – 263601, India
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* 4 Pillars Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Mountain,
                  title: 'Himalayan Field Expertise',
                  desc: 'Decades of ground-truthed Geographical explorations and hydrological surveys across remote Himalayan basins.',
                },
                {
                  icon: Cpu,
                  title: 'Artificial Intelligence & SaaS',
                  desc: 'Enterprise software, deep learning for satellite rasters, automated spatial algorithms, and cloud APIs.',
                },
                {
                  icon: Globe,
                  title: 'Web-GIS & 3D Topography',
                  desc: 'High-density LiDAR processing, UAV drone surveys, interactive geoportals, and 3D terrain modeling.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Government Flagship Partner',
                  desc: 'Statutory mandate for PM Gati-Shakti, Jal Jeevan Mission, Namami Gange, CAMPA, and Disaster Management.',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0F2042]/5 group-hover:bg-[#B3864B]/10 flex items-center justify-center text-[#0F2042] group-hover:text-[#B3864B] transition-colors mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins'] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Core e-MOA Objects & SaaS Platforms */}
        {activeTab === 'objects' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-[#0F2042] font-['Poppins'] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#B3864B]" />
                    Clause 3(a) — The Objects Pursued by the Company on Incorporation
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Extracted from official Ministry of Corporate Affairs Form No. INC-33 (e-Memorandum of Association)
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#0F2042] bg-[#0F2042]/5 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
                  10 Comprehensive Clauses
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                The Company is legally authorized to design, develop, operate, and scale enterprise-grade software products, 
                AI platforms, geospatial data engines, and Detailed Project Reports. Here is the operational framework of our charter:
              </p>
            </div>

            {/* 4 Objects Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {coreObjects.map((obj, index) => {
                const Icon = obj.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-[#B3864B]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-[#0F2042] text-white flex items-center justify-center font-bold text-xs font-['Poppins']">
                            {obj.number}
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-[#0F2042] font-['Poppins']">
                              {obj.title}
                            </h4>
                            <span className="text-[10px] font-mono font-medium text-[#B3864B]">
                              {obj.clause}
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <p className="text-xs font-medium text-slate-700 mb-4 italic bg-[#F8F9FA] p-2.5 rounded-lg border border-slate-200/60">
                        "{obj.headline}"
                      </p>

                      <ul className="space-y-2 mb-4">
                        {obj.points.map((pt, pidx) => (
                          <li key={pidx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B3864B] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-['Poppins']">
                      <span>e-MOA Compliant</span>
                      <span className="text-[#0F2042] font-semibold">Active Operations</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: National Flagship Missions */}
        {activeTab === 'missions' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Context Box */}
            <div className="bg-gradient-to-r from-[#0F2042] to-[#1a3365] text-white rounded-2xl p-6 sm:p-7 shadow-md">
              <div className="flex items-center gap-2 text-[#B3864B] text-xs font-bold uppercase tracking-wider font-['Poppins'] mb-1.5">
                <Landmark className="w-4 h-4" />
                <span>Statutory Mandate: Clause 3(a)(10) of e-MOA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Poppins'] mb-2">
                Technical Consultants &amp; Implementing Agency for National Flagship Programs
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
                Pursuant to Clause 10 of our Memorandum of Association, GEOVERSED is chartered to act as technical consultants, 
                service providers, or implementing agencies for Government departments, Public Sector Undertakings (PSUs), 
                and institutional bodies across India's foremost socio-economic and infrastructural programs.
              </p>
            </div>

            {/* 8 National Missions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nationalMissions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-sm text-[#0F2042] font-['Poppins']">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#B3864B] font-semibold">
                    <span>Active Domain</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Statutory R&D & Governance Mandate */}
        {activeTab === 'governance' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* R&D and Academic Institution Objects */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#B3864B] font-bold text-xs uppercase tracking-wider font-['Poppins']">
                  <GraduationCap className="w-4 h-4" />
                  <span>Clause 3(b)(3) — Academic &amp; R&amp;D Centers</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F2042] font-['Poppins']">
                  Research Centers &amp; Accredited Certificate Academies
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  As specifically authorized by the Ministry of Corporate Affairs, GEOVERSED is mandated to establish, 
                  maintain, and operate state-of-the-art research and development centers, technical training hubs, 
                  and technical institutes in Almora and regional campuses.
                </p>
                <div className="space-y-2 pt-2">
                  {[
                    'Conduct professional certificate courses in GIS, Remote Sensing, GPS, and Drone Mapping',
                    'NEP 2020 curriculum design for undergraduate and postgraduate university departments',
                    'One-on-one thesis and dissertation supervision across Geoinformatics and Mountain Geography',
                    'Intellectual property (IPR) generation, patenting, and proprietary GeoAI software commercialization',
                  ].map((pt, pidx) => (
                    <div key={pidx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B3864B] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal & Corporate Governance */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#B3864B] font-bold text-xs uppercase tracking-wider font-['Poppins']">
                  <Scale className="w-4 h-4" />
                  <span>INC-34 e-AOA Corporate Governance</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F2042] font-['Poppins']">
                  Statutory Structure &amp; Shareholder Safety
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The company adheres strictly to the regulatory safeguards of the Companies Act, 2013, ensuring rigorous corporate 
                  integrity, audit accountability, and transparent institutional governance.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="p-3 bg-[#F8F9FA] rounded-lg border border-slate-200/70">
                    <strong className="text-[#0F2042] block mb-0.5">Section 122 Regulatory Adherence:</strong>
                    <span>One Person Company governance provisions governing director resolutions, minutes books, and administrative operations.</span>
                  </div>
                  <div className="p-3 bg-[#F8F9FA] rounded-lg border border-slate-200/70">
                    <strong className="text-[#0F2042] block mb-0.5">Financial &amp; Share Capital Architecture:</strong>
                    <span>Authorized capital of 10,000 Equity Shares at ₹10 nominal par value, with statutory provisions for capital alteration and R&amp;D investment.</span>
                  </div>
                  <div className="p-3 bg-[#F8F9FA] rounded-lg border border-slate-200/70">
                    <strong className="text-[#0F2042] block mb-0.5">Statutory Audit &amp; Witness Verification:</strong>
                    <span>Incorporation attested by Fellow Chartered Accountant (FCA) CA. Sanjay Karnatak (Membership No. 501670), Noida.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
