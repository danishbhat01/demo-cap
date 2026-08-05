import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Allow access to login page
  if (pathname.startsWith('/login')) {
    if (authToken) {
      // If already logged in and trying to access /login, redirect to home
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // If no auth token, redirect to login
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Allow access for authenticated users
  return NextResponse.next()
}

export const config = {
  // Apply to all routes except api, _next/static, _next/image, favicon.ico
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

