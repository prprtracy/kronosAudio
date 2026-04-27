export type NavItem = {
  label: string;          
  productSlug?: string;   
  href?: string;          
  children?: NavItem[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const productsMegaMenu: NavGroup[] = [
  {
    label: "Turntables",
    items: [
      { label: "Discovery", productSlug: "discovery" },
      { label: "Sparta", productSlug: "sparta" },
      { label: "Sparta 0.5", productSlug: "sparta-0-5" },
    ],
  },
] as const;
