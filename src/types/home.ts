// src/types/home.ts
export type HomeNarrativeId =
  | "philosophy"
  | "innovation"
  | "legacy"
  | "recognition"
  | "invitation";

export type HomeNarrativeSection = {
  id: HomeNarrativeId;
  eyebrow?: string;
  headline: string;
  copy: string[];
  posterSrc?: string;
  overlayGradient?: string;
};
