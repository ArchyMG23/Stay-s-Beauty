export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PricingItem {
  id: string;
  name: string;
  description: string;
  price: string; // "15 000 FCFA" style as string facilitates easier editing or custom text
}

export interface PricingCategory {
  id: string;
  name: string;
  items: PricingItem[];
}

export interface GalleryItem {
  id: string;
  category: 'nails' | 'hair' | 'lace';
  title: string;
  imageUrl: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export interface AppContent {
  logoName: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageUrl: string;
  };
  services: ServiceItem[];
  pricing: PricingCategory[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  about: {
    title: string;
    description1: string;
    description2: string;
    imageUrl: string;
    stats: { label: string; value: string }[];
  };
  contact: {
    address: string;
    phone: string;
    phoneFormatted: string;
    email: string;
    hoursWeekdays: string;
    hoursSaturday: string;
    hoursSunday: string;
    instagramName: string;
    instagramUrl: string;
    tiktokName: string;
    tiktokUrl: string;
    whatsappUrl: string;
    facebookName: string;
    facebookUrl: string;
  };
}
