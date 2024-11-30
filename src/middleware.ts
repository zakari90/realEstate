import { clerkMiddleware } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'ar'],
  localePrefix: 'always',
  defaultLocale: 'en'
});

export const config = {
  matcher: [
    '/', 
    '/(en|fr|ar)/:path*', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};

export default clerkMiddleware((auth, req) => {
  try {
    // First, attempt locale middleware
    const result = intlMiddleware(req);
    if (result) return result;

    // Protect non-public routes
    if (!req.nextUrl.pathname.match(/^\/?(en|fr|ar)?$/)) {
      auth().protect();
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware Error:', error);
    return NextResponse.error();
  }
});