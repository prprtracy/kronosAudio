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
    const onScroll = () => setIsCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openNavMenu = (id: NavId) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(id);
    setActiveLeftIndex(0);
  };

  const closeMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  const menuItem = navItems.find((n) => n.id === openMenu);
  const leftList = menuItem?.megaMenu?.left ?? [];
  const activeLeft = leftList[activeLeftIndex];

  const viewAllHref = `/${locale}/products`;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        isCompact ? "border-neutral-800" : "border-transparent"
      )}
      style={{
        backgroundColor: isCompact ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)",
        backdropFilter: isCompact ? "blur(8px)" : "none",
        WebkitBackdropFilter: isCompact ? "blur(8px)" : "none",
      }}
    >
      {/* Top bar */}
      <div className={clsx(isCompact ? "py-3" : "py-7", "transition-all duration-300")}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/media/logo-icon.png" alt="" width={32} height={32} />
            <Image src="/media/logo-retina.png" alt="Kronos Audio" width={140} height={32} />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.18em] uppercase">
            {navItems.map((item) =>
              item.behavior === "link" ? (
                <div
                  key={item.id}
                  onMouseEnter={() => item.megaMenu && openNavMenu(item.id)}
                >
                  <Link
                    href={withLocale(locale, item.href)}
                    className="text-neutral-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-neutral-200 hover:text-white"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* <div className="text-xs text-neutral-300 border border-neutral-700 rounded-full px-4 py-1">
            LANG {locale.toUpperCase()}
          </div> */}
        </div>
      </div>

      {/* Mega menu backdrop（不参与 hover） */}
      {menuItem?.megaMenu && (
        <div className="hidden md:block bg-black/90 backdrop-blur-xl border-b border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 py-6">
            {/* 👇 唯一 hover 区域 */}
            <div
              className="rounded-2xl overflow-hidden border border-white/10 bg-black/70"
              onMouseLeave={closeMenu}
            >
              <div className="grid grid-cols-[420px_1fr]">
                {/* Left */}
                <div className="bg-white/6 border-r border-white/10">
                  {leftList.map((it, idx) => (
                    <button
                      key={it.label}
                      onMouseEnter={() => setActiveLeftIndex(idx)}
                      onClick={() => {
                        setOpenMenu(null);
                        router.push(`/${locale}/products/${it.productSlug}`);
                      }}
                      className={clsx(
                        "w-full px-6 py-5 text-left transition-colors",
                        idx === activeLeftIndex
                          ? "bg-white/12 text-white"
                          : "text-neutral-200 hover:bg-white/8"
                      )}
                    >
                      {it.label}
                    </button>
                  ))}
                </div>

                {/* Right */}
                <div className="px-8 py-7">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs tracking-[0.22em] uppercase text-neutral-400">
                      {menuItem.megaMenu.title}
                    </p>
                    <Link
                      href={viewAllHref}
                      className="text-[11px] tracking-[0.22em] uppercase text-amber-300"
                    >
                      View all →
                    </Link>
                  </div>

                  {activeLeft ? (
                    <>
                      <h3 className="text-lg text-white mb-3">{activeLeft.label}</h3>
                      <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                        {activeLeft.description}
                      </p>

                      {activeLeft.previewImage && (
                        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-white/10">
                          <Image
                            src={activeLeft.previewImage}
                            alt={activeLeft.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-neutral-400">
                      {menuItem.megaMenu.rightEmptyText}
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
