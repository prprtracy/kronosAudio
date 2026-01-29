"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { NAV_ITEMS, type NavId, type NavItem } from "@/config/nav";
import { withLocale, productHref } from "@/lib/navHref";
import { products } from "@/data/products";

type Props = {
  locale: string;
};

export function Header({ locale }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openMenu, setOpenMenu] = useState<NavId | null>(null);
  const [activeLeftIndex, setActiveLeftIndex] = useState(0);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = 120;
      setScrollProgress(Math.min(y / max, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBgOpacity = 0.0 + scrollProgress * 0.85;

  const openNavMenu = (id: NavId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
    setActiveLeftIndex(0);
  };

  const scheduleCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const cancelCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const menuItem = NAV_ITEMS.find((x) => x.id === openMenu);
  const hasMega = !!menuItem?.megaMenu;
  const leftList = menuItem?.megaMenu?.left ?? [];
  const activeLeft = leftList[activeLeftIndex];

  const previewProduct =
    menuItem?.id === "products" && activeLeft?.productSlug
      ? products.find((p) => p.slug === activeLeft.productSlug)
      : null;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300",
        scrollProgress > 0.02 ? "border-neutral-800" : "border-transparent"
      )}
      style={{ backgroundColor: `rgba(0,0,0,${headerBgOpacity})` }}
      onMouseLeave={scheduleCloseMenu}
      onMouseEnter={cancelCloseMenu}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={withLocale(locale, "/")} className="flex items-center gap-3">
          <Image
            src="/media/logo-icon.png"
            alt="Kronos Audio"
            width={32}
            height={32}
            priority
          />
          <Image
            src="/media/logo-retina.png"
            alt="Kronos Audio"
            width={140}
            height={32}
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase">
          {NAV_ITEMS.map((item) => {
            const href =
              item.behavior === "link" && item.href
                ? withLocale(locale, item.href)
                : null;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() =>
                  item.megaMenu ? openNavMenu(item.id) : setOpenMenu(null)
                }
              >
                {href ? (
                  <Link
                    href={href}
                    className="text-neutral-200 hover:text-white transition-colors"
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="text-neutral-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mega Menu */}
      {hasMega && (
        <div className="hidden md:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="mt-3 rounded-2xl border border-neutral-800 bg-black/90 backdrop-blur-xl">
              <div className="grid grid-cols-[420px_1fr]">
                {/* Left */}
                <div className="border-r border-white/10">
                  {leftList.map((it, idx) => (
                    <button
                      key={it.label}
                      onMouseEnter={() => setActiveLeftIndex(idx)}
                      className={clsx(
                        "w-full text-left px-6 py-5",
                        idx === activeLeftIndex
                          ? "bg-white/10 text-white"
                          : "text-neutral-300 hover:bg-white/5"
                      )}
                    >
                      {it.label}
                    </button>
                  ))}
                </div>

                {/* Right preview */}
                <div className="px-8 py-7">
                  {previewProduct ? (
                    <Link
                      href={productHref(locale, previewProduct.slug)}
                      className="block rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/40"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="relative h-40">
                        <Image
                          src={previewProduct.gallery[0]}
                          alt={previewProduct.name}
                          fill
                          sizes="(min-width: 1024px) 400px, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                          {previewProduct.tagline}
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          {previewProduct.name}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <p className="text-sm text-neutral-400">
                      Select a product to preview.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
