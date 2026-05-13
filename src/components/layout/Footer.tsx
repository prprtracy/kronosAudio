import Image from "next/image";
import Link from "next/link";
import type { FooterContent } from "@/config/footer";

export function Footer({ content }: { content: FooterContent }) {
  const { brand, contact, links, mission, social, legal } = content;

  return (
    <footer className="bg-black text-neutral-300">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-3">
            <Image
              src={brand.logo}
              alt="Kronos Audio"
              width={160}
              height={48}
            />
            {brand.tagline && (
              <p className="mt-3 text-[11px] tracking-[0.28em] uppercase text-neutral-500">
                {brand.tagline}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-4">
              {contact.name}
            </h4>

            <p className="text-sm leading-relaxed text-neutral-400">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            {(contact.mobile || contact.studio) && (
              <div className="mt-4 space-y-1 text-sm text-neutral-400">
                {contact.mobile && <p>Mobile: {contact.mobile}</p>}
                {contact.studio && <p>Studio: {contact.studio}</p>}
              </div>
            )}

            {contact.email && (
              <p className="mt-2 text-sm text-neutral-400">
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            )}
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-4">
              {links.title}
            </h4>

            <ul className="space-y-3 text-sm">
              {links.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-4">
              {mission.title}
            </h4>

            <p className="text-sm leading-relaxed text-neutral-400">
              {mission.text}
            </p>

            {mission.link && (
              <Link
                href={mission.link.href}
                className="inline-block mt-4 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                {mission.link.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {legal.year ?? new Date().getFullYear()}{" "}
            {legal.copyright} | All Rights Reserved
          </p>

          {social && (
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs tracking-wide text-neutral-500 sm:justify-end">
              {social.map((s, index) => (
                <span key={s.id} className="inline-flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-neutral-700">
                      ·
                    </span>
                  )}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-amber-400"
                  >
                    {s.id === "Facebook" && (
                      <span
                        aria-hidden="true"
                        className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] font-semibold leading-none"
                      >
                        f
                      </span>
                    )}
                    {s.id}
                  </a>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
