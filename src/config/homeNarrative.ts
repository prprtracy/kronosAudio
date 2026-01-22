// src/config/homeNarrative.ts
export type HomeNarrativeId = "philosophy" | "innovation" | "legacy" | "recognition" | "invitation";

export type HomeNarrativeSection = {
  id: HomeNarrativeId;
  eyebrow?: string;
  headline: string;
  copy: string[];
  // 視覺：可選（有圖就用，沒圖就純文字留白）
  posterSrc?: string;
  overlayGradient?: string;
};

export const homeNarrative: HomeNarrativeSection[] = [
  {
    id: "philosophy",
    eyebrow: "The Philosophy",
    headline: "Time Suspended",
    copy: [
      "The standard by which analogue front ends are measured.",
      "A design that extracts not just sound, but the organic truth of music.",
    ],
    posterSrc: "/media/home/hero-time.jpg",
    overlayGradient: "from-black/80 via-black/35 to-black/90",
  },
  {
    id: "innovation",
    eyebrow: "The Innovation",
    headline: "The Singular Goal",
    copy: [
      "Non-compromise analogue playback.",
      "A singular system designed to eliminate vibration and reveal absolute clarity.",
    ],
    posterSrc: "/media/home/innovation.jpg",
    overlayGradient: "from-black/80 via-black/35 to-black/90",
  },
  {
    id: "legacy",
    eyebrow: "The Legacy",
    headline: "Beyond Obsolescence",
    copy: [
      "An investment in the future.",
      "Every Kronos is engineered to evolve, ensuring relevance that withstands the test of time.",
    ],
    // 這段可以不放圖，純留白更高級
  },
  {
    id: "recognition",
    eyebrow: "The Recognition",
    headline: "Acclaimed Excellence",
    copy: [
      "Consistently honored by the world’s most respected critics.",
      "Over 100 “Best Sound of Show” awards worldwide.",
    ],
    posterSrc: "/media/home/awards.jpg",
    overlayGradient: "from-black/85 via-black/45 to-black/90",
  },
  {
    id: "invitation",
    eyebrow: "The Invitation",
    headline: "The Kronos World",
    copy: [
      "Join a curated family of connoisseurs.",
      "We invite you to look deeper.",
    ],
  },
];
