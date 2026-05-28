'use client'

import { useState } from 'react'
import { signIn, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Redirect if already authenticated
    if (status === 'authenticated') {
      router.push('/')
      return
    }

    // Track page view for sign-in page
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-60LQ571T8N', {
        page_title: 'Sign In',
        page_location: window.location.href,
      });
    }
  }, [status, router])

  // Show loading while checking authentication status
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if authenticated
  if (status === 'authenticated') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password: isAdminLogin ? password : '',
        redirect: false,
      })

      if (result?.error) {
        setError('Email not recognized. Please contact your Edin representative for access.')
        // Track failed login attempt
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'login_failed', {
            event_category: 'Authentication',
            event_label: 'Credentials',
          });
        }
      } else {
        // Get the session to track user info
        const session = await getSession()
        
        // Track successful login
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'login', {
            method: 'credentials',
            event_category: 'Authentication',
            user_id: session?.user?.id,
          });
          
          // Set user properties for analytics
          window.gtag('config', 'G-60LQ571T8N', {
            user_id: session?.user?.id,
            custom_map: {
              user_role: session?.user?.role,
              user_email: session?.user?.email,
            }
          });
        }
        
        router.push('/')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url(/images/trees.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Edin Investor Portal</h1>
          <p className="text-gray-200 mt-2">Dive deeper into what we are building here at Edin</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Admin Login Toggle */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsAdminLogin(!isAdminLogin)
                  setPassword('')
                  setError('')
                }}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                {isAdminLogin ? 'Switch to investor login' : 'Admin login'}
              </button>
            </div>

            {/* Password Field (Admin only) */}
            {isAdminLogin && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Disclaimer Acknowledgment */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 flex-shrink-0"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I acknowledge that the information contained in this portal is confidential and intended solely
                  for authorized investors. All projections, financial models, and scenarios presented are hypothetical
                  and for illustrative purposes only. They do not constitute investment advice, guarantees of returns,
                  or an offer to sell securities. All investments involve substantial risk, including the potential loss
                  of principal. I agree to consult my own financial, legal, and tax advisors before making any
                  investment decisions.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !disclaimerAccepted}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Accessing...' : 'Access Portal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 