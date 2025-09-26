import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Only run middleware logic for protected routes
  },
  {
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

// Only protect the main application routes, not static files or API routes
export const config = {
  matcher: [
    /*
     * Only protect main application pages:
     * - / (home page)
     * - /portfolio
     * - /deal-flow
     * - /venture-bond
     * - /pro-forma
     * - /team
     * - /market-research
     * - /executive-summary
     * - /faq
     * - /edin-os
     * - /admin (admin pages)
     */
    '/',
    '/portfolio/:path*',
    '/deal-flow/:path*',
    '/venture-bond/:path*', 
    '/pro-forma/:path*',
    '/team/:path*',
    '/market-research/:path*',
    '/executive-summary/:path*',
    '/faq/:path*',
    '/edin-os/:path*',
    '/admin/:path*'
  ],
} 