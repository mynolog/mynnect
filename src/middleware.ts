import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl

  if (token) {
    if (url.pathname === '/' || url.pathname === '/login' || url.pathname === '/signup') {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  } else {
    if (
      url.pathname === '/home' ||
      url.pathname === '/explore' ||
      url.pathname === '/trend' ||
      url.pathname === '/notification' ||
      url.pathname.startsWith('/profile')
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (url.pathname === '/login' || url.pathname === '/signup') {
      return NextResponse.next()
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/signup',
    '/login',
    '/home',
    '/explore',
    '/trend',
    '/notification',
    '/profile/:path*',
  ],
}
