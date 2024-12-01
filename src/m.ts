import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { analytics } from './lib/analytics';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'ar'],
  localePrefix: 'always',
  defaultLocale: 'en', 
});

const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*']);

export default clerkMiddleware(async (auth, req) => {
  try {
    // First, handle internationalization
    const localeResponse = await intlMiddleware(req);
    if (localeResponse) return localeResponse;

    // Then handle authentication for non-public routes
    if (!isPublicRoute(req)) {
      auth().protect();
    }

    // Track analytics for supported locales
    const supportedLocales = ['fr', 'en', 'ar'];
    if (supportedLocales.some(locale => req.nextUrl.pathname.startsWith(`/${locale}/`))) {
      await analytics.track('pageview', {
        page: req.nextUrl.pathname,
        country: req.geo?.country,
      }).catch(error => {
        console.error("Analytics tracking error", error);
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    '/', 
    '/(en|fr|ar)/:path*', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};