import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import {
  authRoutes,
  defaultLocale,
  locales,
  publicRoutes,
  routing,
} from "@/i18n/routing";

type Session = typeof auth.$Infer.Session;

const i18nMiddleware = createMiddleware(routing);

async function isAuthenticated(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    `${process.env.BETTER_AUTH_URL}/api/auth/get-session`,
    {
      baseURL: request.nextUrl.origin,

      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  return !!session && !!session.user && !session.user.isAnonymous;
}

function currentLocale(req: NextRequest) {
  const { nextUrl } = req;
  return (
    locales.find(
      (l) =>
        nextUrl.pathname.startsWith(`/${l}/`) || nextUrl.pathname === `/${l}`
    ) ??
    req.cookies.get("NEXT_LOCALE")?.value ??
    defaultLocale
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = await isAuthenticated(request);
  const locale = currentLocale(request);
  const isPublicRoute = publicRoutes.test(pathname);
  const isAuthRoute = authRoutes.test(pathname);

  if (!isAuth && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(
      new URL(`/${locale}/login?callbackUrl=${pathname}`, request.url)
    );
  }

  return i18nMiddleware(request);
}
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
