import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Admin routes require admin role
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
      authorized: ({ token }) => {
        // In development, bypass authentication completely
        if (process.env.NODE_ENV === 'development') {
          return true
        }
        // In production, require valid token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/',
    '/thesis/:path*',
    '/deal-flow/:path*',
    '/venture-bond/:path*',
    '/pro-forma/:path*',
    '/portfolio-support/:path*',
    '/team/:path*',
    '/legal/:path*',
    '/faq/:path*',
    '/edin-os/:path*',
    '/admin/:path*'
  ],
} 