import { ServiceItem, NavItem } from '../types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: '01',
    title: 'GIS and Web-GIS Development',
    description: 'GEOVERSED develops custom GIS platforms and Web-GIS portals for government, academia, and industry. We build end-to-end systems: spatial database design (PostGIS), QGIS plugins, and interactive Web-GIS dashboards using Leaflet, Mapbox, and GeoServer.',
    category: 'Digital Geospatial',
  },
  {
    id: '02',
    title: 'Application of GIS in Education and Research',
    description: 'We bring GIS into classrooms and labs. We help universities and schools set up GIS labs, develop practical curricula, and guide UG/PG/PhD research using spatial methods.',
    category: 'Education & Research',
  },
  {
    id: '03',
    title: 'Application of GIS and Web-GIS for Developing g-Governance',
    description: 'We provide digital governance solutions using geospatial intelligence. We create village-level to district-level g-Governance portals for asset mapping, scheme monitoring, and public service delivery.',
    category: 'g-Governance & Policy',
  },
  {
    id: '04',
    title: 'Urban and Rural Planning',
    description: 'We provide data-driven master plans for hill towns and villages where carrying capacity is critical. Our plans integrate slope, landslide, water, and livelihood data.',
    category: 'Urban & Rural Planning',
  },
  {
    id: '05',
    title: 'Springs and River Rejuvenation',
    description: 'Core Himalayan expertise. We map springs, delineate recharge zones, and design recharge pits, check dams, and community-based rejuvenation plans.',
    category: 'Springshed & Water Conservation',
  },
  {
    id: '06',
    title: 'Environmental Impact Assessment (EIA)',
    description: 'We conduct EIA for roads, buildings, hydropower, and tourism projects in eco-sensitive hill zones with mitigation plans.',
    category: 'EIA & Ecological Protection',
  },
  {
    id: '07',
    title: 'Climate Change Studies',
    description: 'Assessing climate impacts on Himalayas — temperature trends, rainfall variability, glacial retreat, crop shifts, and community vulnerability.',
    category: 'Glaciology & Climate Science',
  },
  {
    id: '08',
    title: 'Carrying Capacity of Hill Cities and Towns',
    description: 'Our flagship service for Almora, Nainital, Mussoorie-type towns. We calculate ecological, physical, and social carrying capacity to control over-tourism and construction.',
    category: 'Hill Town Carrying Capacity',
  },
  {
    id: '09',
    title: 'Natural and Human Resource Mapping',
    description: 'Inventory and mapping of forests, water, soils, minerals and human resources — population, skills, livelihoods, infrastructure.',
    category: 'State Resource Atlas & Planning',
  },
  {
    id: '10',
    title: 'AI-Empowered Services',
    description: 'We use AI/ML for automated feature extraction from satellite imagery, landslide prediction, crop classification, and change detection.',
    category: 'AI/ML Geospatial Services',
  },
  {
    id: '11',
    title: 'Capacity Building of Stakeholders',
    description: 'Training for govt officers, teachers, students, NGOs on GIS, GPS, drone survey, and data analysis.',
    category: 'Stakeholder Training & Capacity',
  },
  {
    id: '12',
    title: 'Curriculum Designing and Dissertation Supervising',
    description: 'We design UG/PG/Diploma curricula in Geoinformatics, Geography, Environmental Science and supervise dissertations/thesis for all levels.',
    category: 'Curriculum & Dissertation Supervising',
  },
];

export const COMPANY_INFO = {
  name: 'GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED',
  shortName: 'GEOVERSED',
  tagline: 'Geoscience Intelligence for Sustainable Solutions',
  heroH1: 'Where Field Expertise Meets Smart Technology',
  heroH2: 'Geoscience Intelligence for Sustainable Solutions',
  location: 'Khatyari, Manoj Vihar, Almora, Uttarakhand 263601, India',
  phone: '8273753398',
  phoneDisplay: 'Ph: 8273753398',
  email: 'info@geoversed.com',
  servicesSubheading: 'Comprehensive geospatial and geological intelligence solutions tailored for Himalayan ecology, sustainable infrastructure, and resilient regional governance.',
};
