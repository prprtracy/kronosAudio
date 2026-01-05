export type NavItem = {
  label: string;          // 显示名（后续可 i18n）
  productSlug?: string;   // 关联产品 slug
  href?: string;          // 非产品页（比如 /distributors）
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
