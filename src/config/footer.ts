export type FooterContent = {
  brand: {
    logo: string;
    tagline?: string;
  };

  contact: {
    name: string;
    address: string[];
    phone?: string;
  };

  links: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  };

  mission: {
    title: string;
    text: string;
    link?: {
      label: string;
      href: string;
    };
  };

  social?: {
    id: string;
    href: string;
  }[];

  legal: {
    copyright: string;
    year?: number;
  };
};
