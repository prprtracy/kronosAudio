export function withLocale(locale: string, href: string) {
  if (!href.startsWith("/")) href = `/${href}`;
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href;
  return `/${locale}${href}`;
}

export function productHref(locale: string, slug: string) {
  return withLocale(locale, `/products/${slug}`);
}
