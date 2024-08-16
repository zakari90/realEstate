import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', "ar"],
  localePrefix: 'always',
  defaultLocale: 'en',
})

const isPublicRoute = createRouteMatcher(['/', '/(fr|en|ar)/:path*'])

// const isProtectedRoute = createRouteMatcher(['dashboard/(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect()
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}