import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { analytics } from './lib/analytics';

const intlMiddleware = createMiddleware({ 
  locales: ['en', 'fr', 'ar'], 
  localePrefix: 'always', 
  defaultLocale: 'en', 
});

export const config = { 
  matcher: [ 
    '/', 
    '/(en|fr|ar)/:path*', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)' 
  ], 
};

const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*']);

export default clerkMiddleware((auth, req: NextRequest) => {
  // Remove await and use direct return
  const localeResponse = intlMiddleware(req);
  if (localeResponse) return localeResponse;

  if (!isPublicRoute(req)) {
    auth().protect();
  }

  try { 
    const supportedLocales = ['fr', 'en', 'ar']; 
    if (supportedLocales.some(locale => req.nextUrl.pathname.startsWith(`/${locale}/`))) { 
      analytics.track('pageview', { 
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