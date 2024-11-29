import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { trackPageVisit, trackVisit } from './_actions/admin/admin'
import { analytics } from './lib/analytics'
import { getDate } from 'date-fns'

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', "ar"],
  localePrefix: 'always',
  defaultLocale: 'en',
})

const isPublicRoute = createRouteMatcher(['/:path*'])
// const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*'])

// const isProtectedRoute = createRouteMatcher(['agent/(.*)','admin/(.*)'])

export default clerkMiddleware( async (auth, req) => {
  analyticsMiddleware(req)
  // websiteVisitsTracker(req)
    // Add analytics tracking
    // const ip = req.ip || req.headers.get('x-forwarded-for')
    // const path = req.nextUrl.pathname
    // console.log(path);
    // if (!path.startsWith('/api')) {
    //   await trackPageVisit(path, 'unknown')
    // }
    
  if (!isPublicRoute(req)) {
    auth().protect()
  }

  console.log("clerkMiddleware");
  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}


// Function to track website visits
export async function websiteVisitsTracker(req: NextRequest) {
  try {
    // Exclude visits to static assets and API routes
    if (!req.nextUrl.pathname.startsWith('/_next') && !req.nextUrl.pathname.includes('api')) {
      const pagePath = req.nextUrl.pathname;
      const location = "country: " + req.geo?.country + "region: " + req.geo?.region + "city: " + req.geo?.city
      await trackVisit(pagePath, location);
    }
  } catch (error) {
    console.error("Error tracking website visit:", error);
  }
  return NextResponse
}
export async function analyticsMiddleware(req: NextRequest) {
  const supportedLocales = ['fr', 'en', 'ar'];
console.log("analyticsMiddleware");
// if (supportedLocales.some(locale => req.nextUrl.pathname === `/${locale}/agent`))   

  if (!req.nextUrl.pathname.startsWith('/_next') && !req.nextUrl.pathname.includes('api')) {
    try {
      console.log('Matched agent path for locale:', req.nextUrl.pathname);
      await analytics.track('pageview', {
        page: req.nextUrl.pathname,
        country: req.geo?.country,
      })
    } catch (error) {
      console.error("analyticsMiddleware" , error);     
    }
  }

  return NextResponse
}