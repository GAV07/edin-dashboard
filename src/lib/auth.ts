import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { UserManagement } from './userManagement'
import type { JWT } from "next-auth/jwt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Authorize called with:", credentials?.email)
        }

        if (!credentials?.email) {
          if (process.env.NODE_ENV === 'development') {
            console.log("Missing email")
          }
          return null
        }

        try {
          // Try to get user from database first
          if (process.env.DATABASE_PUBLIC_URL) {
            const user = await UserManagement.getUserByEmail(credentials.email)

            if (user) {
              if (process.env.NODE_ENV === 'development') {
                console.log("Database user found:", user.email, "role:", user.role)
              }

              // Admin and partner users require password verification
              if (user.role === 'admin' || user.role === 'partner') {
                if (!credentials.password || !user.password_hash) {
                  if (process.env.NODE_ENV === 'development') {
                    console.log("Admin/partner login requires password")
                  }
                  return null
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)
                if (!isPasswordValid) {
                  if (process.env.NODE_ENV === 'development') {
                    console.log("Admin/partner password invalid")
                  }
                  return null
                }
              }

              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              }
            }
          }
        } catch (error) {
          console.error("Database authentication error:", error)
        }

        if (process.env.NODE_ENV === 'development') {
          console.log("User not found:", credentials.email)
        }
        return null
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