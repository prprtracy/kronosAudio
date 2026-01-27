"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n";
import type { NavId, NavItem } from "@/config/nav";

function withLocale(locale: string, href?: string) {
  if (!href) return `/${locale}`;
  if (href.startsWith("http")) return href;
  return href.startsWith("/") ? `/${locale}${href}` : `/${locale}/${href}`;
}

type Props = {
  locale: Locale;
  navItems: NavItem[];
};

export function HeaderHeroShell({ locale, navItems }: Props) {
  const router = useRouter();

  const [isCompact, setIsCompact] = useState(false);

  const [openMenu, setOpenMenu] = useState<NavId | null>(null);
  const [activeLeftIndex, setActiveLeftIndex] = useState(0);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const threshold = 120; // 比 80 更像 Nagra：Hero 多停留一點
    const onScroll = () => setIsCompact(window.scrollY >= threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openNavMenu = (id: NavId) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(id);
    setActiveLeftIndex(0);
  };

  const scheduleCloseMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const cancelCloseMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const menuItem = navItems.find((x) => x.id === openMenu);
  const hasMega = !!menuItem?.megaMenu;

  const leftList = menuItem?.megaMenu?.left ?? [];
  const activeLeft = leftList[activeLeftIndex];

  const viewAllHref =
    activeLeft?.href
      ? withLocale(locale, activeLeft.href)
      : activeLeft?.productSlug
      ? `/${locale}/products/${activeLeft.productSlug}`
      : `/${locale}/products`;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50",
        "border-b transition-[background-color,border-color] duration-300",
        isCompact ? "border-neutral-800" : "border-transparent"
      )}
      style={{
        backgroundColor: isCompact ? "rgba(0,0,0,0.90)" : "rgba(0,0,0,0)",
        backdropFilter: isCompact ? "blur(8px)" : "none",
        WebkitBackdropFilter: isCompact ? "blur(8px)" : "none",
      }}
      onMouseLeave={scheduleCloseMenu}
      onMouseEnter={cancelCloseMenu}
    >
      {/* Top bar: 只用 padding 變高低，絕不固定 height */}
      <div className={clsx("transition-all duration-300 ease-out", isCompact ? "py-3" : "py-7")}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 transition-transform duration-300 origin-left"
            style={{ transform: isCompact ? "scale(0.92)" : "scale(1)" }}
            aria-label="Kronos Audio Home"
          >
            <Image src="/media/logo-icon.png" alt="" width={32} height={32} priority />
            <Image src="/media/logo-retina.png" alt="Kronos Audio" width={140} height={32} priority />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase">
            {navItems.map((item) => {
              const isOpen = openMenu === item.id;

              if (item.behavior === "link" && item.href) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => (item.megaMenu ? openNavMenu(item.id) : setOpenMenu(null))}
                  >
                    <Link
                      href={withLocale(locale, item.href)}
                      className={clsx(
                        "transition-colors",
                        isOpen ? "text-white" : "text-neutral-200 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              // Home = spa（回頂）
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-neutral-200 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right controls（保留你的原版） */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-1 border border-neutral-700 rounded-full px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
              <span className="text-neutral-400">Lang</span>
              <span className="h-4 w-px bg-neutral-700" />
              <span className="text-neutral-100">{locale.toUpperCase()}</span>
            </div>

            <button
              type="button"
              className="relative h-6 w-11 rounded-full bg-neutral-800 border border-neutral-700 flex items-center px-1"
              aria-label="Toggle theme"
            >
              <div className="h-4 w-4 rounded-full bg-neutral-300 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu（完全保留、不參與 top bar 高度動畫） */}
      {hasMega && (
        <div
          className="hidden md:block relative z-[120]"
          onMouseEnter={cancelCloseMenu}
          onMouseLeave={scheduleCloseMenu}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="mt-3 rounded-2xl overflow-hidden border border-neutral-800 bg-black/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
              <div className="grid grid-cols-[420px_1fr]">
                <div className="bg-white/6 border-r border-white/10">
                  {leftList.map((it, idx) => {
                    const selected = idx === activeLeftIndex;
                    return (
                      <button
                        key={it.label}
                        type="button"
                        onMouseEnter={() => setActiveLeftIndex(idx)}
                        onClick={() => {
                          const href = it.href
                            ? withLocale(locale, it.href)
                            : it.productSlug
                            ? `/${locale}/products/${it.productSlug}`
                            : null;

                          if (href) {
                            setOpenMenu(null);
                            router.push(href);
                          }
                        }}
                        className={clsx(
                          "w-full px-6 py-5 text-left text-base transition-colors",
                          selected ? "bg-white/12 text-white" : "text-neutral-200 hover:bg-white/8"
                        )}
                      >
                        {it.label}
                      </button>
                    );
                  })}
                </div>

                <div className="px-8 py-7">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                      {menuItem?.megaMenu?.title ?? menuItem?.label}
                    </p>
                    <Link
                      href={viewAllHref}
                      className="text-[11px] uppercase tracking-[0.22em] text-amber-300 hover:text-amber-200 transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      View all →
                    </Link>
                  </div>

                  {activeLeft?.productSlug ? (
                    <Link
                      href={`/${locale}/products/${activeLeft.productSlug}`}
                      onClick={() => setOpenMenu(null)}
                      className="block rounded-2xl border border-white/10 bg-black/30 p-6 hover:border-amber-400/40 hover:bg-black/35 transition-colors"
                    >
                      <div className="text-lg font-medium text-white">{activeLeft.label}</div>
                      {activeLeft.description && (
                        <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                          {activeLeft.description}
                        </p>
                      )}
                      <div className="mt-6 text-[11px] uppercase tracking-[0.22em] text-amber-300">
                        Explore →
                      </div>
                    </Link>
                  ) : (
                    <p className="text-sm text-neutral-300">
                      {menuItem?.megaMenu?.rightEmptyText ?? "Select a product to explore."}
                    </p>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
