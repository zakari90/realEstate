import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', "ar"],
  localePrefix: 'always',
  defaultLocale: 'en',
})

const isPublicRoute = createRouteMatcher(['/:path*'])
// const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*'])

// const isProtectedRoute = createRouteMatcher(['agent/(.*)','admin/(.*)'])

export default clerkMiddleware((auth, req) => {
  analyticsMiddleware(req)
  if (!isPublicRoute(req)) {
    auth().protect()
  }
console.log("clerkMiddleware");

  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

export async function analyticsMiddleware(req: NextRequest) {
  const supportedLocales = ['fr', 'en', 'ar'];

  if (supportedLocales.some(locale => req.nextUrl.pathname === `/${locale}/agent`)) {
    console.log('Matched agent path for locale:', req.nextUrl.pathname);
  } else {
    console.log('Path did not match:', req.nextUrl.pathname);
  }

  return NextResponse
}