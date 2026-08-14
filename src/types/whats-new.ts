export interface WhatsNewItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  slug: string;
  location?: string;
  venue?: {
    name: string;
    address: string;
    floor: string;
    room: string;
  };
  body?: string[];
  gallery?: WhatsNewImage[];
}

export interface WhatsNewImage {
  image: string;
  alt: string;
}

export interface WhatsNewPageContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface WhatsNewContent {
  page: WhatsNewPageContent;
  items: WhatsNewItem[];
}
