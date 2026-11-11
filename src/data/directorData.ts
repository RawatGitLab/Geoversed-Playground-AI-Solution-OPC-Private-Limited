import {
  DirectorProfile,
  DirectorStat,
  SkillCategory,
  TimelineEntry,
  FeaturedWorkItem,
  CertificationItem,
} from '../types';

export const DIRECTOR_PROFILE: DirectorProfile = {
  name: 'Mr. Varun Rawat',
  designation: 'Founder & Director',
  company: 'GEOVERSED PLAYGROUND AI SOLUTION (OPC) PRIVATE LIMITED',
  roles: [
    'GIS Specialist and Consultant',
    'Senior Software Engineer',
    'Full-Stack Web-GIS Principal',
    'Chief AI Solutions Architect',
    'Spatial Data Scientist and Engineer',
  ],
  bio: [
    'Mr. Varun Rawat is a pioneering Geospatial Technologist, Full-Stack Developer, and the Founder & Director of Geoversed Playground AI Solution (OPC) Pvt Ltd, headquartered in Almora, Uttarakhand. Dedicated to transforming governance and ecological planning through spatial intelligence, he specializes in building high-performance Web-GIS platforms, hydrological modeling systems, and AI-assisted geospatial frameworks.',
    'With extensive field and technical experience across the fragile Himalayan terrain, Varun has spearheaded vital initiatives including spring-shed mapping, town carrying-capacity evaluations, and disaster mitigation dashboards for state departments, municipal bodies, and academic research institutions.',
    'His vision merges modern software engineering—leveraging React, TypeScript, PostGIS, GeoServer, and Cloud Architecture—with ground-level geoscience to deliver robust, citizen-centric g-Governance platforms and sustainable environmental intelligence across India.',
  ],
  location: 'Almora, Uttarakhand, India',
  avatarUrl: 'src/assets/My Photo/my.jpeg',
  avatarFallbackInitials: 'VR',
  cvUrl: '/assets/director/CV.pdf',
  email: 'varunrawatmailbox2507@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/vr2507/',
  githubUrl: 'https://github.com/RawatGitLab',
};

export const DIRECTOR_STATS: DirectorStat[] = [
  {
    id: 'exp',
    label: 'Years of IT Experience',
    value: 10,
    suffix: '+',
    description: 'In Geospatial Engineering & Full-Stack Development',
  },
  {
    id: 'projects',
    label: 'Projects Delivered',
    value: 45,
    suffix: '+',
    description: 'Across GIS, EIA, Water & GovTech domains',
  },
  {
    id: 'districts',
    label: 'Districts Served',
    value: 18,
    suffix: '+',
    description: 'Himalayan municipalities & administrative regions',
  },
  {
    id: 'trained',
    label: 'Officers & Scholars Trained',
    value: 1200,
    suffix: '+',
    description: 'Through hands-on GIS & Web-GIS workshops',
  },
];

