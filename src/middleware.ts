// src/middleware.js
import { NextResponse } from "next/server";

const supportedLngs = ["en", "ar"];
const fallbackLng = "en";
const cookieName = "i18next-lang";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - Any file with an extension (js, css, png, etc.)
     */
    "/((?!api|link|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};

function detectLanguage(req) {
  let lng;

  // 1. Check for language cookie
  if (req.cookies.has(cookieName)) {
    const cookieLang = req.cookies.get(cookieName)?.value;
    if (supportedLngs.includes(cookieLang)) {
      lng = cookieLang;
    }
  }

  // 2. Check Accept-Language header
  if (!lng) {
    const acceptLangHeader = req.headers.get("Accept-Language");
    if (acceptLangHeader) {
      // Simple language detection from Accept-Language header
      const preferredLang = acceptLangHeader
        .split(",")[0]
        .split("-")[0]
        .toLowerCase();

      if (supportedLngs.includes(preferredLang)) {
        lng = preferredLang;
      }
    }
  }

  // 3. Fallback to default language
  if (!lng) {
    lng = fallbackLng;
  }

  return lng;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // 1. If path is /en or starts with /en/, redirect to the same path without /en
  // const isEn = pathname === '/en' || pathname.startsWith('/en/');
  // if (isEn) {
  //   url.pathname = pathname.replace(/^\/en(\/|$)/, "/");
  //   if (url.pathname === "") url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  // 2. If path is /ar or starts with /ar/, do nothing (let it through)
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    return NextResponse.next();
  }

  // 3. For all other (default) routes, rewrite to /en + pathname (internal rewrite)
  // url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  // return NextResponse.rewrite(url);
}
