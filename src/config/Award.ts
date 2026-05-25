export type AwardImageItem = {
  src: string;
  alt?: string;
};

export type AwardItem = {
  year?: string;
  title: string;
  product: string;
  source: string;
  image: string;
  imageMaxHeight?: number;
  url?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
};

export type AwardSection = {
  id: string;
  label: string;
  items: AwardImageItem[];
};

export type AwardContent = {
  eyebrow?: string;
  headline: string;
  intro?: string[];
  featured?: AwardItem[];
  archive?: AwardItem[];
  sections?: AwardSection[];
  caption?: string;
};
