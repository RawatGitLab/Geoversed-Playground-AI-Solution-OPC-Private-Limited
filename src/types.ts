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

