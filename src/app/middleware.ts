// middleware.ts
// import createMiddleware from "next-intl/middleware";
// import { locales, defaultLocale } from "./src/i18n";

// export default createMiddleware({
//   locales,
//   defaultLocale,
// });

// export const config = {
//   // matcher 让所有路径都走这个多语言中间件
//   matcher: ["/((?!_next|favicon.ico|assets).*)"],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr"]; // 你的支持语言
const defaultLocale = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 跳过 next 内部与静态资源
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
