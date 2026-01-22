// src/components/layout/HeaderHeroShell.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n";
import { type NavId, type NavItem } from "@/config/nav";
import { heroSections, type HeroSectionId } from "@/config/heroSections";

type Props = {
  locale: Locale;
  navItems: NavItem[];
};

function withLocale(locale: string, href: string) {
  if (!href) return `/${locale}`;
  if (href.startsWith("http")) return href;
  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
}

export function HeaderHeroShell({ locale, navItems }: Props) {
  const router = useRouter();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHero, setActiveHero] = useState<HeroSectionId>("home");
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

  const activeSection = useMemo(() => {
    return heroSections.find((s) => s.id === activeHero) ?? heroSections[0];
  }, [activeHero]);

  const headerBgOpacity = 0.0 + scrollProgress * 0.85;
  const logoScale = 1 - scrollProgress * 0.12;

  const openNavMenu = (id: NavId) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(id);
    setActiveLeftIndex(0);
  };

  const scheduleCloseMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const cancelCloseMenu = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleTopClick = (item: NavItem) => {
    if (item.behavior === "spa") {
      setActiveHero(item.id as HeroSectionId);
      setOpenMenu(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  };

  const menuItem = navItems.find((x) => x.id === openMenu);
  const hasMega = !!menuItem?.megaMenu;

  const leftList = menuItem?.megaMenu?.left ?? [];
  const activeLeft = leftList[activeLeftIndex];
  const rightList = activeLeft?.children ?? [];

  const viewAllHref =
    activeLeft?.href
      ? withLocale(locale, activeLeft.href)
      : activeLeft?.productSlug
      ? `/${locale}/products/${activeLeft.productSlug}`
      : `/${locale}/products`;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color] duration-300",
        scrollProgress > 0.02 ? "border-neutral-800" : "border-transparent"
      )}
      style={{ backgroundColor: `rgba(0,0,0,${headerBgOpacity})` }}
      onMouseLeave={scheduleCloseMenu}
      onMouseEnter={cancelCloseMenu}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 origin-left transition-transform duration-200"
          style={{ transform: `scale(${logoScale})` }}
          aria-label="Kronos Audio Home"
        >
          <Image
            src="/media/logo-icon.png"
            alt="Kronos Audio Icon"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <Image
            src="/media/logo-retina.png"
            alt="Kronos Audio"
            width={140}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* Top Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase">
          {navItems.map((item) => {
            const isActive = activeHero === item.id;
            const isOpen = openMenu === item.id;
            const hasDropdown = !!item.megaMenu;

            if (item.behavior === "link" && item.href) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => (hasDropdown ? openNavMenu(item.id) : setOpenMenu(null))}
                >
                  <Link
                    href={withLocale(locale, item.href)}
                    className={clsx(
                      "transition-colors duration-200",
                      isOpen ? "text-white" : "text-neutral-200 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>

                  <div
                    className={clsx(
                      "mt-1 h-[2px] rounded-full transition-all duration-200",
                      isOpen ? "bg-amber-400 w-full opacity-90" : "bg-transparent w-0 opacity-0"
                    )}
                  />
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => (hasDropdown ? openNavMenu(item.id) : setOpenMenu(null))}
              >
                <button
                  type="button"
                  onClick={() => handleTopClick(item)}
                  className={clsx(
                    "transition-colors duration-200",
                    isActive ? "text-amber-300" : "text-neutral-200 hover:text-white",
                    isOpen && "text-white"
                  )}
                >
                  {item.label}
                </button>

                <div
                  className={clsx(
                    "mt-1 h-[2px] rounded-full transition-all duration-200",
                    isActive || isOpen ? "bg-amber-400 w-full opacity-90" : "bg-transparent w-0 opacity-0"
                  )}
                />
              </div>
            );
          })}
        </nav>

        {/* Right controls */}
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
            <div className="h-4 w-4 rounded-full bg-neutral-300 translate-x-0 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {hasMega && (
        <div
          className="hidden md:block relative z-[120] pointer-events-auto"
          onMouseEnter={cancelCloseMenu}
          onMouseLeave={scheduleCloseMenu}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="relative z-[120] mt-3 rounded-2xl overflow-hidden border border-neutral-800 bg-black/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
              <div className="grid grid-cols-[420px_1fr]">
                {/* Left column */}
                <div className="bg-white/6 border-r border-white/10">
                  {leftList.map((it, idx) => {
                    const selected = idx === activeLeftIndex;
                    const hasChildren = !!it.children?.length;

                    return (
                      <button
                        key={`${it.label}-${idx}`}
                        type="button"
                        onMouseEnter={() => setActiveLeftIndex(idx)}
                        onClick={() => {
                          const href = it.href
                            ? withLocale(locale, it.href)
                            : it.productSlug
                            ? `/${locale}/products/${it.productSlug}`
                            : undefined;

                          if (href) {
                            setOpenMenu(null);
                            router.push(href);
                          }
                        }}
                        className={clsx(
                          "w-full text-left px-6 py-5 flex items-center justify-between",
                          "text-base font-medium",
                          selected ? "bg-white/12 text-white" : "bg-transparent text-neutral-200 hover:bg-white/8"
                        )}
                      >
                        <span className="tracking-wide">{it.label}</span>
                        <span className={clsx("text-neutral-400", hasChildren ? "opacity-100" : "opacity-0")}>›</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right column */}
                <div className="bg-white/4 min-h-[340px]">
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

                    {/* 你的 products 左侧是 productSlug：这里显示一张“预览卡” */}
                    {activeLeft?.productSlug ? (
                      <Link
                        href={`/${locale}/products/${activeLeft.productSlug}`}
                        onClick={() => setOpenMenu(null)}
                        className={clsx(
                          "block rounded-2xl border border-white/10 bg-black/20 p-6",
                          "hover:border-amber-400/40 hover:bg-black/30 transition-colors"
                        )}
                      >
                        <div className="text-lg font-medium text-white">{activeLeft.label}</div>
                        {activeLeft.description && (
                          <div className="mt-3 text-sm text-neutral-300 leading-relaxed">
                            {activeLeft.description}
                          </div>
                        )}
                        <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-300">
                          Explore →
                        </div>
                      </Link>
                    ) : rightList.length === 0 ? (
                      <div className="text-sm text-neutral-300">
                        {menuItem?.megaMenu?.rightEmptyText ?? "No items."}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {rightList.map((c) => (
                          <Link
                            key={c.href}
                            href={withLocale(locale, c.href)}
                            onClick={() => setOpenMenu(null)}
                            className={clsx(
                              "rounded-xl border border-white/10 bg-black/20 px-4 py-4",
                              "text-sm text-neutral-100 hover:border-amber-400/50 hover:bg-black/30",
                              "transition-colors"
                            )}
                          >
                            <div className="font-medium">{c.label}</div>
                            {c.description && <div className="text-xs text-neutral-400 mt-1">{c.description}</div>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
