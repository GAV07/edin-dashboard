import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Only run middleware logic for protected routes
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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