export type AwardImageItem = {
  src: string;
  alt?: string;
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
  sections: AwardSection[];
  caption?: string;
};
