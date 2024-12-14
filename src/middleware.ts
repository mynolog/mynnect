import { NextResponse, NextRequest } from 'next/server'

const URLS = {
  ROOT: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  HOME: '/home',
  EXPLORE: '/explore',
  TREND: '/trend',
  NOTIFICATION: '/notification',
  PROFILE: '/profile',
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl

  // 토큰이 있을 경우
  if (token) {
    // 로그인, 회원가입, 홈 페이지에 접근할 경우 /home으로 리다이렉트
    if (url.pathname === URLS.ROOT || url.pathname === URLS.LOGIN || url.pathname === URLS.SIGNUP) {
      return NextResponse.redirect(new URL(URLS.HOME, req.url))
    }
  } else {
    // 비로그인 상태에서 /home, /explore, /trend, /notification, /profile 접근 시 /로 리다이렉트
    if (
      url.pathname === URLS.HOME ||
      url.pathname === URLS.EXPLORE ||
      url.pathname === URLS.TREND ||
      url.pathname === URLS.NOTIFICATION ||
      url.pathname.startsWith(URLS.PROFILE)
    ) {
      return NextResponse.redirect(new URL(URLS.ROOT, req.url))
    }

    // 비로그인 상태에서 /login, /signup 접근을 허용
    if (url.pathname === URLS.LOGIN || url.pathname === URLS.SIGNUP) {
      return NextResponse.next()
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    URLS.ROOT,
    URLS.SIGNUP,
    URLS.LOGIN,
    URLS.HOME,
    URLS.EXPLORE,
    URLS.TREND,
    URLS.NOTIFICATION,
    URLS.PROFILE,
  ],
}
