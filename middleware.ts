import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  // Don't redirect on API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Redirect authenticated users to dashboard if they try to access login or register pages
  if (isLoggedIn && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to login page if they try to access protected routes
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}