import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function middleware(request: NextRequest) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  const user = await getUser()
  const isAdmin = user?.given_name === 'admin' // This is a simple check. You might want to use a more robust method.

  if (request.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}