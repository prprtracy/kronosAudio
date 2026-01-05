// src/config/nav.ts

export type NavId =
  | "home"
  | "about"
  | "products"
  | "solution"
  | "distributors"
  | "contact";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroupItem = {
  label: string;

  // 可选：这一项本身可点击
  href?: string;

  // ✅ 你需要的：直接指向产品详情（slug）
  productSlug?: string;

  // 有 children 就显示 ">" 并在右侧展开
  children?: NavChild[];
};

export type NavItem = {
  id: NavId;
  label: string;
  behavior: "spa" | "link";
  href?: string;
  megaMenu?: {
    title?: string;
    left: NavGroupItem[];
    rightEmptyText?: string;
  };
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", behavior: "spa" },
  { id: "about", label: "About", behavior: "spa" },
  {
    id: "products",
    label: "Products",
    behavior: "spa",
    megaMenu: {
      title: "Products",
      rightEmptyText: "Select a product to explore.",
      left: [
        { label: "Discovery", productSlug: "discovery" },
        { label: "Sparta", productSlug: "sparta" },
        { label: "Sparta 0.5", productSlug: "sparta-0-5" },
      ],
    },
  },
  {
    id: "solution",
    label: "Complete Solution",
    behavior: "spa",
    megaMenu: {
      title: "Complete Solution",
      rightEmptyText: "Choose a category.",
      left: [
        {
          label: "System Building",
          href: "/solution/system",
          children: [
            { label: "Turntable + Arm", href: "/solution/system/turntable-arm" },
            { label: "Power & Isolation", href: "/solution/system/power-isolation" },
          ],
        },
        {
          label: "Setup & Calibration",
          href: "/solution/setup",
          children: [
            { label: "Dealer Setup", href: "/solution/setup/dealer" },
            { label: "Owner Checklist", href: "/solution/setup/checklist" },
          ],
        },
        {
          label: "Support",
          href: "/solution/support",
          children: [
            { label: "Warranty", href: "/solution/support/warranty" },
            { label: "Service", href: "/solution/support/service" },
          ],
        },
      ],
    },
  },
  { id: "distributors", label: "Distributors", behavior: "spa" },
  { id: "contact", label: "Contact", behavior: "spa" },
];
