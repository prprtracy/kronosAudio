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
  href: string; // 点击跳转（未来你可以改成 /[locale]/...）
  description?: string;
};

export type NavGroupItem = {
  label: string;
  href?: string; // 如果这一项本身也能点（可选）
  children?: NavChild[]; // 有 children 就显示 ">" 并在右侧展开
};

export type NavItem = {
  id: NavId;
  label: string;
  // 顶层点击行为：
  // - "spa": 切换 Hero（不跳页）
  // - "link": 直接跳转
  behavior: "spa" | "link";
  href?: string; // behavior=link 时需要
  // 下拉菜单（像截图那样：左列 + 右列）
  megaMenu?: {
    title?: string;
    left: NavGroupItem[];
    rightEmptyText?: string; // 当左侧 hover 的 item 没 children 时显示
  };
};

/**
 * 你可以先用这些占位 href。
 * 等你路由/页面建好，再把 href 改成真正的 /products/xxx
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    behavior: "spa",
  },
  {
    id: "about",
    label: "About",
    behavior: "spa",
  },
  {
    id: "products",
    label: "Products",
    behavior: "spa",
    megaMenu: {
      title: "Products",
      rightEmptyText: "Select a product line to explore.",
      left: [
        {
          label: "Kronos Discovery",
          href: "/products/kronos-discovery",
          children: [
            { label: "SCPS-1", href: "/products/scps-1" },
            { label: "Rack", href: "/products/rack" },
          ],
        },
        {
          label: "Kronos Pro",
          href: "/products/kronos-pro",
          children: [
            { label: "Turntable", href: "/products/kronos-pro/turntable" },
            { label: "Power Supply", href: "/products/kronos-pro/power" },
          ],
        },
        {
          label: "Kronos Sparta",
          href: "/products/kronos-sparta",
          children: [
            { label: "Turntable", href: "/products/kronos-sparta/turntable" },
            { label: "Power Supply", href: "/products/kronos-sparta/power" },
          ],
        },
        {
          label: "Kronos Sparta 0.5",
          href: "/products/kronos-sparta-0-5",
        },
        {
          label: "Kronos RS Tonearms",
          href: "/products/kronos-rs-tonearms",
          children: [
            { label: "RS Tonearm", href: "/products/kronos-rs-tonearms/rs" },
            { label: "Wiring", href: "/products/kronos-rs-tonearms/wiring" },
          ],
        },
        {
          label: "Kronos Phono Preamplifier",
          href: "/products/kronos-phono",
        },
        {
          label: "Kronos Rack",
          href: "/products/kronos-rack",
        },
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
  {
    id: "distributors",
    label: "Distributors",
    behavior: "spa",
  },
  {
    id: "contact",
    label: "Contact",
    behavior: "spa",
  },
];
