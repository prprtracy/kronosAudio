// src/components/product/ProductAnchorNav.tsx
"use client";

import clsx from "clsx";

type AnchorItem = { id: string; label: string };

const ITEMS: AnchorItem[] = [
  { id: "overview", label: "Overview" },
  { id: "design", label: "Design" },
  { id: "system", label: "System" },
  { id: "reviews", label: "Reviews" },
  { id: "specs", label: "Specifications" },
];

export function ProductAnchorNav({
  className,
  headerOffset = 64, // 你的 header 高度（h-16 = 64px）
}: {
  className?: string;
  headerOffset?: number;
}) {
  const onClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - (headerOffset + 16);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className={clsx(
        "sticky z-[20]", // 比 header 低一点也行，但这里先稳
        className
      )}
      style={{ top: headerOffset }}
    >
      {/* 顶部留一条空气感，让它不“贴死”header */}
      <div className="pt-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={clsx(
              "rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl",
              "shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
            )}
          >
            <div className="flex items-center justify-center gap-6 px-5 py-3">
              {ITEMS.map((it, idx) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  onClick={onClick(it.id)}
                  className={clsx(
                    "text-[11px] uppercase tracking-[0.22em]",
                    "text-white/55 hover:text-white/85 transition-colors",
                    "py-2"
                  )}
                >
                  {it.label}
                  {idx !== ITEMS.length - 1 && (
                    <span className="ml-6 text-white/15">•</span>
                  )}
                </a>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAnchorNav;
