import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { UserManagement } from './userManagement'
import type { JWT } from "next-auth/jwt"

// Fallback in-memory users for when database is not available
const fallbackUsers = [
  {
    id: "1",
    email: "admin@edincapital.com",
    password: "$2b$12$6/.4/lJbAxylYEA3Ght5neBkQ/ZkI3SxXVLnjYBk8ufQPuieQ3J.C", // "password123"
    name: "Admin User",
    role: "admin"
  },
  {
    id: "2", 
    email: "investor@edincapital.com",
    password: "$2b$12$6/.4/lJbAxylYEA3Ght5neBkQ/ZkI3SxXVLnjYBk8ufQPuieQ3J.C", // "password123"
    name: "Investor User",
    role: "investor"
  }
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Authorize called with:", credentials?.email)
        }
        
        if (!credentials?.email || !credentials?.password) {
          if (process.env.NODE_ENV === 'development') {
            console.log("Missing credentials")
          }
          return null
        }

        try {
          // Try to get user from database first
          if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const user = await UserManagement.getUserByEmail(credentials.email)
            
            if (user) {
              const isPasswordValid = await UserManagement.verifyPassword(user, credentials.password)
              
              if (process.env.NODE_ENV === 'development') {
                console.log("Database user found:", user.email, "Password valid:", isPasswordValid)
              }
              
              if (isPasswordValid) {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role
                }
              }
            }
          }
        } catch (error) {
          console.error("Database authentication error:", error)
          // Fall back to in-memory users if database fails
        }

        // Fallback to in-memory users
        const user = fallbackUsers.find(user => user.email === credentials.email)
        if (!user) {
          if (process.env.NODE_ENV === 'development') {
            console.log("User not found in fallback:", credentials.email)
          }
          return null
        }

        if (process.env.NODE_ENV === 'development') {
          console.log("Using fallback user:", user.email)
        }
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if (process.env.NODE_ENV === 'development') {
          console.log("Fallback password valid:", isPasswordValid)
        }
        
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.userId as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions) 