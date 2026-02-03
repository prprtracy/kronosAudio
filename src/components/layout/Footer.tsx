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

            {contact.phone && (
              <p className="mt-4 text-sm text-neutral-400">
                {contact.phone}
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
            <div className="flex items-center gap-4 text-neutral-500">
              {social.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {s.id}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
