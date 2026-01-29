// src/types/home.ts
export type HomeNarrativeId =
  | "philosophy"
  | "innovation"
  | "legacy"
  | "recognition"
  | "invitation";

export type HomeSlide =
  | {
      type: "image";
      src: string;
      alt?: string;
      eyebrow?: string;
      headline?: string;
    }
  | {
      type: "award";
      title: string;
      source?: string;
      year?: string;
      quote?: string;
      href?: string;
};

export type HomeNarrativeSection = {
  id: HomeNarrativeId;
  eyebrow?: string;
  headline: string;
  copy: string[];
  posterSrc?: string;
  overlayGradient?: string;
  view?: "default" | "grid4" | "slideshow";
  images?: string[];
  grid4Variant?: "cinematic" | "museum";
  slideshowVariant?: "awards" | "images";
  slideshowAutoplayMs?: number; // e.g. 4500
  slides?: HomeSlide[];
};
