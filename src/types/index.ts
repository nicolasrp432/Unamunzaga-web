export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  completion_date: string;
  budget?: number;
  testimonial?: Testimonial;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company?: string;
  avatar_url?: string;
  logo_url?: string;
  rating: number;
  testimonial_text: string;
  project?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  tags: string[];
  category: string;
  published: boolean;
  published_at: string;
  created_at: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service_type?: string;
  status: 'pending' | 'responded' | 'closed';
  created_at: string;
  responded_at?: string;
}

export interface KPI {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  submenu?: NavigationItem[];
}