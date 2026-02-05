import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ["ar"],
  localePrefix: 'always',
  defaultLocale: 'ar',
})

const isPublicRoute = createRouteMatcher(['/:path*'])

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

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