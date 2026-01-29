export type GalleryItem = {
  src: string;
  alt?: string;
};

export type GalleryContent = {
  eyebrow?: string;
  headline: string;
  intro?: string[];
  caption?: string;
  items: GalleryItem[];
};
