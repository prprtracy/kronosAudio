// src/components/layout/HeaderHeroShell.tsx
"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

import { NAV_ITEMS, type NavId, type NavItem } from "@/config/nav";
import { heroSections, type HeroSectionId } from "@/config/heroSections";

type Props = {
  locale: string;
};

export function HeaderHeroShell({ locale }: Props) {
  // scroll 进度（后面做 Nagra 风格动画用）
  const [scrollProgress, setScrollProgress] = useState(0); // 0 ~ 1

  // 当前 Hero（SPA 切换）
  const [activeHero, setActiveHero] = useState<HeroSectionId>("home");

  // Mega menu 状态：当前打开的顶层 nav id
  const [openMenu, setOpenMenu] = useState<NavId | null>(null);

  // Mega menu：左侧 hover 的项 index（决定右侧显示哪个 children）
  const [activeLeftIndex, setActiveLeftIndex] = useState(0);

  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = 120;
      const p = Math.min(y / max, 1);
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSection = useMemo(() => {
    return heroSections.find((s) => s.id === activeHero) ?? heroSections[0];
  }, [activeHero]);

  const headerBgOpacity = 0.0 + scrollProgress * 0.85; // 0 -> 0.85
  const logoScale = 1 - scrollProgress * 0.12; // 1 -> 0.88

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
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu(null);
    }, 120);
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
      // 点击顶层时，也关闭菜单（可选）
      setOpenMenu(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (item.behavior === "link" && item.href) {
      window.location.href = item.href;
    }
  };

  const menuItem = NAV_ITEMS.find((x) => x.id === openMenu);
  const hasMega = !!menuItem?.megaMenu;

  const leftList = menuItem?.megaMenu?.left ?? [];
  const activeLeft = leftList[activeLeftIndex];
  const rightList = activeLeft?.children ?? [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color] duration-300",
          scrollProgress > 0.02 ? "border-neutral-800" : "border-transparent"
        )}
        style={{
          backgroundColor: `rgba(0,0,0,${headerBgOpacity})`,
        }}
        onMouseLeave={scheduleCloseMenu}
        onMouseEnter={cancelCloseMenu}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 origin-left transition-transform duration-200"
            style={{ transform: `scale(${logoScale})` }}
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
          </div>

          {/* Top Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHero === item.id;
              const isOpen = openMenu === item.id;
              const hasDropdown = !!item.megaMenu;

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

                  {/* 顶部小 underline（高级感） */}
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

          {/* Right controls (lang/theme placeholders) */}
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

        {/* Mega Menu panel (像你截图那样：左列 + 右列联动) */}
        {hasMega && (
          <div
            className="hidden md:block"
            onMouseEnter={cancelCloseMenu}
            onMouseLeave={scheduleCloseMenu}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
              <div className="mt-3 rounded-2xl overflow-hidden border border-neutral-800 bg-black/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
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
                          className={clsx(
                            "w-full text-left px-6 py-5 flex items-center justify-between",
                            "text-base font-medium",
                            selected
                              ? "bg-white/12 text-white"
                              : "bg-transparent text-neutral-200 hover:bg-white/8"
                          )}
                        >
                          <span className="tracking-wide">{it.label}</span>
                          <span className={clsx("text-neutral-400", hasChildren ? "opacity-100" : "opacity-0")}>
                            ›
                          </span>
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
                        {activeLeft?.href && (
                          <a
                            href={activeLeft.href}
                            className="text-[11px] uppercase tracking-[0.22em] text-amber-300 hover:text-amber-200 transition-colors"
                          >
                            Learn more →
                          </a>
                        )}
                      </div>

                      {rightList.length === 0 ? (
                        <div className="text-sm text-neutral-300">
                          {menuItem?.megaMenu?.rightEmptyText ?? "No items."}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {rightList.map((c) => (
                            <a
                              key={c.href}
                              href={c.href}
                              className={clsx(
                                "rounded-xl border border-white/10 bg-black/20 px-4 py-4",
                                "text-sm text-neutral-100 hover:border-amber-400/50 hover:bg-black/30",
                                "transition-colors"
                              )}
                            >
                              <div className="font-medium">{c.label}</div>
                              {c.description && (
                                <div className="text-xs text-neutral-400 mt-1">{c.description}</div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 底部微光线条（更“高级”） */}
                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        {/* background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src={activeSection.media.posterSrc}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div
            className={clsx(
              "absolute inset-0 bg-gradient-to-br",
              activeSection.media.overlayGradient ?? "from-black/70 via-black/30 to-black/90"
            )}
          />
        </div>

        {/* content */}
        <div className="relative z-10 w-full pt-16 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center gap-12">
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400 mb-4">
                {activeSection.label}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6">
                {activeSection.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-200 max-w-xl mb-8">
                {activeSection.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {activeSection.ctaPrimary && (
                  <a
                    href={activeSection.ctaPrimary.href}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-400 text-black text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-amber-300 transition-colors"
                  >
                    {activeSection.ctaPrimary.label}
                  </a>
                )}
                {activeSection.ctaSecondary && (
                  <a
                    href={activeSection.ctaSecondary.href}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-neutral-500 text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-100 hover:border-amber-300 hover:text-amber-200 transition-colors"
                  >
                    {activeSection.ctaSecondary.label}
                  </a>
                )}
              </div>
            </div>

            <div className="w-full md:w-80 lg:w-96">
              <div className="rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-md p-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  Current Section
                </p>
                <p className="text-sm font-semibold">{activeSection.label}</p>
                <p className="text-xs text-neutral-300">{activeSection.subtitle}</p>
                <div className="h-px bg-gradient-to-r from-amber-400 via-amber-200/30 to-transparent my-2" />
                <p className="text-[11px] text-neutral-400">
                  Hover “Products” to preview the submenu (dynamic, like the reference).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 下面内容（先留空，明天接 preview sections / 地图等） */}
      <div className="h-24" />
    </div>
  );
}
