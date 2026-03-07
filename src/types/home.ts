// src/types/home.ts
export type HomeNarrativeId =
  | "philosophy"
  | "innovation"
  | "legacy"
  | "recognition"
  | "invitation";

export type HomeNarrativeAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  target?: "_blank" | "_self";
};

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
  actions?: HomeNarrativeAction[];
  slides?: HomeSlide[];
  contentSide?: "left" | "right";

};

      // saving for later if we want to do a slideshow of awards instead of images
      // "slideshowAutoplayMs": 1500,
      // "slides": [
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward1.jpg",
      //     "alt": "Kronos at a show"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward2.jpg",
      //     "alt": "Kronos award"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward3.jpg",
      //     "alt": "Kronos trophy"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward4.jpg",
      //     "alt": "Kronos recognition"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward5.jpg",
      //     "alt": "Kronos exhibition"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward6.jpg",
      //     "alt": "Kronos presentation"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward7.jpg",
      //     "alt": "Kronos event"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward8.jpg",
      //     "alt": "Kronos celebration"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward9.jpg",
      //     "alt": "Kronos honor"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward10.jpg",
      //     "alt": "Kronos distinction"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward11.jpg",
      //     "alt": "Kronos accolade"
      //   },
      //   {
      //     "type": "image",
      //     "src": "/media/rewards/reward12.jpeg",
      //     "alt": "Kronos fame"
      //   }
      // ]
