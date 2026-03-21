"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { NavId, NavItem } from "@/config/nav";

type Props = {
  navItems: NavItem[];
};

export function HeaderHeroShell({ navItems }: Props) {
  const router = useRouter();

  const [isCompact, setIsCompact] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavId | null>(null);
  const [activeLeftIndex, setActiveLeftIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  const openNavMenu = (id: NavId) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(id);
    setActiveLeftIndex(0);
  };

  const closeMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const menuItem = navItems.find((n) => n.id === openMenu);
  const leftList = menuItem?.megaMenu?.left ?? [];
  const activeLeft = leftList[activeLeftIndex];

  const viewAllHref = "/products";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800 bg-black"
        style={{
          backgroundColor: "rgba(0,0,0,0.95)",
          backdropFilter: isCompact ? "blur(8px)" : "blur(4px)",
          WebkitBackdropFilter: isCompact ? "blur(8px)" : "blur(4px)",
        }}
      >
        <div
          className={clsx(
            isCompact ? "py-3" : "py-5",
            "transition-all duration-300"
          )}
        >
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => {
                closeMenu();
                closeMobileMenu();
              }}
            >
              <Image src="/media/logo-icon.png" alt="" width={32} height={32} />
              <Image
                src="/media/logo-retina.png"
                alt="Kronos Audio"
                width={140}
                height={32}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.18em] uppercase">
              {navItems.map((item) =>
                item.behavior === "link" ? (
                  <div
                    key={item.id}
                    onMouseEnter={() => item.megaMenu && openNavMenu(item.id)}
                  >
                    <Link
                      href={item.href || "/"}
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

            {/* Mobile burger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 transition"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={clsx(
                    "absolute left-0 top-0 h-[2px] w-5 bg-white transition-all duration-300",
                    mobileOpen && "top-[7px] rotate-45"
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 top-[7px] h-[2px] w-5 bg-white transition-all duration-300",
                    mobileOpen && "opacity-0"
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 top-[14px] h-[2px] w-5 bg-white transition-all duration-300",
                    mobileOpen && "top-[7px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop mega menu only */}
        {menuItem?.megaMenu && (
          <div className="hidden md:block bg-black/95 backdrop-blur-xl border-b border-neutral-800">
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div
                className="rounded-2xl overflow-hidden border border-white/10 bg-black/70"
                onMouseLeave={closeMenu}
              >
                <div className="grid grid-cols-[420px_1fr]">
                  <div className="bg-white/6 border-r border-white/10">
                    {leftList.map((it, idx) => (
                      <button
                        key={it.label}
                        onMouseEnter={() => setActiveLeftIndex(idx)}
                        onClick={() => {
                          setOpenMenu(null);
                          router.push(`/products/${it.productSlug}`);
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
                        <h3 className="text-lg text-white mb-3">
                          {activeLeft.label}
                        </h3>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 pt-[88px]">
          <div className="h-full overflow-y-auto px-6 pb-10">
            <nav className="flex flex-col border-t border-white/10">
              {navItems.map((item) => {
                if (item.behavior === "link") {
                  return (
                    <Link
                      key={item.id}
                      href={item.href || "/"}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between border-b border-white/10 py-5 text-sm tracking-[0.18em] uppercase text-white"
                    >
                      <span>{item.label}</span>
                      <span className="text-neutral-500">→</span>
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      closeMobileMenu();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center justify-between border-b border-white/10 py-5 text-sm tracking-[0.18em] uppercase text-white text-left"
                  >
                    <span>{item.label}</span>
                    <span className="text-neutral-500">↑</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}