export type GalleryImageItem = {
  src: string;
  alt?: string;
};

export type GallerySection = {
  id: string;
  label: string;
  items: GalleryImageItem[];
};

export type GalleryContent = {
  eyebrow?: string;
  headline: string;
  intro?: string[];
  sections: GallerySection[];
  caption?: string;
};
