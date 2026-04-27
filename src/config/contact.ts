export type ContactItem = {
  label: string;
  value: string;
};

export type ContactSection = {
  title: string;
  body?: string | string[];
  items: ContactItem[];
  cta?: {
    label: string;
    href: string;
  };
};

export type ContactContent = {
  eyebrow?: string;
  headline: string;
  intro?: string[];
  sections: ContactSection[];
  closing?: string;
};
