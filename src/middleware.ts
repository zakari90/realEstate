import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { trackPageVisit, trackVisit } from './_actions/admin/admin';
import { analytics } from './lib/analytics';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', "ar"],
  localePrefix: 'always',
  defaultLocale: 'en',
});

const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*']);

export default clerkMiddleware(async (auth, req) => {
  // Call analytics middleware asynchronously
  analyticsMiddleware(req);
  
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  return intlMiddleware(req); // Proceed with internationalization middleware
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

async function analyticsMiddleware(req: NextRequest) {
  const supportedLocales = ['fr', 'en', 'ar'];
  console.log("analyticsMiddleware");

  if (!req.nextUrl.pathname.startsWith('/_next') && !req.nextUrl.pathname.includes('api')) {
    try {
      // Track analytics asynchronously in the background
      if (supportedLocales.some(locale => req.nextUrl.pathname.startsWith(`/${locale}/`))) {
        console.log('Matched path for locale:', req.nextUrl.pathname);
        
        analytics.track('pageview', {
          page: req.nextUrl.pathname,
          country: req.geo?.country,
        }).catch(error => {
          console.error("Error sending analytics data", error);
        });
      }
    } catch (error) {
      console.error("analyticsMiddleware", error);
    }
  }

  return NextResponse.next();
}
