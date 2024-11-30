import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { analytics } from './lib/analytics';
import { trackVisit } from './_actions/admin/admin';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'ar'],
  localePrefix: 'always', // Ensure locale prefix in the URL is always required
  defaultLocale: 'en', // Default locale fallback
});

const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*']);

// Middleware function
export default clerkMiddleware(async (auth, req) => {
  // First, execute the next-intl middleware to determine the locale
  const localeResponse = await intlMiddleware(req);
  if (localeResponse) {
    // Return if locale-related issues are found
    return localeResponse;
  }

  // Proceed with Clerk authentication middleware
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // Proceed with other operations like analytics tracking
  analyticsMiddleware(req);

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], // Match all routes except static assets
};

// Analytics Middleware
async function analyticsMiddleware(req: NextRequest) {
  const supportedLocales = ['fr', 'en', 'ar'];

  if (!req.nextUrl.pathname.startsWith('/_next') && !req.nextUrl.pathname.includes('api')) {
    try {
      if (supportedLocales.some(locale => req.nextUrl.pathname.startsWith(`/${locale}/`))) {
        console.log('Matched path for locale:', req.nextUrl.pathname);
        await analytics.track('pageview', {
          page: req.nextUrl.pathname,
          country: req.geo?.country,
        }).catch(error => {
          console.error("Error sending analytics data", error);
        });
      }
    } catch (error) {
      console.error("Error in analytics middleware", error);
    }
  }

  return NextResponse.next();
}
