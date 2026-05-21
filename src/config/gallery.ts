export type GalleryItem = {
  src: string;
  alt?: string;
  caption?: string;
};

export type GallerySection = {
  id: string;
  label: string;
  eyebrow?: string;
  category?: string;
  description?: string[];
  assemblyInstruction?: string;
  items: GalleryItem[];
};

export type GalleryContent = {
  eyebrow?: string;
  headline: string;
  intro?: string[];
  sections: GallerySection[];
  caption?: string;
};