export const DIRECTOR_SKILLS: SkillCategory[] = [
  {
    id: 'gis',
    title: 'GIS & Geospatial',
    iconName: 'Map',
    skills: [
      'QGIS & ArcGIS Pro',
      'PostGIS & Spatial SQL',
      'GeoServer & OGC Standards',
      'Leaflet & Mapbox GL JS',
      'GDAL / OGR / Proj',
      'Google Earth Engine',
      'Remote Sensing & Drone Photogrammetry',
      'Hydrological & Slope Modeling',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    iconName: 'Layout',
    skills: [
      'React 19 & Next.js',
      'TypeScript (Strict)',
      'Tailwind CSS v4',
      'Motion (Framer Motion)',
      'Vite & Modern Bundlers',
      'Interactive Web Mapping',
      'HTML5 Canvas & SVG Visualizations',
      'Accessible & Responsive UI/UX',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Spatial Data',
    iconName: 'Database',
    skills: [
      'Node.js & Express',
      'Python (GeoPandas, Shapely, Rasterio)',
      'PostgreSQL & PostGIS Tuning',
      'REST & GeoJSON API Architecture',
      'Docker & Containerization',
      'Linux Server Administration',
      'Database Optimization & Spatial Indexing',
      'ETL Data Pipelines',
    ],
  },
  {
    id: 'cloud-ai',
    title: 'AI & Cloud Infrastructure',
    iconName: 'Sparkles',
    skills: [
      'Generative AI Integration',
      'Google Gemini API & Function Calling',
      'Spatial Machine Learning Basics',
      'Netlify & Vercel Edge Deployments',
      'Cloud Object Storage (S3 / GCP)',
      'Git, GitHub Actions & CI/CD',
      'Vector Data Embeddings',
      'Performance Auditing & Security',
    ],
  },
];


export const DIRECTOR_FEATURED_WORK: FeaturedWorkItem[] = [
  {
    id: 'Uttarakhand-GIS-Viewer',
    title: 'Uttarakhand GIS Portal',
    category: '',
    image: '/assets/projects/Uttarakhand-Geoportal.png',
    verified: true,
    tags: [
    ],
    description: 'Centralized, real-time geospatial data hub for District Almora Uttarakhand India planners with live Geo-Spatial data.',
    demoUrl: 'https://uttarakhand-geo-portal.onrender.com/', 
    githubUrl:  'https://github.com/RawatGitLab/Uttarakhand-Geo-Portal',
    linkUrl: 'https://uttarakhand-geo-portal.onrender.com/',
    metrics: '13 Districts Covered',
    details: {
      overview: 'Uttarakhand Geoportal is a live, real-time Geographic Information System (GIS) visualization platform built specifically for district planners and administrators of all 13 Districts of Uttarakhand India',
      keyFeatures: [
        'Engineered a unified geospatial dashboard consolidating 13 independently-hosted district GIS applications and 2011 Census datasets, reducing multi-platform navigation efforts by 80%.',
        'Implemented interactive choropleth mapping and district boundary visualizations using Leaflet, improving comparative spatial data analysis for population, area, and literacy metrics.',
        'Developed 4+ core functional modules (Interactive Mapping, District Directory, Comparative Report Builder, and Live GIS Embed) with CSV/PDF export capabilities and light/dark theme support.'
      ],
      technicalArchitecture: [
        'Implemented GeoJSON data on open Leaflet canvas layouts.',
        'Secured portal client views with Github- Actions user groups privileges.'
      ],
      roleAndImpact: 'Architected and deployed an integrated GIS web platform that modernized public service delivery, boosting operational efficiency in spatial data handling and citizen engagement by 20%.'
    }
  },
  {
    image: '/assets/projects/Almora.png',
    id: 'Almora-GIS-Viewer',
    title: 'District Almora UK GIS Portal',
    category: '',
    
    period: 'Apr 26 – July 26',
    verified: true,
    tags: [
    ],
    description: 'Centralized, real-time geospatial data hub for District Almora Uttarakhand India planners with live Geo-Spatial data.',
    demoUrl: 'https://district-almora-production.up.railway.app/',
    githubUrl: 'https://github.com/RawatGitLab/District-Almora/',
    linkUrl: 'https://district-almora-production.up.railway.app/',
    metrics: '50+ Spatial Layers',
    details: {
      overview: 'District Almora is a live, real-time Geographic Information System (GIS) visualization platform built specifically for district planners and administrators of Almora, Uttarakhand India',
      keyFeatures: [
        'Assembled a centralized catalog processing 50+ national spatial layers, slashing cross-agency lookup efforts by 20%.',
        'Standardized spatial records profiles metadata, raising map coordinate query speeds by 25%.',
        'Built 7+ distinct target modules (Administrative, Education, Health, Police, River, Nagar Nigam, Municipality).'
      ],
      technicalArchitecture: [
        'Implemented GeoJSON data on open Leaflet canvas layouts.',
        'Secured portal client views with Github- Actions user groups privileges.'
      ],
      roleAndImpact: 'Architected and deployed an integrated GIS web platform that modernized public service delivery, boosting operational efficiency in spatial data handling and citizen engagement by 20%.'
    }
  },
  {
    id: 'springshed',
    title: 'Hydrological Assessment & Springshed Management',
    category: '',
    image: '/assets/projects/springnaula.png',
    period: 'Sep 25 – Apr 26',
    verified: true,
    tags: [
    ],
    description: 'A web-based digital archive and spatial dashboard mapping traditional water sources across 7 Gram Panchayats.',
    demoUrl: 'https://spring-naula-rejuvenation.netlify.app/',
    githubUrl: 'https://github.com/RawatGitLab/Integrated_Hydrological_and_Geomorphological_Assessment_and_Springshed_Management',
    linkUrl: 'https://spring-naula-rejuvenation.netlify.app/',
    metrics: '12 Traditional Springs Mapped',
    details: {
      overview: 'Conducted geo-spatial assessment of seasonal traditional water sources or springsheds to record, manage, and model discharge fluctuations in Himalayan communities.',
      keyFeatures: [
        'Mapped and surveyed 12 traditional water sources (springs/naulas) compiling precise GPS, elevation, and flow discharge data.',
        'Tracked discharge thresholds ranging from 0.0167 to 0.455 L/s, helping pinpoint low-yield vs persistent reservoirs.',
        'Maintained full photos and detailed geological metadata profiles for each localized water source.'
      ],
      technicalArchitecture: [
        'Coded interactive front-end visual mapping components in React paired with Tailwind grids.',
        'Integrated Leaflet map layouts with custom popup overlays showing seasonal flow attributes.'
      ],
      roleAndImpact: 'Framer & GIS Lead. Partnered directly with National Geo-Spatial Chair Dr. J.S. Rawat, Aman NGO, and local Gram Panchayats to provide authoritative data supporting spring rejuvenation strategies.'
    }
  },
  {
    id: 'water-mgmt',
    title: 'Natural Resource Water Management',
    category:'',
    image: '/assets/projects/water.png',
    period: 'Feb 24 – Aug 25',
    verified: true,
    tags: [
    ],
    description: 'A regional dashboard showcasing 200+ infiltration well village sites, WASH metrics, and rainwater calculators.',
    demoUrl: 'https://www.worldbank.org/ext/en/topic/water/water-for-planet',
    linkUrl: 'https://www.worldbank.org/ext/en/topic/water/water-for-planet',
    metrics: '200+ Infiltration Wells',
    details: {
      overview: 'Integrated broad geospatial datasets to optimize site selections and monitor domestic water systems across rugged rural communities.',
      keyFeatures: [
        'Dynamic state-wise filters showcasing 200+ infiltration wells throughout Uttarakhand and Himachal Pradesh.',
        'Designed real-time impact dashboards showing community-level metrics serving over 55,000+ citizens.',
        'Developed a beautiful "Blue Schools" interactive micro-calculator for matching rainwater harvests with school curriculums.'
      ],
      technicalArchitecture: [
        'Utilized Mapbox and ArcGIS ESRI APIs for seamless layer maps overlaying hydrography datasets.',
        'Orchestrated Azure web app hosting, slicing mobile client load delays by 35% under poor remote bandwidths.'
      ],
      roleAndImpact: 'Full-Stack Developer & GIS Specialist. Created donation/grant modules monitoring funds for over 2,000+ local families.'
    }
  },
  {
    id: 'michigan-spatial',
    title: 'Michigan Land Authority GIS Portal',
    category: '',
    image: '/assets/projects/michigan.png',
    period: 'Feb 22 – Jan 24',
    verified: true,
    tags: [
    ],
    description: 'A powerful state geospatial catalog aggregating 1,200+ spatial layers from over 20+ government agencies.',
    demoUrl: 'https://gis-michigan.opendata.arcgis.com/',
    linkUrl: 'https://gis-michigan.opendata.arcgis.com/',
    metrics: '1,200+ Spatial Layers',
    details: {
      overview: 'Engineered an enterprise-grade ArcGIS Open Data gateway enabling secure public downloads and interactive maps modeling for state infrastructure, roads, and environment items.',
      keyFeatures: [
        'Merged huge directories containing 1,200+ spatial data assets, making discovery 35% faster across departments.',
        'Supported flexible multi-format shapefiles downloads including GeoJSON, KML, and standard CSV blocks.',
        'Published 86 interactive maps, 5 detailed storyboards, and 65 comprehensive data records built on Michigan EGLE standards.'
      ],
      technicalArchitecture: [
        'Utilized robust OGC-compliant map requests (WMS, WFS) mapping roads, hydrography, and civil divisions.',
        'Integrated faceted text search libraries to filter agency assets dynamically.'
      ],
      roleAndImpact: 'Senior GIS Software Engineer. Implemented high-performance spatial aggregations, increasing community engagement metrics by 20%.'
    }
  },
  {
    id: 'singapore-gis',
    title: 'Singapore Land Authority Geoportal',
    category: '',
    image: '/assets/projects/singapore.png',
    period: 'Feb 21 – Jan 22',
    verified: true,
    tags: [
    ],
    description: 'An authoritative national map platform aggregating spatial land assets from 65+ Singapore public agencies.',
    demoUrl: 'https://www.sla.gov.sg/',
    linkUrl: 'https://www.sla.gov.sg/',
    metrics: '65+ Public Agencies',
    details: {
      overview: 'Designed a high-throughput geospatial platform serving thousands of monthly transactions for cadastral calculations and property searches.',
      keyFeatures: [
        'Aggregated spatial maps from 65+ government agencies, supporting version histories since 2010.',
        'Optimized site coordinates and boundary assets for 11,000 hectares of state territory and 2,600 properties, including 600 heritage bungalows.'
      ],
      technicalArchitecture: [
        'Engineered responsive web layout using React-JS paired with Mapbox GL (MapGL) vector engines.',
        'Created high-performance data pipelines to serve transactional land searches instantly.'
      ],
      roleAndImpact: 'Frontend Specialist. Engineered robust spatial boundaries modeling, raising overall data accuracy and tenant lease conversion speeds.'
    }
  },
  {
    id: 'c4i-system',
    title: 'Command Control Communication Computer (C4I)',
    category: '',
    image: '/assets/projects/c4i.png',
    period: 'Feb 20 – Oct 20',
    verified: true,
    tags: [
    ],
    description: 'A tactical mapping dashboard deployed to support defense coordination operations, managing 64 tactical targets real-time.',
    demoUrl: 'https://www.ecil.co.in/vision',
    linkUrl: 'https://www.ecil.co.in/vision',
    metrics: '64 Real-Time Targets',
    details: {
      overview: 'Engineered high-security interactive defense dashboard blocks visualizing weapon targets coordinates, missile trajectories, and mobile command shelters.',
      keyFeatures: [
        'Designed dashboard widgets tracking telemetry feeds from radar modules to four discrete troop control stations.',
        'Automated real-time position updates for 5 critical weapons systems, demonstrating fast data processing.',
        'Created responsive screen layouts for 4 multi-terrain mobile military command vehicles (TATRA 8x8 shelter models).'
      ],
      technicalArchitecture: [
        'Utilized Leaflet libraries and GDAL data translators to render geospatial elevation meshes perfectly.',
        'Used Azure secure services to lock down operational weapon feeds and data-streaming sockets.'
      ],
      roleAndImpact: 'GIS System Architect & Lead Developer. Programmed custom mapping controls representing the ₹980 Cr Akash Missile tactical command system with absolute zero-lag rendering.'
    }
  },
  {
    id: 'sri-lanka-sdi',
    title: 'Sri Lanka National Spatial Data Infrastructure',
    category: '',
    image: '/assets/projects/Srilanka.png',
    period: 'Jul 18 – May 19',
    verified: true,
    tags: [
    ],
    description: 'A multi-agency national geoportal serving 5 domain use-case web-maps across tourism, agriculture, and urban planning.',
    demoUrl: 'https://geoportal.nsdi.gov.lk/',
    linkUrl: 'https://geoportal.nsdi.gov.lk/',
    metrics: '130+ Spatial Layers',
    details: {
      overview: 'Created an OGC-compliant spatial portal to enable distributed GIS layers sharing among 27+ Sri Lankan government organizations.',
      keyFeatures: [
        'Assembled a centralized catalog processing 130+ national spatial layers, slashing cross-agency lookup efforts by 20%.',
        'Standardized spatial records profiles metadata, raising map coordinate query speeds by 25%.',
        'Built 5 distinct target modules (Urban zoning, Disaster mitigation, Archaeology, Tourism, Agriculture).'
      ],
      technicalArchitecture: [
        'Implemented WMS/WFS map queries on open Leaflet canvas layouts.',
        'Secured portal client views with Azure user groups privileges.'
      ],
      roleAndImpact: 'Trainee GIS & Web Analyst. Deployed unified maps frameworks, accelerating public GIS operations and citizen-focused information services by 20%.'
    }
  },
  
];

/**
 * Exactly 10 Certifications
 * Row 1 = Certifications 1-5 (Scrolls RIGHT -> LEFT)
 * Row 2 = Certifications 6-10 (Scrolls LEFT -> RIGHT)
 */
export const DIRECTOR_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'GIS Fundamentals',
    issuer: 'Esri',
    year: '2020',
    image: '/assets/director/certifications/esri-gis-fundamentals.jpg',
    credentialUrl: 'https://www.esri.com/training/',
    credentialId: 'ESRI-GIS-2020-VR49',
    skillsValidated: ['ArcGIS Pro', 'Spatial Analysis', 'Coordinate Systems', 'Cartography'],
    description: 'Foundational certification covering spatial analysis concepts, projection systems, geodatabase management, and cartographic layout design in ArcGIS Pro.',
  },
  {
    id: 'cert-2',
    title: 'Advanced Web GIS Development',
    issuer: 'UC Davis / Coursera',
    year: '2021',
    image: '/assets/director/certifications/ucdavis-webgis.jpg',
    credentialUrl: 'https://www.coursera.org/',
    credentialId: 'UCD-WGIS-8841-VR',
    skillsValidated: ['Web-GIS', 'GeoServer', 'OpenLayers', 'Leaflet', 'OGC WMS/WFS'],
    description: 'Comprehensive program covering client-server GIS architectures, OGC web mapping protocols (WMS, WFS, WCS), and custom browser GIS interfaces.',
  },
  {
    id: 'cert-3',
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: '2021',
    image: '/assets/director/certifications/fcc-javascript.jpg',
    credentialUrl: 'https://www.freecodecamp.org/certification/varunrawat/javascript-algorithms-and-data-structures',
    credentialId: 'FCC-JS-ALGO-7193',
    skillsValidated: ['ES6+ JavaScript', 'Algorithms', 'Data Structures', 'OOP', 'Functional Programming'],
    description: 'Demonstrated mastery over core JavaScript algorithms, memory models, object-oriented principles, and complex spatial mathematical calculations.',
  },
  {
    id: 'cert-4',
    title: 'React - The Complete Guide',
    issuer: 'Academind / Udemy',
    year: '2022',
    image: '/assets/director/certifications/react-complete-guide.jpg',
    credentialUrl: 'https://www.udemy.com/certificate/UC-react-complete-guide-vr/',
    credentialId: 'UDEMY-REACT-2022-817',
    skillsValidated: ['React 18/19', 'Hooks', 'Context API', 'Performance Optimization', 'SPA Routing'],
    description: 'Advanced frontend engineering certification demonstrating mastery of state management, custom hooks, component lifecycles, and high-performance Web-GIS rendering.',
  },
  {
    id: 'cert-5',
    title: 'TypeScript Professional Certificate',
    issuer: 'OpenJS Foundation / Microsoft',
    year: '2022',
    image: '/assets/director/certifications/typescript-professional.jpg',
    credentialUrl: 'https://openjsf.org/certification/',
    credentialId: 'TS-PROF-2022-VR62',
    skillsValidated: ['TypeScript', 'Generics', 'Type Narrowing', 'Type-Safe Architecture', 'AST'],
    description: 'Professional validation of enterprise TypeScript, strict typing patterns, complex generic abstractions, and robust backend/frontend API contracts.',
  },
  {
    id: 'cert-6',
    title: 'PostGIS & Spatial Databases',
    issuer: 'FOSS4G Academy / Crunch Data',
    year: '2023',
    image: '/assets/director/certifications/postgis-spatial-db.jpg',
    credentialUrl: 'https://www.crunchydata.com/',
    credentialId: 'PGIS-ADV-2023-VR99',
    skillsValidated: ['PostGIS', 'Spatial SQL', 'R-Tree Indexing', 'Geometry Processing', 'ST_Functions'],
    description: 'Deep dive into spatial relational databases, geometry/geography types, spatial joins, indexing (GIST, SP-GIST), and query optimization on million-record datasets.',
  },
  {
    id: 'cert-7',
    title: 'Remote Sensing & Satellite Image Analysis',
    issuer: 'ISRO / IIRS Outreach',
    year: '2023',
    image: '/assets/director/certifications/isro-iirs-remote-sensing.jpg',
    credentialUrl: 'https://www.iirs.gov.in/',
    credentialId: 'IIRS-EDUSAT-2023-4412',
    skillsValidated: ['Multispectral RS', 'SAR & InSAR', 'Thermal Infrared', 'Supervised Classification', 'DEM Extraction'],
    description: 'Prestigious national training on optical and microwave remote sensing, multispectral classification, NDVI/NDWI vegetation indices, and terrain elevation modeling.',
  },
  {
    id: 'cert-8',
    title: 'Generative AI & Prompt Engineering',
    issuer: 'Google Cloud',
    year: '2024',
    image: '/assets/director/certifications/google-cloud-genai.jpg',
    credentialUrl: 'https://cloud.google.com/training/',
    credentialId: 'GCP-GENAI-2024-VR01',
    skillsValidated: ['Gemini API', 'Prompt Engineering', 'Function Calling', 'RAG Pipelines', 'Vector Search'],
    description: 'Advanced credential focusing on modern LLM integration, multimodal model interaction, function calling for spatial APIs, and responsible AI system architecture.',
  },
  {
    id: 'cert-9',
    title: 'Cloud Fundamentals',
    issuer: 'Amazon Web Services (AWS)',
    year: '2024',
    image: '/assets/director/certifications/aws-cloud-fundamentals.jpg',
    credentialUrl: 'https://aws.amazon.com/certification/',
    credentialId: 'AWS-CP-2024-VR88',
    skillsValidated: ['Cloud Architecture', 'EC2 & S3', 'Serverless Functions', 'VPC & Security', 'Cost Optimization'],
    description: 'Comprehensive cloud architecture validation covering high availability, fault tolerance, secure spatial data storage, serverless execution, and cost optimization.',
  },
  {
    id: 'cert-10',
    title: 'Leadership & Public Administration Training',
    issuer: 'National Institute of Rural Development (NIRD&PR)',
    year: '2024',
    image: '/assets/director/certifications/nird-public-admin.jpg',
    credentialUrl: 'http://www.nirdpr.org.in/',
    credentialId: 'NIRD-GOV-2024-VR11',
    skillsValidated: ['g-Governance Policy', 'Public Sector Engagement', 'Himalayan Ecology', 'Team Leadership'],
    description: 'Executive leadership certification on public administration, government scheme execution, citizen-centric service design, and policy integration in Himalayan hill regions.',
  },
];
