// src/components/layout/HeaderHeroShell.tsx
"use client";

import { useEffect, useState } from "react";
import { heroSections, type HeroSectionId, type HeroConfig } from "@/config/heroSections";
import { PagePreviewSection } from "@/components/PagePreviewSection";

import clsx from "clsx";
import Image from "next/image";

type HeaderHeroShellProps = {
  locale: string;
  // 预留多语言用，暂时可以不用
  messages?: any;
};

export function HeaderHeroShell({ locale }: HeaderHeroShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<HeroSectionId>("landing");

  const activeSection: HeroConfig =
    heroSections.find((section) => section.id === activeSectionId) ?? heroSections[0];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: HeroSectionId) => {
    setActiveSectionId(id);
    // 可选：滚动回顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部 Header */}
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300 border-b border-transparent",
          "backdrop-blur-sm",
          isScrolled
            ? "bg-black/80 border-neutral-800"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo 区域 */}
            {/* <div className="h-8 w-8 rounded-full border border-neutral-600 flex items-center justify-center text-xs tracking-[0.2em] uppercase">
              KA
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-[0.28em] uppercase">
                KRONOS
              </span>
              <span className="text-[10px] text-neutral-400 tracking-[0.24em] uppercase">
                Reference Audio
              </span>
            </div> */}


            <div className="flex items-center gap-3">
            {/* 左侧图标 */}
                {/* <Image
                    src="/media/logo-icon.png"
                    alt="Kronos Audio Icon"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    priority
                /> */}

                {/* 主 Logo（Retina 适配） */}
                <Image
                    src="/media/logo-retina.png"
                    alt="Kronos Audio"
                    width={110}
                    height={30}
                    className="h-auto w-auto object-contain"
                    priority
                />
            </div>

          {/* 中间 Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-[0.17em] uppercase">
            {heroSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavClick(section.id)}
                className={clsx(
                  "transition-colors duration-200",
                  activeSectionId === section.id
                    ? "text-white"
                    : "text-neutral-400 hover:text-neutral-100"
                )}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* 右侧：语言 + Day/Night 占位 */}
          <div className="flex items-center gap-4 text-xs">
            {/* 语言切换占位 */}
            <div className="flex items-center gap-1 border border-neutral-700 rounded-full px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
              <span className="text-neutral-400">Lang</span>
              <span className="h-4 w-px bg-neutral-700" />
              <span className="text-neutral-100">{locale.toUpperCase()}</span>
            </div>

            {/* Day/Night Toggle 占位 */}
            <button
              type="button"
              className="relative h-6 w-11 rounded-full bg-neutral-800 border border-neutral-700 flex items-center px-1"
              aria-label="Toggle theme"
            >
              <div className="h-4 w-4 rounded-full bg-neutral-300 translate-x-0" />
              {/* 之后可以用 state 控制 translate-x 切换主题 */}
            </button>
          </div>
        </div>
      </header>

      {/* Hero 区域（包括背景图/视频） */}
      <section className="relative min-h-screen flex items-center">
        {/* 背景媒体 */}
        <div className="absolute inset-0 z-0">
            <Image
            src={activeSection.media.posterSrc}
            alt="Landing background"
            fill
            priority
            className="object-cover"
            />
        </div>

        {/* Hero 内容 */}
        <div className="w-full pt-16 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center gap-12">
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400 mb-4">
                {activeSectionId === "landing"
                  ? "Swiss Crafted Reference Turntables"
                  : activeSection.label}
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

            {/* 右侧可以是一个小预览卡片 / 当前 section highlight */}
            <div className="w-full md:w-80 lg:w-96">
              <div className="rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-md p-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  Current Section
                </p>
                <p className="text-sm font-semibold">{activeSection.label}</p>
                <p className="text-xs text-neutral-300">
                  {activeSection.subtitle}
                </p>
                <div className="h-px bg-gradient-to-r from-amber-400 via-amber-200/30 to-transparent my-2" />
                <p className="text-[11px] text-neutral-400">
                  Use the navigation above to preview different parts of the
                  Kronos experience without leaving the page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* 👇 新增 Page Previews 区块 */}
    <PagePreviewSection />
      {/* 下面可以继续接：产品区块 / 地图区块 / Reviews 等 */}
    </div>
  );
}
