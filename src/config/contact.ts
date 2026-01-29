export type ContactItem = {
  label: string;
  value: string;
};

export type ContactSection = {
  title: string;
  items: ContactItem[];
};

export type ContactContent = {
  eyebrow?: string;
  headline: string;
  intro?: string[];
  sections: ContactSection[];
  closing?: string;
};
