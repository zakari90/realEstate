import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { trackPageVisit } from './_actions/admin/admin';


const intlMiddleware = createMiddleware({
  locales: ['ar'],
  localePrefix: 'always',
  defaultLocale: 'ar'
});

export const config = {
  matcher: [
    '/', 
    '/(ar)/:path*', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};

const isPublicRoute = createRouteMatcher(['/', '/(ar)/:path*']);

export default clerkMiddleware(async (auth, req) => {
  // Track page visit
  // try {
  //   await trackPageVisit(req.nextUrl.pathname);
  // } catch (trackingError) {
  //   console.error('Tracking failed:', trackingError);
  // }

  // Internationalization middleware
  const localeResponse = intlMiddleware(req);
  if (localeResponse) return localeResponse;

  // Authentication for non-public routes
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  return NextResponse.next();
});