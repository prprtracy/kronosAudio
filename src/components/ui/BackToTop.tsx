"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className={clsx(
        "fixed bottom-6 left-6 z-40",
        "h-10 w-10 rounded-full",
        "border border-white/15 bg-black/40 backdrop-blur",
        "text-white/70 hover:text-white",
        "hover:border-amber-400/40",
        "transition-colors"
      )}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
