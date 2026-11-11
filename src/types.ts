export interface ServiceItem {
  id: string; // e.g. "01", "02", "08", etc.
  title: string;
  description: string;
  category?: string;
  iconName?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  organization: string;
  projectScope: string;
}

export interface InsightItem {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  buttonText?: string;
}

export type EventCategory = 'Training' | 'Workshop' | 'MoU' | 'Meeting' | 'Field Visit' | 'Guest Lecture';

export interface EventVideo {
  youtubeId?: string;
  videoUrl?: string;
  title: string;
}

export interface EventItem {
  id: string; // unique slug used in URLs (e.g. "himalayan-spring-workshop-2024")
  title: string;
  date: string; // YYYY-MM-DD
  category: EventCategory;
  location: string;
  summary: string;
  description: string;
  cover: string; // main card & banner image URL
  photos: string[]; // array of image URLs
  videos: EventVideo[]; // array of YouTube videos
}

// ==========================================
// Director Section Interfaces
// ==========================================

export interface DirectorProfile {
  name: string;
  designation: string;
  company: string;
  roles: string[];
  bio: string[];
  location: string;
  avatarUrl: string;
  avatarFallbackInitials: string;
  cvUrl: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface DirectorStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: string[];
}

export interface TimelineEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: 'experience' | 'education';
  points: string[];
}

export interface FeaturedWorkDetails {
  overview?: string;
  keyFeatures?: string[];
  technicalArchitecture?: string[];
  roleAndImpact?: string;
}

export interface FeaturedWorkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  linkUrl?: string;
  metrics?: string;
  period?: string;
  verified?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  details?: FeaturedWorkDetails;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  credentialUrl?: string;
  credentialId?: string;
  skillsValidated?: string[];
  description?: string;
}


