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
  href?: string;
  productSlug?: string;
  description?: string;
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
